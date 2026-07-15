import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Briefcase, Globe2, Mail, MapPin, Rocket, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { site } from "@/lib/site-config";
import { CAREERS_LOCATION_LABEL } from "@/lib/careers-countries";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Join the Webfortix Team" },
      {
        name: "description",
        content:
          "Open roles at Webfortix across web design, development, digital marketing, and security & automation. Remote across Africa, real client work.",
      },
      { property: "og:title", content: "Careers at Webfortix — Build with us" },
      {
        property: "og:description",
        content:
          "Work on real client projects across web, marketing, and security. Remote-friendly roles across our priority African markets.",
      },
    ],
  }),
  component: CareersPage,
});

const APPLY_EMAIL = `mailto:${site.email}?subject=Application%20%E2%80%94%20Webfortix`;

function CareersPage() {
  const { data: roles = [], isLoading } = useQuery({
    queryKey: ["careers", "vacancies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("job_vacancies")
        .select("id,slug,title,department,employment_type,location,short_description,sort_order")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 grid-lines opacity-30" aria-hidden />
        <div className="container-x relative pt-16 pb-14 md:pt-24 md:pb-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-primary">
              <Briefcase className="h-4 w-4" /> Careers
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Build your career with us.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Join Webfortix and work on real client projects across web design, development,
              digital marketing, and home security & automation. Remote-friendly across our
              priority African markets.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" /> {CAREERS_LOCATION_LABEL}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <a href="#roles">See open roles <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={APPLY_EMAIL}><Mail className="mr-2 h-4 w-4" /> Send us your resume</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-16 md:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold sm:text-4xl">Why work with us</h2>
          <p className="mt-3 text-muted-foreground">
            A small, senior team. Real client work. Room to grow into what you're actually good at.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { icon: Rocket, title: "Real client projects", body: "You ship work that goes live — websites, campaigns, installations — not internal demos." },
            { icon: Users, title: "Room to grow", body: "Learn across disciplines. Take ownership early. Move into leads as the team expands." },
            { icon: Globe2, title: "Pan-African remote", body: "Fully remote across our priority markets. Field roles for security & automation are Lagos-based." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border/70 bg-surface/50 p-6">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="roles" className="container-x py-16 md:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Open positions</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Current openings</h2>
          <p className="mt-3 text-muted-foreground">
            Roles below are open now. Click any role to view details and apply.
          </p>
        </div>

        {isLoading ? (
          <div className="mt-10 text-muted-foreground">Loading roles…</div>
        ) : roles.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border/70 bg-surface/40 p-8 text-center md:p-12">
            <h3 className="text-xl font-semibold">No open roles right now</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              Check back soon — or email us and we'll keep you on file.
            </p>
            <Button asChild className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
              <a href={APPLY_EMAIL}><Mail className="mr-2 h-4 w-4" /> Email your resume</a>
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {roles.map((r) => (
              <article key={r.id} className="flex flex-col rounded-2xl border border-border/70 bg-surface/60 p-6 transition-colors hover:border-primary/50">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                    {r.department}
                  </span>
                  <span className="rounded-full border border-border/70 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {r.employment_type}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.short_description}</p>
                <p className="mt-3 inline-flex items-start gap-2 text-xs text-muted-foreground">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{r.location}</span>
                </p>
                <div className="mt-6 flex-1" />
                <Button asChild className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to="/careers/$slug" params={{ slug: r.slug }}>View role & apply</Link>
                </Button>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
