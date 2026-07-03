import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Shield, ShoppingCart, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { site } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { CurrencyToggle } from "@/components/site/currency-toggle";
import { useCart } from "@/lib/store";

const services = [
  { to: "/services/web-design", label: "Web Design" },
  { to: "/services/digital-marketing", label: "Digital Marketing" },
  { to: "/services/home-security", label: "Home Security" },
] as const;

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setSignedIn(!!session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary/15 text-primary ring-1 ring-primary/30">
            <Shield className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            {site.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <div className="relative group">
            <button
              className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-haspopup="menu"
            >
              Services <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="min-w-52 rounded-md border border-border/60 bg-popover p-1 shadow-lg">
                {services.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    className="block rounded-sm px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                    activeProps={{ className: "text-foreground bg-secondary" }}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-foreground bg-secondary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>


        <div className="hidden md:flex items-center gap-2">
          <CurrencyToggle />
          <Link
            to="/cart"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
            aria-label="Cart"
          >
            <ShoppingCart className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
                {count}
              </span>
            )}
          </Link>
          <Link
            to={signedIn ? "/account" : "/auth"}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {signedIn ? "Account" : "Sign in"}
          </Link>
          <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/contact">Get a quote</Link>
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-1">
          <Link
            to="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-secondary"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute top-1 right-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
                {count}
              </span>
            )}
          </Link>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-secondary"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <div className="container-x flex flex-col gap-1 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "text-foreground bg-secondary" }}
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between">
              <CurrencyToggle />
              <Link
                to={signedIn ? "/account" : "/auth"}
                className="text-sm text-muted-foreground"
                onClick={() => setOpen(false)}
              >
                {signedIn ? "Account" : "Sign in"}
              </Link>
            </div>
            <Button asChild className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/contact" onClick={() => setOpen(false)}>
                Get a quote
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
