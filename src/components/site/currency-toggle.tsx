import { useCurrency } from "@/lib/store";

export function CurrencyToggle({ className = "" }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();
  return (
    <div className={`inline-flex rounded-md border border-border/60 bg-background/50 p-0.5 text-xs ${className}`}>
      <button
        type="button"
        onClick={() => setCurrency("NGN")}
        className={`rounded px-2 py-1 transition ${currency === "NGN" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        NGN
      </button>
      <button
        type="button"
        onClick={() => setCurrency("USD")}
        className={`rounded px-2 py-1 transition ${currency === "USD" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        USD
      </button>
    </div>
  );
}
