import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Globe, Zap, Search, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site-config";

export const Route = createFileRoute("/services/web-design")({
  head: () => ({
    meta: [
      { title: "Web Design & Development in Africa — Webfortix" },
      {
        name: "description",
        content:
          "Custom websites, e-commerce and web apps built for speed, mobile, and Google. African-owned agency, fixed-scope quotes.",
      },
      { property: "og:title", content: "Web Design & Development — Webfortix" },
      {
        property: "og:description",
        content: "Fast, SEO-ready websites built for African businesses.",
      },
    ],
  }),
  component: WebDesignPage,
});

function WebDesignPage() {
  return (
    <ServiceLayout
      eyebrow="Web Design & Development"
      title="Websites that load fast and convert."
      lede="Custom-built marketing sites, e-commerce stores and web apps — designed for mobile, tuned for Google, delivered on time."
      features={[
        { icon: Zap, title: "Lightning fast", desc: "Optimized for 3G/4G — pages under 2s on mid-range Android." },
        { icon: Smartphone, title: "Mobile-first", desc: "Every layout designed for the phone first, desktop second." },
        { icon: Search, title: "SEO-ready", desc: "Semantic HTML, meta, sitemap and schema baked in." },
        { icon: Globe, title: "Own the platform", desc: "Your domain, your hosting, your data — no lock-in." },
      ]}
      includes={[
        "Discovery workshop & information architecture",
        "Custom UI design in Figma with revisions",
        "Front-end build (React / TanStack Start)",
        "CMS setup for blog & content pages",
        "Contact form + WhatsApp click-to-chat",
        "Basic on-page SEO + Google Search Console setup",
        "30 days post-launch support",
      ]}
      packages={[
        { name: "Landing Page", from: "₦450,000", desc: "One-page marketing site with contact form." },
        { name: "Business Website", from: "₦1,200,000", desc: "5–8 pages, blog, CMS, on-page SEO." },
        { name: "E-commerce / Web App", from: "Custom", desc: "Product catalog, payments, dashboards." },
      ]}
    />
  );
}

export type Feature = { icon: React.ComponentType<{ className?: string }>; title: string; desc: string };

export function ServiceLayout({
  eyebrow,
  title,
  lede,
  features,
  includes,
  packages,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  features: Feature[];
  includes: string[];
  packages: { name: string; from: string; desc: string }[];
}) {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-30" aria-hidden />
        <div className="container-x relative pt-16 pb-14 md:pt-24 md:pb-20">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              {eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              {title}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">{lede}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/contact">Get a quote <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x pb-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-surface/60 p-5">
              <f.icon className="h-5 w-5 text-primary" />
              <p className="mt-3 font-semibold">{f.title}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-3xl font-bold">What's included</h2>
            <p className="mt-3 text-muted-foreground">
              Fixed-scope engagements with clear deliverables and milestones.
            </p>
            <ul className="mt-6 space-y-3">
              {includes.map((i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-sm text-foreground/90">{i}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-surface/60 p-6">
            <h3 className="text-lg font-semibold">Starting from</h3>
            <div className="mt-4 space-y-3">
              {packages.map((p) => (
                <div key={p.name} className="rounded-lg border border-border/70 bg-background/40 p-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-primary text-sm font-mono">{p.from}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              ))}
            </div>
            <Button asChild className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/contact">Request a scoped quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
