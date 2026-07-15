export const site = {
  name: "Webfortix",
  tagline: "Web. Marketing. Security.",
  description:
    "Webfortix builds fast websites, growth-driven digital marketing, and installs smart home security systems across Africa.",
  url: "https://webfortix.com",
  whatsapp: "2348139511908", // digits only, E.164 without +
  email: "support@webfortix.com",
  phone: "+234 813 951 1908",
  address: "Nigeria",
  social: {
    instagram: "https://instagram.com/webfortix",
    x: "https://x.com/webfortix",
    facebook: "https://facebook.com/webfortix",
  },
};

export const services = [
  {
    slug: "web-design",
    title: "Web Design & Development",
    short: "Fast, SEO-ready websites & web apps",
    description:
      "Custom marketing sites, e-commerce, and web apps built for speed, mobile, and search.",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    short: "SEO, ads, social & content",
    description:
      "Drive qualified traffic and leads with search, paid ads, and content built for the African market.",
  },
  {
    slug: "home-security",
    title: "Home Security & Automation",
    short: "Cameras, alarms, smart locks",
    description:
      "Design, supply, and install CCTV, NVRs, alarms, smart locks and 24/7 cloud monitoring for homes and offices.",
  },
] as const;

export type ServiceSlug = (typeof services)[number]["slug"];
