import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AdminHeader } from "@/components/admin/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { listCredentials, saveCredential, removeCredential, testConnection } from "@/lib/credentials.functions";
import { Loader2, CheckCircle2, XCircle, Trash2, KeyRound } from "lucide-react";

const KEYS: Array<{ key: string; label: string; type?: "text" | "number"; hint?: string }> = [
  { key: "usd_rate", label: "USD → NGN rate", type: "number", hint: "e.g. 1600 means ₦1600 per $1." },
  { key: "whatsapp_number", label: "WhatsApp number", hint: "Digits only with country code, e.g. 2348012345678" },
  { key: "business_email", label: "Business email" },
  { key: "business_phone", label: "Business phone" },
  { key: "shipping_flat_ngn", label: "Flat shipping fee (NGN)", type: "number" },
];

type Provider = "paystack" | "resend" | "zoom";
type CredRow = { provider: string; key_name: string; last4: string; updated_at: string };

const PROVIDER_KEYS: Record<Provider, Array<{ name: string; label: string; placeholder?: string; kind?: "password" | "text" }>> = {
  paystack: [
    { name: "secret_key", label: "Secret key", placeholder: "sk_live_… or sk_test_…", kind: "password" },
    { name: "public_key", label: "Public key", placeholder: "pk_live_… or pk_test_…", kind: "text" },
    { name: "webhook_secret", label: "Webhook secret", placeholder: "From Paystack dashboard → API Keys & Webhooks", kind: "password" },
  ],
  resend: [
    { name: "api_key", label: "API key", placeholder: "re_…", kind: "password" },
    { name: "from_email", label: "From email", placeholder: "no-reply@webfortix.com", kind: "text" },
  ],
  zoom: [
    { name: "account_id", label: "Account ID", kind: "text" },
    { name: "client_id", label: "Client ID", kind: "text" },
    { name: "client_secret", label: "Client secret", kind: "password" },
  ],
};

const PROVIDER_LABEL: Record<Provider, string> = {
  paystack: "Paystack",
  resend: "Resend (Email)",
  zoom: "Zoom (Server-to-Server OAuth)",
};

const PROVIDER_HINT: Record<Provider, string> = {
  paystack: "Payment processing, webhooks, and receipts.",
  resend: "Transactional and campaign emails. Create an API key at resend.com/api-keys.",
  zoom: "Auto-generates meeting links for scheduled training enrollments. Create a Server-to-Server OAuth app at marketplace.zoom.us.",
};

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("site_settings").select("key,value").then(({ data }) => {
      const map: Record<string, string> = {};
      for (const row of data ?? []) {
        const v = row.value;
        map[row.key] = typeof v === "string" ? v : v == null ? "" : String(v);
      }
      setValues(map);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    const updates = KEYS.map(({ key, type }) => {
      const raw = values[key] ?? "";
      const value = type === "number" ? Number(raw) || 0 : raw;
      return supabase.from("site_settings").upsert({ key, value }, { onConflict: "key" });
    });
    const results = await Promise.all(updates);
    setSaving(false);
    const err = results.find((r) => r.error);
    if (err?.error) toast.error(err.error.message); else toast.success("Settings saved");
  };

  return (
    <>
      <AdminHeader title="Settings" />
      <div className="max-w-3xl space-y-6">
        <div className="rounded-xl border border-border/60 bg-card/40 p-5 space-y-4">
          <h3 className="font-semibold">Public site settings</h3>
          {KEYS.map(({ key, label, type, hint }) => (
            <div key={key}>
              <Label className="text-xs">{label}</Label>
              <Input
                type={type === "number" ? "number" : "text"}
                value={values[key] ?? ""}
                onChange={(e) => setValues({ ...values, [key]: e.target.value })}
              />
              {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
            </div>
          ))}
          <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save settings"}</Button>
        </div>

        <IntegrationsPanel />
      </div>
    </>
  );
}

function IntegrationsPanel() {
  const listFn = useServerFn(listCredentials);
  const [rows, setRows] = useState<CredRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await listFn();
      setRows(res.rows);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load credentials");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <KeyRound className="h-4 w-4 text-primary" />
        <h3 className="font-semibold">Integrations & API credentials</h3>
      </div>
      <p className="text-xs text-muted-foreground -mt-2">
        Values are encrypted at rest in the Vault, read server-side only, and shown here masked (last 4 characters).
      </p>
      {(["paystack", "resend", "zoom"] as Provider[]).map((p) => (
        <ProviderCard key={p} provider={p} rows={rows.filter((r) => r.provider === p)} loading={loading} onChanged={load} />
      ))}
    </div>
  );
}

function ProviderCard({ provider, rows, loading, onChanged }: { provider: Provider; rows: CredRow[]; loading: boolean; onChanged: () => void }) {
  const saveFn = useServerFn(saveCredential);
  const removeFn = useServerFn(removeCredential);
  const testFn = useServerFn(testConnection);

  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [testing, setTesting] = useState(false);

  const saveOne = async (keyName: string) => {
    const value = (drafts[keyName] ?? "").trim();
    if (!value) return;
    setBusy(keyName);
    try {
      await saveFn({ data: { provider, keyName, value } });
      toast.success(`${PROVIDER_LABEL[provider]} ${keyName} saved`);
      setDrafts((d) => ({ ...d, [keyName]: "" }));
      onChanged();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(null);
    }
  };

  const removeOne = async (keyName: string) => {
    if (!confirm(`Remove ${provider} ${keyName}?`)) return;
    setBusy(keyName);
    try {
      await removeFn({ data: { provider, keyName } });
      toast.success("Removed");
      onChanged();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Remove failed");
    } finally {
      setBusy(null);
    }
  };

  const test = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await testFn({ data: { provider } });
      setTestResult(res);
    } catch (e) {
      setTestResult({ ok: false, message: e instanceof Error ? e.message : "Test failed" });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="rounded-xl border border-border/60 bg-card/40 p-5 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h4 className="font-semibold">{PROVIDER_LABEL[provider]}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{PROVIDER_HINT[provider]}</p>
        </div>
        <Button size="sm" variant="outline" disabled={testing || loading} onClick={test}>
          {testing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Test connection"}
        </Button>
      </div>

      {testResult && (
        <div className={`flex items-start gap-2 rounded-md p-2 text-xs ${testResult.ok ? "bg-green-500/10 text-green-500" : "bg-destructive/10 text-destructive"}`}>
          {testResult.ok ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <XCircle className="h-4 w-4 shrink-0" />}
          <span>{testResult.message}</span>
        </div>
      )}

      <div className="space-y-3">
        {PROVIDER_KEYS[provider].map((k) => {
          const saved = rows.find((r) => r.key_name === k.name);
          return (
            <div key={k.name} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs">{k.label}</Label>
                {saved && (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] font-mono">••••{saved.last4}</Badge>
                    <button
                      onClick={() => removeOne(k.name)}
                      disabled={busy === k.name}
                      className="text-muted-foreground hover:text-destructive"
                      title="Remove"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  type={k.kind === "password" ? "password" : "text"}
                  placeholder={saved ? "Enter new value to replace" : k.placeholder}
                  value={drafts[k.name] ?? ""}
                  onChange={(e) => setDrafts({ ...drafts, [k.name]: e.target.value })}
                  autoComplete="off"
                />
                <Button
                  size="sm"
                  disabled={busy === k.name || !(drafts[k.name] ?? "").trim()}
                  onClick={() => saveOne(k.name)}
                >
                  {busy === k.name ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : saved ? "Update" : "Save"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
