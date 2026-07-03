import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatNGN } from "@/lib/format";
import { AdminHeader } from "@/components/admin/sidebar";
import { TrendingUp, Package, Users, Repeat, ShoppingBag, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      const [orders, paidOrders, customers, subs, products, lowStock, recentOrders] = await Promise.all([
        supabase.from("orders").select("id,total_ngn,paid_amount_ngn,payment_status,created_at"),
        supabase.from("orders").select("paid_amount_ngn").in("payment_status", ["deposit_paid","fully_paid"]),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("subscriptions").select("id,amount_ngn,status").eq("status", "active"),
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("products").select("id,name,stock,low_stock_threshold").eq("is_active", true),
        supabase.from("orders").select("id,order_number,total_ngn,payment_status,created_at,full_name").order("created_at",{ascending:false}).limit(5),
      ]);
      const totalRevenue = (paidOrders.data ?? []).reduce((s, o) => s + Number(o.paid_amount_ngn ?? 0), 0);
      const mrr = (subs.data ?? []).reduce((s, o) => s + Number(o.amount_ngn ?? 0), 0);
      const low = (lowStock.data ?? []).filter((p) => p.stock <= p.low_stock_threshold);
      return {
        revenue: totalRevenue,
        mrr,
        orderCount: orders.data?.length ?? 0,
        customerCount: customers.count ?? 0,
        productCount: products.count ?? 0,
        subCount: subs.data?.length ?? 0,
        lowStock: low,
        recentOrders: recentOrders.data ?? [],
      };
    },
  });

  return (
    <>
      <AdminHeader title="Dashboard" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat icon={TrendingUp} label="Total revenue" value={stats ? formatNGN(stats.revenue) : "—"} />
        <Stat icon={Repeat} label="Monthly recurring" value={stats ? formatNGN(stats.mrr) : "—"} accent />
        <Stat icon={ShoppingBag} label="Orders" value={stats?.orderCount ?? "—"} />
        <Stat icon={Users} label="Customers" value={stats?.customerCount ?? "—"} />
        <Stat icon={Package} label="Products" value={stats?.productCount ?? "—"} />
        <Stat icon={Repeat} label="Active subs" value={stats?.subCount ?? "—"} />
      </div>

      {stats?.lowStock && stats.lowStock.length > 0 && (
        <div className="mt-8 rounded-xl border border-destructive/30 bg-destructive/5 p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <h3 className="font-semibold">Low stock alerts</h3>
          </div>
          <ul className="text-sm space-y-1">
            {stats.lowStock.map((p) => (
              <li key={p.id} className="flex justify-between">
                <span>{p.name}</span>
                <span className="font-mono text-destructive">{p.stock} left</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 rounded-xl border border-border/60 bg-card/40">
        <div className="border-b border-border/60 p-4 font-semibold">Recent orders</div>
        <div className="divide-y divide-border/60">
          {(stats?.recentOrders ?? []).map((o) => (
            <div key={o.id} className="grid grid-cols-4 gap-2 p-4 text-sm">
              <span className="font-mono">{o.order_number}</span>
              <span className="truncate">{o.full_name}</span>
              <span className="capitalize text-muted-foreground">{o.payment_status.replace(/_/g," ")}</span>
              <span className="text-right font-medium">{formatNGN(o.total_ngn)}</span>
            </div>
          ))}
          {stats && stats.recentOrders.length === 0 && (
            <div className="p-6 text-sm text-muted-foreground">No orders yet.</div>
          )}
        </div>
      </div>
    </>
  );
}

function Stat({ icon: Icon, label, value, accent }: { icon: React.ElementType; label: string; value: React.ReactNode; accent?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 ${accent ? "border-accent/40 bg-accent/5" : "border-border/60 bg-card/40"}`}>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div className="mt-2 text-xl font-bold">{value}</div>
    </div>
  );
}
