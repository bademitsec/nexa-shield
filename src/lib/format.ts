export function formatNGN(amount: number | string | null | undefined): string {
  const n = Number(amount ?? 0);
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatUSD(amount: number | string | null | undefined): string {
  const n = Number(amount ?? 0);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);
}

export function ngnToUsd(ngn: number, rate: number): number {
  if (!rate || rate <= 0) return 0;
  return ngn / rate;
}

export function formatPrice(ngn: number | string | null | undefined, currency: "NGN" | "USD", rate: number): string {
  const n = Number(ngn ?? 0);
  return currency === "USD" ? formatUSD(ngnToUsd(n, rate)) : formatNGN(n);
}

export function formatDate(d: string | Date | null | undefined): string {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" });
}
