import { createClient } from "@supabase/supabase-js";

// Both values are PUBLIC by design: the publishable key can only do what the
// Row Level Security policies in supabase/migrations allow (e.g. read
// published teams, or read published companies once a user's own
// company_profiles row is approved). Never put the service_role / secret
// key in this project.
const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Sessions persist (in localStorage, browser-side only) so a signed-up
// company representative stays logged in across visits instead of having
// to sign in again every time.
export const supabase =
  url && publishableKey
    ? createClient(url, publishableKey, { auth: { persistSession: true } })
    : null;
