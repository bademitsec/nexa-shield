import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Price } from "@/components/site/price";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useCart } from "@/lib/store";
import { site } from "@/lib/site-config";
import { Shield, Package, ShoppingCart, Search, Camera, Check } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: `Products & Security Hardware — ${site.name}` },
      { name: "description", content: "CCTV, NVRs, solar & 4G cameras, PTZ, video doorbells and smart-home automation. Real spec sheets, real install advice, real prices in NGN & USD." },
      { property: "og:title", content: `Security Hardware Shop — ${site.name}` },
      { property: "og:description", content: "CCTV, NVRs, solar & site cameras, PTZ, video doorbells and smart-home automation — with expert install across Africa." },
    ],
  }),
  component: ShopPage,
});

type ProductRow = {
  id: string; name: string; slug: string; short_description: string | null;
  description: string | null;
  price_ngn: number; compare_at_price_ngn: number | null; images: string[];
  is_subscription: boolean; subscription_interval: string | null;
  stock: number; category_id: string | null; deposit_percent: number;
  specs: Record<string, unknown> | null;
};

function ShopPage() {
  const [cat, setCat] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState<ProductRow | null>(null);
  const cart = useCart();

  const { data: categories = [] } = useQuery({
    queryKey: ["shop", "categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_categories")
        .select("id,name,slug,description,display_order,banner_headline")
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
        .select("id,name,slug,short_description,description,price_ngn,compare_at_price_ngn,images,is_subscription,subscription_interval,stock,category_id,deposit_percent,specs")
        .eq("is_active", true)
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });
      if (cat !== "all") {
        const c = categories.find((c) => c.slug === cat);
        if (c) q = q.eq("category_id", c.id);
      }
      const { data, error } = await q;
      if (error) throw error;
      return data as unknown as ProductRow[];
    },
    enabled: cat === "all" || categories.length > 0,
  });

  const active = categories.find((c) => c.slug === cat) ?? null;
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      (p.short_description ?? "").toLowerCase().includes(q) ||
      String((p.specs as Record<string, unknown> | null)?.recommended_for ?? "").toLowerCase().includes(q)
    );
  }, [products, query]);

  const handleAdd = (e: React.MouseEvent, p: ProductRow) => {
    e.preventDefault();
    e.stopPropagation();
    if (!p.is_subscription && p.stock <= 0) return;
    cart.add({
      productId: p.id, slug: p.slug, name: p.name,
      priceNgn: Number(p.price_ngn), depositPercent: p.deposit_percent,
      image: p.images?.[0], quantity: 1,
      isSubscription: p.is_subscription, subscriptionInterval: p.subscription_interval,
      maxStock: p.is_subscription ? 1 : Math.max(0, p.stock),
    });
    toast.success(`${p.name} added to cart`);
  };

  return (
    <div className="container-x py-10 md:py-14">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Products</p>
        <h1 className="mt-3 font-display text-3xl md:text-4xl font-bold">
          Security hardware & smart-building gear
        </h1>
        <p className="mt-3 text-muted-foreground">
          CCTV, NVRs, solar & 4G cameras, PTZ, video doorbells and smart automation — spec'd, sold and installed by the same people. Prices in NGN with a USD toggle.
        </p>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          <CatChip active={cat === "all"} onClick={() => setCat("all")}>All</CatChip>
          {categories.map((c) => (
            <CatChip key={c.id} active={cat === c.slug} onClick={() => setCat(c.slug)}>
              {c.name}
            </CatChip>
          ))}
        </div>
        <div className="relative md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="pl-9"
          />
        </div>
      </div>

      {active && (
        <div className="mt-6 rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-card/60 to-accent/10 p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent">{active.name}</p>
          <h2 className="mt-2 font-display text-xl md:text-2xl font-bold">
            {active.banner_headline ?? active.name}
          </h2>
          {active.description && (
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{active.description}</p>
          )}
        </div>
      )}

      {isLoading ? (
        <div className="mt-10 text-sm text-muted-foreground">Loading products…</div>
      ) : filtered.length === 0 ? (
        <div className="mt-10 text-sm text-muted-foreground">
          {query ? `No products match "${query}".` : "No products in this category yet — check back soon."}
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => {
            const s = (p.specs ?? {}) as Record<string, unknown>;
            const rec = typeof s.recommended_for === "string" ? s.recommended_for : null;
            const hook = (typeof s.hook_line === "string" ? s.hook_line : null) ?? p.short_description;
            return (
              <Link
                key={p.id}
                to="/shop/$slug"
                params={{ slug: p.slug }}
                className="group flex flex-col rounded-xl border border-border/60 bg-card/50 overflow-hidden hover:border-primary/50 transition"
              >
                <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/10 via-background to-accent/10 grid place-items-center overflow-hidden">
                  {p.images?.[0] ? (
                    <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-primary/40">
                      <Camera className="h-10 w-10" />
                      <span className="text-[10px] uppercase tracking-widest">Photo coming soon</span>
                    </div>
                  )}
                  {rec && (
                    <span className="absolute top-2 left-2 rounded-full bg-background/90 backdrop-blur px-2 py-0.5 text-[10px] font-semibold text-foreground border border-border/60">
                      {rec}
                    </span>
                  )}
                  {p.compare_at_price_ngn && (
                    <span className="absolute top-2 right-2 rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                      Sale
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-semibold group-hover:text-primary transition">{p.name}</h3>
                  {hook && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{hook}</p>}
                  <div className="mt-3 flex items-baseline gap-2">
                    <Price ngn={p.price_ngn} className="text-base font-bold" />
                    {p.compare_at_price_ngn && (
                      <Price ngn={p.compare_at_price_ngn} className="text-xs text-muted-foreground line-through" />
                    )}
                    {p.is_subscription && (
                      <span className="text-xs text-muted-foreground">/ {p.subscription_interval}</span>
                    )}
                  </div>
                  <div className="mt-auto pt-4 flex gap-2">
                    <span className="inline-flex flex-1 items-center justify-center rounded-md border border-border/60 bg-background px-3 h-9 text-xs font-medium group-hover:border-primary/60 group-hover:text-primary transition">
                      View details
                    </span>
                    <Button
                      size="sm"
                      className="flex-1"
                      disabled={!p.is_subscription && p.stock <= 0}
                      onClick={(e) => handleAdd(e, p)}
                    >
                      <ShoppingCart className="mr-1 h-3.5 w-3.5" />
                      {p.is_subscription ? "Subscribe" : p.stock <= 0 ? "Out" : "Add"}
                    </Button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <div className="mt-14 rounded-xl border border-border/60 bg-card/40 p-6 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
        <div className="flex items-start gap-3">
          <Package className="h-6 w-6 text-accent shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold">Need installation or a custom quote?</h3>
            <p className="text-sm text-muted-foreground">Site survey, cabling & install available across Africa.</p>
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

// keep Shield referenced to avoid unused import churn if placeholder changes
void Shield;
