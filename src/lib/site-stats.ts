// Homepage social-proof numbers. Placeholder values — edit here or wire to
// site_settings later. Numbers render as-is (e.g. "120+", "45").
export const siteStats = [
  { label: "Clients served", value: "120+" },
  { label: "Installs completed", value: "85+" },
  { label: "Websites launched", value: "60+" },
  { label: "Training graduates", value: "300+" },
] as const;

export type Testimonial = {
  name: string;
  role: string;
  tag: "Web Design" | "Marketing" | "Security" | "Training";
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Amaka O.",
    role: "Founder, Lagos boutique",
    tag: "Web Design",
    quote:
      "Webfortix rebuilt our storefront in 3 weeks. Sales from search doubled in the first month.",
  },
  {
    name: "Ibrahim K.",
    role: "GM, Abuja fintech",
    tag: "Marketing",
    quote:
      "Their marketing team took our cost per lead from ₦4,200 down to ₦1,600 without cutting quality.",
  },
  {
    name: "The Adekunle Family",
    role: "Homeowners, Lekki",
    tag: "Security",
    quote:
      "Clean install, working cameras, mobile alerts I can trust. Best security decision we've made.",
  },
  {
    name: "Chidera N.",
    role: "Freelance developer",
    tag: "Training",
    quote:
      "The web-dev track paid for itself in a single client project. Practical, no fluff.",
  },
];

export type FeaturedCase = {
  slug: string;
  title: string;
  client: string;
  tag: string;
  cover: string;
};

// Sourced from portfolio_projects; images already live in /public/products/.
export const featuredCases: FeaturedCase[] = [
  {
    slug: "lekki-residence-cctv",
    title: "6-camera CCTV install for a Lekki residence",
    client: "Private residence · Lekki",
    tag: "Security",
    cover: "/products/portfolio-lekki-residence-cctv.jpg",
  },
  {
    slug: "abuja-fintech-marketing",
    title: "Lead-gen campaign for an Abuja fintech",
    client: "Fintech startup · Abuja",
    tag: "Marketing",
    cover: "/products/portfolio-abuja-fintech-marketing.jpg",
  },
  {
    slug: "naija-fashion-ecom",
    title: "E-commerce rebuild for a fashion brand",
    client: "Fashion label · Nigeria",
    tag: "Web Design",
    cover: "/products/portfolio-naija-fashion-ecom.jpg",
  },
  {
    slug: "estate-access-control",
    title: "Estate-wide access control deployment",
    client: "Residential estate · Abuja",
    tag: "Security",
    cover: "/products/portfolio-estate-access-control.jpg",
  },
];

export type TrainingHighlight = {
  slug: string;
  title: string;
  pitch: string;
  priceNGN: number;
  priceUSD: number;
};

export const trainingHighlights: TrainingHighlight[] = [
  { slug: "web-design-fundamentals", title: "Web Design Fundamentals", pitch: "Design clean, modern websites clients pay for.", priceNGN: 85000, priceUSD: 65 },
  { slug: "web-development-track", title: "Web Development Track", pitch: "Build and ship real websites with modern tools.", priceNGN: 180000, priceUSD: 135 },
  { slug: "digital-marketing-mastery", title: "Digital Marketing Mastery", pitch: "Run campaigns that bring leads, not just likes.", priceNGN: 120000, priceUSD: 90 },
  { slug: "e-business-startup", title: "E-Business Startup Track", pitch: "Launch an online business without guessing.", priceNGN: 110000, priceUSD: 85 },
  { slug: "content-creation-blogging", title: "Content Creation & Blogging", pitch: "Turn writing and content into income.", priceNGN: 75000, priceUSD: 55 },
];
