import { supabase } from "../lib/supabase";

export type ProfileStatus = "pending" | "approved" | "rejected";

export type CompanyProfile = {
  id: string;
  companyName: string;
  contactName: string;
  status: ProfileStatus;
};

export type Company = {
  id: string;
  name: string;
  logoUrl?: string;
  website?: string;
  description?: string;
  sponsorshipOffer?: string;
  hiringInfo?: string;
};

type ProfileRow = {
  id: string;
  company_name: string;
  contact_name: string;
  status: ProfileStatus;
};

type CompanyRow = {
  id: string;
  name: string;
  logo_url: string | null;
  website: string | null;
  description: string | null;
  sponsorship_offer: string | null;
  hiring_info: string | null;
};

function fromProfileRow(row: ProfileRow): CompanyProfile {
  return {
    id: row.id,
    companyName: row.company_name,
    contactName: row.contact_name,
    status: row.status,
  };
}

function fromCompanyRow(row: CompanyRow): Company {
  return {
    id: row.id,
    name: row.name,
    ...(row.logo_url ? { logoUrl: row.logo_url } : {}),
    ...(row.website ? { website: row.website } : {}),
    ...(row.description ? { description: row.description } : {}),
    ...(row.sponsorship_offer ? { sponsorshipOffer: row.sponsorship_offer } : {}),
    ...(row.hiring_info ? { hiringInfo: row.hiring_info } : {}),
  };
}

/** The signed-in user's own company profile (and approval status), or null if signed out. */
export async function fetchMyProfile(): Promise<CompanyProfile | null> {
  if (!supabase) return null;
  const { data: session } = await supabase.auth.getSession();
  const userId = session.session?.user.id;
  if (!userId) return null;

  const { data, error } = await supabase
    .from("company_profiles")
    .select("id,company_name,contact_name,status")
    .eq("id", userId)
    .maybeSingle();
  if (error || !data) return null;
  return fromProfileRow(data as ProfileRow);
}

/**
 * The gated companies directory. Row Level Security only returns rows once
 * the signed-in user's own profile is approved, so an empty/failed result
 * here simply means "not visible to this user" rather than an app error.
 */
export async function fetchCompanies(): Promise<Company[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("companies")
    .select("id,name,logo_url,website,description,sponsorship_offer,hiring_info")
    .order("name", { ascending: true });
  if (error || !data) return [];
  return (data as CompanyRow[]).map(fromCompanyRow);
}

export async function signUpCompany(input: {
  email: string;
  password: string;
  companyName: string;
  contactName: string;
}): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Sign-up isn't configured right now." };
  const { error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: { company_name: input.companyName, contact_name: input.contactName },
    },
  });
  return { error: error?.message ?? null };
}

export async function signInCompany(input: {
  email: string;
  password: string;
}): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Sign-in isn't configured right now." };
  const { error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });
  return { error: error?.message ?? null };
}

export async function signOutCompany(): Promise<void> {
  if (!supabase) return;
  await supabase.auth.signOut();
}
