import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  Globe2,
  Mail,
  Rocket,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site-config";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Join the Webfortix Team" },
      {
        name: "description",
        content:
          "Open roles at Webfortix across web design, development, digital marketing, and security & automation. Remote-friendly, real client work.",
      },
      {
        property: "og:title",
        content: "Careers at Webfortix — Build with us",
      },
      {
        property: "og:description",
        content:
          "Work on real client projects across web, marketing, and security. Remote-friendly roles for practitioners who want to ship.",
      },
    ],
  }),
  component: CareersPage,
});

type Role = {
  slug: string;
  title: string;
  department:
    | "Web Design"
    | "Web Development"
    | "Digital Marketing"
    | "Security & Automation"
    | "Content";
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  description: string;
};

// No open roles right now — leave empty to show the empty state.
// Add entries here as positions open.
const OPEN_ROLES: Role[] = [];

const APPLY_HREF = (slug: string) => `/contact?apply=${slug}`;
const GENERAL_APPLY_HREF = "/contact?apply=general";
const APPLY_EMAIL = `mailto:${site.email}?subject=Application%20%E2%80%94%20Webfortix`;

function CareersPage() {
  return (
    <>
      {/* Hero */}
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
              Join Webfortix and work on real client projects across web
              design, development, digital marketing, and home security &amp;
              automation. Remote-friendly, practitioner-led, no busywork.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <a href="#roles">
                  See open roles <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#apply">Send a general application</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why work with us */}
      <section className="container-x py-16 md:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold sm:text-4xl">Why work with us</h2>
          <p className="mt-3 text-muted-foreground">
            A small, senior team. Real client work. Room to grow into what
            you&apos;re actually good at.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Rocket,
              title: "Real client projects",
              body: "You ship work that goes live — websites, campaigns, installations — not internal demos or make-work.",
            },
            {
              icon: Users,
              title: "Room to grow",
              body: "Learn across disciplines. Take ownership early. Move into leads as the team expands.",
            },
            {
              icon: Globe2,
              title: "Remote-friendly",
              body: "Most roles are fully remote across Africa. Field roles for security & automation are Lagos-based.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border/70 bg-surface/50 p-6"
            >
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open positions */}
      <section id="roles" className="container-x py-16 md:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Open positions
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Current openings
          </h2>
          <p className="mt-3 text-muted-foreground">
            Roles are updated as they open. Don&apos;t see a fit? Send a
            general application below and we&apos;ll keep you on file.
          </p>
        </div>

        {OPEN_ROLES.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border/70 bg-surface/40 p-8 text-center md:p-12">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
              <Briefcase className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-xl font-semibold">
              No open roles right now
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              Check back soon — or send a general application with your
              resume / portfolio and we&apos;ll reach out when something opens
              in your area.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <a href="#apply">Send a general application</a>
              </Button>
              <Button asChild variant="outline">
                <a href={APPLY_EMAIL}>
                  <Mail className="mr-2 h-4 w-4" /> Email your resume
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {OPEN_ROLES.map((r) => (
              <article
                key={r.slug}
                className="flex flex-col rounded-2xl border border-border/70 bg-surface/60 p-6 transition-colors hover:border-primary/50"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                    {r.department}
                  </span>
                  <span className="rounded-full border border-border/70 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {r.type}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {r.description}
                </p>
                <div className="mt-6 flex-1" />
                <Button
                  asChild
                  className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Link to="/contact" search={{ apply: r.slug } as never}>
                    Apply now
                  </Link>
                </Button>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Application CTA */}
      <section id="apply" className="container-x pb-20 md:pb-28">
        <div className="relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/15 via-surface/60 to-accent/10 p-8 md:p-12">
          <div className="absolute inset-0 grid-lines opacity-20" aria-hidden />
          <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Send a general application
              </h2>
              <p className="mt-3 text-muted-foreground md:text-lg">
                Tell us your name, the role or discipline you&apos;re
                interested in, a link to your portfolio or resume, and a short
                note about what you want to work on. We keep every application
                on file and reach out when a matching role opens.
              </p>
              <ul className="mt-5 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                <li>• Your name and location</li>
                <li>• Role / discipline you&apos;re applying for</li>
                <li>• Portfolio, GitHub, or resume link</li>
                <li>• Short message about your work</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border/70 bg-background/70 p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Apply
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Use the contact form and we&apos;ll route it to the right
                person, or email us directly.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-5 w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <a href={GENERAL_APPLY_HREF}>Start application</a>
              </Button>
              <Button asChild variant="outline" className="mt-2 w-full">
                <a href={APPLY_EMAIL}>
                  <Mail className="mr-2 h-4 w-4" /> {site.email}
                </a>
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Looking for paid training instead?{" "}
                <Link to="/training" className="text-primary hover:underline">
                  See our training programs →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
