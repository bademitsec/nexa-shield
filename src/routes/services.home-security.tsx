import { createFileRoute } from "@tanstack/react-router";
import { Camera, Lock, Cloud, ShieldCheck } from "lucide-react";
import { ServiceLayout } from "./services.web-design";

const HOME_SECURITY_JSONLD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Webfortix Home Security",
  description:
    "CCTV installation, alarm systems, smart locks and 24/7 cloud monitoring for homes and businesses in Lagos, Abuja and Port Harcourt.",
  url: "https://webfortix.com/services/home-security",
  telephone: "+234 813 951 1908",
  areaServed: [
    { "@type": "City", name: "Lagos" },
    { "@type": "City", name: "Abuja" },
    { "@type": "City", name: "Port Harcourt" },
    { "@type": "Country", name: "Nigeria" },
  ],
  serviceType: [
    "CCTV installation",
    "Smart home security",
    "Alarm systems",
    "Access control",
    "Cloud monitoring",
  ],
};

export const Route = createFileRoute("/services/home-security")({
  head: () => ({
    meta: [
      { title: "CCTV Installation & Smart Home Security in Lagos, Abuja & Port Harcourt | Webfortix" },
      {
        name: "description",
        content:
          "Professionally installed CCTV, alarms, smart locks and 24/7 cloud monitoring in Lagos, Abuja and Port Harcourt. Free on-site survey. 12-month warranty.",
      },
      { property: "og:title", content: "CCTV & Smart Home Security — Lagos, Abuja & Port Harcourt | Webfortix" },
      {
        property: "og:description",
        content: "CCTV, alarms, smart locks and 24/7 monitoring — installed across Lagos, Abuja and Port Harcourt.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(HOME_SECURITY_JSONLD),
      },
    ],
  }),
  component: HomeSecurityPage,
});

function HomeSecurityPage() {
  return (
    <ServiceLayout
      eyebrow="Home Security & Automation"
      title="Secure your home. Automate the rest."
      lede="Professionally installed CCTV, NVRs, alarm systems, smart locks and 24/7 cloud monitoring — hardware supplied, installed, and supported."
      features={[
        { icon: Camera, title: "IP Cameras & NVRs", desc: "2K/4K coverage, night vision, mobile app." },
        { icon: ShieldCheck, title: "Alarm systems", desc: "Motion, door and glass-break sensors." },
        { icon: Lock, title: "Smart locks", desc: "PIN, RFID and app-controlled entry." },
        { icon: Cloud, title: "Cloud monitoring", desc: "24/7 recording, alerts, and playback." },
      ]}
      includes={[
        "Free on-site survey in Lagos, Abuja & Port Harcourt",
        "Hardware supply — genuine brands, 12-month warranty",
        "Professional cabling & installation",
        "Mobile app setup & training",
        "Full payment at checkout — secured via Paystack",
        "Optional monthly cloud monitoring plan",
      ]}
      packages={[
        { name: "Starter Home", from: "₦350,000", desc: "4-camera CCTV + NVR + mobile app." },
        { name: "Full Home Security", from: "₦950,000", desc: "8 cameras + alarm + smart lock + monitoring." },
        { name: "Custom / Commercial", from: "Custom", desc: "Estates, offices, multi-site deployments." },
      ]}
    />
  );
}
