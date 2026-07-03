import { createFileRoute } from "@tanstack/react-router";
import { Camera, Lock, Cloud, ShieldCheck } from "lucide-react";
import { ServiceLayout } from "./services.web-design";

export const Route = createFileRoute("/services/home-security")({
  head: () => ({
    meta: [
      { title: "Home Security & Automation Installers in Nigeria — Nexashield" },
      {
        name: "description",
        content:
          "CCTV cameras, NVRs, alarms, smart locks and 24/7 cloud monitoring — supplied and professionally installed across Nigeria.",
      },
      { property: "og:title", content: "Home Security & Automation — Nexashield" },
      {
        property: "og:description",
        content: "CCTV, alarms, smart locks and 24/7 monitoring across Nigeria.",
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
        "60% deposit, balance on completion",
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
