import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { Upload, Mail, Phone, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { site } from "@/lib/site-config";
import { OPERATING_COUNTRY_NAMES } from "@/lib/countries";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact ${site.name} — Request a Quote` },
      {
        name: "description",
        content:
          "Get a scoped quote for web design, digital marketing or home security. Serving clients in 10 African countries — HQ in Nigeria.",
      },
      { property: "og:title", content: `Contact ${site.name}` },
      { property: "og:description", content: "Request a scoped quote — reply within 1 business day." },
    ],
  }),
  component: ContactPage,
});

const COUNTRY_OPTIONS = [...OPERATING_COUNTRY_NAMES, "Other"];

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  service: z.enum(["web_design", "digital_marketing", "home_security", "other"]),
  country: z.string().trim().min(2, "Please select your country").max(80),
  message: z.string().trim().min(10, "Tell us a bit more").max(5000),
});
type FormValues = z.infer<typeof schema>;


const MAX_FILES = 6;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

function ContactPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { service: "home_security", country: "Nigeria" },
  });
  const service = watch("service");
  const country = watch("country");


  const onFilesSelected = (list: FileList | null) => {
    if (!list) return;
    const next: File[] = [];
    for (const f of Array.from(list)) {
      if (f.size > MAX_FILE_SIZE) {
        toast.error(`${f.name} is larger than 10MB`);
        continue;
      }
      next.push(f);
    }
    const combined = [...files, ...next].slice(0, MAX_FILES);
    if (files.length + next.length > MAX_FILES) {
      toast.warning(`Only the first ${MAX_FILES} files will be attached`);
    }
    setFiles(combined);
  };

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const attachmentPaths: string[] = [];
      const { data: sessionData } = await supabase.auth.getSession();
      const uid = sessionData.session?.user.id;
      const prefix = uid ?? "anon";
      for (const f of files) {
        const safe = f.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const path = `${prefix}/${crypto.randomUUID()}-${safe}`;
        const { error: upErr } = await supabase.storage
          .from("quote-attachments")
          .upload(path, f, { contentType: f.type || undefined, upsert: false });
        if (upErr) throw upErr;
        attachmentPaths.push(path);
      }

      const { error: insErr } = await supabase.from("quotes").insert({
        name: values.name,
        email: values.email,
        phone: values.phone || null,
        service: values.service,
        country: values.country,
        message: values.message,
        attachments: attachmentPaths,
      });
      if (insErr) throw insErr;

      toast.success("Thanks — we'll be in touch within 1 business day.");
      reset({ service: values.service, country: values.country, name: "", email: "", phone: "", message: "" });

      setFiles([]);
    } catch (e) {
      console.error(e);
      toast.error("Could not send your request. Please try WhatsApp or email.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container-x py-16 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Contact</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Tell us what you need.</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            We'll reply within one business day with a scoped quote. For
            security installs, attaching floor plans or site photos speeds
            things up.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" {...register("name")} className="mt-1.5" placeholder="Adaeze Okafor" />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} className="mt-1.5" placeholder="you@example.com" />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="phone">Phone / WhatsApp</Label>
                <Input id="phone" {...register("phone")} className="mt-1.5" placeholder="+234…" />
              </div>
              <div>
                <Label htmlFor="country">Your country</Label>
                <Select value={country} onValueChange={(v) => setValue("country", v)}>
                  <SelectTrigger id="country" className="mt-1.5">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRY_OPTIONS.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && <p className="mt-1 text-xs text-destructive">{errors.country.message}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="service">What can we help with?</Label>
              <Select value={service} onValueChange={(v) => setValue("service", v as FormValues["service"])}>
                <SelectTrigger id="service" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web_design">Web design & development</SelectItem>
                  <SelectItem value="digital_marketing">Digital marketing</SelectItem>
                  <SelectItem value="home_security">Home security & automation</SelectItem>
                  <SelectItem value="other">Something else</SelectItem>
                </SelectContent>
              </Select>
            </div>


            <div>
              <Label htmlFor="message">Project details</Label>
              <Textarea
                id="message"
                rows={5}
                {...register("message")}
                className="mt-1.5"
                placeholder="Tell us about your business, goals, and any deadlines…"
              />
              {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
            </div>

            <div>
              <Label>Attachments (optional)</Label>
              <p className="mt-1 text-xs text-muted-foreground">
                For security quotes, upload floor plans or photos of the property.
                Up to {MAX_FILES} files, 10MB each.
              </p>
              <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-surface/40 px-4 py-6 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground">
                <Upload className="h-4 w-4" />
                Click to add files
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*,.pdf"
                  onChange={(e) => onFilesSelected(e.target.files)}
                />
              </label>
              {files.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {files.map((f, i) => (
                    <li key={i} className="flex items-center justify-between rounded-md border border-border/70 bg-background/40 px-3 py-2 text-sm">
                      <span className="truncate">{f.name}</span>
                      <button
                        type="button"
                        onClick={() => setFiles(files.filter((_, x) => x !== i))}
                        className="text-xs text-muted-foreground hover:text-destructive"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto"
            >
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {submitting ? "Sending…" : "Send request"}
            </Button>
          </form>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-surface/60 p-6">
            <h3 className="text-lg font-semibold">Other ways to reach us</h3>
            <div className="mt-4 space-y-3 text-sm">
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-md border border-border/70 bg-background/40 p-3 hover:border-primary/50"
              >
                <MessageCircle className="h-4 w-4 text-accent" />
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-xs text-muted-foreground">Fastest reply — usually under an hour</p>
                </div>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 rounded-md border border-border/70 bg-background/40 p-3 hover:border-primary/50"
              >
                <Mail className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">{site.email}</p>
                  <p className="text-xs text-muted-foreground">Email us any time</p>
                </div>
              </a>
              <a
                href={`tel:${site.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-3 rounded-md border border-border/70 bg-background/40 p-3 hover:border-primary/50"
              >
                <Phone className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">{site.phone}</p>
                  <p className="text-xs text-muted-foreground">Mon–Sat, 9am–6pm WAT</p>
                </div>
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface/60 p-6">
            <h3 className="text-lg font-semibold">What happens next?</h3>
            <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><span className="font-semibold text-foreground">1.</span> We review your request within 1 business day.</li>
              <li><span className="font-semibold text-foreground">2.</span> A quick discovery call to confirm scope.</li>
              <li><span className="font-semibold text-foreground">3.</span> You get a written quote with timeline & milestones.</li>
            </ol>
          </div>
        </aside>
      </div>
    </section>
  );
}
