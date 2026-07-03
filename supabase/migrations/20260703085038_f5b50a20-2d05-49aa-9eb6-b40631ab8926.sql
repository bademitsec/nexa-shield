
CREATE POLICY "Anyone can upload quote attachments" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'quote-attachments');

CREATE POLICY "Admins/staff read quote attachments" ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'quote-attachments'
    AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
  );
