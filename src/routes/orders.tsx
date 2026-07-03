import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Price } from "@/components/site/price";
import { formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site-config";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: `My orders — ${site.name}` }, { name: "robots", content: "noindex" }] }),
  component: OrdersPage,
});

type OrderRow = {
  id: string; order_number: string; total_ngn: number;
  status: string; payment_status: string; created_at: string;
};

function OrdersPage() {
  const [orders, setOrders] = useState<OrderRow[] | null>(null);
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { setSignedIn(false); return; }
      setSignedIn(true);
      const { data: rows } = await supabase
        .from("orders")
        .select("id,order_number,total_ngn,status,payment_status,created_at")
        .order("created_at", { ascending: false });
      setOrders((rows ?? []) as OrderRow[]);
    });
  }, []);

  if (signedIn === false) {
    return (
      <div className="container-x py-16 max-w-md text-center">
        <h1 className="font-display text-2xl font-bold">Sign in to view your orders</h1>
        <Button asChild className="mt-6"><Link to="/auth">Sign in</Link></Button>
      </div>
    );
  }

  return (
    <div className="container-x py-10 md:py-14">
      <h1 className="font-display text-2xl md:text-3xl font-bold">My orders</h1>
      {orders === null ? (
        <p className="mt-6 text-sm text-muted-foreground">Loading…</p>
      ) : orders.length === 0 ? (
        <div className="mt-8 rounded-xl border border-border/60 bg-card/40 p-8 text-center">
          <p className="text-muted-foreground">You haven't placed any orders yet.</p>
          <Button asChild className="mt-4"><Link to="/shop">Browse the shop</Link></Button>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {orders.map((o) => (
            <Link key={o.id} to="/orders/$id" params={{ id: o.id }}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/60 bg-card/50 p-4 hover:border-primary/50 transition">
              <div>
                <div className="font-mono text-sm font-semibold">{o.order_number}</div>
                <div className="text-xs text-muted-foreground">{formatDate(o.created_at)}</div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <StatusBadge value={o.status} />
                <PaymentBadge value={o.payment_status} />
              </div>
              <Price ngn={o.total_ngn} className="font-semibold" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ value }: { value: string }) {
  return <span className="rounded-full bg-secondary px-2 py-0.5 capitalize">{value}</span>;
}
function PaymentBadge({ value }: { value: string }) {
  const color = value === "fully_paid" ? "bg-emerald-500/15 text-emerald-400"
    : value === "deposit_paid" ? "bg-accent/20 text-accent"
    : value === "failed" ? "bg-destructive/20 text-destructive"
    : "bg-muted text-muted-foreground";
  return <span className={`rounded-full px-2 py-0.5 capitalize ${color}`}>{value.replace(/_/g, " ")}</span>;
}
