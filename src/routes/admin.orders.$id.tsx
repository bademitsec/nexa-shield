import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { formatNGN, formatDate } from "@/lib/format";
import { AdminHeader } from "@/components/admin/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { adminCreateBalanceLink, adminRecordManualPayment } from "@/lib/admin-payments.functions";

const STATUSES = ["pending","confirmed","processing","installing","shipped","delivered","completed","cancelled","refunded"] as const;
const PAYMENTS = ["unpaid","deposit_paid","fully_paid","refunded","failed"] as const;

export const Route = createFileRoute("/admin/orders/$id")({
  component: AdminOrderDetail,
});

interface OrderRow {
  id: string; order_number: string; full_name: string; email: string; phone: string | null;
  shipping_address: Record<string, string>;
  subtotal_ngn: number; shipping_ngn: number; total_ngn: number;
  deposit_amount_ngn: number; balance_amount_ngn: number; paid_amount_ngn: number;
  status: string; payment_status: string; tracking_number: string | null;
  admin_notes: string | null; customer_notes: string | null; created_at: string;
}
interface ItemRow {
  id: string; name_snapshot: string; sku_snapshot: string | null;
  unit_price_ngn: number; quantity: number;
}

function AdminOrderDetail() {
  const { id } = Route.useParams();
  const [order, setOrder] = useState<OrderRow | null>(null);
  const [items, setItems] = useState<ItemRow[]>([]);
  const [status, setStatus] = useState<string>("");
  const [payment, setPayment] = useState<string>("");
  const [tracking, setTracking] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [manualAmount, setManualAmount] = useState<string>("");
  const [manualChannel, setManualChannel] = useState<string>("bank_transfer");
  const [manualRef, setManualRef] = useState<string>("");
  const [manualBusy, setManualBusy] = useState(false);
  const [linkBusy, setLinkBusy] = useState(false);
  const [balanceLink, setBalanceLink] = useState<string | null>(null);
  const createLinkFn = useServerFn(adminCreateBalanceLink);
  const recordManualFn = useServerFn(adminRecordManualPayment);

  useEffect(() => {
    (async () => {
      const [o, it] = await Promise.all([
        supabase.from("orders").select("*").eq("id", id).maybeSingle(),
        supabase.from("order_items").select("id,name_snapshot,sku_snapshot,unit_price_ngn,quantity").eq("order_id", id),
      ]);
      const oRow = o.data as unknown as OrderRow | null;
      setOrder(oRow);
      setItems((it.data ?? []) as ItemRow[]);
      if (oRow) {
        setStatus(oRow.status);
        setPayment(oRow.payment_status);
        setTracking(oRow.tracking_number ?? "");
        setNotes(oRow.admin_notes ?? "");
      }
    })();
  }, [id]);

  if (!order) return <div className="text-sm text-muted-foreground">Loading…</div>;

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("orders").update({
      status: status as never,
      payment_status: payment as never,
      tracking_number: tracking || null,
      admin_notes: notes || null,
    }).eq("id", order.id);
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Order updated");
  };

  const sendBalanceLink = async () => {
    if (!order) return;
    setLinkBusy(true);
    setBalanceLink(null);
    try {
      const res = await createLinkFn({ data: { orderId: order.id, origin: window.location.origin } });
      if (res.authorization_url) {
        setBalanceLink(res.authorization_url);
        try { await navigator.clipboard.writeText(res.authorization_url); } catch { /* ignore */ }
        toast.success("Balance payment link ready — copied to clipboard");
      } else {
        toast.error("Paystack did not return a link");
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to create link");
    } finally {
      setLinkBusy(false);
    }
  };

  const recordManual = async () => {
    if (!order) return;
    const amt = Number(manualAmount);
    if (!amt || amt <= 0) return toast.error("Enter a valid amount");
    setManualBusy(true);
    try {
      const res = await recordManualFn({ data: {
        orderId: order.id,
        amount_ngn: amt,
        kind: "balance",
        channel: manualChannel || "manual",
        reference: manualRef || undefined,
      } });
      setOrder({ ...order, paid_amount_ngn: res.paid_amount_ngn, balance_amount_ngn: res.balance_amount_ngn, payment_status: res.payment_status });
      setPayment(res.payment_status);
      setManualAmount("");
      setManualRef("");
      toast.success("Manual payment recorded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to record payment");
    } finally {
      setManualBusy(false);
    }
  };

  const paymentType: "Full" | "Deposit (80/20)" =
    Number(order.deposit_amount_ngn) > 0 && Number(order.deposit_amount_ngn) < Number(order.total_ngn)
      ? "Deposit (80/20)" : "Full";

  const addr = order.shipping_address || {};

  return (
    <>
      <AdminHeader title={`Order ${order.order_number}`} actions={
        <Link to="/admin/orders" className="text-xs text-muted-foreground hover:text-foreground">← Back</Link>
      } />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border/60 bg-card/40">
            <div className="border-b border-border/60 p-4 font-semibold">Items</div>
            <div className="divide-y divide-border/60">
              {items.map((i) => (
                <div key={i.id} className="flex justify-between p-4 text-sm">
                  <div><div className="font-medium">{i.name_snapshot}</div><div className="text-xs text-muted-foreground">Qty {i.quantity}{i.sku_snapshot ? ` · ${i.sku_snapshot}` : ""}</div></div>
                  <div className="font-medium">{formatNGN(Number(i.unit_price_ngn) * i.quantity)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border/60 bg-card/40 p-5">
            <h3 className="font-semibold">Customer</h3>
            <p className="mt-2 text-sm">{order.full_name} — {order.email} — {order.phone}</p>
            <p className="mt-1 text-sm text-muted-foreground">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}, {addr.city}, {addr.state}, {addr.country}</p>
            {order.customer_notes && <p className="mt-3 text-xs italic text-muted-foreground">"{order.customer_notes}"</p>}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-border/60 bg-card/40 p-5">
            <h3 className="font-semibold">Totals</h3>
            <dl className="mt-3 space-y-1 text-sm">
              <Row label="Subtotal" v={formatNGN(order.subtotal_ngn)} />
              <Row label="Shipping" v={formatNGN(order.shipping_ngn)} />
              <Row label="Total" v={formatNGN(order.total_ngn)} bold />
              <Row label="Paid" v={formatNGN(order.paid_amount_ngn)} />
              <Row label="Balance" v={formatNGN(order.balance_amount_ngn)} />
            </dl>
            {Number(order.balance_amount_ngn) > 0 && (
              <Button size="sm" variant="outline" className="mt-3 w-full" onClick={markBalancePaid}>
                Mark balance received
              </Button>
            )}
            <p className="mt-3 text-xs text-muted-foreground">Placed {formatDate(order.created_at)}</p>
          </div>

          <div className="rounded-xl border border-border/60 bg-card/40 p-5 space-y-3">
            <h3 className="font-semibold">Update</h3>
            <div>
              <Label className="text-xs">Order status</Label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}
                className="mt-1 h-9 w-full rounded-md border border-input bg-background px-2 text-sm">
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <Label className="text-xs">Payment status</Label>
              <select value={payment} onChange={(e) => setPayment(e.target.value)}
                className="mt-1 h-9 w-full rounded-md border border-input bg-background px-2 text-sm">
                {PAYMENTS.map((s) => <option key={s} value={s}>{s.replace(/_/g," ")}</option>)}
              </select>
            </div>
            <div>
              <Label className="text-xs">Tracking number</Label>
              <Input value={tracking} onChange={(e) => setTracking(e.target.value)} placeholder="Optional" />
            </div>
            <div>
              <Label className="text-xs">Admin notes</Label>
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
            </div>
            <Button disabled={saving} onClick={save} className="w-full">
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </aside>
      </div>
    </>
  );
}

function Row({ label, v, bold }: { label: string; v: string; bold?: boolean }) {
  return <div className={`flex justify-between ${bold ? "border-t border-border/60 pt-1 mt-1 font-semibold" : ""}`}><dt className="text-muted-foreground">{label}</dt><dd>{v}</dd></div>;
}
