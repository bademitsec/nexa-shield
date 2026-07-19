import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Search,
  Wrench,
  LineChart,
  MessageSquareQuote,
  BadgeCheck,
  Calendar,
  Tag,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  client: string | null;
  summary: string;
  content: string | null;
  cover_url: string | null;
  gallery: string[];
  tags: string[];
  featured: boolean;
  completed_at: string | null;
};

const listOpts = queryOptions({
  queryKey: ["portfolio", "list"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select(
        "id,slug,title,category,client,summary,content,cover_url,gallery,tags,featured,completed_at",
      )
      .eq("published", true)
      .order("featured", { ascending: false })
      .order("sort_order", { ascending: true })
      .order("completed_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as Project[];
  },
  staleTime: 60_000,
});

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Case Studies & Selected Work — Webfortix" },
      {
        name: "description",
        content:
          "Real projects from Webfortix: web builds, marketing campaigns and home security installs — with measurable outcomes for African clients.",
      },
      { property: "og:title", content: "Case Studies — Webfortix" },
      {
        property: "og:description",
        content:
          "Problem, solution, result. Selected client work across web, marketing and security.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(listOpts),
  component: PortfolioPage,
  errorComponent: ({ error, reset }) => (
    <div className="container-x py-20 text-center">
      <p className="text-destructive">Could not load portfolio.</p>
      <button onClick={reset} className="mt-3 text-sm underline">
        Try again
      </button>
      <p className="mt-2 text-xs text-muted-foreground">{error.message}</p>
    </div>
  ),
  notFoundComponent: () => notFound(),
});

/* ---------- helpers to derive case-study fields from existing DB shape ---------- */

// Tags convention (optional, backwards compatible):
//   "problem: xxx", "solution: xxx", "result: 42% more leads",
//   "testimonial: quote — author", "partner: Camcloud", "cert: CCTV Cert."
function pickTag(tags: string[] | null | undefined, key: string) {
  const prefix = `${key}:`;
  const match = (tags ?? []).find(
    (t) => t.toLowerCase().startsWith(prefix.toLowerCase()),
  );
  return match ? match.slice(prefix.length).trim() : null;
}
function pickAllTags(tags: string[] | null | undefined, key: string) {
  const prefix = `${key}:`;
  return (tags ?? [])
    .filter((t) => t.toLowerCase().startsWith(prefix.toLowerCase()))
    .map((t) => t.slice(prefix.length).trim());
}

const SERVICE_GROUPS: {
  key: string;
  label: string;
  match: (cat: string) => boolean;
  icon: typeof ShieldCheck;
  cta: { label: string; to: string };
}[] = [
  {
    key: "web",
    label: "Web design & development",
    match: (c) => /web|site|app|dev/i.test(c),
    icon: Wrench,
    cta: { label: "Get a website quote", to: "/contact" },
  },
  {
    key: "marketing",
    label: "Digital marketing",
    match: (c) => /market|seo|ads|social|content/i.test(c),
    icon: LineChart,
    cta: { label: "Get a marketing quote", to: "/contact" },
  },
  {
    key: "security",
    label: "Home security & automation",
    match: (c) => /security|cctv|alarm|smart|automation/i.test(c),
    icon: ShieldCheck,
    cta: { label: "Get an installation quote", to: "/contact" },
  },
];

function groupProject(cat: string) {
  return (
    SERVICE_GROUPS.find((g) => g.match(cat ?? "")) ?? {
      key: "other",
      label: "Other work",
      icon: BadgeCheck,
      cta: { label: "Get a quote", to: "/contact" },
    }
  );
}

/* ---------- page ---------- */

