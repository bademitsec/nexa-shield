import { createFileRoute } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Security Hardware — Nexashield" },
      {
        name: "description",
        content: "IP cameras, NVRs, smart locks and alarm kits — genuine hardware, installed nationwide.",
      },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <section className="container-x py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="grid mx-auto h-12 w-12 place-items-center rounded-md bg-primary/15 text-primary ring-1 ring-primary/30">
          <ShoppingBag className="h-6 w-6" />
        </span>
        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Shop launching soon</h1>
        <p className="mt-3 text-muted-foreground">
          Our security hardware store — IP cameras, NVRs, smart locks & alarm kits —
          is coming online shortly. In the meantime, request a quote and we'll build a
          custom package for your site.
        </p>
      </div>
    </section>
  );
}
