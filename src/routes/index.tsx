import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Globe,
  LineChart,
  ShieldCheck,
  Sparkles,
  Camera,
  Lock,
  Cloud,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { site, services } from "@/lib/site-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.name} — Web Design, Marketing & Home Security in Africa` },
      {
        name: "description",
        content:
          "One partner for fast websites, digital marketing that ranks, and professionally installed CCTV, alarms & smart-home security across Africa.",
      },
    ],
  }),
  component: HomePage,
});

const pillarIcons = {
  "web-design": Globe,
  "digital-marketing": LineChart,
  "home-security": ShieldCheck,
} as const;

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,oklch(0.78_0.15_200/0.18),transparent_70%)]" aria-hidden />
        <div className="container-x relative pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Serving homes & businesses Across Africa
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
              Build online.{" "}
              <span className="text-gradient-brand">Grow with data.</span>{" "}
              Secure what matters.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
              {site.name} is your one partner for high-performing websites,
              digital marketing that ranks, and professionally installed CCTV,
              alarms and smart-home security across Africa.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/contact">
                  Request a free quote <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/shop">Shop security hardware</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="container-x py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Three services. One team.</h2>
          <p className="mt-3 text-muted-foreground">
            Whether you need traffic, conversions, or peace of mind — we handle it end to end.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {services.map((s) => {
            const Icon = pillarIcons[s.slug];
            return (
              <article
                key={s.slug}
                className="group relative overflow-hidden rounded-xl border border-border bg-surface/60 p-6 transition-colors hover:border-primary/40"
              >
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-opacity opacity-0 group-hover:opacity-100" aria-hidden />
                <div className="relative">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                  <Link
                    to={`/services/${s.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
                  >
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Security highlight strip */}
      <section className="container-x py-16 md:py-24">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-2 p-8 md:p-14">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                <ShieldCheck className="h-3.5 w-3.5" />
                Featured: Home Security
              </span>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Watch your home from anywhere. Sleep easy.
              </h2>
              <p className="mt-3 text-muted-foreground">
                Professionally installed IP cameras, NVRs, alarms and smart
                locks — with 24/7 cloud monitoring plans starting from
                ₦15,000/month.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {[
                  "Free on-site survey in Lagos, Abuja & Port Harcourt",
                  "Pay 60% deposit, balance on install",
                  "Genuine hardware — 12-month warranty",
                  "Mobile app alerts & cloud recording",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to="/contact">Request site survey</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/services/home-security">See what's included</Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Camera, title: "IP Cameras & NVRs", desc: "2K/4K coverage, night vision" },
                { icon: Lock, title: "Smart Locks", desc: "PIN, RFID, app unlock" },
                { icon: Cloud, title: "Cloud Monitoring", desc: "24/7 recording & alerts" },
                { icon: ShieldCheck, title: "Alarm Systems", desc: "Motion + door sensors" },
              ].map((f) => (
                <div key={f.title} className="rounded-xl border border-border/70 bg-background/40 p-5">
                  <f.icon className="h-5 w-5 text-primary" />
                  <p className="mt-3 text-sm font-semibold">{f.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x pb-24">
        <div className="rounded-2xl border border-border bg-surface/60 p-8 text-center md:p-14">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to get started?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Tell us what you need — website, marketing, or security — and we'll
            get back within one business day with a scoped quote.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/contact">Get a quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/shop">Browse the shop</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
