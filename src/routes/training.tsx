import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Check,
  ChevronDown,
  GraduationCap,
  Hammer,
  Layers,
  Megaphone,
  Monitor,
  PenTool,
  ShoppingBag,
  Sparkles,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Professional Training Programs — Web, Marketing & Security Skills | Webfortix" },
      {
        name: "description",
        content:
          "Online training in web design, web development, digital marketing, e-business and content creation — 100% remote and open to participants in all 10 of our African markets.",
      },
      {
        property: "og:title",
        content: "Webfortix Training — Practical Skills, Open to 10 African Countries",
      },
      {
        property: "og:description",
        content:
          "Project-based online courses. Enroll from Nigeria, Kenya, South Africa, Egypt, Ghana, Morocco, Rwanda, Tanzania, Uganda or Ivory Coast.",
      },
    ],
  }),
  component: TrainingPage,
});


type Program = {
  slug: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  pitch: string;
  duration: string;
  priceNGN: string;
  priceUSD: string;
  learn: string[];
  audience: string;
  outcome: string;
};

const PROGRAMS: Program[] = [
  {
    slug: "web-design-fundamentals",
    title: "Web Design Fundamentals",
    icon: PenTool,
    pitch: "Design clean, modern websites clients actually pay for.",
    duration: "6 weeks",
    priceNGN: "₦85,000",
    priceUSD: "$65",
    learn: [
      "Design principles: layout, type, color, hierarchy",
      "Figma from zero to production-ready mockups",
      "Responsive layouts for mobile, tablet and desktop",
      "Building a landing page brief from a real client",
      "Handing off designs to a developer (or building it yourself)",
      "Portfolio-ready case study documentation",
    ],
    audience:
      "Beginners, freelancers and career switchers who want to design sites people pay for — no prior experience needed.",
    outcome:
      "3 portfolio pieces, a Figma workflow you can reuse, and a Webfortix certificate of completion.",
  },
  {
    slug: "web-development-track",
    title: "Web Development Track",
    icon: Monitor,
    pitch: "Build and ship real websites with modern tools.",
    duration: "12 weeks",
    priceNGN: "₦180,000",
    priceUSD: "$135",
    learn: [
      "HTML, CSS and modern JavaScript foundations",
      "React and component-driven UI",
      "Working with APIs, forms and databases",
      "Deploying to production (hosting, domains, SSL)",
      "Git, version control and working in a team",
      "Shipping a full client-style project end to end",
    ],
    audience:
      "Aspiring frontend/full-stack developers who want a job, freelance income, or the skills to build their own product.",
    outcome:
      "A live, deployed project on your own domain, GitHub portfolio, and a Webfortix developer certificate.",
  },
  {
    slug: "digital-marketing-mastery",
    title: "Digital Marketing Mastery",
    icon: Megaphone,
    pitch: "Run campaigns that bring in leads, not just likes.",
    duration: "8 weeks",
    priceNGN: "₦120,000",
    priceUSD: "$90",
    learn: [
      "SEO fundamentals and on-page optimization",
      "Meta and Google Ads: setup, targeting, budgets",
      "Email marketing and lead nurture flows",
      "Analytics: GA4, pixel tracking and reporting",
      "Content strategy for LinkedIn, IG and TikTok",
      "Running a live mini-campaign with real spend",
    ],
    audience:
      "Marketers, small business owners and freelancers who want to actually generate leads and sales online.",
    outcome:
      "A live campaign case study, reporting template, and a Webfortix marketing certificate.",
  },
  {
    slug: "e-business-startup",
    title: "E-Business Startup Track",
    icon: ShoppingBag,
    pitch: "Launch an online business without guessing your way through it.",
    duration: "8 weeks",
    priceNGN: "₦110,000",
    priceUSD: "$85",
    learn: [
      "Picking a niche and validating demand quickly",
      "Setting up an e-commerce or service business online",
      "Payment gateways for Africa and international",
      "Suppliers, fulfilment and simple operations",
      "Customer acquisition on a small budget",
      "Basic bookkeeping, pricing and unit economics",
    ],
    audience:
      "Founders and side-hustlers who want a functioning online business — not a course collection.",
    outcome:
      "A launched store or service page, pricing model, and a Webfortix startup track certificate.",
  },
  {
    slug: "content-creation-blogging",
    title: "Content Creation & Blogging",
    icon: Sparkles,
    pitch: "Turn writing and content into a real income stream.",
    duration: "6 weeks",
    priceNGN: "₦75,000",
    priceUSD: "$55",
    learn: [
      "Finding a niche and writing for a real audience",
      "SEO writing: keyword research and structure",
      "Setting up a blog on WordPress or a modern stack",
      "Monetization: ads, affiliates, sponsorships, digital products",
      "Repurposing posts into short-form video and social",
      "Building an email list from day one",
    ],
    audience:
      "Writers, creators and marketers who want to build an audience and monetize their content.",
    outcome:
      "A published blog with 5 optimized posts and a Webfortix content creator certificate.",
  },
];

