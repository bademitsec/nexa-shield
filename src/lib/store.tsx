import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

/* ================= CURRENCY ================= */

type Currency = "NGN" | "USD";
type CurrencyCtx = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  usdRate: number;
};
const CurrencyContext = createContext<CurrencyCtx | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("NGN");
  const [usdRate, setUsdRate] = useState<number>(1600);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("nx.currency") : null;
    if (stored === "USD" || stored === "NGN") setCurrencyState(stored);
    supabase
      .from("site_settings")
      .select("value")
      .eq("key", "usd_rate")
      .maybeSingle()
      .then(({ data }) => {
        const v = Number(data?.value ?? 1600);
        if (v > 0) setUsdRate(v);
      });
  }, []);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    if (typeof window !== "undefined") window.localStorage.setItem("nx.currency", c);
  }, []);

  const value = useMemo(() => ({ currency, setCurrency, usdRate }), [currency, setCurrency, usdRate]);
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}

/* ================= CART ================= */

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  priceNgn: number;
  depositPercent: number;
  image?: string;
  quantity: number;
  isSubscription: boolean;
  subscriptionInterval?: string | null;
  maxStock?: number;
};

type CartCtx = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotalNgn: number;
  depositNgn: number;
};
const CartContext = createContext<CartCtx | null>(null);
const STORAGE = "nx.cart.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const add = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: Math.min((item.maxStock ?? 999), i.quantity + item.quantity) }
            : i,
        );
      }
      return [...prev, item];
    });
  }, []);

  const remove = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.productId === productId ? { ...i, quantity: Math.max(1, qty) } : i))
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const { count, subtotalNgn, depositNgn } = useMemo(() => {
    let count = 0;
    let subtotalNgn = 0;
    let depositNgn = 0;
    for (const i of items) {
      count += i.quantity;
      const line = i.priceNgn * i.quantity;
      subtotalNgn += line;
      depositNgn += (line * i.depositPercent) / 100;
    }
    return { count, subtotalNgn, depositNgn: Math.round(depositNgn) };
  }, [items]);

  const value = useMemo(
    () => ({ items, add, remove, setQty, clear, count, subtotalNgn, depositNgn }),
    [items, add, remove, setQty, clear, count, subtotalNgn, depositNgn],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
