import { createClient } from "@supabase/supabase-js";

// Both values are PUBLIC by design: the publishable key can only do what the
// Row Level Security policies in supabase/migrations allow (read published
// teams). Never put the service_role / secret key in this project.
const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase =
  url && publishableKey
    ? createClient(url, publishableKey, { auth: { persistSession: false } })
    : null;
