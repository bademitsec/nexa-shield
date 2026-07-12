
REVOKE EXECUTE ON FUNCTION public.vault_write_secret(text, text) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.vault_read_secret(uuid) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.vault_delete_secret(uuid) FROM anon, authenticated;
