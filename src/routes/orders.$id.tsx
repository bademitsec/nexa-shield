import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Price } from "@/components/site/price";
import { formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { verifyPayment, initBalancePayment } from "@/lib/checkout.functions";
import { site } from "@/lib/site-config";

const search = z.object({ verify: z.string().optional() });

export const Route = createFileRoute("/orders/$id")({
  validateSearch: (s) => search.parse(s),
  head: () => ({ meta: [{ title: `Order — ${site.name}` }, { name: "robots", content: "noindex" }] }),
  component: OrderDetail,
});

type Order = {
  id: string; order_number: string; email: string; full_name: string; phone: string | null;
  shipping_address: Record<string, string>; subtotal_ngn: number; shipping_ngn: number;
  total_ngn: number; deposit_amount_ngn: number; balance_amount_ngn: number; paid_amount_ngn: number;
  status: string; payment_status: string; tracking_number: string | null; created_at: string;
  admin_notes: string | null; customer_notes: string | null;
};
type Item = {
  id: string; name_snapshot: string; sku_snapshot: string | null;
  unit_price_ngn: number; quantity: number; is_subscription: boolean;
};

function OrderDetail() {
  const { id } = Route.useParams();
  const { verify } = useSearch({ from: "/orders/$id" });
  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingBalance, setPayingBalance] = useState(false);
  const verifyFn = useServerFn(verifyPayment);
  const balanceFn = useServerFn(initBalancePayment);

  const load = async () => {
    const { data: o } = await supabase.from("orders").select("*").eq("id", id).maybeSingle();
    const { data: it } = await supabase.from("order_items")
      .select("id,name_snapshot,sku_snapshot,unit_price_ngn,quantity,is_subscription")
      .eq("order_id", id);
    setOrder(o as Order | null);
    setItems((it ?? []) as Item[]);
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      if (verify) {
        try {
          await verifyFn({ data: { reference: verify } });
          toast.success("Payment verified");
        } catch (e) {
          toast.error(e instanceof Error ? e.message : "Verification failed");
        }
        // strip ?verify from URL
        const url = new URL(window.location.href);
        url.searchParams.delete("verify");
        window.history.replaceState({}, "", url.toString());
      }
      await load();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <div className="container-x py-16 text-sm text-muted-foreground">Loading…</div>;
  if (!order) return <div className="container-x py-16">Order not found. <Link to="/orders" className="text-primary underline">Back to orders</Link></div>;

  const addr = order.shipping_address || {};
  const canPayBalance = order.payment_status === "deposit_paid" && Number(order.balance_amount_ngn) > 0;

  const payBalance = async () => {
    setPayingBalance(true);
    try {
      const res = await balanceFn({ data: { orderId: order.id, origin: window.location.origin } });
      if (res.authorization_url) window.location.href = res.authorization_url;
      else toast.error("Could not start payment");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
      setPayingBalance(false);
    }
  };

  return (
    <div className="container-x py-10 md:py-14 max-w-4xl">
      <Link to="/orders" className="text-xs text-muted-foreground hover:text-foreground">← Back to orders</Link>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Order <span className="font-mono">{order.order_number}</span></h1>
          <p className="mt-1 text-sm text-muted-foreground">Placed {formatDate(order.created_at)}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs capitalize">{order.status}</span>
          <span className="rounded-full bg-primary/15 text-primary px-3 py-1 text-xs capitalize">{order.payment_status.replace(/_/g," ")}</span>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-xl border border-border/60 bg-card/50 divide-y divide-border/60">
            {items.map((i) => (
              <div key={i.id} className="flex justify-between p-4">
                <div>
                  <div className="font-medium">{i.name_snapshot}</div>
                  <div className="text-xs text-muted-foreground">
                    Qty {i.quantity}{i.is_subscription ? " · Subscription" : ""}{i.sku_snapshot ? ` · ${i.sku_snapshot}` : ""}
                  </div>
                </div>
                <Price ngn={Number(i.unit_price_ngn) * i.quantity} className="font-semibold" />
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border/60 bg-card/40 p-5">
            <h3 className="font-semibold">Shipping / install address</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {order.full_name}<br />
              {addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}<br />
              {addr.city}, {addr.state}, {addr.country}<br />
              {order.phone} · {order.email}
            </p>
            {order.customer_notes && (
              <p className="mt-3 text-xs text-muted-foreground italic">Notes: {order.customer_notes}</p>
            )}
          </div>

          {order.tracking_number && (
            <div className="rounded-xl border border-border/60 bg-card/40 p-5">
              <h3 className="font-semibold">Tracking</h3>
              <p className="mt-1 font-mono text-sm">{order.tracking_number}</p>
            </div>
          )}
        </div>

        <aside className="rounded-xl border border-border/60 bg-card/50 p-6 h-fit">
          <h3 className="font-semibold">Summary</h3>
          <dl className="mt-4 space-y-2 text-sm">
            <Row label="Subtotal" value={<Price ngn={order.subtotal_ngn} />} />
            <Row label="Shipping" value={<Price ngn={order.shipping_ngn} />} />
            <Row label="Total" value={<Price ngn={order.total_ngn} className="font-semibold" />} bold />
            <Row label="Paid" value={<Price ngn={order.paid_amount_ngn} className="text-emerald-400" />} />
            <Row label="Balance" value={<Price ngn={order.balance_amount_ngn} />} />
          </dl>
          {canPayBalance && (
            <Button disabled={payingBalance} onClick={payBalance}
              className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90">
              {payingBalance ? "Redirecting…" : "Pay balance now"}
            </Button>
          )}
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: React.ReactNode; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "border-t border-border/60 pt-2" : ""}`}>
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
