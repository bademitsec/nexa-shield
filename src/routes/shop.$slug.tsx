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

  const specs = (product.specs || {}) as Record<string, string | number>;
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
            <Shield className="h-20 w-20 text-primary/30" />
          )}
        </div>

        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">{product.name}</h1>
          {product.short_description && (
            <p className="mt-2 text-muted-foreground">{product.short_description}</p>
          )}

          <div className="mt-5 flex items-baseline gap-3">
            <Price ngn={product.price_ngn} className="text-3xl font-bold" />
            {product.compare_at_price_ngn && (
              <Price ngn={product.compare_at_price_ngn} className="text-sm text-muted-foreground line-through" />
            )}
            {product.is_subscription && (
              <span className="text-sm text-muted-foreground">per {product.subscription_interval}</span>
            )}
          </div>

          {!product.is_subscription && product.deposit_percent < 100 && (
            <p className="mt-2 text-sm text-accent">
              Pay {product.deposit_percent}% deposit online, balance on delivery/install.
            </p>
          )}

          {product.description && (
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
              {product.description}
            </p>
          )}

          {Object.keys(specs).length > 0 && (
            <div className="mt-6 rounded-lg border border-border/60 bg-card/40 divide-y divide-border/60">
              {Object.entries(specs).map(([k, v]) => (
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
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-10 w-10 place-items-center hover:bg-secondary"
                  aria-label="Decrease"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                  className="grid h-10 w-10 place-items-center hover:bg-secondary"
                  aria-label="Increase"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            )}
            <Button
              size="lg"
              disabled={outOfStock}
              onClick={handleAdd}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {added ? <Check className="h-4 w-4 mr-2" /> : <ShoppingCart className="h-4 w-4 mr-2" />}
              {outOfStock ? "Out of stock" : added ? "Added" : "Add to cart"}
            </Button>
            <Button variant="outline" onClick={() => router.navigate({ to: "/cart" })}>
              View cart
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
