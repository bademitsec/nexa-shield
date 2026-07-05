
CREATE SCHEMA IF NOT EXISTS private;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role); $$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- Drop dependent storage policies first
DROP POLICY IF EXISTS "Anyone can upload quote attachments" ON storage.objects;
DROP POLICY IF EXISTS "Admins/staff read quote attachments" ON storage.objects;

DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins/staff view all profiles" ON public.profiles;
CREATE POLICY "Admins/staff view all profiles" ON public.profiles FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role));

DROP POLICY IF EXISTS "Admins/staff view all quotes" ON public.quotes;
DROP POLICY IF EXISTS "Admins/staff update quotes" ON public.quotes;
DROP POLICY IF EXISTS "Admins delete quotes" ON public.quotes;
CREATE POLICY "Admins/staff view all quotes" ON public.quotes FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role));
CREATE POLICY "Admins/staff update quotes" ON public.quotes FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role));
CREATE POLICY "Admins delete quotes" ON public.quotes FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins manage settings" ON public.site_settings;
CREATE POLICY "Admins manage settings" ON public.site_settings FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Anyone reads published projects" ON public.portfolio_projects;
DROP POLICY IF EXISTS "Admins/staff manage projects" ON public.portfolio_projects;
CREATE POLICY "Anyone reads published projects" ON public.portfolio_projects FOR SELECT USING (published = true OR private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role));
CREATE POLICY "Admins/staff manage projects" ON public.portfolio_projects FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role));

DROP POLICY IF EXISTS "Anyone reads published posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins/staff manage posts" ON public.blog_posts;
CREATE POLICY "Anyone reads published posts" ON public.blog_posts FOR SELECT USING (published = true OR private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role));
CREATE POLICY "Admins/staff manage posts" ON public.blog_posts FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role));

DROP POLICY IF EXISTS "Staff manage categories" ON public.product_categories;
CREATE POLICY "Staff manage categories" ON public.product_categories FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role));

DROP POLICY IF EXISTS "Staff view all products" ON public.products;
DROP POLICY IF EXISTS "Staff manage products" ON public.products;
CREATE POLICY "Staff view all products" ON public.products FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role));
CREATE POLICY "Staff manage products" ON public.products FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role));

DROP POLICY IF EXISTS "Users view own orders" ON public.orders;
DROP POLICY IF EXISTS "Staff update orders" ON public.orders;
CREATE POLICY "Users view own orders" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id OR private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role));
CREATE POLICY "Staff update orders" ON public.orders FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role));

DROP POLICY IF EXISTS "View own order items" ON public.order_items;
CREATE POLICY "View own order items" ON public.order_items FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_items.order_id AND (o.user_id = auth.uid() OR private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role))));

DROP POLICY IF EXISTS "View own payments" ON public.payments;
CREATE POLICY "View own payments" ON public.payments FOR SELECT TO authenticated USING (auth.uid() = user_id OR private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role));

DROP POLICY IF EXISTS "View own subscriptions" ON public.subscriptions;
DROP POLICY IF EXISTS "Staff manage subscriptions" ON public.subscriptions;
CREATE POLICY "View own subscriptions" ON public.subscriptions FOR SELECT TO authenticated USING (auth.uid() = user_id OR private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role));
CREATE POLICY "Staff manage subscriptions" ON public.subscriptions FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role));

DROP POLICY IF EXISTS "Staff view inventory" ON public.inventory_movements;
DROP POLICY IF EXISTS "Staff insert inventory" ON public.inventory_movements;
CREATE POLICY "Staff view inventory" ON public.inventory_movements FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role));
CREATE POLICY "Staff insert inventory" ON public.inventory_movements FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role));

DROP POLICY IF EXISTS "Staff manage campaigns" ON public.email_campaigns;
CREATE POLICY "Staff manage campaigns" ON public.email_campaigns FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role));

DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated;

CREATE POLICY "Quote attachments upload restricted"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (
  bucket_id = 'quote-attachments'
  AND (
    (auth.uid() IS NOT NULL AND (storage.foldername(name))[1] = auth.uid()::text)
    OR (auth.uid() IS NULL AND (storage.foldername(name))[1] = 'anon')
  )
  AND lower(storage.extension(name)) IN ('jpg','jpeg','png','webp','gif','pdf','heic','heif')
);

CREATE POLICY "Admins/staff read quote attachments"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'quote-attachments' AND (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role)));

CREATE POLICY "Admins/staff update quote attachments"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'quote-attachments' AND (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role)))
WITH CHECK (bucket_id = 'quote-attachments' AND (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role)));

CREATE POLICY "Admins/staff delete quote attachments"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'quote-attachments' AND (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role)));
