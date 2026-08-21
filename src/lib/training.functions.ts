import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const enrollSchema = z.object({
  courseSlug: z.string().min(2).max(80),
  full_name: z.string().min(2).max(120),
  email: z.string().email().max(255),
  phone: z.string().min(6).max(30),
  country: z.string().min(2).max(80),
  origin: z.string().url().max(300),
});

export const startTrainingEnrollment = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => enrollSchema.parse(data))
  .handler(async ({ data }) => {
    const { startEnrollment } = await import("./training.server");
    return startEnrollment(data);
  });

export const confirmTrainingEnrollment = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ reference: z.string().min(6).max(120) }).parse(data))
  .handler(async ({ data }) => {
    const { confirmEnrollment } = await import("./training.server");
    return confirmEnrollment(data.reference);
  });

export const listCourses = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("courses")
    .select("id,slug,title,headline,duration_hours,price_ngn,anchor_price_ngn,badge,outcomes,sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
});
