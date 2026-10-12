-- HyperHub Portal — table privileges for the admin / company portal tables.
-- Already applied directly to the Supabase project; kept here for the repo's
-- migration history. RLS policies still decide which rows each user can touch.
grant select on public.admin_users to authenticated;
grant select, insert, update on public.company_profiles to authenticated;
grant select, insert, update, delete on public.companies to authenticated;
grant select on public.company_profile_reviews to authenticated;
