
CREATE TABLE IF NOT EXISTS public.integration_credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL,
  key_name text NOT NULL,
  secret_ref uuid NOT NULL,
  last4 text NOT NULL,
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(provider, key_name)
);

GRANT SELECT ON public.integration_credentials TO authenticated;
GRANT ALL ON public.integration_credentials TO service_role;
ALTER TABLE public.integration_credentials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view credential metadata"
  ON public.integration_credentials FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role) OR private.has_role(auth.uid(), 'staff'::public.app_role));

CREATE TRIGGER integration_credentials_touch
  BEFORE UPDATE ON public.integration_credentials
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  target_type text,
  target_id text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.admin_audit_log TO authenticated;
GRANT ALL ON public.admin_audit_log TO service_role;
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff view audit log"
  ON public.admin_audit_log FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role) OR private.has_role(auth.uid(), 'staff'::public.app_role));

CREATE OR REPLACE FUNCTION public.vault_write_secret(_name text, _value text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, vault
AS $$
DECLARE
  new_id uuid;
BEGIN
  SELECT vault.create_secret(_value, _name) INTO new_id;
  RETURN new_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.vault_read_secret(_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, vault
AS $$
DECLARE
  val text;
BEGIN
  SELECT decrypted_secret INTO val FROM vault.decrypted_secrets WHERE id = _id;
  RETURN val;
END;
$$;

CREATE OR REPLACE FUNCTION public.vault_delete_secret(_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, vault
AS $$
BEGIN
  DELETE FROM vault.secrets WHERE id = _id;
END;
$$;

REVOKE ALL ON FUNCTION public.vault_write_secret(text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.vault_read_secret(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.vault_delete_secret(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.vault_write_secret(text, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.vault_read_secret(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.vault_delete_secret(uuid) TO service_role;
