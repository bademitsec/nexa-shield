// Single source of truth for the 10 African markets Webfortix serves.
// Keep this in sync with careers-countries.ts (which re-exports these
// names as the priority list).

export type OperatingCountry = {
  name: string;
  code: string; // ISO-3166-1 alpha-2
  hq?: boolean;
};

export const OPERATING_COUNTRIES: OperatingCountry[] = [
  { name: "Nigeria", code: "NG", hq: true },
  { name: "Kenya", code: "KE" },
  { name: "South Africa", code: "ZA" },
  { name: "Egypt", code: "EG" },
  { name: "Ghana", code: "GH" },
  { name: "Morocco", code: "MA" },
  { name: "Rwanda", code: "RW" },
  { name: "Tanzania", code: "TZ" },
  { name: "Uganda", code: "UG" },
  { name: "Ivory Coast", code: "CI" },
];

export const OPERATING_COUNTRY_NAMES = OPERATING_COUNTRIES.map((c) => c.name);

// Nigerian clients are billed in NGN; everyone else defaults to USD.
export function currencyForCountry(country: string | null | undefined): "NGN" | "USD" {
  if (!country) return "NGN";
  return country.trim().toLowerCase() === "nigeria" ? "NGN" : "USD";
}

// Install / on-site service is currently limited to these Nigerian cities.
export const INSTALL_CITIES = ["Lagos", "Abuja", "Port Harcourt"] as const;

// Reusable copy so notes stay consistent across product/checkout/training pages.
export const IMPORT_DUTIES_NOTICE =
  "Import duties, customs fees, and clearance charges may apply depending on your country's regulations and are the responsibility of the customer. Estimated delivery timelines vary by country.";

export const SHIPPING_TIMELINE_NOTICE =
  "Shipping and delivery timelines vary by country — logistics differ across our 10 African markets.";
