-- Seed products (idempotent). Categories must already exist.
-- Generated from live DB snapshot so the shop catalog is committed to source control.

DO $seed$
DECLARE
  v_cat_id uuid;
BEGIN
  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('nx-nvr-8ch-2tb', '8-Channel PoE NVR (2TB)', '8 PoE ports, 2TB surveillance HDD', '8-channel network video recorder with built-in PoE switch and pre-installed 2TB surveillance-grade hard drive. Supports up to 4K per channel.', '{"storage": "2TB surveillance HDD", "channels": 8, "poe_ports": 8, "max_resolution": "4K per channel"}'::jsonb, ARRAY['/products/nx-nvr-8ch-2tb.jpg']::text[], 310000.0, NULL, 65, 10, 2, TRUE, TRUE, FALSE, NULL, NULL, 'NX-NVR-8CH', (SELECT id FROM public.product_categories WHERE slug = 'nvrs-dvrs'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('nx-nvr-16ch-4tb', '16-Channel PoE NVR (4TB)', 'Enterprise-grade 16ch NVR with 4TB', '16-channel enterprise NVR with 16 PoE ports and 4TB storage. Perfect for large residences, offices and estates.', '{"storage": "4TB surveillance HDD", "channels": 16, "poe_ports": 16, "max_resolution": "4K per channel"}'::jsonb, ARRAY['/products/nx-nvr-16ch-4tb.jpg']::text[], 580000.0, NULL, 60, 6, 2, TRUE, FALSE, FALSE, NULL, NULL, 'NX-NVR-16CH', (SELECT id FROM public.product_categories WHERE slug = 'nvrs-dvrs'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('nx-lock-bio', 'Nexashield Biometric Smart Lock', 'Fingerprint + PIN + card + app', 'Smart deadbolt with fingerprint reader, PIN pad, RFID card and mobile app control. WiFi bridge included for remote access.', '{"battery": "4x AA (12 months)", "material": "Zinc alloy", "unlock_methods": "Fingerprint, PIN, RFID, App, Key"}'::jsonb, ARRAY['/products/nx-lock-bio.jpg']::text[], 145000.0, 175000.0, 70, 20, 5, TRUE, TRUE, FALSE, NULL, NULL, 'NX-LOCK-BIO', (SELECT id FROM public.product_categories WHERE slug = 'smart-locks'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('nx-alarm-starter', 'Wireless Alarm Starter Kit', 'Hub + 4 sensors + siren + app', 'Wireless alarm system with GSM/WiFi hub, 3 door/window sensors, 1 PIR motion sensor, indoor siren and companion mobile app.', '{"siren_db": 110, "connectivity": "WiFi + GSM", "backup_battery": "8 hours", "sensors_included": 4}'::jsonb, ARRAY['/products/nx-alarm-starter.jpg']::text[], 95000.0, NULL, 70, 12, 3, TRUE, FALSE, FALSE, NULL, NULL, 'NX-ALM-STR', (SELECT id FROM public.product_categories WHERE slug = 'alarms-sensors'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('plan-monitoring-home', 'Cloud Monitoring — Home Plan', '24/7 monitoring, 7-day cloud storage', 'Monthly plan: 24/7 remote monitoring by our security team, 7-day rolling cloud video storage for up to 4 cameras, mobile alerts and monthly health report.', '{"cameras": "Up to 4", "monitoring": "24/7", "cloud_retention": "7 days"}'::jsonb, ARRAY['/products/plan-monitoring-home.jpg']::text[], 15000.0, NULL, 100, 999, 0, TRUE, TRUE, TRUE, 'monthly', NULL, 'NX-PLAN-HOME', (SELECT id FROM public.product_categories WHERE slug = 'monitoring-plans'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('plan-monitoring-business', 'Cloud Monitoring — Business Plan', '24/7 monitoring, 30-day cloud storage', 'Monthly plan for offices and estates: 24/7 monitoring for up to 16 cameras, 30-day cloud retention, dedicated response line and quarterly on-site health check.', '{"cameras": "Up to 16", "monitoring": "24/7 priority", "cloud_retention": "30 days"}'::jsonb, ARRAY['/products/plan-monitoring-business.jpg']::text[], 50000.0, NULL, 100, 999, 0, TRUE, FALSE, TRUE, 'monthly', NULL, 'NX-PLAN-BIZ', (SELECT id FROM public.product_categories WHERE slug = 'monitoring-plans'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('compound-perimeter-kit-4-cams', 'Compound Perimeter Kit — 4 Cams', 'Everything to cover four corners of a home or shop in one box.', 'Four 2MP outdoor bullet cameras with all mounting brackets, 20m of cable per camera, connectors and a shared 4-way power supply. Add a DVR and you have a full compound covered in an afternoon.', '{"tech": {"cable": "20m per camera", "power": "Shared 12V 4-way", "cameras": "4", "warranty": "1 year", "resolution": "2MP each"}, "features": ["4\u00d7 2MP 1080p outdoor bullet cameras", "4\u00d7 mounting brackets and screw packs", "4\u00d7 20m siamese video/power cables", "1\u00d7 4-channel 12V power supply", "Compatible with any HD DVR"], "use_case": "Home compounds, small shops and offices doing a complete first-time CCTV install on a budget.", "hook_line": "Everything to cover four corners of a home or shop in one box.", "price_usd": 120, "image_brief": "Flat-lay of four white bullet cameras, mounting brackets, coils of cable and a power supply arranged on a workbench.", "recommended_for": "Home"}'::jsonb, ARRAY['/products/compound-perimeter-kit-4-cams.jpg']::text[], 165000.0, NULL, 50, 25, 5, TRUE, TRUE, FALSE, NULL, NULL, 'WFX-CCTV-14', (SELECT id FROM public.product_categories WHERE slug = 'cctv-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('fortress-8mp-motorised-zoom', 'Fortress 8MP Motorised Zoom', 'Zoom remotely from your app — no more ladder trips to adjust the lens.', 'A motorised 2.8–12mm lens you control from the DVR or app. Set the frame from your desk, zoom in during an incident review, then zoom back out. 8MP resolution means you keep detail even fully zoomed.', '{"tech": {"lens": "2.8\u201312mm motorised", "power": "12V DC", "ip_rating": "IP67", "resolution": "8MP 4K", "night_vision": "50m EXIR"}, "features": ["8MP 4K UHD resolution", "50m EXIR night vision", "2.8\u201312mm motorised zoom lens", "Remote zoom & focus from app", "IP67 metal housing with sunshield"], "use_case": "Mission-critical mounts on high poles or rooftops where physically adjusting the lens is inconvenient.", "hook_line": "Zoom remotely from your app \u2014 no more ladder trips to adjust the lens.", "price_usd": 105, "image_brief": "Large grey bullet camera high on a metal pole overlooking a compound entrance.", "recommended_for": "Enterprise"}'::jsonb, ARRAY['/products/fortress-8mp-motorised-zoom.jpg']::text[], 145000.0, NULL, 50, 25, 5, FALSE, TRUE, FALSE, NULL, NULL, 'WFX-CCTV-11', (SELECT id FROM public.product_categories WHERE slug = 'cctv-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('guardian-colour-night-bullet', 'Guardian Colour-Night Bullet', 'Full-colour footage after dark — no more black-and-white night video.', 'A large aperture and a warm-white LED that only fires on motion. Result: crisp colour night footage that lets you actually tell blue clothes from black — the detail that matters in an investigation.', '{"tech": {"lens": "2.8mm fixed", "audio": "Built-in mic", "ip_rating": "IP66", "resolution": "5MP", "night_vision": "30m colour + LED"}, "features": ["5MP Super HD resolution", "30m full-colour night vision", "Warm-light LED with motion trigger", "Built-in mic for audio", "IP66 weatherproof"], "use_case": "Storefronts, forecourts and car parks where identifying colour of clothing or vehicles is critical.", "hook_line": "Full-colour footage after dark \u2014 no more black-and-white night video.", "price_usd": 60, "image_brief": "White bullet camera with visible warm LED lamp, mounted above a shop entrance at night.", "recommended_for": "Small Business"}'::jsonb, ARRAY['/products/guardian-colour-night-bullet.jpg']::text[], 85000.0, NULL, 50, 25, 5, FALSE, TRUE, FALSE, NULL, NULL, 'WFX-CCTV-06', (SELECT id FROM public.product_categories WHERE slug = 'cctv-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('sentinel-2mp-outdoor-bullet', 'Sentinel 2MP Outdoor Bullet', 'Weatherproof 1080p bullet for gates, entrances and driveways.', 'Rugged metal-housing bullet camera rated for direct sun and rain. 1080p resolution with night vision up to 30m — enough to clearly identify a face at the gate. Ships with a mounting bracket.', '{"tech": {"lens": "3.6mm fixed", "power": "12V DC", "ip_rating": "IP66", "resolution": "2MP (1920\u00d71080)", "night_vision": "30m IR"}, "features": ["1080p Full HD resolution", "30m IR night vision", "IP66 weatherproof metal housing", "3.6mm lens (~75\u00b0 view)", "12V DC low power draw"], "use_case": "Front gates, driveways, entrances, warehouse doors and any outdoor point-of-interest that needs a fixed clear view.", "hook_line": "Weatherproof 1080p bullet for gates, entrances and driveways.", "price_usd": 28, "image_brief": "Metal white bullet-style CCTV camera mounted under an eave, pointed at a driveway.", "recommended_for": "Home"}'::jsonb, ARRAY['/products/sentinel-2mp-outdoor-bullet.jpg']::text[], 38000.0, NULL, 50, 25, 5, FALSE, TRUE, FALSE, NULL, NULL, 'WFX-CCTV-02', (SELECT id FROM public.product_categories WHERE slug = 'cctv-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('sentinel-5mp-varifocal-bullet', 'Sentinel 5MP Varifocal Bullet', 'Zoom in on faces and plates from 40m away with a 5MP varifocal lens.', 'A 5MP camera with an adjustable 2.8–12mm lens — install once, then dial the zoom to frame exactly what matters. Ideal for long driveways, perimeter fences and car parks where a fixed lens wastes half the frame.', '{"tech": {"lens": "2.8\u201312mm varifocal", "power": "12V DC", "ip_rating": "IP67", "resolution": "5MP (2560\u00d71920)", "night_vision": "40m Smart IR"}, "features": ["5MP Super HD resolution", "40m Smart IR night vision", "2.8\u201312mm varifocal lens", "IP67 metal housing", "Motion-triggered recording support"], "use_case": "Long driveways, car parks, perimeter fences and any spot where the subject sits 15\u201340m from the camera.", "hook_line": "Zoom in on faces and plates from 40m away with a 5MP varifocal lens.", "price_usd": 50, "image_brief": "Grey outdoor bullet camera with a large lens ring, mounted on a pole overlooking a parking lot.", "recommended_for": "Small Business"}'::jsonb, ARRAY['/products/sentinel-5mp-varifocal-bullet.jpg']::text[], 72000.0, NULL, 50, 25, 5, FALSE, TRUE, FALSE, NULL, NULL, 'WFX-CCTV-03', (SELECT id FROM public.product_categories WHERE slug = 'cctv-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('sentinel-pro-4k-bullet', 'Sentinel Pro 4K Bullet', 'True 8MP 4K bullet for the widest, sharpest coverage in the range.', 'Top of the analog line — 4K UHD resolution across a wide field of view. Reads number plates, faces and product labels at distances where lower-resolution cameras just show blur. Pairs with any 4K-capable DVR.', '{"tech": {"lens": "3.6mm fixed", "power": "12V DC", "ip_rating": "IP67", "resolution": "8MP 4K UHD", "night_vision": "60m EXIR"}, "features": ["8MP (4K UHD) resolution", "60m IR night vision with EXIR array", "3.6mm wide-angle lens", "IP67 metal housing with sunshield", "Requires 4K-capable DVR/NVR"], "use_case": "Petrol stations, warehouse yards, dealerships and any site where you need to identify people or vehicles at range.", "hook_line": "True 8MP 4K bullet for the widest, sharpest coverage in the range.", "price_usd": 100, "image_brief": "Large grey metal bullet CCTV camera with sunshield, mounted high on a warehouse wall.", "recommended_for": "Enterprise"}'::jsonb, ARRAY['/products/sentinel-pro-4k-bullet.jpg']::text[], 135000.0, NULL, 50, 25, 5, FALSE, TRUE, FALSE, NULL, NULL, 'WFX-CCTV-05', (SELECT id FROM public.product_categories WHERE slug = 'cctv-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('compound-perimeter-kit-8-cams', 'Compound Perimeter Kit — 8 Cams', 'Bigger compound? Eight cameras, one box, one afternoon install.', 'Doubles up the 4-cam kit for larger homes, warehouses and offices. Eight 2MP outdoor bullets, brackets, 20m of cable per camera, connectors and an 8-way power supply. Add an 8-channel DVR to complete the system.', '{"tech": {"cable": "20m per camera", "power": "Shared 12V 8-way", "cameras": "8", "warranty": "1 year", "resolution": "2MP each"}, "features": ["8\u00d7 2MP 1080p outdoor bullet cameras", "8\u00d7 mounting brackets and screw packs", "8\u00d7 20m siamese video/power cables", "1\u00d7 8-channel 12V power supply", "Compatible with any 8-channel HD DVR"], "use_case": "Larger homes, dual-storey offices, small warehouses and any site that needs perimeter plus interior coverage.", "hook_line": "Bigger compound? Eight cameras, one box, one afternoon install.", "price_usd": 215, "image_brief": "Flat-lay of eight white bullet cameras, brackets and coils of cable neatly arranged on a workbench.", "recommended_for": "Small Business"}'::jsonb, ARRAY['/products/compound-perimeter-kit-8-cams.jpg']::text[], 295000.0, NULL, 50, 25, 5, TRUE, FALSE, FALSE, NULL, NULL, 'WFX-CCTV-15', (SELECT id FROM public.product_categories WHERE slug = 'cctv-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('fortress-anti-vandal-4k-turret', 'Fortress Anti-Vandal 4K Turret', '4K turret hardened against tampering — for exposed public spaces.', 'IK10 impact-rated metal turret with 4K resolution. Designed for public-facing walls where a camera might get hit, jammed or sprayed. No dome cover means no IR reflection at night.', '{"tech": {"lens": "2.8mm fixed", "power": "12V DC", "ip_rating": "IP67 / IK10", "resolution": "8MP 4K", "night_vision": "30m Smart IR"}, "features": ["8MP 4K UHD resolution", "30m Smart IR night vision", "IK10 anti-vandal metal housing", "IP67 weatherproof", "2.8mm wide-angle lens"], "use_case": "Bars, clubs, filling stations and public-facing exterior walls where cameras are targets.", "hook_line": "4K turret hardened against tampering \u2014 for exposed public spaces.", "price_usd": 98, "image_brief": "Grey metal turret camera mounted on the exterior wall of a nightclub, illuminated by street lighting.", "recommended_for": "Enterprise"}'::jsonb, ARRAY['/products/fortress-anti-vandal-4k-turret.jpg']::text[], 135000.0, NULL, 50, 25, 5, FALSE, FALSE, FALSE, NULL, NULL, 'WFX-CCTV-13', (SELECT id FROM public.product_categories WHERE slug = 'cctv-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('fortress-wide-view-180-bullet', 'Fortress Wide-View 180° Bullet', 'One camera covers an entire wall — no dead zones at the edges.', 'Ultra-wide 1.68mm lens delivers a 180° panoramic view without severe fisheye distortion. Ideal for the corner of a room or the length of a corridor where you''d otherwise need two cameras.', '{"tech": {"lens": "1.68mm ultra-wide", "power": "12V DC", "ip_rating": "IP66", "resolution": "4MP", "night_vision": "20m IR"}, "features": ["4MP HD resolution", "180\u00b0 panoramic view", "20m IR night vision", "1.68mm ultra-wide lens", "IP66 weatherproof"], "use_case": "Long corridors, wide reception areas, small warehouses and any space where you want single-camera wall-to-wall coverage.", "hook_line": "One camera covers an entire wall \u2014 no dead zones at the edges.", "price_usd": 68, "image_brief": "White wide-angle CCTV camera in the corner of a large open reception area.", "recommended_for": "Small Business"}'::jsonb, ARRAY['/products/fortress-wide-view-180-bullet.jpg']::text[], 95000.0, NULL, 50, 25, 5, FALSE, FALSE, FALSE, NULL, NULL, 'WFX-CCTV-12', (SELECT id FROM public.product_categories WHERE slug = 'cctv-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('guardian-hidden-cube-2mp', 'Guardian Hidden Cube 2MP', 'Small cube camera that hides in plain sight indoors.', 'A palm-sized 1080p cube camera designed to blend into an office shelf or reception counter. Full 1080p HD footage over the same analog wiring as the rest of your CCTV system.', '{"tech": {"lens": "2.8mm fixed", "power": "12V DC", "ip_rating": "Indoor only", "resolution": "2MP", "night_vision": "15m IR"}, "features": ["2MP Full HD resolution", "15m IR night vision", "2.8mm wide-angle lens", "Discreet cube form factor", "Indoor use only"], "use_case": "Reception counters, back offices, cash rooms and small retail interiors where a full dome looks out of place.", "hook_line": "Small cube camera that hides in plain sight indoors.", "price_usd": 23, "image_brief": "Small square black indoor CCTV cube camera sitting on a wooden reception counter.", "recommended_for": "Small Business"}'::jsonb, ARRAY['/products/guardian-hidden-cube-2mp.jpg']::text[], 32000.0, NULL, 50, 25, 5, FALSE, FALSE, FALSE, NULL, NULL, 'WFX-CCTV-09', (SELECT id FROM public.product_categories WHERE slug = 'cctv-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('guardian-long-range-ir-bullet', 'Guardian Long-Range IR Bullet', 'Sees 80m into pitch darkness — for long perimeters and open fields.', 'A telephoto lens and high-output IR array combine to give clear black-and-white footage as far as 80m. Built for boundary walls, farm perimeters and warehouse compounds where the action happens far from the camera.', '{"tech": {"lens": "6mm fixed", "power": "12V DC", "ip_rating": "IP67", "resolution": "5MP", "night_vision": "80m EXIR"}, "features": ["5MP Super HD resolution", "80m EXIR long-range night vision", "6mm telephoto lens", "IP67 metal housing", "Smart IR to prevent over-exposure"], "use_case": "Large compound walls, farm fences, factory perimeters and any long, dark span you need to watch overnight.", "hook_line": "Sees 80m into pitch darkness \u2014 for long perimeters and open fields.", "price_usd": 85, "image_brief": "Large white metal bullet camera on a tall pole aimed down a long dark perimeter wall.", "recommended_for": "Construction Site"}'::jsonb, ARRAY['/products/guardian-long-range-ir-bullet.jpg']::text[], 115000.0, NULL, 50, 25, 5, FALSE, FALSE, FALSE, NULL, NULL, 'WFX-CCTV-07', (SELECT id FROM public.product_categories WHERE slug = 'cctv-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('guardian-turret-3mp', 'Guardian Turret 3MP', 'Turret design eliminates the IR glare you get on regular domes.', 'The turret (eyeball) form factor sits the lens outside its housing, so the IR ring doesn''t reflect off the dome cover — no washed-out night footage. 3MP is enough for tight indoor and semi-outdoor coverage.', '{"tech": {"lens": "2.8mm fixed", "power": "12V DC", "ip_rating": "IP66", "resolution": "3MP", "night_vision": "25m IR"}, "features": ["3MP HD resolution", "25m IR night vision", "2.8mm wide-angle lens", "No IR-glare turret design", "IP66 weatherproof"], "use_case": "Restaurants, hotel corridors, semi-outdoor covered areas and eaves where dome IR reflection is a problem.", "hook_line": "Turret design eliminates the IR glare you get on regular domes.", "price_usd": 35, "image_brief": "Small white turret (eyeball-style) CCTV camera mounted on a hotel corridor ceiling.", "recommended_for": "Small Business"}'::jsonb, ARRAY['/products/guardian-turret-3mp.jpg']::text[], 48000.0, NULL, 50, 25, 5, FALSE, FALSE, FALSE, NULL, NULL, 'WFX-CCTV-08', (SELECT id FROM public.product_categories WHERE slug = 'cctv-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('sentinel-2mp-indoor-dome', 'Sentinel 2MP Indoor Dome', 'Discreet 1080p dome for shops, offices and reception areas.', 'Compact ceiling dome for indoor coverage where the camera disappears into the ceiling. Sharp 1080p daytime footage, IR night vision to 20m, and a wide 2.8mm lens that captures a whole room from one corner.', '{"tech": {"lens": "2.8mm fixed", "power": "12V DC", "ip_rating": "Indoor only", "resolution": "2MP (1920\u00d71080)", "night_vision": "20m IR"}, "features": ["1080p Full HD resolution", "20m infrared night vision", "2.8mm wide-angle lens", "Plastic dome, indoor-only", "Works with any HD-TVI/AHD/CVI DVR"], "use_case": "Reception desks, shop floors, office corridors and small retail spaces where you want unobtrusive indoor coverage.", "hook_line": "Discreet 1080p dome for shops, offices and reception areas.", "price_usd": 25, "image_brief": "White ceiling-mounted plastic dome camera with black lens, mounted flush to a white ceiling in a retail store.", "recommended_for": "Small Business"}'::jsonb, ARRAY['/products/sentinel-2mp-indoor-dome.jpg']::text[], 35000.0, NULL, 50, 25, 5, FALSE, FALSE, FALSE, NULL, NULL, 'WFX-CCTV-01', (SELECT id FROM public.product_categories WHERE slug = 'cctv-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('sentinel-5mp-outdoor-dome', 'Sentinel 5MP Outdoor Dome', 'Vandal-resistant 5MP dome for exposed outdoor mounting.', 'Cast-aluminium dome rated IK10 against impact and IP67 against weather. Delivers 5MP footage day and night, and its low-profile shape keeps it out of easy reach on shopfronts and building corners.', '{"tech": {"lens": "2.8mm fixed", "power": "12V DC", "ip_rating": "IP67 / IK10", "resolution": "5MP", "night_vision": "30m IR"}, "features": ["5MP Super HD resolution", "30m IR night vision", "IK10 vandal-resistant housing", "IP67 weatherproof", "2.8mm wide-angle lens"], "use_case": "Shopfronts, exterior building corners, ATMs and any exposed spot where a bullet camera would be an easy target.", "hook_line": "Vandal-resistant 5MP dome for exposed outdoor mounting.", "price_usd": 45, "image_brief": "Grey metal vandal dome CCTV camera mounted on a concrete wall at storefront height.", "recommended_for": "Small Business"}'::jsonb, ARRAY['/products/sentinel-5mp-outdoor-dome.jpg']::text[], 65000.0, NULL, 50, 25, 5, FALSE, FALSE, FALSE, NULL, NULL, 'WFX-CCTV-04', (SELECT id FROM public.product_categories WHERE slug = 'cctv-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('sentinel-audio-in-bullet-4mp', 'Sentinel Audio-In Bullet 4MP', '4MP bullet with a real onboard mic — hear as well as see.', 'Built-in microphone captures clear audio alongside video, useful when you need to review not just what happened but what was said. 4MP delivers sharper detail than standard 1080p.', '{"tech": {"lens": "2.8mm fixed", "audio": "Built-in mic", "ip_rating": "IP66", "resolution": "4MP", "night_vision": "30m IR"}, "features": ["4MP HD resolution", "30m IR night vision", "Built-in high-sensitivity mic", "2.8mm wide-angle lens", "IP66 weatherproof"], "use_case": "Boutiques, salons, waiting rooms and consulting offices where audio evidence adds real value.", "hook_line": "4MP bullet with a real onboard mic \u2014 hear as well as see.", "price_usd": 48, "image_brief": "White outdoor bullet CCTV camera with visible microphone port near the lens.", "recommended_for": "Small Business"}'::jsonb, ARRAY['/products/sentinel-audio-in-bullet-4mp.jpg']::text[], 68000.0, NULL, 50, 25, 5, FALSE, FALSE, FALSE, NULL, NULL, 'WFX-CCTV-10', (SELECT id FROM public.product_categories WHERE slug = 'cctv-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-nvr-64ch-16tb', 'WF 64-Channel Enterprise NVR (16TB)', 'Estate-scale recording without needing a server room.', '64 channels, 16TB across 4 bays (up to 64TB), 8 SATA bays optional, dual PSU, hot-swap drives, redundant NIC. Built to sit in a rack for years.', '{"tech": {"psu": "Dual redundant", "bays": 4, "channels": 64, "warranty": "3 years", "storage_tb": 16}, "features": ["64 cameras, up to 12MP", "16TB pre-installed (up to 64TB)", "Hot-swap drives, dual PSU", "N+1 recording, ANR failover", "Rack-mount 2U enterprise chassis"], "use_case": "Estates, industrial parks, large campuses", "hook_line": "Estate-scale recording without needing a server room.", "image_brief": "Enterprise 2U NVR with hot-swap drive bays and dual PSUs on the back.", "recommended_for": "Estates & campuses"}'::jsonb, ARRAY['/products/wf-nvr-64ch-16tb.jpg']::text[], 2400000.0, NULL, 100, 8, 5, TRUE, TRUE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'nvr-systems'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-nvr-kit-8ch', 'WF Complete 8-Camera Kit (NVR + 8 Bullet Cams + Drive)', 'One box, one price — the fastest way to get an 8-camera site live.', 'Includes our 8-channel 2TB NVR, 8x 4MP outdoor bullet cameras, 8x 20m network cables, brackets and connectors. Ships boxed and pre-linked.', '{"tech": {"cameras": 8, "channels": 8, "warranty": "2 years", "resolution": "4MP"}, "features": ["8-channel 2TB NVR pre-configured", "8x 4MP IP66 bullet cameras", "8x 20m Cat6 patch leads", "All brackets & fixings", "Free remote setup after install"], "use_case": "Full turnkey installs \u2014 one PO, one delivery", "hook_line": "One box, one price \u2014 the fastest way to get an 8-camera site live.", "image_brief": "Flat-lay of an NVR, 8 white bullet cameras, coils of cable and fittings on a workbench.", "recommended_for": "Turnkey installs"}'::jsonb, ARRAY[]::text[], 895000.0, NULL, 50, 10, 5, FALSE, TRUE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'nvr-systems'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-nvr-16ch-4tb-v2', 'WF 16-Channel PoE NVR (4TB)', 'For compounds, schools and larger sites that need 30+ days of footage.', '16 PoE ports, 4TB WD Purple drive, two SATA bays (expandable), H.265+, ONVIF, RAID-ready. Perfect middle ground for medium businesses.', '{"tech": {"bays": 2, "channels": 16, "warranty": "2 years", "resolution": "4K", "storage_tb": 4}, "features": ["16 cameras up to 4K", "4TB surveillance-grade HDD", "Two SATA bays \u2014 up to 20TB total", "AI motion filters (person/vehicle)", "Dual HDMI (4K + 1080p)"], "use_case": "Compounds, schools, medium businesses, apartment blocks", "hook_line": "For compounds, schools and larger sites that need 30+ days of footage.", "image_brief": "Black 1U rack NVR with 16 PoE ports on the back and status LEDs.", "recommended_for": "Compounds & schools"}'::jsonb, ARRAY[]::text[], 560000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'nvr-systems'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-nvr-16ch-poe-plus', 'WF 16-Channel PoE+ NVR (No HDD)', 'BYOD your own drives — for installers with stock on hand.', '16 PoE+ ports (max 200W), no HDD (bring your own), takes up to 2x 10TB drives. H.265+, ONVIF, HTML5 web UI. Great for installers who buy drives in bulk.', '{"tech": {"channels": 16, "warranty": "2 years", "poe_budget": "200W", "storage_tb": 0}, "features": ["16 PoE+ ports, 200W budget", "No HDD \u2014 supply your own", "Takes 2x 10TB drives (20TB max)", "Full ONVIF, HTML5 UI", "Dual HDMI + VGA"], "use_case": "Installers who source their own storage", "hook_line": "BYOD your own drives \u2014 for installers with stock on hand.", "image_brief": "Black 1U NVR chassis with drive bays visible, no drives fitted.", "recommended_for": "Installers"}'::jsonb, ARRAY[]::text[], 420000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'nvr-systems'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-nvr-ups-1kva', 'WF 1kVA UPS for NVR & Router', 'Keeps recording alive when the power goes.', 'Pure sine-wave 1000VA UPS sized for a small NVR + router + PoE switch. ~45 min runtime under typical load. AVR + surge protection.', '{"tech": {"runtime": "45 min typical", "capacity": "1000VA / 600W", "warranty": "2 years"}, "features": ["Pure sine-wave output", "~45 min runtime with typical NVR", "Auto voltage regulation (AVR)", "Surge + spike protection", "Cold-start capable"], "use_case": "Any NVR install with unstable power", "hook_line": "Keeps recording alive when the power goes.", "image_brief": "Small black tower UPS with an LED display on the front, sitting on a shelf.", "recommended_for": "Every install"}'::jsonb, ARRAY[]::text[], 125000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'nvr-systems'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-nvr-32ch-8tb', 'WF 32-Channel PoE NVR (8TB)', 'Serious kit for warehouses, estates and multi-building sites.', '32 channels, 8TB pre-installed across 2 bays, 4 total bays (up to 40TB), dual-NIC, RAID 1/5. Handles large deployments without stuttering.', '{"tech": {"bays": 4, "form": "2U rack", "channels": 32, "warranty": "3 years", "resolution": "12MP", "storage_tb": 8}, "features": ["32 cameras, up to 12MP", "8TB pre-installed (up to 40TB)", "RAID 1/5, dual-NIC failover", "AI face + license plate ready", "Rack-mount, 2U form"], "use_case": "Warehouses, estates, factories and multi-building sites", "hook_line": "Serious kit for warehouses, estates and multi-building sites.", "image_brief": "Larger 2U rack-mount NVR with front panel LEDs and drive bays.", "recommended_for": "Warehouses & estates"}'::jsonb, ARRAY[]::text[], 1050000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'nvr-systems'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-nvr-cloud-4ch', 'WF 4-Channel Cloud NVR', 'No local drive to worry about — footage lives in the cloud.', '4 cameras, no HDD, all recording pushed to encrypted cloud storage (subscription). Ideal for landlords who don''t want tenants near the recorder.', '{"tech": {"storage": "Cloud (7-day incl.)", "channels": 4, "warranty": "2 years"}, "features": ["4 cameras, cloud-only recording", "Zero on-site storage to steal", "Rolling 7-day cloud retention included", "Upgrade to 30/90 days via subscription", "Works over 4G router"], "use_case": "Rental properties, remote sites, landlords", "hook_line": "No local drive to worry about \u2014 footage lives in the cloud.", "image_brief": "Small white NVR without any drive bay, glowing status LED.", "recommended_for": "Landlords & remote sites"}'::jsonb, ARRAY[]::text[], 145000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'nvr-systems'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-nvr-4ch-1tb', 'WF 4-Channel PoE NVR (1TB)', 'Enough recording for a small shop or flat — plug-and-play PoE.', '4 PoE ports, 1TB pre-installed drive, H.265+ compression, mobile app, HDMI+VGA out. Ships pre-configured — swap in the cameras and you''re live.', '{"tech": {"ports": "4x PoE + 1 uplink", "channels": 4, "warranty": "2 years", "resolution": "4K", "storage_tb": 1, "compression": "H.265+"}, "features": ["Records 4 IP cams up to 4K", "1TB HDD (\u224814 days motion)", "PoE powers cameras \u2014 one cable per cam", "Free mobile app, no subscription", "HDMI + VGA outputs"], "use_case": "Small retail, single-flat homes, boutique offices", "hook_line": "Enough recording for a small shop or flat \u2014 plug-and-play PoE.", "image_brief": "Small black 4-channel NVR on a shelf with a single HDD visible.", "recommended_for": "Small shop / 3-4 bed home"}'::jsonb, ARRAY[]::text[], 180000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'nvr-systems'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-nvr-4k-decoder', 'WF 4K HDMI Video Decoder', 'Push a live 4-camera video wall to any HDMI TV.', 'Standalone decoder that pulls streams from your NVR and outputs a 2x2 or 3x3 video wall over HDMI. Turn any TV into a control-room monitor.', '{"tech": {"output": "HDMI 4K", "layouts": "1/4/9/16", "warranty": "2 years"}, "features": ["2x2, 3x3 or 4x4 layouts", "HDMI 4K output", "Works with any ONVIF NVR", "Web-based layout builder", "Loops through cameras automatically"], "use_case": "Reception desks, guardhouses, control rooms", "hook_line": "Push a live 4-camera video wall to any HDMI TV.", "image_brief": "Small black decoder box connected to a large HDMI TV showing a 3x3 CCTV grid.", "recommended_for": "Guardhouses"}'::jsonb, ARRAY[]::text[], 185000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'nvr-systems'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-nvr-hdd-4tb', 'WF 4TB Surveillance HDD (WD Purple)', 'Purpose-built for CCTV — 24/7 write, no crashes.', 'Genuine WD Purple 4TB drive, engineered for surveillance write loads (unlike desktop drives that die in 6 months). Drop-in for any NVR bay.', '{"tech": {"model": "WD Purple", "warranty": "3 years", "capacity_tb": 4}, "features": ["24/7 CCTV workload rated", "Handles up to 64 camera streams", "3-year manufacturer warranty", "SATA 3, 3.5 inch", "Genuine WD Purple"], "use_case": "Any NVR drive upgrade or replacement", "hook_line": "Purpose-built for CCTV \u2014 24/7 write, no crashes.", "image_brief": "Purple 3.5 inch hard drive labelled WD Purple on a workbench.", "recommended_for": "NVR upgrades"}'::jsonb, ARRAY[]::text[], 68000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'nvr-systems'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-dvr-8ch-hd', 'WF 8-Channel HD Analogue DVR', 'Recycle existing analogue cameras — full HD, without rewiring.', 'Records existing analogue/AHD/CVI/TVI cameras up to 1080p over old coax, so you keep your cabling. 1TB drive included, hybrid IP support for 2 IP cams.', '{"tech": {"analogue": "AHD/CVI/TVI/CVBS", "channels": 8, "warranty": "2 years", "hybrid_ip": 2, "storage_tb": 1}, "features": ["Reuses old coax cabling", "Records up to 1080p on analogue", "2x hybrid IP camera support", "1TB HDD included", "Free mobile viewing"], "use_case": "Sites with existing coax runs that don''t want to rewire", "hook_line": "Recycle existing analogue cameras \u2014 full HD, without rewiring.", "image_brief": "Small black hybrid DVR on a shelf with coax cables running out the back.", "recommended_for": "Retrofit installs"}'::jsonb, ARRAY[]::text[], 165000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'nvr-systems'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-nvr-8ch-2tb-v2', 'WF 8-Channel PoE NVR (2TB)', 'The workhorse. 8 cameras, 2TB, PoE — most jobs end here.', 'Eight PoE ports, 2TB drive (~21 days at 8 cams), H.265+, dual-stream, phone push alerts. Our default recorder for houses and mid-size shops.', '{"tech": {"ports": "8x PoE + 1 uplink", "channels": 8, "warranty": "2 years", "resolution": "4K", "storage_tb": 2, "compression": "H.265+"}, "features": ["Runs 8 cameras up to 4K", "2TB HDD included", "Motion, line-cross, human/vehicle filter", "Dual-stream \u2014 smooth on phone data", "24V surge-protected power"], "use_case": "Most homes, small offices and retail with 5-8 cameras", "hook_line": "The workhorse. 8 cameras, 2TB, PoE \u2014 most jobs end here.", "image_brief": "Black 1U NVR device with 8 PoE ports visible on the back.", "recommended_for": "Homes & small business"}'::jsonb, ARRAY[]::text[], 320000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'nvr-systems'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-nvr-poe-switch-8', 'WF 8-Port PoE Switch (Expansion)', 'Add 8 more cameras to any NVR without buying a bigger recorder.', 'Standalone 8-port PoE+ switch (120W budget) that feeds your existing NVR uplink. Cheaper way to grow from 8 to 16 cameras.', '{"tech": {"ports": "8x PoE + 2 uplink", "warranty": "2 years", "poe_budget": "120W"}, "features": ["Adds 8 PoE cameras to any NVR", "120W total PoE budget", "Gigabit uplink", "Fanless, quiet operation", "Wall or rack-mountable"], "use_case": "Existing NVR owners expanding coverage", "hook_line": "Add 8 more cameras to any NVR without buying a bigger recorder.", "image_brief": "Small black 8-port PoE switch on a workbench.", "recommended_for": "Expansion"}'::jsonb, ARRAY[]::text[], 95000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'nvr-systems'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-nvr-hdd-8tb', 'WF 8TB Surveillance HDD (WD Purple)', 'Twice the retention, same reliable Purple platform.', 'WD Purple 8TB drive. Effectively doubles the retention window on any NVR without changing anything else in the install.', '{"tech": {"model": "WD Purple", "warranty": "3 years", "capacity_tb": 8}, "features": ["24/7 CCTV workload rated", "~30 days on an 8-camera system", "3-year manufacturer warranty", "SATA 3, 3.5 inch", "Genuine WD Purple"], "use_case": "Longer retention on existing NVRs", "hook_line": "Twice the retention, same reliable Purple platform.", "image_brief": "Purple 3.5 inch hard drive labelled WD Purple 8TB on a workbench.", "recommended_for": "Longer retention"}'::jsonb, ARRAY[]::text[], 128000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'nvr-systems'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-nvr-kit-16ch', 'WF Complete 16-Camera Kit (NVR + 16 Cams + Drive)', 'Sixteen-camera coverage in a single order.', 'Our 16-channel 4TB NVR bundled with 16x 4MP cameras (mix of bullets and turrets), 20m leads and all mounting hardware. Ships boxed.', '{"tech": {"cameras": 16, "channels": 16, "warranty": "2 years", "resolution": "4MP"}, "features": ["16-channel 4TB NVR", "10x bullet + 6x turret cameras", "16x 20m Cat6 patch leads", "Full mounting hardware", "Free remote setup after install"], "use_case": "Larger homes, offices and small compounds", "hook_line": "Sixteen-camera coverage in a single order.", "image_brief": "Flat-lay of a 1U NVR, 16 cameras mixed bullet and turret, cables and fittings on a workbench.", "recommended_for": "Compounds & offices"}'::jsonb, ARRAY['/products/wf-nvr-kit-16ch.jpg']::text[], 1750000.0, NULL, 50, 5, 5, TRUE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'nvr-systems'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-site-4g-solar-bullet', 'Site 4G Solar Bullet Camera', 'No power, no internet? This still records and streams live.', '4MP bullet camera with a built-in 4G SIM slot and 60W solar panel. Records to a 128GB SD card and streams over 4G. Ideal for construction sites and remote farms.', '{"tech": {"power": "Solar + battery", "storage": "128GB SD", "warranty": "2 years", "resolution": "4MP", "connectivity": "4G LTE"}, "features": ["Built-in 4G \u2014 insert any SIM", "60W solar panel + battery included", "128GB SD card pre-installed", "Colour night vision to 30m", "IP66, works -20 to 60\u00b0C"], "use_case": "Construction sites, farms, land under development", "hook_line": "No power, no internet? This still records and streams live.", "image_brief": "Large white bullet camera mounted on a solar pole overlooking a construction site.", "recommended_for": "Sites without power"}'::jsonb, ARRAY[]::text[], 395000.0, NULL, 50, 10, 5, FALSE, TRUE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'site-security-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-site-4g-ptz', 'Site 4G Solar PTZ Camera', 'Pan, tilt and zoom a live site from your phone — no wiring needed.', '5MP PTZ with 20x optical zoom, 4G modem, dual 100W solar panels and a deep-cycle battery. Pre-set patrol routes for perimeter sweeps.', '{"tech": {"zoom": "20x optical", "power": "Solar 200W + 100Ah", "warranty": "2 years", "resolution": "5MP", "connectivity": "4G LTE"}, "features": ["20x optical zoom PTZ", "4G LTE with SIM slot", "Dual 100W solar + 100Ah battery", "Pre-set patrol routes", "Two-way audio siren"], "use_case": "Large construction sites, quarries, remote depots", "hook_line": "Pan, tilt and zoom a live site from your phone \u2014 no wiring needed.", "image_brief": "Large white PTZ camera on a tall pole with two solar panels above it, overlooking a quarry.", "recommended_for": "Remote sites"}'::jsonb, ARRAY[]::text[], 895000.0, NULL, 50, 5, 5, FALSE, TRUE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'site-security-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-site-plate-barrier', 'Site ANPR Barrier Kit', 'Automatic boom barrier that opens for whitelisted plates only.', 'Boom barrier + ANPR camera + control PC. Whitelisted plates get in with no guard interaction. Guest QR codes handle deliveries and visitors.', '{"tech": {"barrier": "3m boom", "warranty": "2 years"}, "features": ["Automatic boom barrier", "ANPR camera with OCR", "Whitelist + guest QR access", "Alarm on blacklisted plate", "Free 6-month software support"], "use_case": "Estate and factory main gates", "hook_line": "Automatic boom barrier that opens for whitelisted plates only.", "image_brief": "Yellow-and-black boom barrier at an estate gate with an ANPR camera on a pole beside it.", "recommended_for": "Estate gates"}'::jsonb, ARRAY[]::text[], 1750000.0, NULL, 30, 2, 5, FALSE, TRUE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'site-security-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-site-tower-mobile', 'Site Mobile Security Tower (4-Cam)', 'Wheel it in, deploy in 30 min, watch the whole site.', 'Trailer-mounted 6m mast with 4 cameras (2 fixed, 2 PTZ), solar + battery + 4G modem, floodlights and siren. Move between sites without a crane.', '{"tech": {"power": "Solar + battery", "mast_m": 6, "cameras": 4, "warranty": "2 years", "connectivity": "4G"}, "features": ["4 cameras (2 fixed, 2 PTZ)", "6m telescoping mast", "Solar + battery + 4G", "Floodlights + 110dB siren", "Trailer-mounted, towable"], "use_case": "Construction sites, events, temporary deployments", "hook_line": "Wheel it in, deploy in 30 min, watch the whole site.", "image_brief": "Trailer-mounted CCTV tower with tall mast and cameras deployed at a construction site.", "recommended_for": "Construction & events"}'::jsonb, ARRAY['/products/wf-site-tower-mobile.jpg']::text[], 4900000.0, NULL, 30, 2, 5, TRUE, TRUE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'site-security-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-site-perimeter-kit-6', 'Site Perimeter Solar Kit — 6 Cameras', 'Full six-camera perimeter kit for an off-grid compound.', '6x 4MP solar bullet cameras, a solar-fed 4G router hub, mounts and fixings. Deploys around a compound with no trenching or mains power.', '{"tech": {"power": "Solar", "cameras": 6, "warranty": "2 years", "connectivity": "4G"}, "features": ["6 solar-powered bullet cams", "Central 4G solar router", "All mounting brackets", "24-hour battery buffer", "Ships pre-configured"], "use_case": "Off-grid compounds and farm perimeters", "hook_line": "Full six-camera perimeter kit for an off-grid compound.", "image_brief": "Flat-lay of 6 white solar bullet cameras, a router hub, cables and brackets on a workbench.", "recommended_for": "Off-grid perimeters"}'::jsonb, ARRAY['/products/wf-site-perimeter-kit-6.jpg']::text[], 2450000.0, NULL, 50, 4, 5, TRUE, TRUE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'site-security-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-site-battery-100ah', 'Site 100Ah Lithium Site Battery', 'Runs a small camera cluster overnight without solar top-up.', '100Ah LiFePO4 battery in a weatherproof enclosure. Powers a 4-camera pole with router for ~24 h. Pairs with any solar controller.', '{"tech": {"warranty": "3 years", "chemistry": "LiFePO4", "protection": "IP65", "capacity_ah": 100}, "features": ["100Ah LiFePO4 (safe chemistry)", "~24h runtime for 4-cam pole", "IP65 weatherproof case", "BMS with over-charge protection", "5-year design life"], "use_case": "Solar pole cameras and remote stations", "hook_line": "Runs a small camera cluster overnight without solar top-up.", "image_brief": "Grey weatherproof battery box on a concrete pad beside a solar CCTV pole.", "recommended_for": "Solar poles"}'::jsonb, ARRAY[]::text[], 290000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'site-security-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-site-floodlight-cam', 'Site 30W Floodlight Camera', 'Floods the area with white light and records in colour, all night.', '4MP camera with two 30W LED floodlights (5000 lumens). Motion-triggered, dusk-to-dawn schedule, colour night vision. Great for yards and driveways.', '{"tech": {"lumens": 5000, "warranty": "2 years", "protection": "IP66", "resolution": "4MP"}, "features": ["4MP + 5000 lumen floods", "Motion-triggered floodlights", "Full colour night vision", "Two-way talk + siren", "IP66, WiFi + Ethernet"], "use_case": "Yards, driveways, parking areas", "hook_line": "Floods the area with white light and records in colour, all night.", "image_brief": "Bullet camera with two large white LED floodlight panels either side, mounted on a wall.", "recommended_for": "Yards & driveways"}'::jsonb, ARRAY[]::text[], 245000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'site-security-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-site-anpr-camera', 'Site ANPR / License Plate Camera', 'Reads plates day and night — logs every vehicle in and out.', '5MP bullet with a dedicated licence-plate lens, IR cut-off and onboard OCR. Captures plates up to 30m at 60 km/h. Exports CSV of every read.', '{"tech": {"range_m": 30, "warranty": "2 years", "max_speed": "60 km/h", "resolution": "5MP"}, "features": ["Captures plates day & night", "Onboard OCR \u2014 no PC needed", "Reads at up to 60 km/h", "Blacklist/whitelist alerts", "CSV + JSON export"], "use_case": "Estate gates, factory entrances, car parks", "hook_line": "Reads plates day and night \u2014 logs every vehicle in and out.", "image_brief": "Grey bullet camera with a specialised long lens, mounted on a boom at a gate.", "recommended_for": "Estate & site gates"}'::jsonb, ARRAY[]::text[], 680000.0, NULL, 50, 6, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'site-security-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-site-blast-proof', 'Site Blast-Proof Explosion-Rated Camera', 'Certified for fuel depots, plants and hazardous zones.', 'Stainless-steel housed camera rated ATEX/IECEx for Zone 1/2 gas environments. 2MP starlight sensor, PoE, ONVIF. Serious kit for serious sites.', '{"tech": {"housing": "316L SS", "warranty": "5 years", "resolution": "2MP", "certification": "ATEX Zone 1/2"}, "features": ["ATEX/IECEx Zone 1/2 rated", "316L stainless-steel housing", "Starlight 2MP low-light sensor", "PoE + fibre option", "IP68, 5-year warranty"], "use_case": "Fuel depots, chemical plants, hazardous zones", "hook_line": "Certified for fuel depots, plants and hazardous zones.", "image_brief": "Heavy stainless-steel cylindrical camera housing mounted on a pipe at an industrial plant.", "recommended_for": "Fuel & chemical"}'::jsonb, ARRAY[]::text[], 1650000.0, NULL, 30, 3, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'site-security-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-site-guard-tour-tag', 'Site Guard Tour NFC Kit', 'Prove security guards actually did their rounds.', '10 x NFC checkpoint tags + a rugged NFC reader wand. Guards tap each checkpoint on their round; the wand logs time and location. Reports export to CSV.', '{"tech": {"tags": 10, "warranty": "1 year", "protection": "IP65"}, "features": ["Rugged NFC reader wand", "10x weatherproof NFC tags", "Time-stamped patrol logs", "CSV/PDF report export", "IP65 tags, drop-tested wand"], "use_case": "Compounds and factories with roving guards", "hook_line": "Prove security guards actually did their rounds.", "image_brief": "Handheld NFC guard reader wand next to a weatherproof NFC tag on a compound wall.", "recommended_for": "Guarded sites"}'::jsonb, ARRAY[]::text[], 85000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'site-security-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-site-poe-extender', 'Site Long-Range PoE Extender (300m)', 'Push PoE to 300m — no fibre, no local power at the camera.', 'PoE++ extender pair that lets you run a single Cat6 up to 300m to a remote camera and still power it. Saves fibre and inverter cost on perimeter runs.', '{"tech": {"poe": "PoE++ 60W", "range_m": 300, "warranty": "2 years"}, "features": ["Extends PoE to 300m over Cat6", "PoE++ (60W) throughput", "Weatherproof enclosure", "Plug-and-play, no config", "Two-year warranty"], "use_case": "Perimeter cameras far from the recorder", "hook_line": "Push PoE to 300m \u2014 no fibre, no local power at the camera.", "image_brief": "Small black weatherproof PoE extender box mounted next to a pole camera.", "recommended_for": "Long runs"}'::jsonb, ARRAY[]::text[], 78000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'site-security-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-site-4g-router-outdoor', 'Site Outdoor 4G Router (IP67)', 'Weather-proof 4G router — throw it up, insert SIM, done.', 'Outdoor-rated dual-SIM CAT6 4G router with PoE-in and PoE-out. Feeds power and internet to a remote camera cluster over a single Cat6 run.', '{"tech": {"sims": 2, "category": "CAT6", "warranty": "2 years", "protection": "IP67"}, "features": ["Dual-SIM CAT6 4G", "PoE-in and PoE-out", "IP67 outdoor housing", "Web + app management", "Two-year warranty"], "use_case": "Remote camera clusters over 4G", "hook_line": "Weather-proof 4G router \u2014 throw it up, insert SIM, done.", "image_brief": "Small grey outdoor 4G router with antennas, mounted on a pole.", "recommended_for": "Remote clusters"}'::jsonb, ARRAY[]::text[], 210000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'site-security-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-site-radar-detect', 'Site Radar Intrusion Sensor', 'Detects intruders before they reach the fence — 100m range.', '24GHz radar module that pairs with a PTZ to auto-track anything moving in a 100m x 90° zone. Ignores animals under 15kg. Works in rain and fog.', '{"tech": {"fov": "90\u00b0", "range_m": 100, "warranty": "2 years", "frequency": "24GHz"}, "features": ["100m detection radius", "90\u00b0 coverage zone", "Filters small animals", "Auto-slews any PTZ to target", "IP67, weather-proof"], "use_case": "Perimeter early-warning, oil & gas sites", "hook_line": "Detects intruders before they reach the fence \u2014 100m range.", "image_brief": "Grey box-shaped radar sensor mounted on a fence post next to a PTZ camera.", "recommended_for": "Perimeters"}'::jsonb, ARRAY[]::text[], 480000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'site-security-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-site-strobe-siren', 'Site Strobe & Siren Deterrent Light', 'Blinding strobe + 110dB siren — scares off intruders on sight.', 'IP66 strobe siren that pairs with any Hikvision or Dahua NVR. Triggers on motion or line-cross, burns for 15 s. Great deterrent alongside cameras.', '{"tech": {"db": 110, "strobe": "360\u00b0 LED", "warranty": "2 years", "protection": "IP66"}, "features": ["110dB piezo siren", "LED strobe, 360\u00b0 coverage", "Triggers on line-cross", "IP66, 12/24V DC", "Works with most NVRs"], "use_case": "Perimeters, gates, remote yards", "hook_line": "Blinding strobe + 110dB siren \u2014 scares off intruders on sight.", "image_brief": "White strobe-siren mounted high on a warehouse wall next to a floodlight.", "recommended_for": "Perimeters"}'::jsonb, ARRAY[]::text[], 95000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'site-security-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-site-thermal-perimeter', 'Site Thermal Perimeter Camera', 'Sees people in pitch dark by their body heat — no light needed.', 'Thermal + optical dual-sensor bullet. Detects a human at 300m even in total darkness, smoke or fog. Ideal for perimeter fences and yards.', '{"tech": {"sensors": "Thermal + optical", "warranty": "3 years", "protection": "IP67", "detection_m": 300}, "features": ["Thermal detection to 300m", "Dual optical + thermal sensors", "Works in total darkness, smoke, fog", "AI human/vehicle classification", "IP67, PoE++"], "use_case": "Perimeters, oil depots, warehouses at night", "hook_line": "Sees people in pitch dark by their body heat \u2014 no light needed.", "image_brief": "Grey bullet camera with two lens ports mounted on a perimeter fence at dusk.", "recommended_for": "Perimeters"}'::jsonb, ARRAY[]::text[], 1250000.0, NULL, 50, 4, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'site-security-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-solar-kit-4cam', 'Solar Kit — 4-Camera Compound', '4-camera solar kit for a medium compound perimeter.', '4x 4MP solar bullet cameras, a solar-fed 4G router and central battery buffer. Everything you need for a full perimeter without trenching.', '{"tech": {"cameras": 4, "warranty": "2 years"}, "features": ["4x 4MP solar bullet cams", "Central 4G router hub", "Central battery buffer", "Full mounting hardware", "Free remote setup after install"], "use_case": "Medium compounds and farms", "hook_line": "4-camera solar kit for a medium compound perimeter.", "image_brief": "Flat-lay of 4 white solar bullet cameras, a router hub, battery box, cables and brackets on a workbench.", "recommended_for": "Medium compounds"}'::jsonb, ARRAY['/products/wf-solar-kit-4cam.jpg']::text[], 825000.0, NULL, 50, 6, 5, TRUE, TRUE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'solar-cctv'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-solar-panel-100w', 'Solar 100W Mono Panel', 'Extra panel for expanding an existing solar CCTV setup.', '100W monocrystalline panel with 25-year output warranty. Bolt onto an existing pole to add capacity or shorten winter downtime.', '{"tech": {"type": "Monocrystalline", "watts": 100, "warranty": "25 years (output)"}, "features": ["100W monocrystalline", "25-year power output warranty", "Aluminium frame, tempered glass", "MC4 connectors", "Plug-and-play with any controller"], "use_case": "Adding capacity to existing solar CCTV poles", "hook_line": "Extra panel for expanding an existing solar CCTV setup.", "image_brief": "Rectangular blue-black 100W solar panel resting against a shed wall.", "recommended_for": "Add-on capacity"}'::jsonb, ARRAY[]::text[], 78000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'solar-cctv'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-solar-2mp-bullet', 'Solar 2MP Bullet Camera', 'Point it at a spot, walk away — powers itself forever.', '2MP bullet with an integrated 20W solar panel and 7.2Ah battery. Records to onboard SD and streams over WiFi or 4G. Perfect for remote gates.', '{"tech": {"solar_w": 20, "warranty": "2 years", "battery_ah": 7.2, "protection": "IP66", "resolution": "2MP"}, "features": ["Built-in 20W solar panel", "7.2Ah battery, 5-day autonomy", "4MP option available", "WiFi + optional 4G", "IP66 all-metal housing"], "use_case": "Remote gates, farms, unattended posts", "hook_line": "Point it at a spot, walk away \u2014 powers itself forever.", "image_brief": "White bullet camera with a small solar panel mounted directly above it, on a fence post.", "recommended_for": "Off-grid spots"}'::jsonb, ARRAY[]::text[], 165000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'solar-cctv'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-solar-controller-30a', 'Solar 30A MPPT Controller', 'Charge controller for building your own solar camera pole.', '30A MPPT solar charge controller with Bluetooth monitoring. Handles up to 400W of panels and any 12V/24V battery bank. Great for custom builds.', '{"tech": {"amps": 30, "warranty": "2 years", "panel_max_w": 400}, "features": ["30A MPPT (94% efficient)", "Handles up to 400W panels", "Bluetooth phone monitoring", "12V/24V auto-detect", "Low-voltage disconnect"], "use_case": "Installers building custom solar CCTV rigs", "hook_line": "Charge controller for building your own solar camera pole.", "image_brief": "Small black MPPT solar charge controller with LCD display, on a workbench.", "recommended_for": "Custom rigs"}'::jsonb, ARRAY[]::text[], 95000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'solar-cctv'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-solar-pole-3m', 'Solar 3m Camera Pole (Complete)', 'Ready-made 3m pole for mounting solar cameras.', 'Powder-coated 3m steel pole with pre-drilled panel bracket, battery box mount and camera arm. Comes with base plate and anchor bolts.', '{"tech": {"finish": "Powder-coated", "height_m": 3, "warranty": "2 years"}, "features": ["3m powder-coated steel pole", "Panel + battery box brackets", "Base plate + anchors included", "Cable channel inside pole", "Rated for 60W panel + camera"], "use_case": "Solar camera installs on open ground", "hook_line": "Ready-made 3m pole for mounting solar cameras.", "image_brief": "Grey 3m steel pole standing on a concrete base with brackets for a solar panel and camera arm.", "recommended_for": "Open sites"}'::jsonb, ARRAY[]::text[], 120000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'solar-cctv'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-solar-4g-mini', 'Solar 4G Mini Cube Camera', 'Tiny 4G solar cam — hide it anywhere you need eyes.', 'Compact cube-style solar camera with a 4G SIM slot, magnetic mount and 5000mAh battery. Great for stakeouts, temporary sites and hidden points.', '{"tech": {"warranty": "2 years", "resolution": "2MP", "battery_mah": 5000, "connectivity": "4G"}, "features": ["Compact stealth form-factor", "4G SIM slot", "5000mAh battery + solar top-up", "Magnetic mount included", "IP65"], "use_case": "Stakeouts, event coverage, temporary posts", "hook_line": "Tiny 4G solar cam \u2014 hide it anywhere you need eyes.", "image_brief": "Small cube-shaped camera with a small solar panel, magnetically stuck to a metal beam.", "recommended_for": "Discreet coverage"}'::jsonb, ARRAY[]::text[], 125000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'solar-cctv'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-solar-4mp-bullet', 'Solar 4MP Bullet Camera', '4MP detail with true off-grid running.', 'Higher-resolution version of the 2MP solar bullet. 30W panel and 12Ah battery for 7-day autonomy in cloudy weather.', '{"tech": {"solar_w": 30, "warranty": "2 years", "battery_ah": 12, "resolution": "4MP"}, "features": ["4MP true resolution", "30W solar panel", "12Ah LiFePO4 battery", "WiFi 5 + 4G-ready", "IP66, colour night vision"], "use_case": "Remote gates, boundaries, storage yards", "hook_line": "4MP detail with true off-grid running.", "image_brief": "White 4MP bullet camera with a larger solar panel above it, mounted on a compound wall.", "recommended_for": "Off-grid boundaries"}'::jsonb, ARRAY[]::text[], 215000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'solar-cctv'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-solar-4mp-ptz', 'Solar 4MP PTZ Camera', 'Pan and tilt from your phone — off-grid, day and night.', '4MP PTZ with 4x optical zoom, 40W solar panel, 20Ah LiFePO4 battery. Auto patrol between preset points every 30 min.', '{"tech": {"zoom": "4x", "solar_w": 40, "warranty": "2 years", "resolution": "4MP"}, "features": ["4x optical zoom PTZ", "40W panel + 20Ah battery", "Auto patrol between presets", "Two-way audio + siren", "IP66"], "use_case": "Farms, storage yards, remote outposts", "hook_line": "Pan and tilt from your phone \u2014 off-grid, day and night.", "image_brief": "White solar PTZ camera on a pole with a 40W panel and battery box beside it, overlooking a farm.", "recommended_for": "Off-grid overwatch"}'::jsonb, ARRAY[]::text[], 485000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'solar-cctv'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-solar-battery-50ah', 'Solar 50Ah LiFePO4 Battery', 'Purpose-sized battery for a solar CCTV pole.', '50Ah LiFePO4 battery — the sweet spot for a single-camera solar pole. 2000+ cycle life, integrated BMS. Fits our weatherproof battery boxes.', '{"tech": {"warranty": "3 years", "chemistry": "LiFePO4", "capacity_ah": 50}, "features": ["50Ah LiFePO4", "2000+ cycle life", "Integrated BMS", "Cold-weather charging", "5-year design life"], "use_case": "Single-camera solar poles", "hook_line": "Purpose-sized battery for a solar CCTV pole.", "image_brief": "Grey 50Ah battery unit with visible terminals on a workbench.", "recommended_for": "Solar poles"}'::jsonb, ARRAY[]::text[], 165000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'solar-cctv'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-solar-pole-6m', 'Solar 6m Site Camera Mast', 'Tall 6m mast for wide-area overwatch.', '6m sectional steel mast with cable channel and pre-drilled brackets for a 100W panel, battery box and PTZ or dual-cam head. Site-friendly base plate.', '{"tech": {"height_m": 6, "warranty": "2 years"}, "features": ["6m sectional mast", "Handles 100W panel + PTZ", "Cable channel inside mast", "Site-friendly base plate", "Two-person install"], "use_case": "Site perimeters and long-range overwatch", "hook_line": "Tall 6m mast for wide-area overwatch.", "image_brief": "Tall 6m grey steel mast with brackets, standing on a concrete base at a construction site.", "recommended_for": "Site perimeters"}'::jsonb, ARRAY[]::text[], 295000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'solar-cctv'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-solar-dual-lens', 'Solar Dual-Lens Wide-Angle Camera', 'Two lenses stitched into one 180° panoramic feed — no blind spots.', 'Dual 2K sensors give you a stitched 180° view. 50W solar + 24Ah battery. Great for large driveways and yards where one camera has to see everything.', '{"tech": {"field": "180\u00b0", "solar_w": 50, "warranty": "2 years", "resolution": "2Kx2"}, "features": ["Stitched 180\u00b0 panoramic view", "Dual 2K sensors", "50W solar + 24Ah LiFePO4", "Human/vehicle AI detection", "IP66"], "use_case": "Large driveways, front yards, forecourts", "hook_line": "Two lenses stitched into one 180\u00b0 panoramic feed \u2014 no blind spots.", "image_brief": "White dual-lens camera with two visible lens ports and a solar panel above, mounted on a pole.", "recommended_for": "Wide coverage"}'::jsonb, ARRAY[]::text[], 395000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'solar-cctv'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-solar-farm-monitor', 'Solar Farm & Livestock Camera', 'Watch the barn from your phone — no wiring across the fields.', 'Rugged 5MP camera on a 3m pole with 80W solar, 4G modem and battery. Preconfigured for livestock monitoring: person, vehicle and animal filters.', '{"tech": {"mast_m": 3, "warranty": "2 years", "resolution": "5MP"}, "features": ["5MP camera on 3m mast", "80W solar + 40Ah battery", "4G LTE built in", "Person/vehicle/animal filters", "IP67, temperature-hardened"], "use_case": "Farms, ranches, poultry compounds", "hook_line": "Watch the barn from your phone \u2014 no wiring across the fields.", "image_brief": "White bullet camera on a 3m pole with a solar panel and battery box, standing in a farm field.", "recommended_for": "Farms"}'::jsonb, ARRAY['/products/wf-solar-farm-monitor.jpg']::text[], 520000.0, NULL, 100, 15, 5, TRUE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'solar-cctv'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-solar-fence-line', 'Solar Fence-Line Perimeter Cam', 'Fence-mount solar cam for long boundary runs.', '4MP bullet with a slim vertical solar panel that mounts to a fence post without needing a big pole. Meshes with other units for long runs.', '{"tech": {"form": "Fence post", "warranty": "2 years", "resolution": "4MP"}, "features": ["Fence-post form factor", "Slim vertical solar panel", "Mesh-links with other units", "4G-ready", "IP66"], "use_case": "Long boundary walls and fence lines", "hook_line": "Fence-mount solar cam for long boundary runs.", "image_brief": "White bullet camera on a slim vertical solar panel attached to a fence post.", "recommended_for": "Fence lines"}'::jsonb, ARRAY[]::text[], 235000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'solar-cctv'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-solar-flood-cam', 'Solar Floodlight + Camera Combo', 'Bright light plus a camera — both fully solar-powered.', '2 x 20W LED floodlights and a 4MP camera on one bracket. 80W solar panel and 30Ah battery keep both running through the night.', '{"tech": {"lumens": 4000, "solar_w": 80, "warranty": "2 years", "resolution": "4MP"}, "features": ["4MP camera + 40W flood", "80W solar + 30Ah battery", "Motion-triggered floods", "WiFi + 4G option", "IP66"], "use_case": "Driveways, yards and parking without mains", "hook_line": "Bright light plus a camera \u2014 both fully solar-powered.", "image_brief": "White floodlight camera with two LED floods either side and a solar panel above, on a pole.", "recommended_for": "Off-grid lighting"}'::jsonb, ARRAY[]::text[], 345000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'solar-cctv'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-solar-kit-2cam', 'Solar Kit — 2-Camera Compound', 'Ready-to-install 2-camera solar kit for a small compound.', '2x 4MP solar bullet cameras + 4G router hub + all mounts. Deploys around a small compound corner-to-corner without any wiring.', '{"tech": {"cameras": 2, "warranty": "2 years"}, "features": ["2x 4MP solar bullet cams", "Central 4G solar router", "All brackets, no wiring", "24h battery buffer", "Ships pre-linked"], "use_case": "Small compounds without mains at the corners", "hook_line": "Ready-to-install 2-camera solar kit for a small compound.", "image_brief": "Flat-lay of two white solar bullet cameras, a small router hub and brackets on a workbench.", "recommended_for": "Small compounds"}'::jsonb, ARRAY[]::text[], 425000.0, NULL, 50, 8, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'solar-cctv'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ip-4mp-bullet', 'IP 4MP Outdoor Bullet', 'Our default outdoor camera — the one we install most.', '4MP bullet with H.265+, 30m IR range, IP66. Sharp enough to make out faces at the gate and cheap enough to buy in multiples.', '{"tech": {"warranty": "2 years", "protection": "IP66", "resolution": "4MP"}, "features": ["4MP true resolution", "30m IR night vision", "H.265+ compression", "PoE + 12V DC", "IP66"], "use_case": "General outdoor use \u2014 driveways, side walls, gates", "hook_line": "Our default outdoor camera \u2014 the one we install most.", "image_brief": "White bullet camera on a wall bracket, aimed at a driveway.", "recommended_for": "Homes & offices"}'::jsonb, ARRAY[]::text[], 68000.0, NULL, 100, 25, 5, FALSE, TRUE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ip-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('nx-4mp-ptz', 'Nexashield 4MP Indoor PTZ Dome', '360° pan-tilt-zoom with two-way audio', 'Motorised PTZ dome camera with 360° coverage, 4x optical zoom, two-way audio and person/vehicle AI detection.', '{"ai": "Person/vehicle detection", "zoom": "4x optical", "audio": "Two-way", "resolution": "4MP"}'::jsonb, ARRAY['/products/nx-4mp-ptz.jpg']::text[], 120000.0, NULL, 70, 15, 3, FALSE, TRUE, FALSE, NULL, NULL, 'NX-CAM-4MP-PTZ', (SELECT id FROM public.product_categories WHERE slug = 'ip-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('nx-4mp-bullet', 'Nexashield 4MP Outdoor Bullet Camera', 'IP67 weatherproof, colour night vision, PoE', 'Professional 4MP outdoor IP bullet camera with true colour night vision, IP67 weatherproofing and Power-over-Ethernet. Ideal for perimeter and driveway coverage.', '{"lens": "2.8mm fixed", "power": "PoE 802.3af", "warranty": "24 months", "resolution": "4MP (2560x1440)", "night_vision": "Colour + IR up to 30m", "weatherproof": "IP67"}'::jsonb, ARRAY['/products/nx-4mp-bullet.jpg']::text[], 85000.0, 110000.0, 70, 25, 5, FALSE, TRUE, FALSE, NULL, NULL, 'NX-CAM-4MP-BLT', (SELECT id FROM public.product_categories WHERE slug = 'ip-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ip-thermal-160', 'IP 160x120 Thermal Bullet', 'Sees people in complete darkness by body heat.', 'Entry-level thermal IP camera — 160x120 sensor, detects a person at 60m in total darkness or smoke. Pairs with any ONVIF NVR.', '{"tech": {"range_m": 60, "warranty": "3 years", "resolution": "160x120 thermal"}, "features": ["160x120 thermal sensor", "Detects person at 60m", "Works in total darkness", "Smoke/fog penetration", "PoE + ONVIF"], "use_case": "Perimeters, warehouses, blackout monitoring", "hook_line": "Sees people in complete darkness by body heat.", "image_brief": "Grey bullet camera with a distinctive thermal lens, mounted on a warehouse wall.", "recommended_for": "Blackout security"}'::jsonb, ARRAY['/products/wf-ip-thermal-160.jpg']::text[], 680000.0, NULL, 50, 4, 5, TRUE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ip-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ip-explosion-atex-cam', 'IP 2MP ATEX Zone 2 Camera', 'Certified safe for hazardous fuel and chemical zones.', '2MP starlight IP camera in a stainless housing, ATEX/IECEx Zone 2 rated. Cheaper than the Zone 1 blast-proof unit for less-severe environments.', '{"tech": {"housing": "316 SS", "warranty": "5 years", "resolution": "2MP", "certification": "ATEX Zone 2"}, "features": ["ATEX/IECEx Zone 2 rated", "316 stainless steel housing", "Starlight low-light sensor", "PoE + fibre option", "IP68"], "use_case": "Petrol stations, mid-hazard chemical areas", "hook_line": "Certified safe for hazardous fuel and chemical zones.", "image_brief": "Stainless steel cylindrical camera housing mounted at a petrol station canopy.", "recommended_for": "Fuel & mid-hazard"}'::jsonb, ARRAY['/products/wf-ip-explosion-atex-cam.jpg']::text[], 1250000.0, NULL, 50, 3, 5, TRUE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ip-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ip-mini-2mp', 'IP 2MP Mini Bullet', 'Tiny form factor — hides in door frames and shop signs.', 'Very compact 2MP bullet only 12cm long. Blends into doorframes and shop signs. Standard PoE, ONVIF.', '{"tech": {"warranty": "2 years", "length_cm": 12, "resolution": "2MP"}, "features": ["Compact 12cm form factor", "2MP full HD", "PoE + ONVIF", "20m IR range", "IP66"], "use_case": "Places where a full-size bullet is too obvious", "hook_line": "Tiny form factor \u2014 hides in door frames and shop signs.", "image_brief": "Small white mini bullet camera mounted inside a doorframe.", "recommended_for": "Discreet mounts"}'::jsonb, ARRAY[]::text[], 55000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ip-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ip-2mp-bullet', 'IP 2MP Outdoor Bullet', 'Cheap, cheerful and sharp enough for a driveway.', 'Entry-level 2MP IP bullet camera. PoE, ONVIF, H.265+. Perfect for filling in gaps around an existing NVR without breaking the budget.', '{"tech": {"warranty": "2 years", "protection": "IP66", "resolution": "2MP"}, "features": ["2MP full HD (1080p)", "PoE + ONVIF", "30m IR night vision", "H.265+ compression", "IP66"], "use_case": "Budget IP camera fills \u2014 driveways, side walls", "hook_line": "Cheap, cheerful and sharp enough for a driveway.", "image_brief": "Small white bullet camera on a wall bracket, aimed at a driveway.", "recommended_for": "Budget fill"}'::jsonb, ARRAY[]::text[], 42000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ip-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ip-hidden-pinhole', 'IP 2MP Pinhole Covert Cam', 'Barely visible — great for retail loss-prevention.', 'Two-part pinhole covert camera: a tiny lens head connected to a hidden body. Fits behind a wall or ceiling with only a 5mm hole visible.', '{"tech": {"warranty": "2 years", "exposed_mm": 5, "resolution": "2MP"}, "features": ["Tiny 5mm exposed lens", "Hidden main body", "2MP full HD", "PoE via main body", "Great for LP investigations"], "use_case": "Loss prevention, discreet investigations", "hook_line": "Barely visible \u2014 great for retail loss-prevention.", "image_brief": "Small pinhole lens embedded in a ceiling tile, with a discreet cable running away.", "recommended_for": "Loss prevention"}'::jsonb, ARRAY[]::text[], 148000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ip-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ip-kit-4-poe', 'IP 4-Camera PoE Kit', '4 x 4MP IP bullets ready to plug into any 4-port PoE NVR.', 'Four 4MP outdoor bullets with 4x 20m Cat6 leads and brackets. Just plug into your existing PoE NVR — no configuration needed.', '{"tech": {"cameras": 4, "warranty": "2 years", "resolution": "4MP"}, "features": ["4x 4MP outdoor bullet cams", "4x 20m Cat6 leads", "All brackets & fixings", "Plug-and-play with WF NVRs", "2 year warranty on cameras"], "use_case": "Expanding or completing a PoE NVR install", "hook_line": "4 x 4MP IP bullets ready to plug into any 4-port PoE NVR.", "image_brief": "Flat-lay of 4 white bullet cameras, coils of network cable and brackets on a workbench.", "recommended_for": "PoE install kit"}'::jsonb, ARRAY[]::text[], 245000.0, NULL, 50, 10, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ip-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ip-audio-mic-bullet', 'IP 4MP Audio Bullet', 'Records what people say, not just what they do.', '4MP bullet with a high-quality built-in microphone and two-way audio speaker. Great for gates and reception areas where you need to talk to visitors.', '{"tech": {"audio": "Two-way", "warranty": "2 years", "resolution": "4MP"}, "features": ["Built-in microphone", "Two-way audio speaker", "Human voice enhancement", "PoE + 12V DC", "IP66"], "use_case": "Gates, receptions, drive-through counters", "hook_line": "Records what people say, not just what they do.", "image_brief": "White bullet camera with a visible microphone port near the lens, on a gate post.", "recommended_for": "Two-way talk"}'::jsonb, ARRAY[]::text[], 95000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ip-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ip-4mp-dome', 'IP 4MP Indoor Dome', 'Discreet ceiling dome for shops, offices and receptions.', 'Compact 4MP dome, plastic housing, 20m IR, PoE. Blends into a ceiling and doesn''t scream ''CCTV'' at customers.', '{"tech": {"warranty": "2 years", "protection": "IP20 (indoor)", "resolution": "4MP"}, "features": ["4MP true resolution", "20m IR night vision", "Plastic ceiling dome", "PoE + 12V DC", "H.265+"], "use_case": "Shops, offices, receptions, indoor corridors", "hook_line": "Discreet ceiling dome for shops, offices and receptions.", "image_brief": "White ceiling dome camera on an office ceiling.", "recommended_for": "Indoor use"}'::jsonb, ARRAY[]::text[], 65000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ip-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ip-4mp-turret', 'IP 4MP Outdoor Turret', 'Rain-proof turret for tighter angles.', '4MP turret (eyeball) — easier to aim into corners than a dome. IP67, PoE, colour night vision. Great for shopfronts and doorways.', '{"tech": {"warranty": "2 years", "protection": "IP67", "resolution": "4MP"}, "features": ["4MP colour night vision", "IP67 outdoor rated", "Adjustable eyeball head", "PoE + 12V DC", "H.265+"], "use_case": "Shopfronts, entryways, tighter corners", "hook_line": "Rain-proof turret for tighter angles.", "image_brief": "White outdoor turret camera on a shopfront awning.", "recommended_for": "Doorways"}'::jsonb, ARRAY[]::text[], 78000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ip-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ip-5mp-bullet', 'IP 5MP Colour-Night Bullet', 'Full-colour footage at night, no floodlight needed.', '5MP bullet with a starlight sensor and small warm-white LED. Records in colour down to 0.005 lux — much better than IR grayscale.', '{"tech": {"min_lux": 0.005, "warranty": "2 years", "resolution": "5MP"}, "features": ["5MP starlight sensor", "Colour night vision to 30m", "Warm-white LED, no bug swarm", "PoE + 12V DC", "IP67"], "use_case": "Sites where you need to see colours of vehicles and clothing", "hook_line": "Full-colour footage at night, no floodlight needed.", "image_brief": "White bullet camera with a small visible LED, mounted above a shop entrance at night.", "recommended_for": "Night colour"}'::jsonb, ARRAY[]::text[], 115000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ip-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ip-fisheye-6mp', 'IP 6MP Fisheye Ceiling Cam', 'One camera, whole room — 360° coverage from a single ceiling point.', '6MP fisheye camera that gives a full 360° dewarped view. One camera replaces four in an open room. PoE, ONVIF.', '{"tech": {"fov": "360\u00b0", "warranty": "2 years", "resolution": "6MP"}, "features": ["6MP full 360\u00b0 coverage", "Dewarps in NVR or app", "Replaces 4 corner cameras", "PoE + 12V DC", "IP20 (indoor)"], "use_case": "Open-plan offices, retail floors, warehouses", "hook_line": "One camera, whole room \u2014 360\u00b0 coverage from a single ceiling point.", "image_brief": "White ceiling-mounted fisheye camera with a hemispherical lens, on a warehouse ceiling.", "recommended_for": "Open-plan rooms"}'::jsonb, ARRAY[]::text[], 195000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ip-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ip-8mp-4k-bullet', 'IP 8MP 4K Bullet', 'Zoom in on the footage — the pixels are still there.', '8MP (4K) bullet. Zoom into a face across a compound and it stays sharp. Great for gates and driveways where identification matters.', '{"tech": {"warranty": "2 years", "protection": "IP67", "resolution": "8MP"}, "features": ["8MP (4K) resolution", "50m IR range", "Zoom-in-post friendly", "PoE + 12V DC", "IP67"], "use_case": "Gates, driveways and long approaches", "hook_line": "Zoom in on the footage \u2014 the pixels are still there.", "image_brief": "Large white bullet camera on a wall aimed at a compound gate.", "recommended_for": "Identification"}'::jsonb, ARRAY[]::text[], 165000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ip-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ip-8mp-4k-turret', 'IP 8MP 4K Turret', '4K turret for shopfronts that want serious pixel density.', '4K turret camera. Records fine facial detail at counter distance. IP67, PoE, H.265+. Colour night vision option.', '{"tech": {"warranty": "2 years", "protection": "IP67", "resolution": "8MP"}, "features": ["8MP (4K) resolution", "30m IR range", "Colour night vision option", "PoE + 12V DC", "IP67"], "use_case": "Retail shopfronts, tellers, luxury retail", "hook_line": "4K turret for shopfronts that want serious pixel density.", "image_brief": "White turret camera on a shop ceiling with wooden shelves behind it.", "recommended_for": "Retail"}'::jsonb, ARRAY[]::text[], 175000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ip-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ip-panoramic-8mp', 'IP 8MP Multi-Sensor Panoramic', 'Four sensors, one camera — stitched 180° panoramic view.', 'Four 2MP sensors give a combined 180° panoramic feed at 8MP total. One PoE cable does the work of four cameras in front of a compound.', '{"tech": {"fov": "180\u00b0", "sensors": 4, "warranty": "2 years", "resolution": "8MP"}, "features": ["4 stitched 2MP sensors", "180\u00b0 panoramic view", "Single PoE cable", "Recorded as one channel", "IP67"], "use_case": "Compound fronts, forecourts, wide entrances", "hook_line": "Four sensors, one camera \u2014 stitched 180\u00b0 panoramic view.", "image_brief": "White panoramic camera with four visible lens ports arranged in a curve, mounted on a wall.", "recommended_for": "Wide fronts"}'::jsonb, ARRAY[]::text[], 395000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ip-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ptz-4mp-25x', 'PTZ 4MP 25x Outdoor', 'Zoom clear across a compound and read a plate.', '4MP outdoor PTZ with 25x optical zoom (100m+ face recognition). IP66 metal housing, 100m IR range, auto-tracking.', '{"tech": {"zoom": "25x", "warranty": "2 years", "protection": "IP66", "resolution": "4MP"}, "features": ["25x optical zoom", "4MP with auto-track", "100m IR night vision", "IP66 metal housing", "PoE++ or 24V AC"], "use_case": "Compounds, gates, medium-range outdoor overwatch", "hook_line": "Zoom clear across a compound and read a plate.", "image_brief": "White PTZ dome camera on a wall bracket overlooking a compound.", "recommended_for": "Outdoor overwatch"}'::jsonb, ARRAY[]::text[], 680000.0, NULL, 50, 8, 5, FALSE, TRUE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ptz-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ptz-solar-4g', 'PTZ 4MP Solar 4G', 'Off-grid PTZ — panels + battery + 4G, one bundle.', '4MP PTZ, 4G modem, dual 100W solar panels and a 100Ah LiFePO4 battery. Preset patrol and phone control from anywhere.', '{"tech": {"zoom": "20x", "warranty": "2 years", "resolution": "4MP"}, "features": ["4G LTE built in", "Dual 100W solar + 100Ah", "Preset patrol between points", "IP66 metal housing", "20x optical zoom"], "use_case": "Farms, quarries, remote perimeter overwatch", "hook_line": "Off-grid PTZ \u2014 panels + battery + 4G, one bundle.", "image_brief": "White PTZ on a tall pole with two solar panels above it and a battery box, at a remote site.", "recommended_for": "Off-grid overwatch"}'::jsonb, ARRAY[]::text[], 1250000.0, NULL, 50, 4, 5, FALSE, TRUE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ptz-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ptz-8mp-4k-32x', 'PTZ 8MP 4K 32x', 'Serious long-range PTZ — reads plates at 200m.', '4K PTZ with 32x optical zoom, auto-tracking, IP66 metal housing. Reads a licence plate at 200m in daylight.', '{"tech": {"zoom": "32x", "warranty": "2 years", "protection": "IP66", "resolution": "8MP"}, "features": ["32x optical zoom", "8MP 4K sensor", "Auto human/vehicle tracking", "150m IR night vision", "IP66 metal housing"], "use_case": "Large compounds, industrial sites, ports", "hook_line": "Serious long-range PTZ \u2014 reads plates at 200m.", "image_brief": "Large white outdoor PTZ camera mounted high on a pole overlooking an industrial site.", "recommended_for": "Long range"}'::jsonb, ARRAY[]::text[], 1150000.0, NULL, 50, 5, 5, FALSE, TRUE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ptz-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ptz-panoramic-hybrid', 'PTZ Panoramic + Detail Hybrid', 'One 180° panoramic view PLUS a PTZ that auto-zooms into any motion.', 'Dual-form-factor camera: an 8MP panoramic 180° sensor cluster on top and a 25x PTZ below that auto-tracks anything the panoramic sees.', '{"tech": {"zoom": "25x", "warranty": "2 years", "resolution": "8MP + 4MP"}, "features": ["180\u00b0 panoramic 8MP", "25x optical PTZ below", "Auto-tracks motion in panoramic view", "Records both feeds", "IP66"], "use_case": "Estate gates, forecourts, main entrances", "hook_line": "One 180\u00b0 panoramic view PLUS a PTZ that auto-zooms into any motion.", "image_brief": "Dual-camera unit with a panoramic array on top and a PTZ dome below, on a tall pole.", "recommended_for": "Estate gates"}'::jsonb, ARRAY[]::text[], 1850000.0, NULL, 30, 3, 5, FALSE, TRUE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ptz-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ptz-kit-perimeter', 'PTZ Perimeter Kit — 2 PTZ + Radar', 'Two PTZs and a radar sensor for automated perimeter overwatch.', 'Two 4MP 25x PTZs plus one 100m radar that auto-slews the PTZs onto detected motion. Preconfigured — ships ready to mount.', '{"tech": {"cameras": 2, "radar_m": 100, "warranty": "2 years"}, "features": ["2x 4MP 25x PTZs", "1x 100m 24GHz radar", "Radar auto-slews the PTZs", "Central controller", "Ships pre-configured"], "use_case": "Small-to-medium perimeter overwatch", "hook_line": "Two PTZs and a radar sensor for automated perimeter overwatch.", "image_brief": "Flat-lay of two white PTZ cameras and a rectangular radar unit with cables on a workbench.", "recommended_for": "Perimeters"}'::jsonb, ARRAY[]::text[], 2450000.0, NULL, 30, 2, 5, FALSE, TRUE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ptz-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ptz-2mp-laser', 'PTZ 2MP Laser Night PTZ', 'Sees clearly at 500m in total darkness thanks to laser IR.', '2MP starlight PTZ with 30x zoom and 500m laser IR. When you need to see a person a football field away with no streetlight.', '{"tech": {"ir_m": 500, "zoom": "30x", "warranty": "3 years", "resolution": "2MP"}, "features": ["500m laser IR", "30x optical zoom", "2MP starlight sensor", "IP66 metal housing", "24V AC power"], "use_case": "Ports, borders, large yards after dark", "hook_line": "Sees clearly at 500m in total darkness thanks to laser IR.", "image_brief": "Large white PTZ camera on a tall pole with a visible laser illuminator port, at night.", "recommended_for": "Long-range at night"}'::jsonb, ARRAY[]::text[], 1450000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ptz-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ptz-4mp-4x-mini', 'PTZ 4MP 4x Mini Dome', 'Compact pan-tilt-zoom dome for indoor overwatch.', 'Small 4MP mini PTZ with 4x optical zoom. Discreet enough for a shop ceiling, powerful enough to zoom into a face across the room.', '{"tech": {"zoom": "4x", "warranty": "2 years", "resolution": "4MP"}, "features": ["4x optical zoom", "4MP resolution", "Preset patrol between points", "Ceiling or wall mount", "PoE + 12V DC"], "use_case": "Shops, offices, indoor overwatch", "hook_line": "Compact pan-tilt-zoom dome for indoor overwatch.", "image_brief": "Small white PTZ mini dome camera hanging from a shop ceiling.", "recommended_for": "Indoor overwatch"}'::jsonb, ARRAY[]::text[], 245000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ptz-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ptz-4mp-explosion', 'PTZ 4MP Explosion-Proof', 'ATEX-rated PTZ for oil & gas plants.', '4MP 30x PTZ in a stainless-steel explosion-rated housing, ATEX/IECEx Zone 1. Fibre or PoE++ options.', '{"tech": {"zoom": "30x", "warranty": "5 years", "resolution": "4MP", "certification": "ATEX Zone 1"}, "features": ["ATEX/IECEx Zone 1", "4MP 30x zoom", "316L stainless housing", "Fibre or PoE++", "IP68"], "use_case": "Oil & gas, chemical plants, refineries", "hook_line": "ATEX-rated PTZ for oil & gas plants.", "image_brief": "Heavy stainless-steel PTZ camera housing mounted on a refinery pipe.", "recommended_for": "Oil & gas"}'::jsonb, ARRAY['/products/wf-ptz-4mp-explosion.jpg']::text[], 4650000.0, NULL, 30, 2, 5, TRUE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ptz-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ptz-outdoor-wiper', 'PTZ 4MP with Wiper', 'Rain wiper on the lens — clear image during Lagos downpours.', '4MP outdoor PTZ with a small wiper blade on the front glass. Perfect for coastal and heavy-rain sites where droplets ruin normal PTZs.', '{"tech": {"zoom": "25x", "warranty": "2 years", "resolution": "4MP"}, "features": ["Rain wiper on front glass", "4MP 25x zoom", "IP66 metal housing", "Auto human/vehicle tracking", "24V AC or PoE++"], "use_case": "Coastal sites and heavy-rain areas", "hook_line": "Rain wiper on the lens \u2014 clear image during Lagos downpours.", "image_brief": "White outdoor PTZ camera with a visible wiper blade across the front glass, mounted on a pole in rain.", "recommended_for": "Rainy sites"}'::jsonb, ARRAY[]::text[], 895000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ptz-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ptz-anpr-ptz', 'PTZ ANPR / LPR', 'Slews onto vehicles as they arrive and reads the plate.', '5MP PTZ with dedicated ANPR firmware. Auto-slews onto approaching vehicles and captures the plate at up to 60 km/h. Whitelist alerts.', '{"tech": {"zoom": "25x", "warranty": "2 years", "resolution": "5MP"}, "features": ["ANPR firmware built in", "Auto-slew to vehicles", "5MP with 25x zoom", "Blacklist/whitelist alerts", "IP66"], "use_case": "Estate gates, factories, toll points", "hook_line": "Slews onto vehicles as they arrive and reads the plate.", "image_brief": "White PTZ camera on a boom over an estate gate with a car approaching below.", "recommended_for": "Estate gates"}'::jsonb, ARRAY[]::text[], 1450000.0, NULL, 30, 3, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ptz-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ptz-mount-corner', 'PTZ Corner Wall Mount', 'Corner mount so your PTZ can see two walls, not just one.', 'Powder-coated corner wall mount adapter for our outdoor PTZs. Lets you place a PTZ on a building corner and cover two walls at once.', '{"tech": {"warranty": "2 years"}, "features": ["Powder-coated corner mount", "Cable channel", "Fits all WF outdoor PTZs", "Base plate + fixings", "2 year warranty"], "use_case": "PTZ installs at building corners", "hook_line": "Corner mount so your PTZ can see two walls, not just one.", "image_brief": "Grey powder-coated PTZ corner-mount bracket on a workbench next to a PTZ.", "recommended_for": "Corner installs"}'::jsonb, ARRAY[]::text[], 42000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ptz-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ptz-mini-speed-dome', 'PTZ Mini Speed Dome (Indoor)', 'Fast, quiet mini speed dome for indoor tracking.', 'Compact 4MP indoor speed dome with 10x zoom. Silent stepper motors — good for offices where a big whirring PTZ would annoy people.', '{"tech": {"zoom": "10x", "warranty": "2 years", "resolution": "4MP"}, "features": ["10x optical zoom", "Silent stepper motors", "4MP resolution", "Ceiling flush mount", "PoE + 12V DC"], "use_case": "Offices, hotels, malls (indoor)", "hook_line": "Fast, quiet mini speed dome for indoor tracking.", "image_brief": "Small silver ceiling-mounted PTZ speed dome in a hotel corridor.", "recommended_for": "Indoor tracking"}'::jsonb, ARRAY[]::text[], 325000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ptz-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ptz-rugged-mining', 'PTZ Rugged Mining PTZ', 'Built for dust, vibration and abuse.', 'IK10 vandal-rated PTZ in a heavy-duty aluminium housing. Anti-vibration mount, sealed IP67, wide temperature range. Made for mines and quarries.', '{"tech": {"zoom": "30x", "warranty": "3 years", "protection": "IP67/IK10", "resolution": "4MP"}, "features": ["IK10 vandal rating", "4MP 30x zoom", "Anti-vibration mount", "-30 to +65\u00b0C operation", "Aluminium heavy housing"], "use_case": "Mines, quarries, ports", "hook_line": "Built for dust, vibration and abuse.", "image_brief": "Grey heavy-duty PTZ camera mounted on an anti-vibration bracket at a quarry.", "recommended_for": "Mining & quarry"}'::jsonb, ARRAY[]::text[], 1650000.0, NULL, 30, 2, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ptz-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ptz-thermal-ptz', 'PTZ Thermal + Optical', 'Thermal detects, optical identifies — one unit does both.', 'Dual-sensor PTZ with a 384x288 thermal core and a 4MP 25x optical camera. Slews the optical onto any thermal detection automatically.', '{"tech": {"zoom": "25x", "warranty": "3 years", "resolution": "4MP + thermal"}, "features": ["Thermal 384x288 sensor", "4MP 25x optical", "Detects person at 500m", "Auto-slew to thermal target", "IP67 metal housing"], "use_case": "Perimeters, oil depots, ports at night", "hook_line": "Thermal detects, optical identifies \u2014 one unit does both.", "image_brief": "Large dual-lens PTZ camera on a heavy-duty pole with visible thermal and optical lens ports.", "recommended_for": "Perimeters"}'::jsonb, ARRAY['/products/wf-ptz-thermal-ptz.jpg']::text[], 3850000.0, NULL, 30, 2, 5, TRUE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ptz-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-ptz-controller-joystick', 'PTZ USB Joystick Controller', 'Three-axis joystick — control PTZs like a proper security desk.', 'USB joystick with a 3-axis handle, dedicated buttons for presets, patrols and iris. Works with all our NVRs and Windows VMS software.', '{"tech": {"axes": 3, "warranty": "2 years"}, "features": ["3-axis PTZ joystick", "Preset & patrol buttons", "USB plug-and-play", "Windows VMS support", "2-year warranty"], "use_case": "Guard desks, control rooms", "hook_line": "Three-axis joystick \u2014 control PTZs like a proper security desk.", "image_brief": "Black 3-axis joystick controller on a control-room desk in front of a video wall.", "recommended_for": "Guard desks"}'::jsonb, ARRAY[]::text[], 95000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'ptz-cameras'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-vdb-2mp-wifi', 'Doorbell 2MP WiFi', 'Simple WiFi doorbell — chime in your pocket, not on the wall.', 'Battery+wired 2MP video doorbell with two-way talk, motion detection and phone push alerts. Chime plugs into any wall socket.', '{"tech": {"warranty": "2 years", "resolution": "2MP"}, "features": ["2MP video + two-way audio", "Battery or hardwired", "Wireless chime included", "Free cloud clip storage (7 days)", "IP65"], "use_case": "Homes and small offices with WiFi", "hook_line": "Simple WiFi doorbell \u2014 chime in your pocket, not on the wall.", "image_brief": "Small black video doorbell mounted beside a wooden front door.", "recommended_for": "Homes"}'::jsonb, ARRAY[]::text[], 68000.0, NULL, 100, 15, 5, FALSE, TRUE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'video-doorbells'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-vdb-kit-home', 'Doorbell Complete Home Kit', 'Doorbell + 7-inch indoor monitor + gate relay in one box.', 'Everything a family needs: our 4MP PoE doorbell, one 7-inch indoor screen and a wireless unlock relay for the front gate. Pre-linked, ready to install.', '{"tech": {"warranty": "2 years"}, "features": ["4MP PoE video doorbell", "7-inch indoor touchscreen", "Wireless gate unlock relay", "All fixings & short cables", "Free remote setup"], "use_case": "Homes wanting one boxed doorbell solution", "hook_line": "Doorbell + 7-inch indoor monitor + gate relay in one box.", "image_brief": "Flat-lay of a video doorbell, an indoor touchscreen and a small relay unit with cables on a workbench.", "recommended_for": "Family homes"}'::jsonb, ARRAY[]::text[], 295000.0, NULL, 50, 8, 5, FALSE, TRUE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'video-doorbells'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-vdb-large-screen-10in', 'Doorbell 10-inch Indoor Monitor', 'Big 10-inch screen for the main hallway or reception.', '10-inch indoor monitor for our IP doorbell system. Wall-mount, PoE, records snapshots, supports 4 door stations.', '{"tech": {"warranty": "2 years", "screen_in": 10}, "features": ["10-inch colour touch screen", "Supports up to 4 door stations", "PoE powered", "Records visitor snapshots", "Wall mount included"], "use_case": "Main halls, receptions, security desks", "hook_line": "Big 10-inch screen for the main hallway or reception.", "image_brief": "Wall-mounted 10-inch colour touchscreen on a reception wall showing a doorway feed.", "recommended_for": "Reception screens"}'::jsonb, ARRAY[]::text[], 195000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'video-doorbells'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-vdb-2k-wifi', 'Doorbell 2K WiFi', 'Sharp enough to see who''s really at the door.', '2K resolution video doorbell with better low-light performance, a wider 160° lens and no monthly fee for local SD recording.', '{"tech": {"fov": "160\u00b0", "warranty": "2 years", "resolution": "2K"}, "features": ["2K sharper video", "160\u00b0 wide lens", "Local SD recording, no fee", "Two-way talk + siren", "IP65"], "use_case": "Homes wanting to see the whole doorway clearly", "hook_line": "Sharp enough to see who''s really at the door.", "image_brief": "Slim black video doorbell with a wide-angle lens beside a modern front door.", "recommended_for": "Homes"}'::jsonb, ARRAY[]::text[], 95000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'video-doorbells'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-vdb-3mp-battery', 'Doorbell 3MP Battery', 'No wiring — runs six months on a charge.', 'Fully wireless 3MP doorbell with a rechargeable 5000mAh battery. Six months typical use per charge. Great for rentals where you can''t drill.', '{"tech": {"warranty": "2 years", "resolution": "3MP", "battery_mah": 5000}, "features": ["No wiring at all", "5000mAh battery, ~6 months", "3MP video + two-way talk", "WiFi + wireless chime", "IP65"], "use_case": "Rentals, apartments, no-wiring installs", "hook_line": "No wiring \u2014 runs six months on a charge.", "image_brief": "Small white wireless doorbell magnetically attached beside a rental apartment door.", "recommended_for": "Rentals"}'::jsonb, ARRAY[]::text[], 78000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'video-doorbells'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-vdb-intercom-4-unit', 'Doorbell 4-Unit Intercom', 'Four-flat intercom system — one door, four handsets.', 'IP intercom video doorbell with 4 indoor screens (7-inch) — one per flat. Records visitors to a shared NVR. Unlock relay for a shared front gate.', '{"tech": {"screens": 4, "stations": 1, "warranty": "2 years"}, "features": ["1 door station + 4 screens", "7-inch indoor monitors", "Unlock relay for gate/door", "Records to shared NVR", "PoE + local backup"], "use_case": "4-flat buildings with a shared front door", "hook_line": "Four-flat intercom system \u2014 one door, four handsets.", "image_brief": "Slim silver door station with a screen and buttons, mounted beside a shared apartment entrance.", "recommended_for": "Multi-unit buildings"}'::jsonb, ARRAY['/products/wf-vdb-intercom-4-unit.jpg']::text[], 485000.0, NULL, 100, 15, 5, TRUE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'video-doorbells'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-vdb-face-recog', 'Doorbell 4MP Face-Recognition', 'Learns your family — and tells you when a stranger arrives.', '4MP doorbell with on-device face recognition. Silent for known faces, alert for unknowns. Records to SD or NVR, no cloud required.', '{"tech": {"warranty": "2 years", "resolution": "4MP"}, "features": ["On-device face recognition", "Silent for known faces", "4MP video + two-way audio", "SD or NVR recording", "IP65"], "use_case": "Homes wanting smarter alerts", "hook_line": "Learns your family \u2014 and tells you when a stranger arrives.", "image_brief": "Black slim video doorbell with a visible IR sensor and lens, beside a modern front door.", "recommended_for": "Smarter homes"}'::jsonb, ARRAY[]::text[], 195000.0, NULL, 50, 10, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'video-doorbells'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-vdb-4mp-ip-poe', 'Doorbell 4MP IP PoE', 'PoE video doorbell that records straight to your NVR.', '4MP IP doorbell with PoE — records straight to your existing NVR alongside your CCTV. No cloud, no app account, no subscription.', '{"tech": {"warranty": "2 years", "resolution": "4MP"}, "features": ["4MP video, records to NVR", "PoE \u2014 one Cat6 does everything", "Two-way audio", "No cloud account needed", "ONVIF"], "use_case": "Homes and offices already running an IP NVR", "hook_line": "PoE video doorbell that records straight to your NVR.", "image_brief": "White PoE doorbell camera beside a front door, with a Cat6 cable visible.", "recommended_for": "NVR sites"}'::jsonb, ARRAY[]::text[], 145000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'video-doorbells'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-vdb-large-screen-7in', 'Doorbell 7-inch Indoor Monitor', 'Big colourful screen for the hallway — see who''s at the door across the room.', '7-inch colour touch screen indoor monitor for our IP doorbells. Wall-mount, PoE-powered, records snapshots of every ring.', '{"tech": {"warranty": "2 years", "screen_in": 7}, "features": ["7-inch colour touch screen", "PoE powered", "Records visitor snapshots", "Wall mount included", "Ties to any WF IP doorbell"], "use_case": "Adding an extra indoor screen to a doorbell install", "hook_line": "Big colourful screen for the hallway \u2014 see who''s at the door across the room.", "image_brief": "Wall-mounted 7-inch colour touchscreen showing a doorway image in a home hallway.", "recommended_for": "Indoor screens"}'::jsonb, ARRAY[]::text[], 78000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'video-doorbells'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-vdb-intercom-8-unit', 'Doorbell 8-Unit Intercom', 'Eight-flat intercom with tenant-selectable calling.', 'IP intercom with a directory pad that lets visitors call any of 8 flats. Comes with 8 indoor screens and a shared unlock relay. Records to NVR.', '{"tech": {"screens": 8, "stations": 1, "warranty": "2 years"}, "features": ["Directory-pad calls any flat", "8 indoor 7-inch monitors", "Unlock relay", "Records to NVR", "PoE + backup power"], "use_case": "8-unit apartment blocks", "hook_line": "Eight-flat intercom with tenant-selectable calling.", "image_brief": "Larger silver door station with a directory keypad and screen, mounted beside an apartment entrance.", "recommended_for": "Apartments"}'::jsonb, ARRAY['/products/wf-vdb-intercom-8-unit.jpg']::text[], 895000.0, NULL, 30, 3, 5, TRUE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'video-doorbells'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-vdb-dual-lens', 'Doorbell Dual-Lens Head-to-Toe', 'Two lenses — one for face, one for the parcel on the doormat.', 'Dual-lens video doorbell: one wide lens for face recognition, one downward-angle lens to see parcels and dogs. Both stream simultaneously.', '{"tech": {"warranty": "2 years", "resolution": "2K + 1080p"}, "features": ["Dual lens: face + package", "2K wide + 1080p down", "Package alerts", "Two-way talk", "IP65"], "use_case": "Homes with regular deliveries", "hook_line": "Two lenses \u2014 one for face, one for the parcel on the doormat.", "image_brief": "Slim black video doorbell with two visible lens circles, beside a front door with a package on the mat.", "recommended_for": "Deliveries"}'::jsonb, ARRAY[]::text[], 165000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'video-doorbells'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-vdb-package-locker-cam', 'Doorbell Package-Locker Camera', 'Discreet 2nd camera aimed at your parcel drop-box.', 'Small companion camera for our video doorbells — mount it in a parcel locker or above a doormat. Streams into the same doorbell app.', '{"tech": {"warranty": "2 years", "resolution": "2MP"}, "features": ["Companion parcel-view camera", "2MP wide-angle lens", "Pairs with WF doorbells", "Battery or WiFi", "IP65"], "use_case": "Homes with a delivery locker or drop-mat", "hook_line": "Discreet 2nd camera aimed at your parcel drop-box.", "image_brief": "Small white companion camera aimed down into a delivery locker at a front porch.", "recommended_for": "Delivery zones"}'::jsonb, ARRAY[]::text[], 68000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'video-doorbells'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-vdb-solar-battery', 'Doorbell Solar Battery', 'Solar-topped battery doorbell — never charge it again.', 'Battery video doorbell with a matching mini solar panel (mount above the door). Trickle-charges through daylight so the battery never runs out.', '{"tech": {"warranty": "2 years", "resolution": "3MP"}, "features": ["Battery + solar top-up", "Never manually charge", "3MP video + two-way audio", "WiFi + wireless chime", "IP65"], "use_case": "Homes with a bright front door area", "hook_line": "Solar-topped battery doorbell \u2014 never charge it again.", "image_brief": "Battery video doorbell with a small solar panel mounted above it on a sunny porch.", "recommended_for": "Sunny doors"}'::jsonb, ARRAY[]::text[], 115000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'video-doorbells'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-vdb-anti-vandal', 'Doorbell Vandal-Proof Video', 'Metal doorbell for tough neighbourhoods and public entries.', 'IK10 vandal-rated metal video doorbell — screwed flush, no removable parts. 2MP video + two-way talk. Great for offices and public buildings.', '{"tech": {"warranty": "3 years", "protection": "IP66/IK10", "resolution": "2MP"}, "features": ["IK10 vandal rating", "Flush metal housing", "2MP + two-way audio", "PoE", "IP66"], "use_case": "Offices, public buildings, high-risk streets", "hook_line": "Metal doorbell for tough neighbourhoods and public entries.", "image_brief": "Flush metal video doorbell recessed into a concrete wall beside a heavy office door.", "recommended_for": "Public buildings"}'::jsonb, ARRAY[]::text[], 125000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'video-doorbells'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

  INSERT INTO public.products (slug, name, short_description, description, specs, images, price_ngn, compare_at_price_ngn, deposit_percent, stock, low_stock_threshold, is_active, is_featured, is_subscription, subscription_interval, paystack_plan_code, sku, category_id)
  VALUES ('wf-vdb-relay-unlock', 'Doorbell Wireless Unlock Relay', 'Adds a remote-unlock relay to any of our doorbells.', 'Wireless 12V relay that pairs with any WF video doorbell — tap the app to unlock a gate or door remotely. Fits behind a maglock or strike lock.', '{"tech": {"voltage": "12V", "warranty": "2 years"}, "features": ["12V relay for gate/door", "Pairs with any WF doorbell", "Remote unlock from the app", "Fits maglocks and strike locks", "2 year warranty"], "use_case": "Adding remote unlock to a doorbell install", "hook_line": "Adds a remote-unlock relay to any of our doorbells.", "image_brief": "Small black wireless relay unit next to an electric strike lock on a workbench.", "recommended_for": "Remote unlock"}'::jsonb, ARRAY[]::text[], 45000.0, NULL, 100, 15, 5, FALSE, FALSE, FALSE, NULL, NULL, NULL, (SELECT id FROM public.product_categories WHERE slug = 'video-doorbells'))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    specs = EXCLUDED.specs,
    images = EXCLUDED.images,
    price_ngn = EXCLUDED.price_ngn,
    compare_at_price_ngn = EXCLUDED.compare_at_price_ngn,
    deposit_percent = EXCLUDED.deposit_percent,
    stock = EXCLUDED.stock,
    low_stock_threshold = EXCLUDED.low_stock_threshold,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    is_subscription = EXCLUDED.is_subscription,
    subscription_interval = EXCLUDED.subscription_interval,
    paystack_plan_code = EXCLUDED.paystack_plan_code,
    sku = EXCLUDED.sku,
    category_id = EXCLUDED.category_id,
    updated_at = now();

END $seed$;