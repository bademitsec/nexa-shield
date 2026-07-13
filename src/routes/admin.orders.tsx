import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatNGN, formatDate } from "@/lib/format";
import { AdminHeader } from "@/components/admin/sidebar";
import { Input } from "@/components/ui/input";

const STATUSES = ["all","pending","confirmed","processing","installing","shipped","delivered","completed","cancelled","refunded"] as const;

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

function AdminOrders() {
  const [status, setStatus] = useState<string>("all");
  const [q, setQ] = useState("");

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin","orders",status,q],
    queryFn: async () => {
      let query = supabase.from("orders")
        .select("id,order_number,full_name,email,total_ngn,deposit_amount_ngn,balance_amount_ngn,paid_amount_ngn,payment_status,status,created_at")
        .order("created_at",{ascending:false}).limit(200);
      if (status !== "all") query = query.eq("status", status as never);
      if (q.trim()) query = query.or(`order_number.ilike.%${q}%,full_name.ilike.%${q}%,email.ilike.%${q}%`);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      <AdminHeader title="Orders" />
      <div className="mb-4 flex flex-wrap gap-2">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search order # or customer" className="max-w-xs" />
        <select value={status} onChange={(e) => setStatus(e.target.value)}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="rounded-xl border border-border/60 bg-card/40 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 text-xs uppercase text-muted-foreground">
            <tr>
              <Th>Order #</Th><Th>Customer</Th><Th>Total</Th><Th>Payment</Th><Th>Status</Th><Th>Date</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {isLoading && <tr><td colSpan={6} className="p-6 text-muted-foreground text-center">Loading…</td></tr>}
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-secondary/40">
                <Td><Link to="/admin/orders/$id" params={{id: o.id}} className="font-mono text-primary hover:underline">{o.order_number}</Link></Td>
                <Td><div>{o.full_name}</div><div className="text-xs text-muted-foreground">{o.email}</div></Td>
                <Td>{formatNGN(o.total_ngn)}<div className="text-xs text-muted-foreground">Paid {formatNGN(o.paid_amount_ngn ?? 0)}</div></Td>
                <Td><span className="capitalize">{o.payment_status.replace(/_/g," ")}</span></Td>
                <Td><span className="capitalize">{o.status}</span></Td>
                <Td className="text-xs text-muted-foreground">{formatDate(o.created_at)}</Td>
              </tr>
            ))}
            {!isLoading && orders.length === 0 && (
              <tr><td colSpan={6} className="p-6 text-muted-foreground text-center">No orders match.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Th({ children }: { children: React.ReactNode }) { return <th className="text-left px-4 py-2.5">{children}</th>; }
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}
