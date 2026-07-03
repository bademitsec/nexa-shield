import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { ArrowRight, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  client: string | null;
  summary: string;
  cover_url: string | null;
  tags: string[];
  featured: boolean;
  completed_at: string | null;
};

const listOpts = queryOptions({
  queryKey: ["portfolio", "list"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select("id,slug,title,category,client,summary,cover_url,tags,featured,completed_at")
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
      { title: "Portfolio & Case Studies — Nexashield" },
      {
        name: "description",
        content:
          "Selected work from Nexashield: home security installs, marketing campaigns and websites for Nigerian brands.",
      },
      { property: "og:title", content: "Portfolio — Nexashield" },
      { property: "og:description", content: "Case studies from Nexashield across security, marketing & web." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(listOpts),
  component: PortfolioPage,
  errorComponent: ({ error, reset }) => (
    <div className="container-x py-20 text-center">
      <p className="text-destructive">Could not load portfolio.</p>
      <button onClick={reset} className="mt-3 text-sm underline">Try again</button>
      <p className="mt-2 text-xs text-muted-foreground">{error.message}</p>
    </div>
  ),
  notFoundComponent: () => notFound(),
});

function PortfolioPage() {
  const { data: items } = useSuspenseQuery(listOpts);
  return (
    <section className="container-x py-16 md:py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">Portfolio</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Selected work.</h1>
        <p className="mt-4 text-muted-foreground">
          A snapshot of security installs, marketing campaigns and websites
          we've shipped for Nigerian homes and businesses.
        </p>
      </div>

      {items.length === 0 ? (
        <p className="mt-12 text-muted-foreground">No projects yet — check back soon.</p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Link
              key={p.id}
              to="/portfolio/$slug"
              params={{ slug: p.slug }}
              className="group overflow-hidden rounded-xl border border-border bg-surface/60 transition-colors hover:border-primary/40"
            >
              <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/15 via-surface to-accent/15">
                {p.cover_url ? (
                  <img
                    src={p.cover_url}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="grid h-full place-items-center text-xs uppercase tracking-widest text-primary/70">
                    {p.category}
                  </div>
                )}
                {p.featured && (
                  <span className="absolute left-3 top-3 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{p.category}</p>
                <h3 className="mt-2 font-semibold group-hover:text-primary">{p.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.summary}</p>
                <div className="mt-4 flex items-center gap-1.5 text-sm text-primary">
                  View case study <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export { ExternalLink };
