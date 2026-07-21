# Webfortix Growth & Conversion Upgrade

This is a large change set. I'll ship it in 5 phases so each lands stable and reviewable. Anything time-sensitive (pixel IDs, PDF files, exact stat numbers) uses placeholders you can edit later via Supabase or a config file.

## Phase 1 — Homepage, Training pillar, Social proof, Schema

- Homepage (`src/routes/index.tsx`):
  - "Three services. One team." → "Four services. One team."
  - Add **Training** service card (GraduationCap icon, link to `/training`)
  - New **Featured: Training** section listing 5 paid programs with NGN/USD price via existing `<Price/>` component + "View training programs" and "Enroll now" CTAs
  - New **Social Proof** section between services grid and Home Security feature:
    - Stats row (clients served, installs completed, sites launched, training graduates) — values read from `site_settings` (editable in Supabase)
    - Testimonials grid (3 cards, service tag)
    - 3–4 featured portfolio thumbnails pulled from `portfolio_projects` (featured=true), each opening the existing case study dialog
- Add LocalBusiness JSON-LD to homepage + Home Security page (service areas Lagos, Abuja, Port Harcourt)
- Persistent WhatsApp button — already exists; extend to accept a per-page prefilled message and use it on service/training/shop pages

## Phase 2 — Lead routing, UTM tracking, SEO copy

- Migration:
  - `quotes` table: add `service_type`, `utm_source`, `utm_medium`, `utm_campaign`, `source_tag`, `referral_code`
- Contact form (`src/routes/contact.tsx`): required "Service Interested In" dropdown; capture UTM params from URL (persisted per session)
- Admin quotes inbox (`src/routes/admin.quotes.tsx`): filter chips by service_type, columns for source + UTM, simple source breakdown table
- WhatsApp links on each service page + `/training` prefilled with service name
- SEO: update meta titles/descriptions + H1/H2 on 4 pages per spec; add Lagos/Abuja/Port Harcourt content blocks on Home Security page

## Phase 3 — Shop lead capture + Lead magnets

- Shop product cards + detail dialog: secondary CTA "Not sure what you need? Get a free installation quote" → opens dialog form → writes to `quotes` with `service_type='home-security'`, `source_tag='shop'`
- Migration: `lead_magnets` table (name, email, phone, resource, service_type_interest)
- New route `/resources`: two downloadable guides ("Home Security Checklist", "Website Audit Guide"). Form captures details, then reveals a placeholder PDF link (you'll upload the real PDFs to Supabase Storage `resources` bucket later)

## Phase 4 — Exit intent, Client dashboard entry, Tracking pixels

- Exit-intent popup component (mounted in `__root.tsx`):
  - Desktop: `mouseleave` top-edge; Mobile: 30s OR 50% scroll
  - Once per session (`sessionStorage`); suppressed after any form submit sets `wf_form_submitted`
  - CTA: name + WhatsApp capture → `quotes` (source_tag='exit-intent')
- `/auth` copy update + homepage sub-nav pill "Existing client? Sign in to track your project"
- Tracking pixels:
  - Add Meta Pixel + GTM snippets in `__root.tsx` head, gated by `VITE_META_PIXEL_ID` / `VITE_GTM_ID` (placeholders until you provide IDs — no network calls when empty)
  - `src/lib/analytics.ts` helper firing `PageView`, `Lead`, `AddToCart`, `LeadMagnetDownload` events, called from the relevant handlers

## Phase 5 — Referral program

- Migration:
  - `profiles.referral_code` (unique, generated on first paid order via trigger on `orders.status='paid'`)
  - `quotes.referral_by_code`, `quotes.referral_reward_status`
- New route `/refer`: signed-in clients see their code + shareable link; non-clients see explainer + CTA to purchase
- Checkout + contact form: optional "Referral code" field, validated server-side

## Out of scope for this pass (call out for later)
- Real testimonial content (using tasteful placeholders)
- Real PDF files for lead magnets (upload later)
- Actual Meta Pixel / GTM IDs
- Rewards fulfillment workflow beyond marking `referral_reward_status='pending'`

## Order I'll ship

Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5, each as its own change. Reply "go" to start Phase 1, or tell me to reorder / drop anything.