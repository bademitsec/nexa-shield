import { useCurrency } from "@/lib/store";
import { formatPrice } from "@/lib/format";

export function Price({ ngn, className = "" }: { ngn: number | string | null | undefined; className?: string }) {
  const { currency, usdRate } = useCurrency();
  return <span className={className}>{formatPrice(ngn, currency, usdRate)}</span>;
}
