import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/store";
import { Price } from "@/components/site/price";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site-config";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: `Cart — ${site.name}` }] }),
  component: CartPage,
});

function CartPage() {
  const { items, remove, setQty, subtotalNgn } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-x py-16 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/40" />
        <h1 className="mt-4 font-display text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">Browse our security hardware and monitoring plans.</p>
        <Button asChild className="mt-6"><Link to="/shop">Shop products</Link></Button>
      </div>
    );
  }

  return (
    <div className="container-x py-10 md:py-14">
      <h1 className="font-display text-2xl md:text-3xl font-bold">Cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {items.map((i) => (
            <div key={i.productId} className="flex gap-4 rounded-lg border border-border/60 bg-card/40 p-4">
              <div className="h-20 w-20 rounded-md bg-gradient-to-br from-primary/10 to-accent/10 grid place-items-center overflow-hidden shrink-0">
                {i.image ? <img src={i.image} alt="" className="h-full w-full object-cover" /> : null}
              </div>
              <div className="flex-1 min-w-0">
                <Link to="/shop/$slug" params={{ slug: i.slug }} className="font-medium hover:text-primary line-clamp-2">
                  {i.name}
                </Link>
                <div className="mt-1 text-xs text-muted-foreground">
                  <Price ngn={i.priceNgn} /> each
                  {i.isSubscription && <span> · {i.subscriptionInterval}</span>}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  {!i.isSubscription && (
                    <div className="inline-flex items-center rounded-md border border-border/60">
                      <button onClick={() => setQty(i.productId, i.quantity - 1)} className="grid h-8 w-8 place-items-center hover:bg-secondary"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="w-8 text-center text-sm">{i.quantity}</span>
                      <button onClick={() => setQty(i.productId, i.quantity + 1)} className="grid h-8 w-8 place-items-center hover:bg-secondary"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                  )}
                  <button onClick={() => remove(i.productId)} className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </div>
              <div className="text-right shrink-0">
                <Price ngn={i.priceNgn * i.quantity} className="font-semibold" />
              </div>
            </div>
          ))}
        </div>

        <aside className="rounded-xl border border-border/60 bg-card/50 p-6 h-fit sticky top-20">
          <h2 className="font-semibold">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><Price ngn={subtotalNgn} /></div>
            <div className="text-xs text-muted-foreground">Shipping calculated at checkout.</div>

          </div>
          <Button asChild size="lg" className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/checkout">Proceed to checkout</Link>
          </Button>
          <Button asChild variant="outline" className="mt-2 w-full">
            <Link to="/shop">Continue shopping</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
