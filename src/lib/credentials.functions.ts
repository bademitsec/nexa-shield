import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const PROVIDERS = ["paystack", "resend", "zoom"] as const;

const KEY_SCHEMA: Record<(typeof PROVIDERS)[number], string[]> = {
  paystack: ["secret_key", "public_key", "webhook_secret"],
  resend: ["api_key", "from_email"],
  zoom: ["account_id", "client_id", "client_secret"],
};

async function assertStaff(supabase: Awaited<ReturnType<typeof import("@/integrations/supabase/auth-middleware").requireSupabaseAuth>>["context"]["supabase"], userId: string) {
  const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId);
  const roles = (data ?? []).map((r) => r.role);
  const isStaff = roles.includes("admin") || roles.includes("staff");
  if (!isStaff) throw new Error("Forbidden");
}

export const listCredentials = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertStaff(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("integration_credentials")
      .select("provider, key_name, last4, updated_at, updated_by");
    if (error) throw new Error(error.message);
    return { rows: (data ?? []) as Array<{ provider: string; key_name: string; last4: string; updated_at: string; updated_by: string | null }> };
  });

export const saveCredential = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        provider: z.enum(PROVIDERS),
        keyName: z.string().min(1).max(64),
        value: z.string().min(1).max(4096),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertStaff(context.supabase, context.userId);
    const allowed = KEY_SCHEMA[data.provider];
    if (!allowed.includes(data.keyName)) throw new Error("Unknown key");

    const { writeCredential, logAdminAction } = await import("./credentials.server");
    const { last4 } = await writeCredential(data.provider, data.keyName, data.value, context.userId);
    await logAdminAction(context.userId, "credential.save", data.provider, data.keyName, { last4 });
    return { ok: true, last4 };
  });

export const removeCredential = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({ provider: z.enum(PROVIDERS), keyName: z.string().min(1).max(64) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertStaff(context.supabase, context.userId);
    const { deleteCredential, logAdminAction } = await import("./credentials.server");
    await deleteCredential(data.provider, data.keyName);
    await logAdminAction(context.userId, "credential.delete", data.provider, data.keyName);
    return { ok: true };
  });

export const testConnection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ provider: z.enum(PROVIDERS) }).parse(input))
  .handler(async ({ data, context }) => {
    await assertStaff(context.supabase, context.userId);
    const { getCredential, logAdminAction } = await import("./credentials.server");

    try {
      if (data.provider === "paystack") {
        const key = await getCredential("paystack", "secret_key", "PAYSTACK_SECRET_KEY");
        if (!key) return { ok: false, message: "Paystack secret key not set" };
        const res = await fetch("https://api.paystack.co/transaction/totals", {
          headers: { Authorization: `Bearer ${key}` },
        });
        const json = (await res.json().catch(() => ({}))) as { status?: boolean; message?: string };
        const ok = res.ok && json.status !== false;
        await logAdminAction(context.userId, "credential.test", "paystack", null, { ok });
        return { ok, message: ok ? "Paystack connection OK" : json.message || `HTTP ${res.status}` };
      }
      if (data.provider === "resend") {
        const key = await getCredential("resend", "api_key");
        if (!key) return { ok: false, message: "Resend API key not set" };
        const res = await fetch("https://api.resend.com/domains", {
          headers: { Authorization: `Bearer ${key}` },
        });
        const ok = res.ok;
        await logAdminAction(context.userId, "credential.test", "resend", null, { ok });
        return { ok, message: ok ? "Resend connection OK" : `HTTP ${res.status}` };
      }
      if (data.provider === "zoom") {
        const accountId = await getCredential("zoom", "account_id");
        const clientId = await getCredential("zoom", "client_id");
        const clientSecret = await getCredential("zoom", "client_secret");
        if (!accountId || !clientId || !clientSecret) return { ok: false, message: "Zoom credentials incomplete" };
        const basic = btoa(`${clientId}:${clientSecret}`);
        const res = await fetch(
          `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${encodeURIComponent(accountId)}`,
          { method: "POST", headers: { Authorization: `Basic ${basic}` } },
        );
        const ok = res.ok;
        await logAdminAction(context.userId, "credential.test", "zoom", null, { ok });
        return { ok, message: ok ? "Zoom connection OK" : `HTTP ${res.status}` };
      }
      return { ok: false, message: "Unknown provider" };
    } catch (e) {
      return { ok: false, message: e instanceof Error ? e.message : "Test failed" };
    }
  });
