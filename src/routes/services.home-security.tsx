import { createFileRoute } from "@tanstack/react-router";
import { Camera, Lock, Cloud, ShieldCheck } from "lucide-react";
import { ServiceLayout } from "./services.web-design";
import { OPERATING_COUNTRIES } from "@/lib/countries";
import { site } from "@/lib/site-config";

// Custom installs are Nigeria-only.
const INSTALLATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Webfortix Home Security — Custom Installation",
  description:
    "Custom CCTV, alarm and smart-home installation with on-site survey and cabling. Currently available in Lagos, Abuja and Port Harcourt.",
  url: "https://webfortix.com/services/home-security",
  telephone: "+234 813 951 1908",
  address: { "@type": "PostalAddress", addressCountry: "NG", addressRegion: "Nigeria" },
  areaServed: [
    { "@type": "City", name: "Lagos" },
    { "@type": "City", name: "Abuja" },
    { "@type": "City", name: "Port Harcourt" },
  ],
  serviceType: ["Custom CCTV installation", "Alarm system installation", "Access control installation"],
};

// Standard product supply + cloud monitoring reaches all 10 markets.
const SUPPLY_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: ["CCTV & NVR supply", "Solar & 4G camera supply", "PTZ camera supply", "Video doorbell supply", "Cloud monitoring subscription"],
  provider: { "@type": "Organization", name: site.name, url: site.url },
  areaServed: OPERATING_COUNTRIES.map((c) => ({ "@type": "Country", name: c.name })),
};

export const Route = createFileRoute("/services/home-security")({
  head: () => ({
    meta: [
      { title: "CCTV, NVR & Smart Security Supply Across Africa — Custom Installation in Lagos, Abuja & Port Harcourt | Webfortix" },
      {
        name: "description",
        content:
          "Standard CCTV, NVR, solar/4G, PTZ and doorbell products supplied across all 10 of our African markets. Custom on-site installation available in Lagos, Abuja & Port Harcourt. Cloud monitoring anywhere.",
      },
      { property: "og:title", content: "CCTV & Smart Security — Supply Africa-wide, Install in Lagos/Abuja/Port Harcourt | Webfortix" },
      {
        property: "og:description",
        content: "Security hardware shipped across 10 African countries. Custom installs in Nigeria.",
      },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(INSTALLATION_JSONLD) },
      { type: "application/ld+json", children: JSON.stringify(SUPPLY_JSONLD) },
    ],
  }),
  component: HomeSecurityPage,
});

function HomeSecurityPage() {
  return (
    <ServiceLayout
      eyebrow="Home Security & Automation"
      title="Secure your home. Automate the rest."
      lede="Standard security products — CCTV, NVRs, solar/4G, PTZ and video doorbells — are supply-only (no installation) and ship across all 10 of our African markets. Custom on-site installation projects are currently limited to Lagos, Abuja and Port Harcourt. Cloud monitoring plans are available anywhere."
      features={[
        { icon: Camera, title: "IP Cameras & NVRs", desc: "2K/4K coverage, night vision, mobile app. Supply-only, ships continent-wide." },
        { icon: ShieldCheck, title: "Alarm systems", desc: "Motion, door and glass-break sensors. Supply-only outside Nigeria." },
        { icon: Lock, title: "Smart locks", desc: "PIN, RFID and app-controlled entry. Supply-only outside Nigeria." },
        { icon: Cloud, title: "Cloud monitoring", desc: "24/7 recording, alerts & playback — available in all 10 markets." },
      ]}
      includes={[
        "Standard products supplied across all 10 African markets (supply-only, no installation)",
        "Custom on-site installation available in Lagos, Abuja & Port Harcourt only",
        "Free on-site survey for custom installs in Nigeria",
        "Genuine hardware — 12-month warranty",
        "Mobile app setup guidance included with every order",
        "Full payment at checkout — secured via Paystack",
        "Optional cloud monitoring plan — available anywhere",
      ]}
      packages={[
        { name: "Starter Home (supply)", from: "₦350,000", desc: "4-camera CCTV + NVR + mobile app. Ships across Africa." },
        { name: "Full Home Security (install)", from: "₦950,000", desc: "8 cameras + alarm + smart lock + monitoring. Lagos/Abuja/PH only." },
        { name: "Custom / Commercial", from: "Custom", desc: "Estates, offices, multi-site — Nigeria install / Africa-wide supply." },
      ]}
    />
  );
}

