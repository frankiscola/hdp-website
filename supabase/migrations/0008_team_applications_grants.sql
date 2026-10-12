-- HyperHub Portal — table privileges for the Data API. Already applied directly
-- to the Supabase project; kept here for the repo's migration history.
--
-- This project does not grant privileges to anon/authenticated automatically,
-- so Row Level Security policies alone were not enough. RLS (0007) still
-- decides which rows each role can actually touch.
grant insert on public.team_applications to anon, authenticated;
grant select, update, delete on public.team_applications to authenticated;

-- teams: the existing "Published teams are public" policy already intends
-- public reads; admins manage rows through the policy added in 0007.
grant select on public.teams to anon, authenticated;
grant insert, update, delete on public.teams to authenticated;
