
DO $$ BEGIN
  CREATE TYPE public.job_application_status AS ENUM ('new','reviewing','shortlisted','rejected','hired');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Helper to check staff/admin via user_roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin','staff')
  )
$$;

CREATE TABLE public.job_vacancies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  employment_type TEXT NOT NULL DEFAULT 'Full-time',
  location TEXT NOT NULL DEFAULT 'Remote — Open to candidates in Nigeria, Kenya, South Africa, Egypt, Ghana, Morocco, Rwanda, Tanzania, Uganda & Ivory Coast',
  short_description TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  responsibilities TEXT[] NOT NULL DEFAULT '{}',
  requirements TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  posted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.job_vacancies TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_vacancies TO authenticated;
GRANT ALL ON public.job_vacancies TO service_role;

ALTER TABLE public.job_vacancies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active vacancies are public"
  ON public.job_vacancies FOR SELECT
  USING (is_active = TRUE OR public.is_staff(auth.uid()));

CREATE POLICY "Staff manage vacancies"
  ON public.job_vacancies FOR ALL
  TO authenticated
  USING (public.is_staff(auth.uid()))
  WITH CHECK (public.is_staff(auth.uid()));

CREATE TRIGGER job_vacancies_updated_at
  BEFORE UPDATE ON public.job_vacancies
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vacancy_id UUID REFERENCES public.job_vacancies(id) ON DELETE SET NULL,
  vacancy_slug TEXT,
  vacancy_title TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT NOT NULL,
  country_other TEXT,
  portfolio_url TEXT,
  cover_letter TEXT NOT NULL,
  resume_url TEXT,
  status public.job_application_status NOT NULL DEFAULT 'new',
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.job_applications TO anon;
GRANT INSERT ON public.job_applications TO authenticated;
GRANT ALL ON public.job_applications TO service_role;

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an application"
  ON public.job_applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (TRUE);

CREATE POLICY "Staff read all applications"
  ON public.job_applications FOR SELECT
  TO authenticated
  USING (public.is_staff(auth.uid()));

CREATE POLICY "Staff update applications"
  ON public.job_applications FOR UPDATE
  TO authenticated
  USING (public.is_staff(auth.uid()))
  WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "Staff delete applications"
  ON public.job_applications FOR DELETE
  TO authenticated
  USING (public.is_staff(auth.uid()));

CREATE INDEX idx_job_applications_vacancy ON public.job_applications(vacancy_id);
CREATE INDEX idx_job_applications_country ON public.job_applications(country);
CREATE INDEX idx_job_applications_status ON public.job_applications(status);

CREATE TRIGGER job_applications_updated_at
  BEFORE UPDATE ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

INSERT INTO public.job_vacancies (slug, title, department, employment_type, short_description, description, responsibilities, requirements, sort_order) VALUES
('sales-customer-support-rep', 'Sales & Customer Support Representative', 'Sales', 'Full-time',
  'Handle inbound leads across web, marketing, training and security lines. Convert enquiries and support existing customers.',
  'You''ll be the first point of contact for Webfortix prospects and customers across our web, marketing, training and security lines. You own inbound response quality, quote follow-ups, and after-sale support.',
  ARRAY['Respond to inbound enquiries within 1 business hour','Qualify leads and route them to the right specialist','Follow up on quotes and close warm deals','Handle post-sale support tickets and escalate to specialists'],
  ARRAY['1+ year customer-facing sales/support experience','Excellent written English','Comfortable on WhatsApp, email, and video calls','CRM familiarity (HubSpot/Zoho/Airtable) a plus'], 10),
('digital-marketing-executive', 'Digital Marketing Executive', 'Digital Marketing', 'Full-time',
  'Own paid + organic campaigns across Meta, Google, and TikTok for our services and clients.',
  'Plan, launch, and optimise paid + organic campaigns across Meta, Google, TikTok, and LinkedIn — both for Webfortix and for client accounts.',
  ARRAY['Build and manage paid campaigns end-to-end','Report on CAC, ROAS, and pipeline weekly','Coordinate creative with the design + content team','Own SEO briefs and content calendars'],
  ARRAY['2+ years running paid ads with a real budget','Strong analytics skills (GA4, Meta Ads Manager)','Case studies you can walk us through','Bonus: African-market experience'], 20),
('web-developer', 'Web Developer', 'Engineering', 'Full-time',
  'Ship marketing sites, web apps, and e-commerce on React/TypeScript. Fast, accessible, SEO-ready.',
  'Build production websites and web apps for Webfortix and our clients on a modern React/TypeScript stack. Ship fast, accessible, SEO-ready work.',
  ARRAY['Build client sites end-to-end (design handoff → launch)','Own performance, accessibility, and SEO basics','Integrate CMS, payments, and third-party APIs','Contribute to internal component library'],
  ARRAY['2+ years professional React/TypeScript','Tailwind, Next/TanStack/Vite experience','Portfolio of shipped work','Bonus: Supabase/Postgres, Cloudflare Workers'], 30),
