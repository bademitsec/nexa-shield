# Admin-managed API credentials + backend wiring

## Overview

Admin enters all third-party credentials (Paystack, Resend, Zoom) from the existing Settings page. Values are stored encrypted at rest in the database using Supabase Vault, read server-side only, and masked (last 4 chars) in dashboard responses. All backend functions read from Vault at request time so keys can be rotated without a redeploy.

## Phase 1 — Credential storage (foundation for everything else)

1. Migration: new `integration_credentials` table
   - `provider` (paystack | resend | zoom), `key_name`, `secret_ref` (Vault secret id), `last4`, `updated_by`, timestamps
   - RLS: admin/staff only via existing `has_role` function
   - Grants for `authenticated` + `service_role`
2. Server functions in `src/lib/credentials.functions.ts`:
   - `saveCredential({ provider, keyName, value })` — writes to Vault, upserts row, returns masked
   - `listCredentials()` — returns `[{ provider, keyName, last4, updatedAt }]` (never the value)
   - `deleteCredential({ provider, keyName })`
   - `testConnection({ provider })` — Paystack: GET `/transaction/totals`; Resend: GET `/domains`; Zoom: OAuth token fetch
3. Server helper `src/lib/credentials.server.ts`:
   - `getCredential(provider, keyName)` — reads from Vault, cached per-request
4. Settings page: replace the "secret keys note" block with a real **Integrations** panel — 3 cards (Paystack / Resend / Zoom), each with input fields, save button, masked display of saved keys, and **Test Connection** button.

## Phase 2 — Paystack hardening

- Update `src/lib/paystack.server.ts` to read secret + webhook secret from `getCredential()` (falls back to env for existing `PAYSTACK_SECRET_KEY`)
- Webhook route: verify signature against admin-saved webhook secret; on `charge.success` insert into `payments` and trigger order-confirmation email + receipt PDF
- Expose `PAYSTACK_PUBLIC_KEY` to checkout page via a server fn (not env)

## Phase 3 — Enrollments (post-payment training flow)

- Migration: `enrollments` table
  - `user_id`, `order_id`, `program_slug`, `program_title`, `amount_ngn`, `transaction_ref`, `requested_start_date`, `status` (pending_contact | contacted | scheduled), `zoom_meeting_url`, `zoom_meeting_id`, `admin_notes`, timestamps
- On successful Paystack payment for a training order, redirect user to new `/orders/$id/enroll` page with a date picker
- Save enrollment → send confirmation email (receipt + requested start date + "we'll be in touch" note)
- New admin route `/admin/enrollments` with status column and action buttons (Mark Contacted / Schedule)
- When admin clicks "Schedule", show datetime picker → creates Zoom meeting via server fn → saves URL → emails customer

## Phase 4 — Resend email + logs

- `src/lib/email.server.ts` — reads Resend API key from Vault, `sendEmail({ to, subject, html, tag })`
- Migration: `email_logs` table (`to`, `subject`, `template`, `status`, `provider_id`, `error`, `sent_at`)
- React Email templates: `OrderConfirmation`, `EnrollmentConfirmation`, `JobApplicationReceived`, `CampaignEmail` (brand-styled)
- Wired triggers:
  - Paystack webhook `charge.success` → OrderConfirmation + PDF receipt attachment
  - Enrollment insert → EnrollmentConfirmation
  - Contact form with `type=job` → JobApplicationReceived
- New admin route `/admin/email-logs` (paginated table)
- Test Connection button sends a test email to the admin's own email

## Phase 5 — PDF receipts

- `src/lib/receipt.server.ts` using `pdf-lib` (Worker-safe)
- Itemized: line items, amount, date, transaction ID, Webfortix business details, logo
- Attached to order confirmation email + downloadable from `/orders/$id` via a signed server route
- Stored ref logged in `payments.receipt_url`

## Phase 6 — Campaign send + tracking

- Wire existing Campaigns UI to Resend batch send:
  - Segment resolver: `all_customers` / `subscribers` / `leads` → recipient list from Supabase
  - "Send now" button → chunked batch through Resend, updates `email_campaigns.sent_count` + `sent_at` + `status='sent'`
- Add columns: `open_count`, `click_count`, `resend_broadcast_id`
- Public route `/api/public/resend/webhook` — verifies Resend signature, increments open/click counts

## Phase 7 — Zoom integration

- Zoom Server-to-Server OAuth: admin saves `ZOOM_ACCOUNT_ID`, `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET` via Integrations panel
- `src/lib/zoom.server.ts` — token cache + `createMeeting({ topic, start_time, duration, invitee_email })`
- Test Connection = fetch OAuth token
- Called from admin enrollment "Schedule" action

## Security guarantees

- All secret values stored in Supabase Vault (`vault.secrets`), never in plain columns
- No credential value ever returned by any server fn — only `last4`
- Admin-only RLS + `has_role('admin' | 'staff')` check on every credential fn
- Audit log table `admin_audit_log` records: who saved which key (no value), who sent which campaign, who changed enrollment status, who processed which payment
- All third-party calls read secrets at request time inside the handler — never at module scope

## Technical implementation notes

- Vault access: use `vault.create_secret(value, name)` → returns `id`; read via `select decrypted_secret from vault.decrypted_secrets where id = $1`. Wrapped in SECURITY DEFINER functions since `vault` schema is service-role-only
- Existing `PAYSTACK_SECRET_KEY` env var: `getCredential('paystack', 'secret_key')` falls back to `process.env.PAYSTACK_SECRET_KEY` when no vault row exists — zero downtime migration
- Zoom S2S token: cached in-memory per-Worker (1 hour TTL) to avoid re-auth per request
- PDF generation uses `pdf-lib` (pure JS, Worker-compatible) — no `sharp`/`puppeteer`
- Contact form job-application detection: existing `contact` route gains a `type` field

## Order of shipping

I'll build Phase 1 first (unblocks everything). Once you can save keys from Settings, phases 2→7 land in sequence. Total ~7 migrations, ~15 new server functions, 3 new admin routes.
