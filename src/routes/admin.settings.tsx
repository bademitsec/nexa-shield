import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AdminHeader } from "@/components/admin/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

const KEYS: Array<{ key: string; label: string; type?: "text" | "number"; hint?: string }> = [
  { key: "usd_rate", label: "USD → NGN rate", type: "number", hint: "e.g. 1600 means ₦1600 per $1." },
  { key: "paystack_public_key", label: "Paystack public key", hint: "Starts with pk_test_… or pk_live_…" },
  { key: "whatsapp_number", label: "WhatsApp number", hint: "Digits only with country code, e.g. 2348012345678" },
  { key: "business_email", label: "Business email" },
  { key: "business_phone", label: "Business phone" },
  { key: "shipping_flat_ngn", label: "Flat shipping fee (NGN)", type: "number" },
];

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
      <div className="max-w-2xl space-y-6">
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

        <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 text-sm space-y-2">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Secret keys (Paystack, SMTP, email provider)</p>
              <p className="mt-1 text-xs text-muted-foreground">
                The Paystack <span className="font-mono">secret</span> key is stored securely and used only on the server.
                To connect SMTP or an email provider (Resend, SendGrid, Mailgun) for campaigns and transactional email,
                ask me and I'll wire it up — I'll request the credentials through the secure secret form.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
