import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { ArrowRight, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_url: string | null;
  tags: string[];
  author_name: string | null;
  published_at: string | null;
  reading_minutes: number | null;
};

const listOpts = queryOptions({
  queryKey: ["blog", "list"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id,slug,title,excerpt,cover_url,tags,author_name,published_at,reading_minutes")
      .eq("published", true)
      .order("published_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as Post[];
  },
  staleTime: 60_000,
});

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Webfortix" },
      {
        name: "description",
        content:
          "Guides on home security, digital marketing and web performance for African businesses and homeowners.",
      },
      { property: "og:title", content: "Webfortix Blog" },
      { property: "og:description", content: "Guides on security, marketing & web for African businesses." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(listOpts),
  component: BlogPage,
});

function BlogPage() {
  const { data: posts } = useSuspenseQuery(listOpts);
  return (
    <section className="container-x py-16 md:py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">Blog</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Guides & insights.</h1>
        <p className="mt-4 text-muted-foreground">
          Practical writing on security, marketing and web — from our team to yours.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="mt-12 text-muted-foreground">No posts yet — new writing coming soon.</p>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.id}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group overflow-hidden rounded-xl border border-border bg-surface/60 transition-colors hover:border-primary/40"
            >
              <div className="relative aspect-[16/9] bg-gradient-to-br from-primary/15 via-surface to-accent/15">
                {p.cover_url && (
                  <img src={p.cover_url} alt={p.title} className="h-full w-full object-cover" loading="lazy" />
                )}
              </div>
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  {p.published_at && (
                    <span>{new Date(p.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                  )}
                  {p.reading_minutes && (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {p.reading_minutes} min read
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-semibold group-hover:text-primary">{p.title}</h3>
                {p.excerpt && (
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                )}
                <div className="mt-4 flex items-center gap-1.5 text-sm text-primary">
                  Read article <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
