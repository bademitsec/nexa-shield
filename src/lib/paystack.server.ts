// Server-only Paystack API wrapper. Never import into browser code.

const BASE = "https://api.paystack.co";

function key() {
  const k = process.env.PAYSTACK_SECRET_KEY;
  if (!k) throw new Error("PAYSTACK_SECRET_KEY is not configured");
  return k;
}

async function pk(path: string, init?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${key()}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || (json as { status?: boolean }).status === false) {
    throw new Error((json as { message?: string })?.message || `Paystack ${res.status}`);
  }
  return json as { status: boolean; message: string; data: Record<string, unknown> };
}

export async function initializeTransaction(input: {
  email: string;
  amountKobo: number;
  reference: string;
  callbackUrl: string;
  metadata?: Record<string, unknown>;
}) {
  return pk("/transaction/initialize", {
    method: "POST",
    body: JSON.stringify({
      email: input.email,
      amount: input.amountKobo,
      reference: input.reference,
      callback_url: input.callbackUrl,
      metadata: input.metadata ?? {},
    }),
  });
}

export async function verifyTransaction(reference: string) {
  return pk(`/transaction/verify/${encodeURIComponent(reference)}`);
}

export function verifyWebhookSignature(rawBody: string, signature: string | null): boolean {
  if (!signature) return false;
  const secret = key();
  // Paystack signs with HMAC-SHA512
  // Use Web Crypto (available on Workers)
  return computeHmacHex(rawBody, secret).then((sig) => timingSafeEqualHex(sig, signature)) as unknown as boolean;
}

async function computeHmacHex(body: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-512" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(body));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function verifyWebhook(rawBody: string, signature: string | null): Promise<boolean> {
  if (!signature) return false;
  const sig = await computeHmacHex(rawBody, key());
  return timingSafeEqualHex(sig, signature);
}
