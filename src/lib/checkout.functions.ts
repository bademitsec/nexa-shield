import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const cartItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().min(1).max(50),
  isSubscription: z.boolean().optional(),
});

const createOrderSchema = z.object({
  items: z.array(cartItemSchema).min(1).max(30),
  full_name: z.string().min(2).max(120),
  email: z.string().email().max(255),
  phone: z.string().min(6).max(30),
  shipping_address: z.object({
    line1: z.string().min(3).max(200),
    line2: z.string().max(200).optional().default(""),
    city: z.string().min(2).max(80),
    state: z.string().min(2).max(80),
    country: z.string().max(80).default("Nigeria"),
  }),
  customer_notes: z.string().max(1000).optional().default(""),
  payment_mode: z.enum(["full", "deposit"]),
  origin: z.string().url(),
});

/** Creates an order + items, then initializes a Paystack transaction. Returns { orderId, orderNumber, authorization_url, reference } */
export const createOrderAndInitPayment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => createOrderSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    // Fetch product prices server-side (never trust client prices)
    const productIds = data.items.map((i) => i.productId);
    const { data: products, error: pErr } = await supabase
      .from("products")
      .select("id,name,slug,price_ngn,deposit_percent,stock,is_active,is_subscription,subscription_interval,sku,images")
      .in("id", productIds);
    if (pErr) throw new Error(pErr.message);
    if (!products || products.length !== productIds.length) throw new Error("Some products are unavailable");

    const productMap = new Map(products.map((p) => [p.id, p]));

    let subtotal = 0;
    let depositTotal = 0;
    const orderItemsPayload: Array<{
      product_id: string; name_snapshot: string; sku_snapshot: string | null;
      image_snapshot: string | null; unit_price_ngn: number; quantity: number;
      is_subscription: boolean; subscription_interval: string | null;
    }> = [];

    for (const item of data.items) {
      const p = productMap.get(item.productId);
      if (!p || !p.is_active) throw new Error("Product unavailable");
      if (!p.is_subscription && p.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${p.name}`);
      }
      const line = Number(p.price_ngn) * item.quantity;
      subtotal += line;
      depositTotal += (line * p.deposit_percent) / 100;
      orderItemsPayload.push({
        product_id: p.id,
        name_snapshot: p.name,
        sku_snapshot: p.sku,
        image_snapshot: p.images?.[0] ?? null,
        unit_price_ngn: Number(p.price_ngn),
        quantity: item.quantity,
        is_subscription: p.is_subscription,
        subscription_interval: p.subscription_interval,
      });
    }

    // Shipping (flat, from settings, ignored for subscription-only orders)
    const anyPhysical = orderItemsPayload.some((i) => !i.is_subscription);
    const { data: shipSetting } = await supabase
      .from("site_settings").select("value").eq("key", "shipping_flat_ngn").maybeSingle();
    const shipping = anyPhysical ? Number(shipSetting?.value ?? 5000) : 0;
    const total = Math.round(subtotal + shipping);
    const deposit = Math.round(depositTotal);
    const balance = Math.max(0, total - deposit);

    const payNow = data.payment_mode === "full" ? total : deposit;
    if (payNow <= 0) throw new Error("Payment amount is zero");

    // Create order
    const { data: order, error: oErr } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        email: data.email,
        phone: data.phone,
        full_name: data.full_name,
        shipping_address: data.shipping_address,
        subtotal_ngn: subtotal,
        shipping_ngn: shipping,
        total_ngn: total,
        deposit_amount_ngn: deposit,
        balance_amount_ngn: balance,
        customer_notes: data.customer_notes,
        status: "pending",
        payment_status: "unpaid",
      })
      .select("id,order_number,total_ngn,deposit_amount_ngn")
      .single();
    if (oErr || !order) throw new Error(oErr?.message || "Failed to create order");

    const { error: iErr } = await supabase
      .from("order_items")
      .insert(orderItemsPayload.map((oi) => ({ ...oi, order_id: order.id })));
    if (iErr) throw new Error(iErr.message);

    // Initialize Paystack
    const { initializeTransaction } = await import("./paystack.server");
    const reference = `NX_${order.order_number.replace(/-/g, "")}_${Date.now()}`;
    const init = await initializeTransaction({
      email: data.email,
      amountKobo: Math.round(payNow * 100),
      reference,
      callbackUrl: `${data.origin}/orders/${order.id}?verify=${encodeURIComponent(reference)}`,
      metadata: {
        order_id: order.id,
        order_number: order.order_number,
        kind: data.payment_mode === "full" ? "full" : "deposit",
      },
    });

    // Record payment (pending)
    await supabase.from("payments").insert({
      order_id: order.id,
      user_id: userId,
      provider: "paystack",
      provider_reference: reference,
      kind: data.payment_mode === "full" ? "full" : "deposit",
      amount_ngn: payNow,
      status: "pending",
    });

    const url = (init.data as { authorization_url?: string })?.authorization_url;
    return {
      orderId: order.id,
      orderNumber: order.order_number,
      authorization_url: url,
      reference,
    };
  });

/** Verify a Paystack transaction and finalize order/payment status. Callable by owning user. */
export const verifyPayment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ reference: z.string().min(4).max(200) }).parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { verifyTransaction } = await import("./paystack.server");
    const res = await verifyTransaction(data.reference);
    const d = res.data as { status?: string; amount?: number; channel?: string; metadata?: { order_id?: string; kind?: string } };
    const paidNaira = Math.round((d.amount ?? 0) / 100);
    const success = d.status === "success";
    const orderId = d.metadata?.order_id;
    const kind = (d.metadata?.kind || "full") as "full" | "deposit" | "balance";

    // Update payment
    await supabase.from("payments").update({
      status: success ? "success" : d.status || "failed",
      channel: d.channel ?? null,
      amount_ngn: paidNaira,
      payload: res as unknown as Record<string, unknown>,
    }).eq("provider_reference", data.reference);

    if (!success || !orderId) return { success: false };

    // Only the owner or staff should update
    const { data: order } = await supabase
      .from("orders")
      .select("id,user_id,total_ngn,deposit_amount_ngn,paid_amount_ngn,payment_status")
      .eq("id", orderId)
      .maybeSingle();
    if (!order) return { success: false };
    if (order.user_id !== userId) {
      // still record success, don't mutate
      return { success: true, orderId };
    }

    const paid_amount_ngn = Number(order.paid_amount_ngn ?? 0) + paidNaira;
    let payment_status: "unpaid" | "deposit_paid" | "fully_paid" = order.payment_status as never;
    if (paid_amount_ngn >= Number(order.total_ngn)) payment_status = "fully_paid";
    else if (paid_amount_ngn >= Number(order.deposit_amount_ngn) && kind !== "full") payment_status = "deposit_paid";
    else if (kind === "deposit") payment_status = "deposit_paid";

    await supabase.from("orders").update({
      paid_amount_ngn,
      balance_amount_ngn: Math.max(0, Number(order.total_ngn) - paid_amount_ngn),
      payment_status,
      status: payment_status === "fully_paid" ? "confirmed" : "confirmed",
    }).eq("id", orderId);

    return { success: true, orderId, payment_status };
  });

/** Initialize a balance payment for an existing order. */
export const initBalancePayment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ orderId: z.string().uuid(), origin: z.string().url() }).parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: order } = await supabase
      .from("orders").select("id,order_number,email,balance_amount_ngn,user_id,payment_status")
      .eq("id", data.orderId).maybeSingle();
    if (!order || order.user_id !== userId) throw new Error("Order not found");
    const amount = Number(order.balance_amount_ngn);
    if (amount <= 0) throw new Error("No balance to pay");
    const { initializeTransaction } = await import("./paystack.server");
    const reference = `NX_${order.order_number.replace(/-/g, "")}_BAL_${Date.now()}`;
    const init = await initializeTransaction({
      email: order.email,
      amountKobo: Math.round(amount * 100),
      reference,
      callbackUrl: `${data.origin}/orders/${order.id}?verify=${encodeURIComponent(reference)}`,
      metadata: { order_id: order.id, order_number: order.order_number, kind: "balance" },
    });
    await supabase.from("payments").insert({
      order_id: order.id,
      user_id: userId,
      provider: "paystack",
      provider_reference: reference,
      kind: "balance",
      amount_ngn: amount,
      status: "pending",
    });
    return { authorization_url: (init.data as { authorization_url?: string })?.authorization_url, reference };
  });
