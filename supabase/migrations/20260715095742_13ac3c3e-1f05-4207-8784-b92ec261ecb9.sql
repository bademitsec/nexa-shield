UPDATE public.site_settings SET value = to_jsonb('2348139511908'::text) WHERE key = 'whatsapp_number';
UPDATE public.site_settings SET value = to_jsonb('support@webfortix.com'::text) WHERE key = 'company_email';
UPDATE public.site_settings SET value = to_jsonb('support@webfortix.com'::text) WHERE key = 'business_email';
UPDATE public.site_settings SET value = to_jsonb('+234 813 951 1908'::text) WHERE key = 'company_phone';
UPDATE public.site_settings SET value = to_jsonb('+234 813 951 1908'::text) WHERE key = 'business_phone';