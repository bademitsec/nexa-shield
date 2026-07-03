This is a large multi-module build. I'll ship it in phases so you can review as we go, rather than dumping everything in one turn. Below is the plan — confirm and I'll start Phase 1.

## Stack & platform decisions

- **Frontend**: TanStack Start (React 19 + Vite), Tailwind v4, shadcn/ui — mobile-first.
- **Backend / DB / Auth / Storage**: Lovable Cloud (Postgres + Auth + file storage + server functions). Roles via a separate `user_roles` table with `has_role()` security-definer function (admin, staff, customer).
- **Payments**: Paystack (default for NGN, supports subscriptions + partial payments via split/authorization). Flutterwave optional later. Integrated via server routes + webhooks under `/api/public/webhooks/paystack`.
- **WhatsApp**: click-to-chat `wa.me` link (no API required).
- **Email/SMTP & campaigns**: Lovable Emails (built-in) for transactional (quote receipts, order confirmations, shipping). Campaign sending via a simple broadcast queue table + Lovable Emails. Admin can manage from dashboard.
- **Currency**: prices stored in NGN (kobo). USD toggle uses a daily FX rate cached in DB (admin-editable, optional live fetch later).
- **SEO**: per-route `head()` metadata, `sitemap.xml` server route, `robots.txt`, semantic HTML, JSON-LD for products & articles.

## Data model (Postgres)

```
profiles(id→auth.users, full_name, phone, whatsapp, created_at)
user_roles(id, user_id, role: admin|staff|customer)
addresses(id, user_id, line1, city, state, notes)

services(slug, title, summary, body_md, hero_image, order)
portfolio_items(id, slug, title, client, category, cover, gallery[], body_md, published)
blog_posts(id, slug, title, excerpt, cover, body_md, author_id, published_at, tags[])

product_categories(id, slug, name, parent_id)
products(id, slug, name, category_id, description, specs jsonb, images[],
         price_ngn, compare_at_ngn, stock, low_stock_threshold, active, is_subscription, billing_interval)
inventory_movements(id, product_id, delta, reason, created_by)

carts(id, user_id or session_id, created_at)
cart_items(cart_id, product_id, qty, unit_price_ngn)

orders(id, user_id, status, subtotal, shipping, total_ngn,
       deposit_pct, deposit_amount, balance_amount, deposit_status, balance_status,
       shipping_address jsonb, install_address jsonb, notes, created_at)
order_items(order_id, product_id, name_snapshot, qty, unit_price_ngn)
payments(id, order_id, provider, provider_ref, amount, kind: deposit|balance|full|subscription, status, raw jsonb)

subscriptions(id, user_id, product_id, paystack_sub_code, status, next_charge_at, cancelled_at)

quotes(id, name, email, phone, service_type, message, attachments[], status, assigned_to, created_at)

email_campaigns(id, subject, body_html, segment, status, scheduled_at, sent_at)
email_recipients(campaign_id, email, sent_at, opened_at)

fx_rates(code, rate_to_ngn, updated_at)
site_settings(key, value jsonb)  -- WhatsApp #, deposit % default, etc.
```

RLS: customers see only their orders/subscriptions/quotes; admins/staff see all via `has_role()`. Explicit GRANTs per table.

## Route map

Public:
- `/` home (3 pillars, CTAs)
- `/services/web-design`, `/services/digital-marketing`, `/services/home-security`
- `/portfolio`, `/portfolio/$slug`
- `/blog`, `/blog/$slug`
- `/shop`, `/shop/category/$slug`, `/shop/product/$slug`
- `/cart`, `/checkout`, `/checkout/success`
- `/contact` (quote form + file upload)
- `/auth` (sign in / sign up)
- `/sitemap.xml`, `/robots.txt`

Authenticated customer (`_authenticated/`):
- `/account`, `/account/orders`, `/account/orders/$id`, `/account/subscriptions`

Admin (`_authenticated/admin/` with role gate):
- `/admin` overview + analytics
- `/admin/orders`, `/admin/orders/$id`
- `/admin/inventory`
- `/admin/customers`
- `/admin/quotes`
- `/admin/subscriptions`
- `/admin/content/blog`, `/admin/content/portfolio`, `/admin/content/services`
- `/admin/campaigns`
- `/admin/settings` (WhatsApp #, deposit %, FX rate, SMTP/email domain, payment keys)

Server routes:
- `/api/public/webhooks/paystack` (signature-verified)
- `/api/public/cron/campaigns` (send queued)

## Phased delivery

**Phase 1 — Foundation (this next turn if approved)**
- Enable Lovable Cloud, set up design system (dark, security-tech feel — deep navy/steel + electric accent, NOT purple), Tailwind tokens
- Auth (email/password + Google), roles table + `has_role()`, `_authenticated` and admin gates
- Header/footer, homepage with 3 pillars, 3 service detail pages, contact/quote form with file upload to storage, WhatsApp float button
- SEO: per-route head, sitemap, robots

**Phase 2 — Content & portfolio**
- Blog list + detail, portfolio list + detail
- Admin CMS for blog / portfolio / services (markdown editor)

**Phase 3 — Store**
- Product catalog, categories, product detail, NGN/USD toggle
- Cart (persisted for signed-in, session for guest), checkout form
- Paystack integration: initialize transaction, verify webhook, deposit vs full payment option
- Order confirmation email, order tracking page

**Phase 4 — Subscriptions & orders admin**
- Paystack subscription plans for monitoring, customer subscription page, cancel flow
- Admin orders (status transitions, mark deposit/balance paid), inventory with low-stock alerts, customer DB, quote/lead pipeline

**Phase 5 — Analytics, campaigns, polish**
- Sales dashboard (revenue, top products, MRR)
- Email campaigns (compose, segment, schedule, send via cron)
- Settings screen for API keys, WhatsApp number, deposit %, FX rate
- Performance pass (image optimization, lazy loading), a11y & mobile QA

## Secrets I'll need from you (I'll prompt at the right phase, not now)
- Paystack **secret key** + **public key** (test first, live later)
- WhatsApp business phone number (E.164, e.g. +2348...)
- Company email domain for Lovable Emails (to send from `hello@yourdomain`)
- Optional: Google OAuth (I'll wire via Lovable's managed Google sign-in — no keys needed from you)

## Design direction
I'll go with a bold, security-tech aesthetic: dark background, high-contrast type, an electric cyan/lime accent, subtle grid/scanline motifs, and product-forward cards for the shop. If you want a lighter / warmer / more "consumer home" look instead, tell me now and I'll adjust before Phase 1.

---

Reply **"go"** to start Phase 1, or tell me what to change (scope, phase order, design direction, payment provider preference).