('content-creator-copywriter', 'Content Creator & Copywriter', 'Content', 'Full-time',
  'Write for the Webfortix blog, service pages, campaign emails, and short-form social.',
  'Turn our services and case studies into content that ranks and converts — blog articles, service pages, campaign emails, short-form social scripts.',
  ARRAY['Publish 4+ SEO-optimised articles per month','Write ad copy, email campaigns, landing page copy','Interview clients + engineers for case studies','Repurpose long-form into social + video scripts'],
  ARRAY['Published portfolio (personal blog / brand work / Substack)','Working SEO knowledge','Comfortable interviewing subject-matter experts','Bonus: video scripting'], 40),
('training-program-coordinator', 'Training Program Coordinator', 'Training', 'Full-time',
  'Own the end-to-end learner experience for Webfortix training cohorts.',
  'Run the operations behind our paid training programs — cohort scheduling, learner onboarding, Zoom logistics, mentor coordination, and completion certificates.',
  ARRAY['Schedule cohorts and coordinate mentors','Onboard learners and manage the LMS','Own attendance, feedback surveys, and certification','Coordinate with marketing on cohort launches'],
  ARRAY['Ops or program-management experience','Very organised — you live in checklists','Comfortable with Zoom, Notion/Airtable, Google Workspace','Bonus: EdTech experience'], 50),
('business-development-partnerships-lead', 'Business Development & Partnerships Lead', 'Business Development', 'Full-time',
  'Open new revenue channels: agency partners, resellers, corporate training clients.',
  'Open new revenue channels for Webfortix — agency partners, security integrators, resellers, and corporate training clients across our priority markets.',
  ARRAY['Build partner + reseller pipeline','Close corporate training contracts','Represent Webfortix at events and on LinkedIn','Negotiate MOUs and commercial terms'],
  ARRAY['3+ years B2B sales / partnerships','Existing network in tech, security, or agency space','Strong deck + proposal writing','Bonus: multi-country African market experience'], 60),
('graphic-designer', 'Graphic Designer', 'Design', 'Full-time',
  'Design brand + campaign assets across web, social, ads, and pitch decks.',
  'Design brand and campaign assets across web, social, ads, and pitch decks — for Webfortix and for client work.',
  ARRAY['Own visual identity across campaigns','Design landing pages, ad creatives, and social sets','Support the web team with UI mockups in Figma','Produce sales decks and one-pagers'],
  ARRAY['Strong Figma portfolio','Understanding of brand systems + type','Motion / after-effects a bonus','Bonus: light UI/UX chops'], 70),
('security-systems-product-specialist', 'Security Systems Product Specialist', 'Security & Automation', 'Full-time',
  'Own the CCTV, alarm, and automation catalogue: sourcing, spec writing, technical training.',
  'Own the Webfortix security catalogue: sourcing, spec sheets, installer training material, and technical pre-sales support for CCTV, NVRs, alarms, smart locks, and automation.',
  ARRAY['Curate + spec the hardware catalogue','Write installer + customer-facing documentation','Support pre-sales with technical scoping','Vet new suppliers and evaluate new product lines'],
  ARRAY['3+ years working with CCTV / access control / alarms','Deep vendor knowledge (Hikvision, Dahua, Ajax, etc.)','Comfortable writing technical documentation','Bonus: installation background'], 80),
('bookkeeper-finance-assistant', 'Bookkeeper / Finance Assistant', 'Finance', 'Part-time',
  'Own day-to-day books: invoices, receipts, payroll support, and monthly reconciliation.',
  'Own day-to-day bookkeeping for Webfortix — invoices, receipts, payroll support, Paystack reconciliations, monthly management accounts.',
  ARRAY['Reconcile Paystack + bank statements weekly','Issue invoices and chase receivables','Prepare monthly P&L for management','Coordinate with external accountant on filings'],
  ARRAY['Accounting qualification or 2+ years bookkeeping','Comfortable in Xero / QuickBooks / Zoho Books','Very organised, detail-obsessed','Bonus: multi-currency experience'], 90),
('social-media-community-manager', 'Social Media & Community Manager', 'Marketing', 'Full-time',
  'Run Webfortix''s social presence and community across LinkedIn, IG, X, TikTok, and YouTube.',
  'Run Webfortix''s social presence and community across LinkedIn, Instagram, X, TikTok, and YouTube — content calendar, publishing, engagement, and community-building.',
  ARRAY['Own the content calendar across 3+ platforms','Publish daily and reply within business hours','Grow followers + engagement against clear targets','Coordinate with design + content team on assets'],
  ARRAY['1+ year running a real brand social account','Native short-form video instinct','Copy that sounds like a human, not a brand','Bonus: light editing (CapCut / Premiere)'], 100);
