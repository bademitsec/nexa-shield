import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Search, Target, PenTool } from "lucide-react";
import { ServiceLayout } from "./services.web-design";

export const Route = createFileRoute("/services/digital-marketing")({
  head: () => ({
    meta: [
      { title: "Digital Marketing Agency in Nigeria — Nexashield" },
      {
        name: "description",
        content:
          "SEO, Google & Meta ads, social media and content marketing that drives leads for Nigerian businesses. Transparent monthly retainers.",
      },
      { property: "og:title", content: "Digital Marketing — Nexashield" },
      {
        property: "og:description",
        content: "SEO, ads, social & content for growing Nigerian brands.",
      },
    ],
  }),
  component: DigitalMarketingPage,
});

function DigitalMarketingPage() {
  return (
    <ServiceLayout
      eyebrow="Digital Marketing"
      title="Drive qualified traffic. Turn it into revenue."
      lede="SEO, Google & Meta ads, social media and content marketing — built for the Nigerian market and measured against real business goals."
      features={[
        { icon: Search, title: "SEO", desc: "Technical audits, on-page, content, local & backlinks." },
        { icon: Target, title: "Paid ads", desc: "Google, Meta, TikTok — creative + conversion tracking." },
        { icon: PenTool, title: "Content", desc: "Blog posts, landing pages, and social content that ranks." },
        { icon: TrendingUp, title: "Analytics", desc: "GA4, dashboards, monthly reports you can actually read." },
      ]}
      includes={[
        "Kick-off audit + 90-day roadmap",
        "Keyword research & content calendar",
        "On-page SEO & technical fixes",
        "Google Ads / Meta Ads management",
        "Landing page conversion tracking",
        "Monthly reporting call + written report",
      ]}
      packages={[
        { name: "SEO Starter", from: "₦350,000/mo", desc: "Local SEO + 4 posts/month + reporting." },
        { name: "Growth", from: "₦850,000/mo", desc: "SEO + paid ads + content + monthly strategy." },
        { name: "Scale", from: "Custom", desc: "Full-funnel program for larger brands." },
      ]}
    />
  );
}