const ENROLL_HREF = (slug: string) => `/contact?enroll=${slug}`;
const BUNDLE_HREF = "/contact?enroll=all-tracks-bundle";

function TrainingPage() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 grid-lines opacity-30" aria-hidden />
        <div className="container-x relative pt-16 pb-14 md:pt-24 md:pb-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-primary">
              <GraduationCap className="h-4 w-4" /> Training
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Learn the digital skills that pay — trained by people who
              actually do this work.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Practical, online training in web design, web development,
              digital marketing, e-business, and content creation — built
              from real projects, not recycled theory.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <a href="#programs">
                  Browse programs <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#bundle">See the all-access bundle</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why train with us */}
      <section className="container-x py-16 md:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold sm:text-4xl">Why train with us</h2>
          <p className="mt-3 text-muted-foreground">
            Webfortix is a working technology and security studio. Every
            course is taught from projects we&apos;ve actually shipped.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Hammer,
              title: "Real-world experience",
              body: "Taught by practitioners who build and ship for clients every week — not full-time course sellers.",
            },
            {
              icon: Briefcase,
              title: "Practical over theoretical",
              body: "You write the code, run the campaigns, and launch the store. Assignments come from real briefs.",
            },
            {
              icon: Wallet,
              title: "Built for income",
              body: "Every track is designed to lead to freelance work, a job, or your own online business — not just a certificate.",
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

      {/* Programs */}
      <section id="programs" className="container-x py-16 md:py-20">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Programs
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Five focused tracks. Pick one, or take them all.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every track is 100% online, self-paced with live checkpoints,
              and ends with a portfolio-ready outcome.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p) => {
            const isOpen = openSlug === p.slug;
            return (
              <article
                key={p.slug}
                className="flex flex-col rounded-2xl border border-border/70 bg-surface/60 p-6 transition-colors hover:border-primary/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-border/70 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                    100% online
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {p.pitch}
                </p>

                <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground/70">
                      Duration
                    </dt>
                    <dd className="mt-0.5 font-medium">{p.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground/70">
                      Price
                    </dt>
                    <dd className="mt-0.5 font-medium">
                      {p.priceNGN}{" "}
                      <span className="text-muted-foreground">
                        / {p.priceUSD}
                      </span>
                    </dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={() => setOpenSlug(isOpen ? null : p.slug)}
                  aria-expanded={isOpen}
                  aria-controls={`prog-${p.slug}`}
                  className="mt-5 inline-flex items-center justify-between rounded-md border border-border/70 px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {isOpen ? "Hide details" : "View curriculum"}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`prog-${p.slug}`}
                    className="mt-4 space-y-4 rounded-lg border border-border/60 bg-background/40 p-4 text-sm"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                        What you&apos;ll learn
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {p.learn.map((l) => (
                          <li key={l} className="flex gap-2">
                            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                            <span className="text-muted-foreground">{l}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Who it&apos;s for
                      </p>
                      <p className="mt-1.5 text-muted-foreground">
                        {p.audience}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                        What you get
                      </p>
                      <p className="mt-1.5 text-muted-foreground">
                        {p.outcome}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex-1" />
                <Button
                  asChild
                  className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Link to="/contact" search={{ enroll: p.slug } as never}>
                    Enroll now
                  </Link>
                </Button>
                <a
                  href={ENROLL_HREF(p.slug)}
                  className="mt-2 text-center text-xs text-muted-foreground hover:text-foreground"
                >
                  Reserve your spot →
                </a>
              </article>
            );
          })}
        </div>
      </section>

      {/* Bundle */}
      <section id="bundle" className="container-x pb-20 md:pb-28">
        <div className="relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/15 via-surface/60 to-accent/10 p-8 md:p-12">
          <div className="absolute inset-0 grid-lines opacity-20" aria-hidden />
          <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                <Layers className="h-3.5 w-3.5" /> Best value — all 5 tracks
              </p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                The Full-Stack Career Bundle
              </h2>
              <p className="mt-3 text-muted-foreground md:text-lg">
                Get lifetime access to every Webfortix track — design,
                development, marketing, e-business and content — plus quarterly
                live Q&amp;A sessions with the Webfortix team.
              </p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {[
                  "All 5 programs, forever",
                  "New lessons added each quarter",
                  "Private student community",
                  "Priority feedback on your work",
                  "Bundle certificate on completion",
                  "Freelance & portfolio review",
                ].map((b) => (
                  <li key={b} className="flex gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border/70 bg-background/70 p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Bundle pricing
              </p>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-4xl font-bold">₦380,000</span>
                <span className="text-lg text-muted-foreground line-through">
                  ₦570,000
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                ~ $285 USD · Save over 33%
              </p>

              <Button
                asChild
                size="lg"
                className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <a href={BUNDLE_HREF}>Join the bundle</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="mt-2 w-full"
              >
                <a href={BUNDLE_HREF}>Reserve your spot</a>
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Payment plans available — mention on the enrollment form.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
