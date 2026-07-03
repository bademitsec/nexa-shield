
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;

DROP POLICY IF EXISTS "Anyone can submit a quote" ON public.quotes;
CREATE POLICY "Anyone can submit a quote" ON public.quotes
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 200
    AND length(email) BETWEEN 3 AND 320
    AND email LIKE '%_@__%.__%'
    AND length(message) BETWEEN 1 AND 5000
    AND coalesce(array_length(attachments, 1), 0) <= 10
  );
