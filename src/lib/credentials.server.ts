// Server-only helper for reading integration credentials from Supabase Vault.
// Never import from browser code. All callers must already have verified the
// caller is authorized (either an admin session or a verified webhook).

export type Provider = "paystack" | "resend" | "zoom";

type CredRow = { secret_ref: string };

// Per-Worker request cache. Cleared naturally between requests because Workers
// spawn new module instances; safe as short-lived cache within one request.
const cache = new Map<string, { value: string; at: number }>();
const TTL_MS = 60_000;

export function mask(value: string): string {
  const trimmed = (value ?? "").trim();
  if (trimmed.length <= 4) return "••••";
  return "••••" + trimmed.slice(-4);
}

export async function getCredential(
  provider: Provider,
  keyName: string,
  envFallback?: string,
): Promise<string | null> {
  const cacheKey = `${provider}:${keyName}`;
  const hit = cache.get(cacheKey);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.value;

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("integration_credentials")
    .select("secret_ref")
    .eq("provider", provider)
    .eq("key_name", keyName)
    .maybeSingle<CredRow>();

  if (data?.secret_ref) {
    const { data: secret, error } = await supabaseAdmin.rpc("vault_read_secret", {
      _id: data.secret_ref,
    });
    if (!error && secret) {
      cache.set(cacheKey, { value: secret as string, at: Date.now() });
      return secret as string;
    }
  }

  if (envFallback && process.env[envFallback]) {
    return process.env[envFallback]!;
  }
  return null;
}

export function invalidateCredentialCache(provider?: Provider, keyName?: string) {
  if (provider && keyName) cache.delete(`${provider}:${keyName}`);
  else cache.clear();
}

export async function writeCredential(
  provider: Provider,
  keyName: string,
  value: string,
  updatedBy: string | null,
): Promise<{ last4: string }> {
  const trimmed = value.trim();
  if (!trimmed) throw new Error("Value is empty");
  const last4 = trimmed.length <= 4 ? "----" : trimmed.slice(-4);

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  // Rotate: delete previous vault secret if it exists
  const { data: existing } = await supabaseAdmin
    .from("integration_credentials")
    .select("secret_ref")
    .eq("provider", provider)
    .eq("key_name", keyName)
    .maybeSingle<CredRow>();

  const secretName = `integration_${provider}_${keyName}_${Date.now()}`;
  const { data: newId, error: vaultErr } = await supabaseAdmin.rpc("vault_write_secret", {
    _name: secretName,
    _value: trimmed,
  });
  if (vaultErr || !newId) throw new Error(vaultErr?.message || "Vault write failed");

  const { error: upsertErr } = await supabaseAdmin
    .from("integration_credentials")
    .upsert(
      {
        provider,
        key_name: keyName,
        secret_ref: newId as string,
        last4,
        updated_by: updatedBy,
      },
      { onConflict: "provider,key_name" },
    );
  if (upsertErr) throw new Error(upsertErr.message);

  if (existing?.secret_ref) {
    await supabaseAdmin.rpc("vault_delete_secret", { _id: existing.secret_ref });
  }

  invalidateCredentialCache(provider, keyName);
  return { last4 };
}

export async function deleteCredential(provider: Provider, keyName: string): Promise<void> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: existing } = await supabaseAdmin
    .from("integration_credentials")
    .select("secret_ref")
    .eq("provider", provider)
    .eq("key_name", keyName)
    .maybeSingle<CredRow>();
  if (existing?.secret_ref) {
    await supabaseAdmin.rpc("vault_delete_secret", { _id: existing.secret_ref });
  }
  await supabaseAdmin
    .from("integration_credentials")
    .delete()
    .eq("provider", provider)
    .eq("key_name", keyName);
  invalidateCredentialCache(provider, keyName);
}

export async function logAdminAction(
  actorId: string | null,
  action: string,
  targetType?: string,
  targetId?: string,
  metadata: Record<string, unknown> = {},
): Promise<void> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  await supabaseAdmin.from("admin_audit_log").insert({
    actor_id: actorId,
    action,
    target_type: targetType ?? null,
    target_id: targetId ?? null,
    metadata: metadata as never,
  });
}
