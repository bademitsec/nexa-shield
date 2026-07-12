
ALTER TABLE public.product_categories
  ADD COLUMN IF NOT EXISTS banner_headline text;

INSERT INTO public.product_categories (slug, name, description, banner_headline, display_order) VALUES
  ('cctv-cameras', 'CCTV Cameras',
   'Analog HD and hybrid cameras built for real Nigerian conditions — heat, dust, sun, storms. From single-shop coverage to full compound perimeters.',
   'CCTV That Actually Sees What Happens After Dark',
   10),
  ('nvr-systems', 'NVR Systems',
   'Network video recorders sized from a corner shop to a warehouse. PoE built in so one cable carries video and power to each camera.',
   'Record Everything. Never Miss a Frame.',
   20),
  ('site-security-cameras', 'Site Security Cameras',
   '4G cameras that work where WiFi doesn''t reach — construction sites, farms, remote yards. No router, no monthly fibre, just a SIM.',
   'Security for Places Without Internet',
   30),
  ('solar-cctv', 'Solar CCTV Cameras',
   'Fully solar-powered cameras with battery backup for days without sun. Install anywhere — perimeter fences, off-grid sites, warehouses.',
   'Solar CCTV: Security That Doesn''t Need a Power Outlet',
   40),
  ('ip-cameras', 'IP Cameras',
   'Sharp, network-based cameras for indoor and outdoor use. Two-way audio, remote app viewing, cloud or local recording.',
   'See, Hear, and Respond From Anywhere',
   50),
  ('ptz-cameras', 'PTZ Cameras',
   'Pan, tilt, zoom cameras that cover wide areas from a single mount. Track motion automatically, zoom in to read a plate 200m away.',
   'One Camera. Total Coverage.',
   60),
  ('video-doorbells', 'Video Doorbells',
   'See who''s at your gate before you open it. Two-way talk, motion alerts, night vision, all on your phone.',
   'Know Who''s at the Door — From Anywhere',
   70),
  ('home-business-automation', 'Home & Business Automation',
   'Smart locks, lighting, sensors, plugs and hubs that turn a building into a system you actually control from your phone.',
   'Automate the Small Things. Focus on the Big Ones.',
   80)
ON CONFLICT (slug) DO UPDATE
  SET name = EXCLUDED.name,
      description = EXCLUDED.description,
      banner_headline = EXCLUDED.banner_headline,
      display_order = EXCLUDED.display_order;
