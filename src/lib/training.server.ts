// Server-only training enrollment logic. Never import into browser code.
import { initializeTransaction, verifyTransaction } from "./paystack.server";

export type EnrollInput = {
  courseSlug: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  origin: string;
};

export async function startEnrollment(input: EnrollInput) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: course, error } = await supabaseAdmin
    .from("courses")
    .select("id,slug,title,price_ngn,is_active")
    .eq("slug", input.courseSlug)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!course || !course.is_active) throw new Error("This course is not available");

  const amount = Number(course.price_ngn);
  if (!amount || amount <= 0) throw new Error("Course pricing is unavailable");

  const reference = `WFT_${Date.now()}_${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  const { error: insErr } = await supabaseAdmin.from("training_enrollments").insert({
    course_id: course.id,
    full_name: input.full_name,
    email: input.email,
    phone: input.phone,
    country: input.country,
    amount_paid: 0,
    payment_reference: reference,
    payment_status: "pending",
  });
  if (insErr) throw new Error(insErr.message);

  const init = await initializeTransaction({
    email: input.email,
    amountKobo: Math.round(amount * 100),
    reference,
    callbackUrl: `${input.origin}/training/thank-you?reference=${encodeURIComponent(reference)}`,
    metadata: {
      kind: "training",
      course_id: course.id,
      course_slug: course.slug,
      course_title: course.title,
      full_name: input.full_name,
    },
  });

  const url = (init.data as { authorization_url?: string })?.authorization_url;
  if (!url) throw new Error("Could not start payment. Please try again.");
  return { authorization_url: url, reference };
}

export async function markEnrollmentPaid(reference: string, amountNaira: number) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  await supabaseAdmin
    .from("training_enrollments")
    .update({
      payment_status: "paid",
      amount_paid: amountNaira,
      enrolled_at: new Date().toISOString(),
    })
    .eq("payment_reference", reference)
    .neq("payment_status", "paid");
}

export async function confirmEnrollment(reference: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: existing } = await supabaseAdmin
    .from("training_enrollments")
    .select("id,payment_status,full_name,email,amount_paid,course_id,courses(title,slug)")
    .eq("payment_reference", reference)
    .maybeSingle();

  if (!existing) return { status: "not_found" as const };

  if (existing.payment_status !== "paid") {
    try {
      const res = await verifyTransaction(reference);
      const d = res.data as { status?: string; amount?: number };
      if (d?.status === "success") {
        await markEnrollmentPaid(reference, Math.round((d.amount ?? 0) / 100));
      } else {
        return { status: "failed" as const };
      }
    } catch {
      return { status: "failed" as const };
    }
  }

  const course = existing.courses as unknown as { title?: string } | null;
  return {
    status: "paid" as const,
    full_name: existing.full_name,
    email: existing.email,
    course_title: course?.title ?? "your course",
  };
}
