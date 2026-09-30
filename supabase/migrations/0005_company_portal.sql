-- HyperHub Network — company sign-up, HDP approval, and a companies
-- directory (sponsors & employers) visible only to approved company
-- accounts. Students/teams remain publicly visible via public.teams;
-- this migration only gates the company-facing directory.

-- One row per signed-up company representative (auth.users.id as the key).
-- Starts "pending" until an HDP admin reviews and approves it — reviewed
-- for now directly in the Supabase dashboard (Table editor), no separate
-- admin UI yet.
create table public.company_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  contact_name text not null default '',
  contact_email text not null default '',
  company_name text not null default '',
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  requested_at timestamptz not null default now(),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.company_profiles enable row level security;

-- A signed-up user can only ever see/manage their own profile row.
create policy "select own profile" on public.company_profiles
  for select using (auth.uid() = id);

create policy "insert own profile" on public.company_profiles
  for insert with check (auth.uid() = id);

-- No update/delete policy for regular users on purpose: approval status
-- changes are made by an admin (service role) only.

-- Auto-create a pending profile whenever someone signs up through the
-- HyperHub company sign-up form (contact_name / company_name passed as
-- auth signUp options.data).
create or replace function public.handle_new_company_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.company_profiles (id, contact_name, contact_email, company_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'contact_name', ''),
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'company_name', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created_company_profile
  after insert on auth.users
  for each row execute function public.handle_new_company_user();

-- The companies directory itself: what an approved company shows to other
-- approved companies and to HDP — what they can offer as a sponsor, and
-- what they offer as an employer (graduate programmes, jobs).
create table public.companies (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.company_profiles (id) on delete set null,
  name text not null,
  logo_url text,
  website text,
  description text,
  sponsorship_offer text,
  hiring_info text,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.companies enable row level security;

-- Visible only to signed-in users whose own company profile is approved.
create policy "approved members can read published companies" on public.companies
  for select using (
    is_published = true
    and exists (
      select 1 from public.company_profiles p
      where p.id = auth.uid() and p.status = 'approved'
    )
  );

-- An approved company can manage its own listing.
create policy "owner can manage own company" on public.companies
  for all using (
    owner_id = auth.uid()
    and exists (
      select 1 from public.company_profiles p
      where p.id = auth.uid() and p.status = 'approved'
    )
  )
  with check (owner_id = auth.uid());

-- Seed a mock listing so the end-to-end flow (sign up -> approve -> appear
-- in the directory -> "ask about sponsorship / careers") can be tested
-- before real company data comes in. Not owned by any account, so it stays
-- until HDP removes it or a real profile takes it over.
insert into public.companies (name, description, sponsorship_offer, hiring_info, is_published)
values (
  'HDP Test Company',
  'A placeholder listing used to test the HyperHub sponsor & careers directory end to end. Safe to edit or delete once real companies are onboarded.',
  'Open to sponsoring one or two student teams per year, in cash or in kind (materials, lab time, engineering mentorship).',
  'Runs a rotating graduate programme in mechanical and electrical engineering, and is open to internship requests from student team members.',
  true
);