function PortfolioPage() {
  const { data: items } = useSuspenseQuery(listOpts);
  const [selected, setSelected] = useState<Project | null>(null);

  // Featured first, then top 4 as headline case studies.
  const headline = items.slice(0, 4);

  const grouped = SERVICE_GROUPS.map((g) => ({
    ...g,
    items: items.filter((p) => g.match(p.category ?? "")),
  })).filter((g) => g.items.length > 0);

  // Collect partners / certifications across all projects for the trust bar.
  const partners = Array.from(
    new Set(items.flatMap((p) => pickAllTags(p.tags, "partner"))),
  );
  const certs = Array.from(
    new Set(items.flatMap((p) => pickAllTags(p.tags, "cert"))),
  );

  return (
    <>
      {/* Hero */}
      <section className="container-x pt-16 md:pt-20">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Case studies
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
            Real projects. Measurable outcomes.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Selected work across web, marketing, and security — each with the
            brief we started from, what we shipped, and the result the client
            can point to.
          </p>
        </div>

        {(partners.length > 0 || certs.length > 0) && (
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-border/70 bg-surface/60 px-5 py-4 text-sm">
            {certs.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Certified:</span>
                {certs.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-border/70 px-2.5 py-0.5 text-xs"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}
            {partners.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground">Partners:</span>
                {partners.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-border/70 px-2.5 py-0.5 text-xs"
                  >
                    {p}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* How we work */}
      <section className="container-x mt-14">
        <div className="grid gap-4 rounded-2xl border border-border bg-surface/40 p-6 md:grid-cols-3 md:p-8">
          <Step
            n="01"
            icon={Search}
            title="Scope"
            body="30-minute call. We map the problem, budget, and success metric before we quote."
          />
          <Step
            n="02"
            icon={Wrench}
            title="Build"
            body="You get one point of contact and a weekly written update. No black boxes."
          />
          <Step
            n="03"
            icon={LineChart}
            title="Measure"
            body="We report the outcome against the metric we agreed on — traffic, leads, uptime, incidents avoided."
          />
        </div>
      </section>

      {/* Headline case studies */}
      {headline.length > 0 && (
        <section className="container-x mt-16">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Headline case studies
            </h2>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Top {headline.length}
            </span>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {headline.map((p) => (
              <CaseStudyCard key={p.id} p={p} variant="headline" onOpen={setSelected} />
            ))}
          </div>
        </section>
      )}

      {/* Grouped by service line */}
      {grouped.map((g) => (
        <section key={g.key} className="container-x mt-16">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface">
                <g.icon className="h-4 w-4 text-primary" />
              </span>
              <h2 className="text-2xl font-semibold sm:text-3xl">{g.label}</h2>
            </div>
            <Link
              to="/contact"
              className="hidden text-sm text-primary hover:underline sm:inline-flex"
            >
              {g.cta.label} →
            </Link>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {g.items.map((p) => (
              <CaseStudyCard key={p.id} p={p} variant="grouped" onOpen={setSelected} />
            ))}
          </div>
        </section>
      ))}

      {items.length === 0 && (
        <div className="container-x mt-12">
          <p className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
            Case studies are being loaded in. In the meantime, ask us for
            references directly.
          </p>
        </div>
      )}

      {/* Closing CTA */}
      <section className="container-x mt-20 mb-16">
        <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface via-surface to-primary/10 p-8 md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Have a project with a real deadline?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Send a short brief. You'll get a scoped reply within one business
              day — not a template.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
              >
                Request a quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services/web-design"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm hover:border-primary/50"
              >
                See services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- components ---------- */

function Step({
  n,
  icon: Icon,
  title,
  body,
}: {
  n: string;
  icon: typeof Search;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <span className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-background">
          <Icon className="h-4 w-4 text-primary" />
        </span>
        <span className="mt-2 font-mono text-[10px] tracking-widest text-muted-foreground">
          {n}
        </span>
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}

function CaseStudyCard({
  p,
  variant,
}: {
  p: Project;
  variant: "headline" | "grouped";
}) {
  const problem = pickTag(p.tags, "problem");
  const solution = pickTag(p.tags, "solution");
  const result = pickTag(p.tags, "result");
  const testimonial = pickTag(p.tags, "testimonial");
  const group = groupProject(p.category ?? "");

  const isHeadline = variant === "headline";

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-xl border border-border bg-surface/60 transition-colors hover:border-primary/40 ${
        isHeadline ? "" : ""
      }`}
    >
      <Link
        to="/portfolio/$slug"
        params={{ slug: p.slug }}
        className="relative block aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/15 via-surface to-accent/15"
      >
        {p.cover_url ? (
          <img
            src={p.cover_url}
            alt={p.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform group-hover:scale-[1.03]"
          />
        ) : (
          <div className="grid h-full place-items-center text-xs uppercase tracking-widest text-primary/70">
            {p.category}
          </div>
        )}
        {result && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground shadow">
            {result}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
          <span>{p.category}</span>
          {p.client && (
            <>
              <span aria-hidden>·</span>
              <span className="text-foreground/80 normal-case tracking-normal">
                {p.client}
              </span>
            </>
          )}
        </div>

        <h3 className="mt-2 text-lg font-semibold group-hover:text-primary">
          <Link to="/portfolio/$slug" params={{ slug: p.slug }}>
            {p.title}
          </Link>
        </h3>

        {/* Problem / Solution / Result block. Falls back to summary if tags absent. */}
        {problem || solution ? (
          <dl className="mt-4 grid gap-3 text-sm">
            {problem && (
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Problem
                </dt>
                <dd className="mt-0.5 text-foreground/90">{problem}</dd>
              </div>
            )}
            {solution && (
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Solution
                </dt>
                <dd className="mt-0.5 text-foreground/90">{solution}</dd>
              </div>
            )}
            {result && (
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Result
                </dt>
                <dd className="mt-0.5 font-medium text-foreground">{result}</dd>
              </div>
            )}
          </dl>
        ) : (
          <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
            {p.summary}
          </p>
        )}

        {testimonial && (
          <blockquote className="mt-4 rounded-lg border-l-2 border-primary/60 bg-background/40 p-3 text-sm italic text-foreground/85">
            <MessageSquareQuote className="mb-1 h-3.5 w-3.5 text-primary" />
            "{testimonial}"
          </blockquote>
        )}

        <div className="mt-5 flex items-center justify-between gap-3 pt-4">
          <Link
            to="/portfolio/$slug"
            params={{ slug: p.slug }}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Read case study →
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 rounded-md border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20"
          >
            {group.cta.label}
          </Link>
        </div>
      </div>
    </article>
  );
}
