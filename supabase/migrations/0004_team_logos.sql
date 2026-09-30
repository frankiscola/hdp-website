-- HyperHub Network — team logos, served as static assets from the site itself
-- (public/team-logos/<slug>.png) rather than Supabase Storage, so no storage
-- credentials are needed here. Already applied directly to the project;
-- kept for the repo's migration history. Spectraloop has no logo yet.

update public.teams set logo_url = '/team-logos/' || slug || '.png'
where slug in (
  'delft-hyperloop','hyped','hyperloop-upv','swissloop','vegapod-hyperloop','itu-hyperbee',
  'creatiny-technology-society','hermod-hyperloop','loopmit','mu-zero-hyperloop','kilavuz-hyperush',
  'hyperloop-manchester','avishkar-hyperloop','selcuk-kapsul','hyperlink','duke-hyperloop',
  'smith-engineering-hyperloop','hyperloopin-srm','infinity-hyperloop','warwick-hyperloop','partech',
  'albertaloop','polyloop','texas-guadaloop','vac-vectoor-hyperloop','cornell-hyperloop','dromos',
  'force-hyperloop','transpeed','hyper-pwr','levitate-hyperloop','hypercage','metropolitan-hyperloop'
);
