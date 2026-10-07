import { supabase } from "../lib/supabase";

export type ProfileStatus = "pending" | "approved" | "rejected";

export type CompanyProfile = {
  id: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  status: ProfileStatus;
  requestedAt: string;
  reviewedAt?: string;
};

export type Company = {
  id: string;
  name: string;
  logoUrl?: string;
  website?: string;
  description?: string;
  sponsorshipOffer?: string;
  hiringInfo?: string;
  /** Master's/PhD thesis and research-project opportunities offered to students. */
  thesisInfo?: string;
  isPublished?: boolean;
};

export type ReviewEntry = {
  id: string;
  profileId: string;
  companyName: string;
  oldStatus: ProfileStatus | null;
  newStatus: ProfileStatus;
  reviewedAt: string;
  reviewedByEmail?: string;
};

type ProfileRow = {
  id: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  status: ProfileStatus;
  requested_at: string;
  reviewed_at: string | null;
};

type CompanyRow = {
  id: string;
  name: string;
  logo_url: string | null;
  website: string | null;
  description: string | null;
  sponsorship_offer: string | null;
  hiring_info: string | null;
  thesis_info: string | null;
  is_published: boolean;
};

function fromProfileRow(row: ProfileRow): CompanyProfile {
  return {
    id: row.id,
    companyName: row.company_name,
    contactName: row.contact_name,
    contactEmail: row.contact_email,
    status: row.status,
    requestedAt: row.requested_at,
    ...(row.reviewed_at ? { reviewedAt: row.reviewed_at } : {}),
  };
}

function fromCompanyRow(row: CompanyRow): Company {
  return {
    id: row.id,
    name: row.name,
    isPublished: row.is_published,
    ...(row.logo_url ? { logoUrl: row.logo_url } : {}),
    ...(row.website ? { website: row.website } : {}),
    ...(row.description ? { description: row.description } : {}),
    ...(row.sponsorship_offer ? { sponsorshipOffer: row.sponsorship_offer } : {}),
    ...(row.hiring_info ? { hiringInfo: row.hiring_info } : {}),
    ...(row.thesis_info ? { thesisInfo: row.thesis_info } : {}),
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
    .select("id,company_name,contact_name,contact_email,status,requested_at,reviewed_at")
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
    .select("id,name,logo_url,website,description,sponsorship_offer,hiring_info,thesis_info,is_published")
    .eq("is_published", true)
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

// ---------------------------------------------------------------------------
// Admin-only functions. All of these rely entirely on Row Level Security —
// every query below returns empty/false for a signed-in user who isn't in
// admin_users, so there's no separate "trust me" check needed client-side;
// the database is the source of truth.
// ---------------------------------------------------------------------------

/** Whether the signed-in user is an HDP admin (can see/use the /admin panel at all). */
export async function checkIsAdmin(): Promise<boolean> {
  if (!supabase) return false;
  const { data: session } = await supabase.auth.getSession();
  const userId = session.session?.user.id;
  if (!userId) return false;
  const { data, error } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", userId)
    .maybeSingle();
  return !error && !!data;
}

/** Every company sign-up request, newest first — admin only. */
export async function fetchAllProfiles(): Promise<CompanyProfile[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("company_profiles")
    .select("id,company_name,contact_name,contact_email,status,requested_at,reviewed_at")
    .order("requested_at", { ascending: false });
  if (error || !data) return [];
  return (data as ProfileRow[]).map(fromProfileRow);
}

/** Approve or reject a company sign-up request — admin only. */
export async function reviewProfile(
  profileId: string,
  status: "approved" | "rejected",
): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Not configured." };
  const { error } = await supabase.from("company_profiles").update({ status }).eq("id", profileId);
  return { error: error?.message ?? null };
}

/** Every company listing regardless of publish status — admin only. */
export async function fetchAllCompanies(): Promise<Company[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("companies")
    .select("id,name,logo_url,website,description,sponsorship_offer,hiring_info,thesis_info,is_published")
    .order("name", { ascending: true });
  if (error || !data) return [];
  return (data as CompanyRow[]).map(fromCompanyRow);
}

export type CompanyInput = {
  name: string;
  logoUrl?: string;
  website?: string;
  description?: string;
  sponsorshipOffer?: string;
  hiringInfo?: string;
  thesisInfo?: string;
  isPublished: boolean;
};

/** Create a new company directory listing — admin only. */
export async function createCompany(input: CompanyInput): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Not configured." };
  const { error } = await supabase.from("companies").insert({
    name: input.name,
    logo_url: input.logoUrl || null,
    website: input.website || null,
    description: input.description || null,
    sponsorship_offer: input.sponsorshipOffer || null,
    hiring_info: input.hiringInfo || null,
    thesis_info: input.thesisInfo || null,
    is_published: input.isPublished,
  });
  return { error: error?.message ?? null };
}

/** Edit an existing company directory listing — admin only. */
export async function updateCompany(
  id: string,
  input: CompanyInput,
): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Not configured." };
  const { error } = await supabase
    .from("companies")
    .update({
      name: input.name,
      logo_url: input.logoUrl || null,
      website: input.website || null,
      description: input.description || null,
      sponsorship_offer: input.sponsorshipOffer || null,
      hiring_info: input.hiringInfo || null,
      thesis_info: input.thesisInfo || null,
      is_published: input.isPublished,
    })
    .eq("id", id);
  return { error: error?.message ?? null };
}

/** Remove a company directory listing — admin only. */
export async function deleteCompany(id: string): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Not configured." };
  const { error } = await supabase.from("companies").delete().eq("id", id);
  return { error: error?.message ?? null };
}

/**
 * The full approve/reject audit trail, newest first — admin only. Logged
 * automatically by the database whenever a profile's status changes, so
 * this always reflects what really happened even if several admins have
 * reviewed the same request over time.
 */
export async function fetchReviewHistory(): Promise<ReviewEntry[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.rpc("admin_review_history");
  if (error || !data) return [];
  type Row = {
    id: string;
    profile_id: string;
    company_name: string | null;
    old_status: ProfileStatus | null;
    new_status: ProfileStatus;
    reviewed_at: string;
    reviewed_by_email: string | null;
  };
  return (data as Row[]).map((row) => ({
    id: row.id,
    profileId: row.profile_id,
    companyName: row.company_name || "(unknown company)",
    oldStatus: row.old_status,
    newStatus: row.new_status,
    reviewedAt: row.reviewed_at,
    ...(row.reviewed_by_email ? { reviewedByEmail: row.reviewed_by_email } : {}),
  }));
}
