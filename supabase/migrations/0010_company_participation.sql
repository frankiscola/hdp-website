-- Companies directory — explicit "participates as" flags, chosen by an HDP
-- admin in /admin. Each flag controls in which HyperHub section a company
-- shows up: Sponsor, Career and/or Thesis.

-- thesis_info is already used by the app; make sure the column exists on
-- databases that never got it.
alter table public.companies
  add column if not exists thesis_info text;

alter table public.companies
  add column if not exists offers_sponsorship boolean not null default false,
  add column if not exists offers_careers boolean not null default false,
  add column if not exists offers_thesis boolean not null default false;

-- Backfill from what the directory did implicitly until now: a company was
-- listed in a section whenever the matching text field was filled in.
update public.companies set
  offers_sponsorship = coalesce(nullif(btrim(sponsorship_offer), '') is not null, false),
  offers_careers     = coalesce(nullif(btrim(hiring_info), '') is not null, false),
  offers_thesis      = coalesce(nullif(btrim(thesis_info), '') is not null, false);
