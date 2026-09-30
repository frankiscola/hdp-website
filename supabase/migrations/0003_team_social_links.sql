-- HyperHub Network — add social links and populate them from the EHW 2026
-- participating teams page (source captured 2026-09-29). Already applied
-- directly to the Supabase project; kept here for the repo's migration history.

alter table public.teams
  add column if not exists instagram_url text,
  add column if not exists linkedin_url text,
  add column if not exists youtube_url text;

  update public.teams set instagram_url = 'https://www.instagram.com/delfthyperloop/', linkedin_url = 'https://www.linkedin.com/company/delft-hyperloop', youtube_url = 'https://www.youtube.com/@delfthyperloop8143' where slug = 'delft-hyperloop';
  update public.teams set instagram_url = 'https://www.instagram.com/hypedinburgh/', linkedin_url = 'https://www.linkedin.com/company/hyp-ed/', youtube_url = 'https://www.youtube.com/@hypededinburgh2188' where slug = 'hyped';
  update public.teams set instagram_url = 'https://www.instagram.com/hyperloopupv/', linkedin_url = 'https://www.linkedin.com/company/hyperloopupv', youtube_url = 'https://www.youtube.com/@HyperloopUPVYT' where slug = 'hyperloop-upv';
  update public.teams set instagram_url = 'https://www.instagram.com/swissloop_ch/', linkedin_url = 'https://ch.linkedin.com/company/swissloop', youtube_url = 'https://www.youtube.com/channel/UCMenYwAd6L9STw5r8WWQ8ZQ' where slug = 'swissloop';
  update public.teams set instagram_url = 'https://www.instagram.com/vegapodhyperloop/', linkedin_url = 'https://www.linkedin.com/company/teamvegapodhyperloop/', youtube_url = 'https://www.youtube.com/@TeamVegapodHyperloop' where slug = 'vegapod-hyperloop';
  update public.teams set instagram_url = 'https://www.instagram.com/ituhyperbee/', linkedin_url = 'https://www.linkedin.com/company/ituhyperbee/', youtube_url = 'https://www.youtube.com/@ituhyperbee' where slug = 'itu-hyperbee';
  update public.teams set instagram_url = 'https://www.instagram.com/creatiny/', linkedin_url = null, youtube_url = null where slug = 'creatiny-technology-society';
  update public.teams set instagram_url = 'https://www.instagram.com/tauhermodhyperloop/', linkedin_url = 'https://www.linkedin.com/company/hermod-hyperloop/', youtube_url = null where slug = 'hermod-hyperloop';
  update public.teams set instagram_url = 'https://www.instagram.com/loopmit/', linkedin_url = 'https://www.linkedin.com/company/loopmit/', youtube_url = null where slug = 'loopmit';
  update public.teams set instagram_url = 'https://www.instagram.com/muzero_hyperloop/', linkedin_url = 'https://www.linkedin.com/company/mu-zero-hyperloop/', youtube_url = 'https://www.youtube.com/@mu-zerohyperloop1883' where slug = 'mu-zero-hyperloop';
  update public.teams set instagram_url = 'https://www.instagram.com/podhyperush/', linkedin_url = 'https://www.linkedin.com/company/hyperush/', youtube_url = null where slug = 'kilavuz-hyperush';
  update public.teams set instagram_url = 'https://www.instagram.com/hyperloopmanchester/', linkedin_url = 'https://www.linkedin.com/company/hyperloop-manchester/', youtube_url = null where slug = 'hyperloop-manchester';
  update public.teams set instagram_url = 'https://www.instagram.com/avishkarhyperloop/', linkedin_url = 'https://www.linkedin.com/company/avishkarhyperloop', youtube_url = 'https://www.youtube.com/@avishkarhyperloop1' where slug = 'avishkar-hyperloop';
  update public.teams set instagram_url = 'https://www.instagram.com/selcukkapsul.hyperloop/', linkedin_url = 'https://www.linkedin.com/company/sukapsulhyperloop/', youtube_url = null where slug = 'selcuk-kapsul';
  update public.teams set instagram_url = 'https://www.instagram.com/hyperlinklondon/', linkedin_url = 'https://www.linkedin.com/company/hyperlinkhyperloop', youtube_url = null where slug = 'hyperlink';
  update public.teams set instagram_url = 'https://www.instagram.com/dukehyperloopclub/', linkedin_url = null, youtube_url = null where slug = 'duke-hyperloop';
  update public.teams set instagram_url = 'https://www.instagram.com/smithhyperloop/', linkedin_url = 'https://www.linkedin.com/company/queenshyperloop/', youtube_url = null where slug = 'smith-engineering-hyperloop';
  update public.teams set instagram_url = 'https://www.instagram.com/hyperloopinsrm/', linkedin_url = 'https://www.linkedin.com/company/hyperloopin', youtube_url = null where slug = 'hyperloopin-srm';
  update public.teams set instagram_url = 'https://www.instagram.com/infinity_hyperloop/', linkedin_url = 'https://in.linkedin.com/company/infinity-hyperloop', youtube_url = null where slug = 'infinity-hyperloop';
  update public.teams set instagram_url = 'https://www.instagram.com/warwickhyperloop/', linkedin_url = 'https://www.linkedin.com/company/warwickhyperloop/', youtube_url = null where slug = 'warwick-hyperloop';
  update public.teams set instagram_url = 'https://www.instagram.com/partechyperloop', linkedin_url = 'https://www.linkedin.com/company/paradigmatech', youtube_url = null where slug = 'partech';
  update public.teams set instagram_url = 'https://www.instagram.com/albertaloopuofa/', linkedin_url = 'https://www.linkedin.com/company/albertaloop', youtube_url = 'https://www.youtube.com/channel/UCCboUWAQ9dxWE7PBmlDfFNg' where slug = 'albertaloop';
  update public.teams set instagram_url = 'https://www.instagram.com/polyloopmtl/', linkedin_url = 'https://www.linkedin.com/company/polyloop-montreal/', youtube_url = 'https://www.youtube.com/@polyloopmontreal52' where slug = 'polyloop';
  update public.teams set instagram_url = 'https://www.instagram.com/texasguadaloop/', linkedin_url = 'https://www.linkedin.com/company/texas-guadaloop/', youtube_url = null where slug = 'texas-guadaloop';
  update public.teams set instagram_url = 'https://www.instagram.com/vac_vectoor_hyperloop/', linkedin_url = null, youtube_url = null where slug = 'vac-vectoor-hyperloop';
  update public.teams set instagram_url = 'https://www.instagram.com/cornellhyperloop/', linkedin_url = 'https://www.linkedin.com/company/cornell-hyperloop/', youtube_url = null where slug = 'cornell-hyperloop';
  update public.teams set instagram_url = 'https://www.instagram.com/teamdromos/', linkedin_url = 'https://linkedin.com/company/team-dromos', youtube_url = null where slug = 'dromos';
  update public.teams set instagram_url = 'https://www.instagram.com/force_hyperloop/', linkedin_url = null, youtube_url = null where slug = 'force-hyperloop';
  update public.teams set instagram_url = 'https://www.instagram.com/transpeed_agh/', linkedin_url = 'https://www.linkedin.com/company/transpeed-agh/', youtube_url = null where slug = 'transpeed';
  update public.teams set instagram_url = 'https://www.instagram.com/kn_hyper/', linkedin_url = null, youtube_url = null where slug = 'hyper-pwr';
  update public.teams set instagram_url = 'https://www.instagram.com/levitate_vit/', linkedin_url = 'https://www.linkedin.com/company/levitate-vit/', youtube_url = null where slug = 'levitate-hyperloop';
  update public.teams set instagram_url = 'https://www.instagram.com/spectraloop/', linkedin_url = 'https://www.linkedin.com/company/spectraloop/', youtube_url = null where slug = 'spectraloop';
  update public.teams set instagram_url = 'https://www.instagram.com/hypercage_gtu/', linkedin_url = 'https://www.linkedin.com/company/hypercage/', youtube_url = null where slug = 'hypercage';
  update public.teams set instagram_url = 'https://www.instagram.com/metrohyperloop', linkedin_url = 'https://ca.linkedin.com/company/metrohyperloop', youtube_url = null where slug = 'metropolitan-hyperloop';
