import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Briefcase, CheckCircle2, Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { PRIORITY_COUNTRIES, CAREERS_PREFERENCE_NOTE } from "@/lib/careers-countries";

export const Route = createFileRoute("/careers/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — Careers at Webfortix` },
      { name: "description", content: "Apply for this role at Webfortix." },
    ],
  }),
  component: CareerDetailPage,
});

const schema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().min(1, "Select a country"),
  country_other: z.string().trim().max(80).optional().or(z.literal("")),
  portfolio_url: z.string().trim().url("Enter a valid URL").max(500).optional().or(z.literal("")),
  cover_letter: z.string().trim().min(30, "Tell us a bit more (min 30 chars)").max(4000),
});
type FormValues = z.infer<typeof schema>;

function CareerDetailPage() {
  const { slug } = Route.useParams();
  const [submitted, setSubmitted] = useState(false);

  const { data: role, isLoading } = useQuery({
    queryKey: ["career", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("job_vacancies")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();
      if (error) throw error;
      if (!data) throw notFound();
      return data;
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { country: "" },
  });
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting }, reset } = form;
  const country = watch("country");

  const onSubmit = async (values: FormValues) => {
    if (!role) return;
    const { error } = await supabase.from("job_applications").insert({
      vacancy_id: role.id,
      vacancy_slug: role.slug,
      vacancy_title: role.title,
      full_name: values.full_name,
      email: values.email,
      phone: values.phone || null,
      country: values.country,
      country_other: values.country === "Other" ? (values.country_other || null) : null,
      portfolio_url: values.portfolio_url || null,
      cover_letter: values.cover_letter,
    });
    if (error) {
      toast.error("Could not submit — please try again.");
      return;
    }
    setSubmitted(true);
    reset();
    toast.success("Application received. We'll be in touch.");
  };

  if (isLoading) return <div className="container-x py-20 text-muted-foreground">Loading…</div>;
  if (!role) return null;

  return (
    <section className="container-x py-12 md:py-16">
      <Link to="/careers" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All roles
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <article>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
              {role.department}
            </span>
            <span className="rounded-full border border-border/70 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
              {role.employment_type}
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{role.title}</h1>
          <p className="mt-3 inline-flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{role.location}</span>
          </p>

          <p className="mt-6 text-muted-foreground">{role.description || role.short_description}</p>

          {role.responsibilities?.length > 0 && (
            <>
              <h2 className="mt-8 text-lg font-semibold">What you'll do</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {role.responsibilities.map((r: string, i: number) => (
                  <li key={i} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> <span>{r}</span></li>
                ))}
              </ul>
            </>
          )}
          {role.requirements?.length > 0 && (
            <>
              <h2 className="mt-8 text-lg font-semibold">What we're looking for</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {role.requirements.map((r: string, i: number) => (
                  <li key={i} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> <span>{r}</span></li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm text-muted-foreground">
            <p className="flex items-start gap-2">
              <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{CAREERS_PREFERENCE_NOTE}</span>
            </p>
          </div>
        </article>

        <aside id="apply" className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border/70 bg-surface/60 p-6">
            <h2 className="text-lg font-semibold">Apply for this role</h2>
            {submitted ? (
              <div className="mt-4 rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm">
                Application received. We review every submission and reply within 5 business days.
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                <div>
                  <Label htmlFor="full_name">Full name</Label>
                  <Input id="full_name" {...register("full_name")} />
                  {errors.full_name && <p className="mt-1 text-xs text-destructive">{errors.full_name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input id="phone" {...register("phone")} />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select value={country} onValueChange={(v) => setValue("country", v, { shouldValidate: true })}>
                    <SelectTrigger id="country"><SelectValue placeholder="Select your country" /></SelectTrigger>
                    <SelectContent>
                      {PRIORITY_COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.country && <p className="mt-1 text-xs text-destructive">{errors.country.message}</p>}
                  {country === "Other" && (
                    <Input placeholder="Specify country" className="mt-2" {...register("country_other")} />
                  )}
                </div>
                <div>
                  <Label htmlFor="portfolio_url">Portfolio / LinkedIn / Resume URL</Label>
                  <Input id="portfolio_url" placeholder="https://…" {...register("portfolio_url")} />
                  {errors.portfolio_url && <p className="mt-1 text-xs text-destructive">{errors.portfolio_url.message}</p>}
                </div>
                <div>
                  <Label htmlFor="cover_letter">Why you? (short cover note)</Label>
                  <Textarea id="cover_letter" rows={5} {...register("cover_letter")} />
                  {errors.cover_letter && <p className="mt-1 text-xs text-destructive">{errors.cover_letter.message}</p>}
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…</> : "Submit application"}
                </Button>
              </form>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
