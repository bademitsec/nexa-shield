import { Link } from "@tanstack/react-router";
import { Shield, Mail, Phone, Instagram, Facebook, Twitter } from "lucide-react";
import { site, services } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-background/60">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-primary/15 text-primary ring-1 ring-primary/30">
                <Shield className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-bold">{site.name}</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              {site.description}
            </p>
            <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><Mail className="h-4 w-4" />{site.email}</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4" />{site.phone}</p>
              <p>{site.address}</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Services</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="hover:text-foreground">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/shop" className="hover:text-foreground">Shop</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
              <li><Link to="/auth" className="hover:text-foreground">Sign in</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Web · Marketing · Security</p>
        </div>
      </div>
    </footer>
  );
}
