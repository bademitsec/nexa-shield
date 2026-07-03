import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

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
  completed_at: string | null;
};

const projectOpts = (slug: string) =>
  queryOptions({
    queryKey: ["portfolio", "detail", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("id,slug,title,category,client,summary,content,cover_url,gallery,tags,completed_at")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      if (!data) throw notFound();
      return data as Project;
    },
  });

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ context, params }) => context.queryClient.ensureQueryData(projectOpts(params.slug)),
  head: ({ loaderData }) => {
    const p = loaderData as Project | undefined;
    if (!p) {
      return {
        meta: [
          { title: "Case study not found — Nexashield" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    return {
      meta: [
        { title: `${p.title} — Nexashield` },
        { name: "description", content: p.summary },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.summary },
        ...(p.cover_url ? [{ property: "og:image", content: p.cover_url }] : []),
      ],
    };
  },
  component: ProjectDetail,
  notFoundComponent: ProjectNotFound,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="container-x py-20 text-center">
        <p className="text-destructive">Could not load this case study.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-3 text-sm underline"
        >
          Try again
        </button>
        <p className="mt-2 text-xs text-muted-foreground">{error.message}</p>
      </div>
    );
  },
});

function ProjectNotFound() {
  return (
    <div className="container-x py-24 text-center">
      <h1 className="text-3xl font-bold">Case study not found</h1>
      <p className="mt-3 text-muted-foreground">This project may have been unpublished.</p>
      <Button asChild className="mt-6"><Link to="/portfolio">Back to portfolio</Link></Button>
    </div>
  );
}

function ProjectDetail() {
  const { slug } = Route.useParams();
  const { data: p } = useSuspenseQuery(projectOpts(slug));

  return (
    <article className="container-x py-14">
      <Link to="/portfolio" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All work
      </Link>

      <header className="mt-6 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">{p.category}</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{p.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{p.summary}</p>
        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {p.client && <span>Client: <span className="text-foreground">{p.client}</span></span>}
          {p.completed_at && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(p.completed_at).toLocaleDateString("en-NG", { month: "long", year: "numeric" })}
            </span>
          )}
        </div>
      </header>

      {p.cover_url && (
        <img
          src={p.cover_url}
          alt={p.title}
          className="mt-10 aspect-[16/9] w-full rounded-2xl border border-border object-cover"
        />
      )}

      {p.content && (
        <div className="prose prose-invert mx-auto mt-10 max-w-3xl whitespace-pre-line text-foreground/90">
          {p.content}
        </div>
      )}

      {p.gallery?.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {p.gallery.map((src, i) => (
            <img key={i} src={src} alt="" className="aspect-video w-full rounded-xl border border-border object-cover" loading="lazy" />
          ))}
        </div>
      )}

      {p.tags?.length > 0 && (
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center gap-2">
          <Tag className="h-3.5 w-3.5 text-muted-foreground" />
          {p.tags.map((t) => (
            <span key={t} className="rounded-full border border-border/70 bg-surface px-2.5 py-1 text-xs text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-border bg-surface/60 p-6 text-center">
        <h2 className="text-xl font-semibold">Want something similar?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Tell us about your project and we'll come back with a scoped quote.</p>
        <Button asChild className="mt-5 bg-accent text-accent-foreground hover:bg-accent/90">
          <Link to="/contact">Request a quote</Link>
        </Button>
      </div>
    </article>
  );
}
