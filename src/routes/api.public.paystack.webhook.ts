import { createFileRoute } from "@tanstack/react-router";
import { verifyWebhook } from "@/lib/paystack.server";

export const Route = createFileRoute("/api/public/paystack/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const raw = await request.text();
        const signature = request.headers.get("x-paystack-signature");
        const ok = await verifyWebhook(raw, signature);
        if (!ok) return new Response("invalid signature", { status: 401 });

        let event: { event?: string; data?: { reference?: string; status?: string; amount?: number; channel?: string; metadata?: { order_id?: string; kind?: string } } };
        try {
          event = JSON.parse(raw);
        } catch {
          return new Response("bad body", { status: 400 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        if (event.event === "charge.success" && event.data) {
          const ref = event.data.reference;
          const paidNaira = Math.round((event.data.amount ?? 0) / 100);
          const orderId = event.data.metadata?.order_id;
          const kind = (event.data.metadata?.kind || "full") as "full" | "deposit" | "balance";

          if (ref) {
            await supabaseAdmin.from("payments").update({
              status: "success",
              channel: event.data.channel ?? null,
              amount_ngn: paidNaira,
              payload: JSON.parse(raw),
            }).eq("provider_reference", ref);
          }

          if (orderId) {
            const { data: order } = await supabaseAdmin
              .from("orders")
              .select("id,total_ngn,deposit_amount_ngn,paid_amount_ngn,payment_status")
              .eq("id", orderId).maybeSingle();

            if (order && order.payment_status !== "fully_paid") {
              const paid_amount_ngn = Number(order.paid_amount_ngn ?? 0) + paidNaira;
              let payment_status: "unpaid" | "deposit_paid" | "fully_paid" = "unpaid";
              if (paid_amount_ngn >= Number(order.total_ngn)) payment_status = "fully_paid";
              else if (kind === "deposit" || paid_amount_ngn >= Number(order.deposit_amount_ngn)) payment_status = "deposit_paid";

              await supabaseAdmin.from("orders").update({
                paid_amount_ngn,
                balance_amount_ngn: Math.max(0, Number(order.total_ngn) - paid_amount_ngn),
                payment_status,
                status: "confirmed",
              }).eq("id", orderId);
            }
          }
        }

        return new Response("ok", { status: 200 });
      },
    },
  },
});
