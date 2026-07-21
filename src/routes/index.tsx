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
  GraduationCap,
  Star,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/site/price";
import { site, services } from "@/lib/site-config";
import {
  siteStats,
  testimonials,
  featuredCases,
  trainingHighlights,
} from "@/lib/site-stats";

const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressCountry: "NG",
    addressRegion: "Nigeria",
  },
  areaServed: [
    { "@type": "City", name: "Lagos" },
    { "@type": "City", name: "Abuja" },
    { "@type": "City", name: "Port Harcourt" },
    { "@type": "Country", name: "Nigeria" },
    { "@type": "Place", name: "Africa" },
  ],
  sameAs: [site.social.instagram, site.social.x, site.social.facebook],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.name} — Web Design, Marketing, Security & Training in Africa` },
      {
        name: "description",
        content:
          "One partner for fast websites, digital marketing that ranks, professionally installed CCTV & smart-home security, and practical digital skills training — across Africa.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(LOCAL_BUSINESS_JSONLD),
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

type Pillar = {
  slug: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
};

function HomePage() {
  const pillars: Pillar[] = [
    ...services.map((s) => ({
      slug: s.slug,
      title: s.title,
      description: s.description,
      icon: pillarIcons[s.slug],
      href: `/services/${s.slug}`,
    })),
    {
      slug: "training",
      title: "Training & Skills",
      description:
        "Practical online training in web design, development, marketing, e-business and content — taught by working practitioners.",
      icon: GraduationCap,
      href: "/training",
    },
  ];

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
              Nigerian-owned · Serving homes & businesses Across Africa
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
              Build online.{" "}
              <span className="text-gradient-brand">Grow with data.</span>{" "}
              Secure what matters.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
              {site.name} is your one partner for high-performing websites,
              digital marketing that ranks, trusted CCTV, alarms and smart-home
              security solutions, and practical training that builds real digital
              skills — across Africa.
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
            <div className="mt-4 text-xs text-muted-foreground">
              Existing client?{" "}
              <Link to="/auth" className="text-primary hover:underline">
                Sign in to track your project →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Four pillars */}
      <section className="container-x py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Four services. One team.</h2>
          <p className="mt-3 text-muted-foreground">
            Whether you need traffic, conversions, peace of mind, or new skills — we handle it end to end.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <article
                key={p.slug}
                className="group relative overflow-hidden rounded-xl border border-border bg-surface/60 p-6 transition-colors hover:border-primary/40"
              >
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-opacity opacity-0 group-hover:opacity-100" aria-hidden />
                <div className="relative">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                  <Link
                    to={p.href}
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

      {/* Social proof — stats + testimonials + featured case studies */}
      <section className="container-x py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Star className="h-3.5 w-3.5" /> Social proof
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Trusted by clients across Africa</h2>
          <p className="mt-3 text-muted-foreground">
            A track record built one project — and one satisfied client — at a time.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {siteStats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-border bg-surface/60 p-6 text-center"
            >
              <p className="text-3xl font-bold text-primary sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-xl border border-border/70 bg-surface/50 p-5"
            >
              <Quote className="h-5 w-5 text-primary/70" aria-hidden />
              <blockquote className="mt-3 flex-1 text-sm text-foreground/90">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-4 flex items-center justify-between gap-3 border-t border-border/60 pt-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{t.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{t.role}</p>
                </div>
                <span className="shrink-0 rounded-full border border-border/70 bg-background/60 px-2 py-0.5 text-[10px] font-medium text-primary">
                  {t.tag}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Featured case studies */}
        <div className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h3 className="text-xl font-semibold sm:text-2xl">Featured case studies</h3>
            <Link
              to="/portfolio"
              className="text-sm font-medium text-primary hover:text-primary/80"
            >
              View all →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCases.map((c) => (
              <Link
                key={c.slug}
                to="/portfolio/$slug"
                params={{ slug: c.slug }}
                className="group overflow-hidden rounded-xl border border-border bg-surface/60 transition-colors hover:border-primary/40"
              >
                <div className="aspect-[4/3] overflow-hidden bg-background">
                  <img
                    src={c.cover}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-medium uppercase tracking-widest text-primary">
                    {c.tag}
                  </span>
                  <p className="mt-1 line-clamp-2 text-sm font-semibold">{c.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{c.client}</p>
                </div>
              </Link>
            ))}
          </div>
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
                  "Full payment at checkout — secured via Paystack",
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

      {/* Featured: Training */}
      <section className="container-x pb-16 md:pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-surface to-accent/10 p-8 md:p-14">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <GraduationCap className="h-3.5 w-3.5" />
                Featured: Training
              </span>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Learn the digital skills that pay.
              </h2>
              <p className="mt-3 text-muted-foreground">
                Five focused, project-based online tracks — taught by working
                Webfortix practitioners. Beginner-friendly, income-focused.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {[
                  "100% online with live checkpoints",
                  "Portfolio-ready outcomes on every track",
                  "Certificate of completion",
                  "Priority feedback from working practitioners",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to="/training">View training programs</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact" search={{ enroll: "training" } as never}>
                    Enroll now
                  </Link>
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {trainingHighlights.map((t) => (
                <div
                  key={t.slug}
                  className="flex items-start justify-between gap-4 rounded-xl border border-border/70 bg-background/40 p-4"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{t.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{t.pitch}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground/70">
                      From
                    </p>
                    <Price
                      ngn={t.priceNGN}
                      className="text-sm font-semibold text-primary"
                    />
                  </div>
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
            Tell us what you need — website, marketing, security, or training —
            and we'll get back within one business day with a scoped quote.
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
