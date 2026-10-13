-- Public bucket for company logos shown in the HyperHub directory.
-- Anyone can VIEW a logo (it is displayed on the public site); only HDP
-- admins can upload, replace or delete. No SELECT policy on storage.objects,
-- so the bucket's contents cannot be listed through the API.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'company-logos',
  'company-logos',
  true,
  2097152, -- 2 MB
  array['image/png', 'image/webp', 'image/svg+xml', 'image/jpeg']
)
on conflict (id) do nothing;

create policy "admins can upload company logos" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'company-logos' and public.is_admin());

create policy "admins can replace company logos" on storage.objects
  for update to authenticated
  using (bucket_id = 'company-logos' and public.is_admin())
  with check (bucket_id = 'company-logos' and public.is_admin());

create policy "admins can delete company logos" on storage.objects
  for delete to authenticated
  using (bucket_id = 'company-logos' and public.is_admin());
