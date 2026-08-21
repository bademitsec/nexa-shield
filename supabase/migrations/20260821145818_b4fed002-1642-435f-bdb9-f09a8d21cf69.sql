CREATE TABLE IF NOT EXISTS public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  headline text not null default '',
  duration_hours integer not null default 0,
  price_ngn integer not null default 0,
  anchor_price_ngn integer not null default 0,
  badge text,
  outcomes jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

GRANT SELECT ON public.courses TO anon;
GRANT SELECT ON public.courses TO authenticated;
GRANT ALL ON public.courses TO service_role;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Active courses are publicly viewable" ON public.courses;
CREATE POLICY "Active courses are publicly viewable" ON public.courses
  FOR SELECT TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "Staff manage courses" ON public.courses;
CREATE POLICY "Staff manage courses" ON public.courses
  FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

CREATE TABLE IF NOT EXISTS public.training_enrollments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete restrict,
  full_name text not null,
  email text not null,
  phone text not null,
  country text not null default '',
  amount_paid integer not null default 0,
  payment_reference text not null unique,
  payment_status text not null default 'pending',
  enrolled_at timestamptz,
  created_at timestamptz not null default now()
);

CREATE INDEX IF NOT EXISTS training_enrollments_course_idx ON public.training_enrollments(course_id);
CREATE INDEX IF NOT EXISTS training_enrollments_email_idx ON public.training_enrollments(email);

GRANT ALL ON public.training_enrollments TO service_role;
GRANT SELECT ON public.training_enrollments TO authenticated;
ALTER TABLE public.training_enrollments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Staff view enrollments" ON public.training_enrollments;
CREATE POLICY "Staff view enrollments" ON public.training_enrollments
  FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));

INSERT INTO public.courses (slug,title,headline,duration_hours,price_ngn,anchor_price_ngn,badge,outcomes,sort_order)
VALUES
('web-development','Web Development','Build and launch client-ready websites in 16 hours — no prior coding experience needed.',16,350000,550000,'Most Popular',
 '["You''ll leave able to design, build, and deploy a real website from scratch","Includes a portfolio project you can show clients immediately","Learn the exact stack businesses pay for (not outdated tutorials)","Walk away ready to freelance, get hired, or build your own business online"]'::jsonb,1),
('digital-marketing-social-growth','Digital Marketing & Social Media Growth','Turn any Instagram or TikTok page into a sales channel — using the same strategy we use for Webfortix.',14,280000,450000,null,
 '["Learn paid ads, content strategy, and analytics that actually convert followers to customers","Build a real campaign for a business (yours or a client''s) during the course","Walk away able to charge businesses for social media management"]'::jsonb,2),
('cybersecurity-network-fundamentals','Cybersecurity & Network Security Fundamentals','Learn to secure networks and systems — one of the highest-demand, best-paid tech skills in Africa right now.',14,300000,480000,null,
 '["Hands-on with real security tools and scenarios, not just theory","Understand how businesses actually get hacked and how to prevent it","Certificate that signals real competency to employers"]'::jsonb,3),
('ecommerce-online-business-setup','E-commerce & Online Business Setup','Launch a fully working online store — from product to payment to first sale — in 12 hours.',12,250000,400000,null,
 '["Set up your own Shopify/e-commerce store live during the course","Learn payment integration, logistics, and customer acquisition","Leave with a store that''s actually open for business, not just a plan"]'::jsonb,4),
('content-creation-personal-branding','Content Creation & Personal Branding','Build a personal brand that gets you noticed — by employers, clients, or customers.',8,180000,300000,null,
 '["Learn to create content that doesn''t feel forced or scripted","Build a content system you can sustain, not burn out on","Walk away with your first month of content already planned"]'::jsonb,5)
ON CONFLICT (slug) DO UPDATE SET
  title=excluded.title, headline=excluded.headline, duration_hours=excluded.duration_hours,
  price_ngn=excluded.price_ngn, anchor_price_ngn=excluded.anchor_price_ngn, badge=excluded.badge,
  outcomes=excluded.outcomes, sort_order=excluded.sort_order, is_active=true, updated_at=now();