import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_url: string | null;
  tags: string[];
  author_name: string | null;
  published_at: string | null;
  reading_minutes: number | null;
};

const postOpts = (slug: string) =>
  queryOptions({
    queryKey: ["blog", "detail", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id,slug,title,excerpt,content,cover_url,tags,author_name,published_at,reading_minutes")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      if (!data) throw notFound();
      return data as Post;
    },
  });

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ context, params }) => context.queryClient.ensureQueryData(postOpts(params.slug)),
  head: ({ loaderData }) => {
    const p = loaderData as Post | undefined;
    if (!p) {
      return { meta: [{ title: "Post not found — Webfortix" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `${p.title} — Webfortix` },
        { name: "description", content: p.excerpt || p.title },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt || p.title },
        { property: "og:type", content: "article" },
        ...(p.cover_url ? [{ property: "og:image", content: p.cover_url }] : []),
      ],
    };
  },
  component: PostDetail,
  notFoundComponent: () => (
    <div className="container-x py-24 text-center">
      <h1 className="text-3xl font-bold">Post not found</h1>
      <Button asChild className="mt-6"><Link to="/blog">Back to blog</Link></Button>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="container-x py-20 text-center">
        <p className="text-destructive">Could not load this post.</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-3 text-sm underline">Try again</button>
        <p className="mt-2 text-xs text-muted-foreground">{error.message}</p>
      </div>
    );
  },
});

function PostDetail() {
  const { slug } = Route.useParams();
  const { data: p } = useSuspenseQuery(postOpts(slug));

  return (
    <article className="container-x py-14">
      <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All posts
      </Link>

      <header className="mx-auto mt-6 max-w-3xl">
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{p.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {p.author_name && <span>{p.author_name}</span>}
          {p.published_at && (
            <span>{new Date(p.published_at).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}</span>
          )}
          {p.reading_minutes && (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {p.reading_minutes} min read
            </span>
          )}
        </div>
      </header>

      {p.cover_url && (
        <img src={p.cover_url} alt={p.title} className="mx-auto mt-10 aspect-[16/9] w-full max-w-4xl rounded-2xl border border-border object-cover" />
      )}

      <div className="prose prose-invert mx-auto mt-10 max-w-3xl whitespace-pre-line text-foreground/90">
        {p.content}
      </div>

      <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-border bg-surface/60 p-6 text-center">
        <h2 className="text-xl font-semibold">Need help with your project?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Get in touch and we'll come back with a scoped quote.</p>
        <Button asChild className="mt-5 bg-accent text-accent-foreground hover:bg-accent/90">
          <Link to="/contact">Contact us</Link>
        </Button>
      </div>
    </article>
  );
}
