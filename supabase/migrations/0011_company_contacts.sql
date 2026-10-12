-- HyperHub — "Ask about …" enquiries are emailed straight to the right
-- contact of each company (sponsorship / careers / thesis).
--
-- The contact addresses live in their own table on purpose: public.companies
-- is readable by every approved partner, and these emails must NOT be.
-- Only HDP admins can read/write them from the browser; the server function
-- that sends the email reads them with the service-role key and never returns
-- them to the client.

create table if not exists public.company_contacts (
  company_id uuid primary key references public.companies (id) on delete cascade,
  sponsorship_email text,
  careers_email text,
  thesis_email text,
  updated_at timestamptz not null default now(),
  constraint company_contacts_sponsorship_email_chk
    check (sponsorship_email is null or sponsorship_email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  constraint company_contacts_careers_email_chk
    check (careers_email is null or careers_email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  constraint company_contacts_thesis_email_chk
    check (thesis_email is null or thesis_email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$')
);

alter table public.company_contacts enable row level security;

create policy "admins can manage company contacts" on public.company_contacts
  for all using (public.is_admin()) with check (public.is_admin());

grant select, insert, update, delete on public.company_contacts to authenticated;

-- Send log: used by the server function for rate limiting (and as an audit
-- trail). No policies and no grants for anon/authenticated, so it is reachable
-- only with the service-role key.
create table if not exists public.company_contact_log (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null,
  company_id uuid not null references public.companies (id) on delete cascade,
  interest text not null check (interest in ('sponsorship', 'careers', 'thesis')),
  created_at timestamptz not null default now()
);

alter table public.company_contact_log enable row level security;
revoke all on public.company_contact_log from anon, authenticated;

create index if not exists company_contact_log_sender_idx
  on public.company_contact_log (sender_id, created_at desc);
