-- Update product references to remove Nigerian-specific copy
UPDATE public.products
SET specs = jsonb_set(specs, '{use_case}', '"Any NVR install with unstable power"')
WHERE slug = 'wf-nvr-ups-1kva';

UPDATE public.products
SET description = '4MP PTZ, 4G modem, dual 100W solar panels and a 100Ah LiFePO4 battery. Preset patrol and phone control from anywhere.'
WHERE slug = 'wf-ptz-solar-4g';

-- Update product category copy
UPDATE public.product_categories
SET description = 'Analog HD and hybrid cameras built for real African conditions — heat, dust, sun, storms. From single-shop coverage to full compound perimeters.'
WHERE slug = 'cctv-cameras';

-- Update portfolio project copy and Nigerian city references
UPDATE public.portfolio_projects
SET title = 'E-commerce Rebuild for an African Fashion Brand',
    client = 'Fashion DTC Brand'
WHERE slug = 'naija-fashion-ecom';

UPDATE public.portfolio_projects
SET client = 'Private Residence'
WHERE slug = 'lekki-residence-cctv';

UPDATE public.portfolio_projects
SET client = 'African Fintech Startup'
WHERE slug = 'abuja-fintech-marketing';

UPDATE public.portfolio_projects
SET title = 'Estate-wide Access Control',
    client = 'Private Estate'
WHERE slug = 'estate-access-control';

-- Update blog post copy and author attribution
UPDATE public.blog_posts
SET title = 'How to Choose CCTV for an African Home in 2026',
    excerpt = '2K vs 4K, PoE vs Wi-Fi, and why cloud backup matters when the power goes out.',
    content = '## The short version

For most African homes, a 4-camera PoE NVR system with 2K cameras and a UPS-backed NVR is the sweet spot.

## What to look for

- **Resolution**: 2K (4MP) is the new baseline. 4K only where you need to read license plates.
- **Power over Ethernet**: fewer cables, no Wi-Fi drops.
- **Local + cloud recording**: on-site NVR for speed, cloud for burglary/fire.
- **UPS**: 30–60 minutes of runtime keeps you covered through short outages.

## Common mistakes

1. Buying the cheapest cameras and skipping the NVR quality.
2. No UPS on the recorder — losing footage during outages.
3. Weak passwords on the mobile app.',
    author_name = 'Webfortix Team'
WHERE slug = 'choosing-cctv-nigerian-home';

UPDATE public.blog_posts
SET title = 'SEO That Actually Works for Local Businesses',
    excerpt = 'Local packs, Google Business Profile, and the three on-page fixes that matter most for African SMBs.',
    content = '## Start with Google Business Profile

Claim, verify, add photos weekly, and reply to every review — including one-star ones.

## On-page basics

- Unique title & meta per page
- One H1 per page, keyword in first paragraph
- Fast mobile pages — LCP under 2.5s on 4G

## Content cadence

One useful post per week beats ten thin posts per month. Answer real questions from your customers.',
    author_name = 'Webfortix Team'
WHERE slug = 'seo-for-lagos-businesses';