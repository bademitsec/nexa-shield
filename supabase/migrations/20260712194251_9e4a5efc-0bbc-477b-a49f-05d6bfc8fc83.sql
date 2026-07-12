UPDATE public.products SET images = ARRAY['/products/' || slug || '.jpg'] WHERE slug IN (
  'nx-4mp-bullet','nx-4mp-ptz','nx-nvr-8ch-2tb','nx-nvr-16ch-4tb','nx-lock-bio','nx-alarm-starter',
  'plan-monitoring-home','plan-monitoring-business',
  'sentinel-2mp-indoor-dome','sentinel-2mp-outdoor-bullet','sentinel-5mp-varifocal-bullet','sentinel-5mp-outdoor-dome',
  'sentinel-pro-4k-bullet','guardian-colour-night-bullet','guardian-long-range-ir-bullet','guardian-turret-3mp',
  'guardian-hidden-cube-2mp','sentinel-audio-in-bullet-4mp','fortress-8mp-motorised-zoom','fortress-wide-view-180-bullet',
  'fortress-anti-vandal-4k-turret','compound-perimeter-kit-4-cams','compound-perimeter-kit-8-cams'
);