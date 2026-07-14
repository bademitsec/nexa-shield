import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/lib/store";
import { Price } from "@/components/site/price";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createOrderAndInitPayment } from "@/lib/checkout.functions";
import { site } from "@/lib/site-config";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: `Checkout — ${site.name}` }, { name: "robots", content: "noindex" }] }),
  component: CheckoutPage,
});

const schema = z.object({
  full_name: z.string().min(2, "Enter your full name").max(120),
  email: z.string().email("Invalid email").max(255),
  phone: z.string().min(6, "Enter a valid phone").max(30),
  line1: z.string().min(3, "Address required").max(200),
  line2: z.string().max(200).optional(),
  city: z.string().min(2).max(80),
  state: z.string().min(2).max(80),
  country: z.string().max(80).optional(),
  customer_notes: z.string().max(1000).optional(),
});
type FormValues = z.infer<typeof schema>;

function CheckoutPage() {
  const router = useRouter();
  const cart = useCart();
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const initFn = useServerFn(createOrderAndInitPayment);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setSignedIn(!!data.user));
  }, []);


  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { country: "" },
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) form.setValue("email", data.user.email);
    });
  }, [form]);

  if (cart.items.length === 0) {
    return (
      <div className="container-x py-16 text-center">
        <p>Your cart is empty.</p>
        <Button asChild className="mt-4"><Link to="/shop">Go shopping</Link></Button>
      </div>
    );
  }

  if (signedIn === false) {
    return (
      <div className="container-x py-16 max-w-md text-center">
        <h1 className="font-display text-2xl font-bold">Sign in to checkout</h1>
        <p className="mt-2 text-sm text-muted-foreground">Create an account or sign in to track your orders and manage subscriptions.</p>
        <Button asChild className="mt-6"><Link to="/auth">Sign in</Link></Button>
      </div>
    );
  }

  const hasSubscription = cart.items.some((i) => i.isSubscription);


  const onSubmit = async (v: FormValues) => {
    setSubmitting(true);
    try {
      const res = await initFn({
        data: {
          items: cart.items.map((i) => ({ productId: i.productId, quantity: i.quantity, isSubscription: i.isSubscription })),
          full_name: v.full_name,
          email: v.email,
          phone: v.phone,
          shipping_address: {
            line1: v.line1,
            line2: v.line2 || "",
            city: v.city,
            state: v.state,
            country: v.country || "",
          },
          customer_notes: v.customer_notes || "",
          payment_mode: "full",
          origin: window.location.origin,
        },
      });
      if (res.authorization_url) {
        cart.clear();
        window.location.href = res.authorization_url;
      } else {
        toast.error("Could not start payment");
        setSubmitting(false);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Checkout failed");
      setSubmitting(false);
    }
  };

  return (
    <div className="container-x py-10 md:py-14">
      <h1 className="font-display text-2xl md:text-3xl font-bold">Checkout</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <Section title="Contact">
            <Field label="Full name" error={form.formState.errors.full_name?.message}>
              <Input {...form.register("full_name")} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email" error={form.formState.errors.email?.message}>
                <Input type="email" {...form.register("email")} />
              </Field>
              <Field label="Phone" error={form.formState.errors.phone?.message}>
                <Input {...form.register("phone")} placeholder="0803 000 0000" />
              </Field>
            </div>
          </Section>

          <Section title="Shipping / Install address">
            <Field label="Address line 1" error={form.formState.errors.line1?.message}>
              <Input {...form.register("line1")} />
            </Field>
            <Field label="Address line 2 (optional)">
              <Input {...form.register("line2")} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="City" error={form.formState.errors.city?.message}>
                <Input {...form.register("city")} />
              </Field>
              <Field label="State" error={form.formState.errors.state?.message}>
                <Input {...form.register("state")} />
              </Field>
              <Field label="Country">
                <Input {...form.register("country")} placeholder="Country" />
              </Field>
            </div>
          </Section>

          <Section title="Notes (optional)">
            <Textarea {...form.register("customer_notes")} rows={3} placeholder="Access instructions, preferred install date, etc." />
          </Section>

          {canDeposit && (
            <Section title="Payment option">
              <div className="grid gap-3 sm:grid-cols-2">
                <PayOption active={mode === "deposit"} onClick={() => setMode("deposit")}
                  title="Pay 80% deposit"
                  subtitle={`Pay ₦${depositAmount.toLocaleString()} now, ₦${balanceAmount.toLocaleString()} on delivery/install.`} />
                <PayOption active={mode === "full"} onClick={() => setMode("full")}
                  title="Pay in full"
                  subtitle={`Pay ₦${cart.subtotalNgn.toLocaleString()} today. No balance due.`} />
              </div>
              {hasSubscription && (
                <p className="mt-2 text-xs text-muted-foreground">Subscriptions are billed in full.</p>
              )}
            </Section>
          )}
          {hasSubscription && !canDeposit && (
            <p className="text-xs text-muted-foreground">Subscription orders are paid in full at checkout.</p>
          )}
        </div>

        <aside className="rounded-xl border border-border/60 bg-card/50 p-6 h-fit sticky top-20">
          <h2 className="font-semibold">Order summary</h2>
          <div className="mt-4 divide-y divide-border/60">
            {cart.items.map((i) => (
              <div key={i.productId} className="flex justify-between py-2 text-sm">
                <span className="flex-1 pr-2">{i.name} <span className="text-muted-foreground">× {i.quantity}</span></span>
                <Price ngn={i.priceNgn * i.quantity} />
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2 text-sm border-t border-border/60 pt-4">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><Price ngn={cart.subtotalNgn} /></div>
            {mode === "deposit" && canDeposit && (
              <div className="flex justify-between"><span className="text-muted-foreground">Balance later</span><Price ngn={balanceAmount} /></div>
            )}
            <div className="flex justify-between font-semibold pt-2 border-t border-border/60">
              <span>You pay now</span>
              <Price ngn={mode === "full" || !canDeposit ? cart.subtotalNgn : depositAmount} />
            </div>
          </div>
          <Button type="submit" disabled={submitting} size="lg" className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90">
            {submitting ? "Redirecting to Paystack…" : "Pay with Paystack"}
          </Button>
          <p className="mt-3 text-[11px] text-muted-foreground text-center">
            Secure payment powered by Paystack. Cards, transfer, USSD & bank supported.
          </p>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/40 p-6">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
function PayOption({ active, onClick, title, subtitle }: { active: boolean; onClick: () => void; title: string; subtitle: string }) {
  return (
    <button type="button" onClick={onClick}
      className={`text-left rounded-lg border p-4 transition ${active ? "border-primary bg-primary/5" : "border-border/60 hover:border-border"}`}>
      <div className="font-medium text-sm">{title}</div>
      <div className="mt-1 text-xs text-muted-foreground">{subtitle}</div>
    </button>
  );
}
