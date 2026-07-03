import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatNGN, formatDate } from "@/lib/format";
import { AdminHeader } from "@/components/admin/sidebar";

interface Sub {
  id: string; status: string; amount_ngn: number; interval: string;
  next_payment_date: string | null; started_at: string | null;
  paystack_subscription_code: string | null; user_id: string;
  product_id: string | null;
}

const STATUSES = ["active","past_due","paused","cancelled","pending"] as const;

export const Route = createFileRoute("/admin/subscriptions")({
  component: AdminSubs,
});

function AdminSubs() {
  const [rows, setRows] = useState<Sub[]>([]);
  const load = async () => {
    const { data } = await supabase.from("subscriptions").select("*").order("created_at",{ascending:false});
    setRows((data ?? []) as unknown as Sub[]);
  };
  useEffect(() => { load(); }, []);

  const change = async (id: string, status: string) => {
    const { error } = await supabase.from("subscriptions").update({
      status: status as never, cancelled_at: status === "cancelled" ? new Date().toISOString() : null,
    }).eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Updated"); load(); }
  };

  const mrr = rows.filter((r) => r.status === "active").reduce((s, r) => s + Number(r.amount_ngn), 0);

  return (
    <>
      <AdminHeader title="Subscriptions" />
      <div className="mb-4 rounded-xl border border-accent/40 bg-accent/5 p-4 text-sm">
        Monthly recurring revenue: <span className="font-bold text-accent">{formatNGN(mrr)}</span>
      </div>
      <div className="rounded-xl border border-border/60 bg-card/40 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 text-xs uppercase text-muted-foreground">
            <tr><th className="text-left px-4 py-2.5">ID</th><th className="text-left px-4 py-2.5">Amount</th><th className="text-left px-4 py-2.5">Interval</th><th className="text-left px-4 py-2.5">Next</th><th className="text-left px-4 py-2.5">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {rows.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-3 font-mono text-xs">{s.id.slice(0,8)}</td>
                <td className="px-4 py-3">{formatNGN(s.amount_ngn)}</td>
                <td className="px-4 py-3 capitalize">{s.interval}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{s.next_payment_date ? formatDate(s.next_payment_date) : "—"}</td>
                <td className="px-4 py-3">
                  <select value={s.status} onChange={(e) => change(s.id, e.target.value)}
                    className="h-8 rounded-md border border-input bg-background px-2 text-xs">
                    {STATUSES.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">No subscriptions yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
