import { MessageCircle } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { site } from "@/lib/site-config";

const MESSAGES: Array<{ match: RegExp; text: string }> = [
  { match: /^\/services\/web-design/, text: "Hi Webfortix, I'm interested in Web Design & Development." },
  { match: /^\/services\/digital-marketing/, text: "Hi Webfortix, I'm interested in Digital Marketing." },
  { match: /^\/services\/home-security/, text: "Hi Webfortix, I'd like a Home Security consultation." },
  { match: /^\/training/, text: "Hi Webfortix, I'd like more info on your Training programs." },
  { match: /^\/shop/, text: "Hi Webfortix, I have a question about a product in your shop." },
  { match: /^\/portfolio/, text: "Hi Webfortix, I saw your case studies and want to discuss a project." },
];

function messageForPath(path: string) {
  return (
    MESSAGES.find((m) => m.match.test(path))?.text ??
    "Hi Webfortix, I'd like to know more about your services."
  );
}

export function WhatsAppButton() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(messageForPath(path))}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[oklch(0.72_0.18_155)] text-black shadow-lg shadow-black/40 transition-transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
