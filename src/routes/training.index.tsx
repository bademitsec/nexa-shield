import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Award,
  Briefcase,
  Check,
  Clock,
  GraduationCap,
  Hammer,
  Infinity as InfinityIcon,
  Loader2,
  Sparkles,
  UserCheck,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OPERATING_COUNTRY_NAMES } from "@/lib/countries";
import { listCourses, startTrainingEnrollment } from "@/lib/training.functions";

export const Route = createFileRoute("/training/")({
  head: () => ({
    meta: [
      { title: "Tech Training Courses in Africa — Web, Marketing & Security | Webfortix" },
      {
        name: "description",
        content:
          "Five flagship Webfortix courses: web development, digital marketing, cybersecurity, e-commerce and personal branding. Certificate, lifetime access and 1-on-1 mentor support.",
      },
      { property: "og:title", content: "Webfortix Training — Practical Courses, Real Outcomes" },
      {
        property: "og:description",
        content:
          "Short, intensive courses that end with a real project in your portfolio. Enroll and pay securely online.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async () => ({ courses: await listCourses() }),
  component: TrainingPage,
});

type Course = {
  id: string;
  slug: string;
  title: string;
  headline: string;
  duration_hours: number;
  price_ngn: number;
  anchor_price_ngn: number;
  badge: string | null;
  outcomes: unknown;
};

const naira = (n: number) => `₦${Number(n).toLocaleString("en-NG")}`;

const TRUST = [
  { icon: Award, label: "Certificate on completion" },
  { icon: InfinityIcon, label: "Lifetime access to materials" },
  { icon: UserCheck, label: "1-on-1 mentor support" },
];

const COUNTRY_OPTIONS = [...OPERATING_COUNTRY_NAMES, "Other"];

function TrainingPage() {
  const { courses } = Route.useLoaderData() as { courses: Course[] };
  const [active, setActive] = useState<Course | null>(null);

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
              Learn the digital skills that pay — trained by people who actually
              do this work.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Five focused, intensive courses in web development, digital
              marketing, cybersecurity, e-commerce and personal branding — built
              from real client projects, not recycled theory.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              100% remote delivery. Open to participants in Nigeria, Kenya,
              South Africa, Egypt, Ghana, Morocco, Rwanda, Tanzania, Uganda and
              Ivory Coast.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <a href="#courses">
                  See courses &amp; pricing <ArrowRight className="ml-2 h-4 w-4" />
                </a>
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
            Webfortix is a working technology and security studio. Every course
            is taught from projects we&apos;ve actually shipped.
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
              body: "Every course is designed to lead to freelance work, a job, or your own online business — not just a certificate.",
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

      {/* Courses & pricing */}
      <section id="courses" className="container-x pb-8 md:pb-12">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Courses &amp; pricing
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Five flagship courses. One real outcome each.
          </h2>
          <p className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-4 text-base text-foreground/90">
            This isn&apos;t just a course — it&apos;s mentorship, a real project
            in your portfolio, and lifetime access to materials that keep
            updating.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {courses.map((c) => {
            const featured = c.badge === "Most Popular";
            const outcomes = Array.isArray(c.outcomes) ? (c.outcomes as string[]) : [];
            return (
              <article
                key={c.id}
                className={[
                  "relative flex flex-col rounded-3xl border p-7 md:p-8 transition-colors",
                  featured
                    ? "border-primary/60 bg-gradient-to-br from-primary/12 via-surface/70 to-accent/10 shadow-lg shadow-primary/10 lg:col-span-2"
                    : "border-border/70 bg-surface/60 hover:border-primary/40",
                ].join(" ")}
              >
                {c.badge && (
                  <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full border border-primary/50 bg-background px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
                    <Sparkles className="h-3 w-3" /> {c.badge}
                  </span>
                )}

                <div className={featured ? "grid gap-8 lg:grid-cols-[1.3fr_1fr]" : ""}>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold md:text-2xl">{c.title}</h3>
                      <span className="inline-flex items-center gap-1 rounded-full border border-border/70 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                        <Clock className="h-3 w-3" /> {c.duration_hours}hrs
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground md:text-base">
                      {c.headline}
                    </p>

                    <ul className="mt-5 space-y-2.5">
                      {outcomes.map((o) => (
                        <li key={o} className="flex gap-2.5 text-sm">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                          <span className="text-muted-foreground">{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={[
                      "mt-6 rounded-2xl border border-border/70 bg-background/60 p-6",
                      featured ? "lg:mt-0 backdrop-blur" : "",
                    ].join(" ")}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-bold md:text-4xl">
                        {naira(c.price_ngn)}
                      </span>
                      <span className="text-base text-muted-foreground line-through">
                        {naira(c.anchor_price_ngn)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      One-time payment · {c.duration_hours} hours of live,
                      hands-on training
                    </p>

                    <ul className="mt-5 space-y-2">
                      {TRUST.map((t) => (
                        <li
                          key={t.label}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <t.icon className="h-4 w-4 flex-shrink-0 text-primary" />
                          {t.label}
                        </li>
                      ))}
                    </ul>

                    <Button
                      size="lg"
                      className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90"
                      onClick={() => setActive(c)}
                    >
                      Enroll now
                    </Button>
                    <p className="mt-3 text-center text-xs text-muted-foreground">
                      Secure payment · Instant access details by email
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container-x pb-20 md:pb-28">
        <div className="rounded-2xl border border-border/70 bg-surface/50 p-6 text-sm text-muted-foreground md:text-base">
          Every course includes a certificate on completion, lifetime access to
          materials that keep updating, and 1-on-1 mentor support while you
          build your project.
        </div>
      </section>

      <EnrollDialog course={active} onClose={() => setActive(null)} />
    </>
  );
}

function EnrollDialog({
  course,
  onClose,
}: {
  course: Course | null;
  onClose: () => void;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", country: "" });

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!course) return;
    if (!form.country) {
      toast.error("Please select your country");
      return;
    }
    setSubmitting(true);
    try {
      const res = await startTrainingEnrollment({
        data: {
          courseSlug: course.slug,
          full_name: form.full_name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          country: form.country,
          origin: window.location.origin,
        },
      });
      window.location.href = res.authorization_url;
    } catch (err) {
      setSubmitting(false);
      toast.error(
        err instanceof Error ? err.message : "Could not start payment. Please try again.",
      );
      void router.invalidate();
    }
  }

  return (
    <Dialog open={!!course} onOpenChange={(o) => !o && !submitting && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Enroll — {course?.title}</DialogTitle>
          <DialogDescription>
            {course
              ? `${naira(course.price_ngn)} · ${course.duration_hours} hours. You'll be redirected to secure checkout.`
              : ""}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="enroll-name">Full name</Label>
            <Input
              id="enroll-name"
              required
              minLength={2}
              value={form.full_name}
              onChange={(e) => set("full_name")(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="enroll-email">Email</Label>
            <Input
              id="enroll-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => set("email")(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="enroll-phone">Phone number</Label>
            <Input
              id="enroll-phone"
              required
              minLength={6}
              value={form.phone}
              onChange={(e) => set("phone")(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="enroll-country">Country</Label>
            <Select value={form.country} onValueChange={set("country")}>
              <SelectTrigger id="enroll-country">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRY_OPTIONS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Redirecting to payment…
              </>
            ) : (
              <>Continue to payment</>
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Payments are processed securely. Your details are only used for
            enrollment.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
