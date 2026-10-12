-- HyperHub Portal — "Add your team" applications.
--
-- Student teams apply through a public form on /hyperhub. Each submission is
-- stored as a *pending* row in public.team_applications, with the two logo
-- files in a PRIVATE storage bucket, so nothing goes live (or becomes publicly
-- readable) before an HDP admin has reviewed it in /admin.
--
-- Anonymous visitors can only INSERT a pending row and upload into their own
-- application folder: they can never read, update or delete anything.

-- ---------------------------------------------------------------------------
-- Applications
-- ---------------------------------------------------------------------------
create table public.team_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users (id) on delete set null,
  review_notes text,
  -- Set when the application has been turned into a public teams row.
  team_id uuid references public.teams (id) on delete set null,

  -- The team
  team_name text not null check (char_length(team_name) between 2 and 120),
  university text not null check (char_length(university) between 2 and 200),
  country text not null check (char_length(country) between 2 and 100),
  city text check (char_length(city) <= 100),
  founded_year integer check (founded_year between 1990 and 2100),
  website text check (char_length(website) <= 300),
  description text check (char_length(description) <= 600),
  focus_areas text[] not null default '{}',
  seeking_sponsors boolean not null default false,
  linkedin_url text check (char_length(linkedin_url) <= 300),
  instagram_url text check (char_length(instagram_url) <= 300),
  youtube_url text check (char_length(youtube_url) <= 300),

  -- Reference contact (internal only: never shown on the public site)
  contact_name text not null check (char_length(contact_name) between 2 and 120),
  contact_role text check (char_length(contact_role) <= 120),
  contact_email text not null
    check (contact_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(contact_email) <= 200),

  -- Paths inside the private "team-applications" bucket
  logo_light_path text not null,
  logo_dark_path text not null,

  consent_given boolean not null default false
);

create index team_applications_status_idx
  on public.team_applications (status, created_at desc);

alter table public.team_applications enable row level security;

-- Anyone may submit; the check stops a caller from pre-approving themselves
-- or skipping the privacy consent.
create policy "anyone can submit an application" on public.team_applications
  for insert to anon, authenticated
  with check (
    status = 'pending'
    and consent_given = true
    and reviewed_at is null
    and reviewed_by is null
    and review_notes is null
    and team_id is null
  );

create policy "admins can read applications" on public.team_applications
  for select to authenticated using (public.is_admin());

create policy "admins can update applications" on public.team_applications
  for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "admins can delete applications" on public.team_applications
  for delete to authenticated using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Private bucket for the submitted logos
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'team-applications',
  'team-applications',
  false,
  2097152, -- 2 MB per file
  array['image/png', 'image/webp', 'image/svg+xml']
)
on conflict (id) do nothing;

-- Upload only to <uuid>/light.<ext> or <uuid>/dark.<ext>.
create policy "applicants can upload logos" on storage.objects
  for insert to anon, authenticated
  with check (
    bucket_id = 'team-applications'
    and name ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/(light|dark)\.(png|webp|svg)$'
  );

create policy "admins can read application logos" on storage.objects
  for select to authenticated
  using (bucket_id = 'team-applications' and public.is_admin());

create policy "admins can delete application logos" on storage.objects
  for delete to authenticated
  using (bucket_id = 'team-applications' and public.is_admin());

-- ---------------------------------------------------------------------------
-- Approval: admins publish logos into the public team-logos bucket and
-- create/edit rows in public.teams from the /admin panel.
-- ---------------------------------------------------------------------------
create policy "admins can upload team logos" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'team-logos' and public.is_admin());

create policy "admins can replace team logos" on storage.objects
  for update to authenticated
  using (bucket_id = 'team-logos' and public.is_admin())
  with check (bucket_id = 'team-logos' and public.is_admin());

create policy "admins can manage teams" on public.teams
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- One logo per theme. The public site shows logo_light_url on the light theme
-- and logo_dark_url on the dark theme; teams without them keep using the
-- original logo_url / logo_bg behaviour.
alter table public.teams
  add column if not exists logo_light_url text,
  add column if not exists logo_dark_url text;
