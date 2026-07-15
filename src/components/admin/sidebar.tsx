import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, ShoppingCart, Package, Users, FileText,
  Repeat, Newspaper, Mail, Settings as SettingsIcon, MessageSquare, Briefcase,
} from "lucide-react";

const items: Array<{ to: string; label: string; icon: React.ElementType; exact?: boolean }> = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/quotes", label: "Quotes", icon: MessageSquare },
  { to: "/admin/applications", label: "Applications", icon: Briefcase },
  { to: "/admin/subscriptions", label: "Subscriptions", icon: Repeat },
  { to: "/admin/content", label: "Content", icon: Newspaper },
  { to: "/admin/campaigns", label: "Campaigns", icon: Mail },
  { to: "/admin/settings", label: "Settings", icon: SettingsIcon },
];

export function AdminSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="w-full lg:w-56 shrink-0 lg:sticky lg:top-16 lg:self-start">
      <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible p-2 lg:p-0">
        {items.map((it) => {
          const active = it.exact ? path === it.to : path === it.to || path.startsWith(it.to + "/");
          return (
            <Link key={it.to} to={it.to as never}
              className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm whitespace-nowrap transition ${
                active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}>
              <it.icon className="h-4 w-4" /> <span className="hidden sm:inline">{it.label}</span>
              <span className="sm:hidden">{it.label.slice(0,3)}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function AdminHeader({ title, actions }: { title: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h1 className="font-display text-2xl font-bold">{title}</h1>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
