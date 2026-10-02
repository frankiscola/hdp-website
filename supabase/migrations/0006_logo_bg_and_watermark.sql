-- HyperHub Network — per-logo display hints, already applied directly to the
-- project. Kept here for the repo's migration history.
--
-- logo_bg: badge background needed to keep the logo visible ("dark" for a
-- white/light mark on a transparent background, "light" otherwise).
-- logo_watermark: whether the logo is safe to also show as a large faint
-- watermark behind the card (false for logos with a flat baked-in background,
-- where the watermark would render as a solid block instead of a silhouette).

alter table public.teams
  add column if not exists logo_bg text not null default 'light' check (logo_bg in ('light','dark')),
  add column if not exists logo_watermark boolean not null default true;

update public.teams set logo_bg = 'dark'
where slug in (
  'force-hyperloop','hyped','hyper-pwr','hyperlink','hyperloop-manchester',
  'hyperloop-upv','itu-hyperbee','loopmit','smith-engineering-hyperloop','vegapod-hyperloop'
);

update public.teams set logo_watermark = false
where slug in (
  'cornell-hyperloop','dromos','hypercage','kilavuz-hyperush',
  'selcuk-kapsul','hyperloopin-srm','texas-guadaloop','vac-vectoor-hyperloop'
);

-- Re-processed logos removed a lot of empty canvas margin, so three objects
-- changed extension from .jpg to .png when re-uploaded to Storage.
update public.teams set logo_url = replace(logo_url, '.jpg', '.png')
where slug in ('creatiny-technology-society','kilavuz-hyperush','hyperloopin-srm','dromos','hypercage');
