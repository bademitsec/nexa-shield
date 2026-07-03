import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Price } from "@/components/site/price";
import { site } from "@/lib/site-config";
import { Shield, Package } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: `Shop — ${site.name}` },
      { name: "description", content: "IP cameras, NVRs, smart locks, alarms and cloud monitoring plans. Prices in NGN with USD toggle." },
      { property: "og:title", content: `Security Hardware Shop — ${site.name}` },
      { property: "og:description", content: "Buy IP cameras, NVRs, smart locks and monitoring plans with pay-on-delivery deposit options." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const [cat, setCat] = useState<string>("all");

  const { data: categories = [] } = useQuery({
    queryKey: ["shop", "categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_categories")
        .select("id,name,slug,description,display_order")
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["shop", "products", cat],
    queryFn: async () => {
      let q = supabase
        .from("products")
        .select("id,name,slug,short_description,price_ngn,compare_at_price_ngn,images,is_subscription,subscription_interval,stock,category_id,deposit_percent")
        .eq("is_active", true)
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });
      if (cat !== "all") {
        const c = categories.find((c) => c.slug === cat);
        if (c) q = q.eq("category_id", c.id);
      }
      const { data, error } = await q;
      if (error) throw error;
      return data;
    },
    enabled: cat === "all" || categories.length > 0,
  });

  return (
    <div className="container-x py-10 md:py-14">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Security Hardware</p>
        <h1 className="mt-3 font-display text-3xl md:text-4xl font-bold">Shop cameras, NVRs, locks & monitoring plans</h1>
        <p className="mt-3 text-muted-foreground">
          Genuine hardware, expert installation, and 24/7 cloud monitoring. Pay a deposit online and settle the balance on delivery/install.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <CatChip active={cat === "all"} onClick={() => setCat("all")}>All</CatChip>
        {categories.map((c) => (
          <CatChip key={c.id} active={cat === c.slug} onClick={() => setCat(c.slug)}>
            {c.name}
          </CatChip>
        ))}
      </div>

      {isLoading ? (
        <div className="mt-10 text-sm text-muted-foreground">Loading products…</div>
      ) : products.length === 0 ? (
        <div className="mt-10 text-sm text-muted-foreground">No products in this category yet.</div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((p) => (
            <Link
              key={p.id}
              to="/shop/$slug"
              params={{ slug: p.slug }}
              className="group rounded-xl border border-border/60 bg-card/50 overflow-hidden hover:border-primary/50 transition"
            >
              <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/10 via-background to-accent/10 grid place-items-center overflow-hidden">
                {p.images?.[0] ? (
                  <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <Shield className="h-10 w-10 text-primary/40" />
                )}
                {p.is_subscription && (
                  <span className="absolute top-2 left-2 rounded-full bg-accent/90 px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
                    Subscription
                  </span>
                )}
                {p.compare_at_price_ngn && (
                  <span className="absolute top-2 right-2 rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                    Sale
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold group-hover:text-primary transition">{p.name}</h3>
                {p.short_description && (
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.short_description}</p>
                )}
                <div className="mt-3 flex items-baseline gap-2">
                  <Price ngn={p.price_ngn} className="text-base font-bold" />
                  {p.compare_at_price_ngn && (
                    <Price ngn={p.compare_at_price_ngn} className="text-xs text-muted-foreground line-through" />
                  )}
                  {p.is_subscription && <span className="text-xs text-muted-foreground">/ {p.subscription_interval}</span>}
                </div>
                {!p.is_subscription && p.deposit_percent < 100 && (
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {p.deposit_percent}% deposit available
                  </p>
                )}
                {!p.is_subscription && p.stock <= 0 && (
                  <p className="mt-1 text-[11px] text-destructive">Out of stock</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-14 rounded-xl border border-border/60 bg-card/40 p-6 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
        <div className="flex items-start gap-3">
          <Package className="h-6 w-6 text-accent shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold">Need installation or a custom quote?</h3>
            <p className="text-sm text-muted-foreground">Site survey, cabling & install available across Nigeria.</p>
          </div>
        </div>
        <Link to="/contact" className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90">
          Request a quote
        </Link>
      </div>
    </div>
  );
}

function CatChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
        active ? "border-primary bg-primary/10 text-primary" : "border-border/60 text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
