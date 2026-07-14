import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Price } from "@/components/site/price";
import { useCart } from "@/lib/store";
import { site } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Shield, Minus, Plus, ShoppingCart, Check } from "lucide-react";

export const Route = createFileRoute("/shop/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — ${site.name} Shop` },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const router = useRouter();
  const cart = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ["shop", "product", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, product_categories(name,slug)")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();
      if (error) throw error;
      if (!data) throw notFound();
      return data;
    },
  });

  if (isLoading) return <div className="container-x py-16 text-sm text-muted-foreground">Loading…</div>;
  if (!product) return <div className="container-x py-16">Not found.</div>;

  const rawSpecs = (product.specs || {}) as Record<string, unknown>;
  const features = Array.isArray(rawSpecs.features) ? (rawSpecs.features as string[]) : [];
  const tech = (typeof rawSpecs.tech === "object" && rawSpecs.tech
    ? rawSpecs.tech
    : rawSpecs) as Record<string, string | number>;
  const useCase = typeof rawSpecs.use_case === "string" ? rawSpecs.use_case : null;
  const recFor = typeof rawSpecs.recommended_for === "string" ? rawSpecs.recommended_for : null;
  const hookLine = (typeof rawSpecs.hook_line === "string" ? rawSpecs.hook_line : null) ?? product.short_description;

  const techEntries = Object.entries(tech).filter(
    ([k, v]) => !["features", "use_case", "recommended_for", "hook_line", "image_brief", "price_usd", "tech"].includes(k) &&
      (typeof v === "string" || typeof v === "number")
  ) as [string, string | number][];

  const maxQty = product.is_subscription ? 1 : Math.max(0, product.stock);
  const outOfStock = !product.is_subscription && product.stock <= 0;

  const handleAdd = () => {
    cart.add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      priceNgn: Number(product.price_ngn),
      depositPercent: product.deposit_percent,
      image: product.images?.[0],
      quantity: qty,
      isSubscription: product.is_subscription,
      subscriptionInterval: product.subscription_interval,
      maxStock: maxQty,
    });
    setAdded(true);
    toast.success(`${product.name} added to cart`);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="container-x py-10 md:py-14">
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link to="/shop" className="hover:text-foreground">Shop</Link>
        {product.product_categories && (
          <>
            <span className="mx-2">/</span>
            <span>{product.product_categories.name}</span>
          </>
        )}
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-square rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/10 grid place-items-center overflow-hidden">
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-primary/40">
              <Shield className="h-16 w-16" />
              <span className="text-[10px] uppercase tracking-widest">Photo coming soon</span>
            </div>
          )}
        </div>

        <div>
          {recFor && (
            <span className="inline-block rounded-full border border-border/60 bg-background/70 px-2.5 py-0.5 text-[11px] font-semibold">
              Recommended for {recFor}
            </span>
          )}
          <h1 className="mt-3 font-display text-2xl md:text-3xl font-bold">{product.name}</h1>
          {hookLine && <p className="mt-2 text-muted-foreground">{hookLine}</p>}

          <div className="mt-5 flex items-baseline gap-3">
            <Price ngn={product.price_ngn} className="text-3xl font-bold" />
            {product.compare_at_price_ngn && (
              <Price ngn={product.compare_at_price_ngn} className="text-sm text-muted-foreground line-through" />
            )}
            {product.is_subscription && (
              <span className="text-sm text-muted-foreground">per {product.subscription_interval}</span>
            )}
          </div>




          {product.description && (
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
              {product.description}
            </p>
          )}

          {features.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs uppercase tracking-widest text-accent">What you get</h3>
              <ul className="mt-2 space-y-1.5">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {useCase && (
            <div className="mt-6 rounded-lg border border-border/60 bg-card/40 p-4">
              <h3 className="text-xs uppercase tracking-widest text-accent">Best used for</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{useCase}</p>
            </div>
          )}

          {techEntries.length > 0 && (
            <div className="mt-6 rounded-lg border border-border/60 bg-card/40 divide-y divide-border/60">
              {techEntries.map(([k, v]) => (
                <div key={k} className="flex justify-between px-4 py-2.5 text-sm">
                  <span className="capitalize text-muted-foreground">{k.replace(/_/g, " ")}</span>
                  <span className="font-medium text-right">{String(v)}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {!product.is_subscription && (
              <div className="inline-flex items-center rounded-md border border-border/60">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-10 w-10 place-items-center hover:bg-secondary" aria-label="Decrease">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <button type="button" onClick={() => setQty((q) => Math.min(maxQty, q + 1))} className="grid h-10 w-10 place-items-center hover:bg-secondary" aria-label="Increase">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            )}
            <Button size="lg" disabled={outOfStock} onClick={handleAdd} className="bg-accent text-accent-foreground hover:bg-accent/90">
              {added ? <Check className="h-4 w-4 mr-2" /> : <ShoppingCart className="h-4 w-4 mr-2" />}
              {outOfStock ? "Out of stock" : added ? "Added" : "Add to cart"}
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">Get a quote</Link>
            </Button>
          </div>

          {!product.is_subscription && (
            <p className="mt-3 text-xs text-muted-foreground">
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
