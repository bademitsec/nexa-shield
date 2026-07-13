import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(supabase: ReturnType<typeof Object>, userId: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any).rpc("has_role", { _user_id: userId, _role: "admin" });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden");
}

/** Admin: create a Paystack payment link for an order's outstanding balance. */
export const adminCreateBalanceLink = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({
    orderId: z.string().uuid(),
    origin: z.string().url(),
  }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertAdmin(supabase, userId);

    const { data: order, error } = await supabase.from("orders")
      .select("id,order_number,email,balance_amount_ngn,payment_status")
      .eq("id", data.orderId).maybeSingle();
    if (error || !order) throw new Error(error?.message || "Order not found");
    const amount = Number(order.balance_amount_ngn);
    if (amount <= 0) throw new Error("No outstanding balance on this order");

    const { initializeTransaction } = await import("./paystack.server");
    const reference = `NX_${order.order_number.replace(/-/g, "")}_BAL_${Date.now()}`;
    const init = await initializeTransaction({
      email: order.email,
      amountKobo: Math.round(amount * 100),
      reference,
      callbackUrl: `${data.origin}/orders/${order.id}?verify=${encodeURIComponent(reference)}`,
      metadata: { order_id: order.id, order_number: order.order_number, kind: "balance", initiated_by: "admin" },
    });

    await supabase.from("payments").insert({
      order_id: order.id,
      user_id: null,
      provider: "paystack",
      provider_reference: reference,
      kind: "balance",
      amount_ngn: amount,
      status: "pending",
    });

    return {
      authorization_url: (init.data as { authorization_url?: string })?.authorization_url ?? null,
      reference,
      amount_ngn: amount,
    };
  });

/** Admin: log a manual payment (bank transfer, cash, POS) against an order. */
export const adminRecordManualPayment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({
    orderId: z.string().uuid(),
    amount_ngn: z.number().positive().max(1_000_000_000),
    kind: z.enum(["full", "deposit", "balance"]).default("balance"),
    channel: z.string().max(80).optional(),
    reference: z.string().max(120).optional(),
    note: z.string().max(500).optional(),
  }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertAdmin(supabase, userId);

    const { data: order, error } = await supabase.from("orders")
      .select("id,total_ngn,paid_amount_ngn,payment_status,admin_notes")
      .eq("id", data.orderId).maybeSingle();
    if (error || !order) throw new Error(error?.message || "Order not found");

    const newPaid = Number(order.paid_amount_ngn ?? 0) + data.amount_ngn;
    const balance = Math.max(0, Number(order.total_ngn) - newPaid);
    const payment_status: "unpaid" | "deposit_paid" | "fully_paid" =
      balance <= 0 ? "fully_paid" : newPaid > 0 ? "deposit_paid" : "unpaid";

    const reference = data.reference || `MANUAL_${Date.now()}`;
    const { error: pErr } = await supabase.from("payments").insert({
      order_id: order.id,
      user_id: null,
      provider: "manual",
      provider_reference: reference,
      kind: data.kind,
      amount_ngn: data.amount_ngn,
      channel: data.channel ?? "manual",
      status: "success",
      payload: { note: data.note ?? null, recorded_by: userId },
    });
    if (pErr) throw new Error(pErr.message);

    const noteLine = `[${new Date().toISOString().slice(0, 10)}] Manual payment ₦${data.amount_ngn.toLocaleString()} (${data.channel ?? "manual"})${data.note ? ` — ${data.note}` : ""}`;
    const admin_notes = order.admin_notes ? `${order.admin_notes}\n${noteLine}` : noteLine;

    const { error: uErr } = await supabase.from("orders").update({
      paid_amount_ngn: newPaid,
      balance_amount_ngn: balance,
      payment_status,
      status: payment_status === "fully_paid" ? "confirmed" : "confirmed",
      admin_notes,
    }).eq("id", order.id);
    if (uErr) throw new Error(uErr.message);

    return { paid_amount_ngn: newPaid, balance_amount_ngn: balance, payment_status };
  });
