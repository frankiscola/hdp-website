import { supabase } from "../lib/supabase";

export const LOGO_MAX_BYTES = 2 * 1024 * 1024;
export const LOGO_ACCEPT = "image/png,image/webp,image/svg+xml";
const LOGO_TYPES: Record<string, "png" | "webp" | "svg"> = {
  "image/png": "png",
  "image/webp": "webp",
  "image/svg+xml": "svg",
};

export const FOCUS_AREA_OPTIONS = [
  "Propulsion",
  "Levitation",
  "Braking",
  "Power electronics",
  "Control & software",
  "Structures",
  "Vacuum & tube",
  "Communications",
  "Safety",
  "Business & outreach",
] as const;

export type TeamApplicationInput = {
  teamName: string;
  university: string;
  country: string;
  city: string;
  foundedYear: string;
  website: string;
  description: string;
  focusAreas: string[];
  seekingSponsors: boolean;
  linkedin: string;
  instagram: string;
  youtube: string;
  contactName: string;
  contactRole: string;
  contactEmail: string;
  logoLight: File;
  logoDark: File;
};

export type LogoCheck = { ok: true; warning?: string } | { ok: false; error: string };

/**
 * Checks a logo file in the browser before upload: type, size and, for PNG/WebP,
 * that the background is really transparent (corners) and that the logo's
 * colour matches the slot it was dropped in (dark mark for light backgrounds,
 * light mark for dark backgrounds). Colour is only a soft warning, since
 * plenty of good logos are mid-tone.
 */
export async function inspectLogo(file: File, kind: "light" | "dark"): Promise<LogoCheck> {
  if (!(file.type in LOGO_TYPES)) {
    return { ok: false, error: "Use a PNG, WebP or SVG file." };
  }
  if (file.size > LOGO_MAX_BYTES) {
    return { ok: false, error: "The file is larger than 2 MB. Please export a smaller version." };
  }
  if (file.type === "image/svg+xml") return { ok: true };

  try {
    const bitmap = await createImageBitmap(file);
    const { width, height } = bitmap;
    if (Math.min(width, height) < 200) {
      bitmap.close();
      return {
        ok: false,
        error: `The image is only ${width}×${height}px. Please upload one at least 200px on its shortest side.`,
      };
    }
    // Downscale for speed: we only need a rough read of corners and colour.
    const scale = Math.min(1, 256 / Math.max(width, height));
    const w = Math.max(1, Math.round(width * scale));
    const h = Math.max(1, Math.round(height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      bitmap.close();
      return { ok: true };
    }
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();
    const { data } = ctx.getImageData(0, 0, w, h);

    const alphaAt = (x: number, y: number) => data[(y * w + x) * 4 + 3] ?? 255;
    const corners = [alphaAt(0, 0), alphaAt(w - 1, 0), alphaAt(0, h - 1), alphaAt(w - 1, h - 1)];
    if (corners.every((a) => a > 250)) {
      return {
        ok: false,
        error:
          "This image has a solid background. Please export it with a transparent background (PNG or WebP).",
      };
    }

    // Average perceived brightness of the visible (non-transparent) pixels.
    let sum = 0;
    let count = 0;
    for (let i = 0; i < data.length; i += 4) {
      const a = data[i + 3] ?? 0;
      if (a < 40) continue;
      sum +=
        (0.2126 * (data[i] ?? 0) + 0.7152 * (data[i + 1] ?? 0) + 0.0722 * (data[i + 2] ?? 0)) / 255;
      count++;
    }
    if (count === 0) return { ok: false, error: "This image looks empty." };
    const brightness = sum / count;
    if (kind === "light" && brightness > 0.75) {
      return {
        ok: true,
        warning:
          "This logo looks very light. This slot is for the dark-coloured version, shown on light backgrounds.",
      };
    }
    if (kind === "dark" && brightness < 0.4) {
      return {
        ok: true,
        warning:
          "This logo looks quite dark. This slot is for the white/light version, shown on dark backgrounds.",
      };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "We couldn't read this image. Try exporting it again." };
  }
}

function clean(value: string): string | null {
  const v = value.trim();
  return v ? v : null;
}

/** Adds https:// when someone pastes "example.com" without a scheme. */
export function normalizeUrl(value: string): string | null {
  const v = value.trim();
  if (!v) return null;
  const withScheme = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try {
    const u = new URL(withScheme);
    return u.hostname.includes(".") ? u.toString() : null;
  } catch {
    return null;
  }
}

export type SubmitResult = { ok: true; id: string } | { ok: false; error: string };

export async function submitTeamApplication(input: TeamApplicationInput): Promise<SubmitResult> {
  if (!supabase)
    return { ok: false, error: "The form is temporarily unavailable. Please email us." };

  const id = crypto.randomUUID();
  const lightExt = LOGO_TYPES[input.logoLight.type];
  const darkExt = LOGO_TYPES[input.logoDark.type];
  if (!lightExt || !darkExt) return { ok: false, error: "Logos must be PNG, WebP or SVG." };

  const lightPath = `${id}/light.${lightExt}`;
  const darkPath = `${id}/dark.${darkExt}`;
  const bucket = supabase.storage.from("team-applications");

  const [light, dark] = await Promise.all([
    bucket.upload(lightPath, input.logoLight, { contentType: input.logoLight.type }),
    bucket.upload(darkPath, input.logoDark, { contentType: input.logoDark.type }),
  ]);
  if (light.error || dark.error) {
    console.error("Logo upload failed:", light.error ?? dark.error);
    return { ok: false, error: "We couldn't upload your logos. Please try again." };
  }

  const year = Number.parseInt(input.foundedYear, 10);
  const { error } = await supabase.from("team_applications").insert({
    id,
    team_name: input.teamName.trim(),
    university: input.university.trim(),
    country: input.country.trim(),
    city: clean(input.city),
    founded_year: Number.isFinite(year) ? year : null,
    website: normalizeUrl(input.website),
    description: clean(input.description),
    focus_areas: input.focusAreas,
    seeking_sponsors: input.seekingSponsors,
    linkedin_url: normalizeUrl(input.linkedin),
    instagram_url: normalizeUrl(input.instagram),
    youtube_url: normalizeUrl(input.youtube),
    contact_name: input.contactName.trim(),
    contact_role: clean(input.contactRole),
    contact_email: input.contactEmail.trim(),
    logo_light_path: lightPath,
    logo_dark_path: darkPath,
    consent_given: true,
  });
  if (error) {
    console.error("Application insert failed:", error);
    // Don't leave orphaned files behind if the row was rejected.
    await bucket.remove([lightPath, darkPath]).catch(() => undefined);
    return {
      ok: false,
      error: "We couldn't save your application. Please check the fields and try again.",
    };
  }
  return { ok: true, id };
}

// ---------------------------------------------------------------------------
// Admin side (every query below is only allowed by RLS for rows in admin_users)
// ---------------------------------------------------------------------------

export type TeamApplication = {
  id: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
  reviewNotes: string | null;
  teamId: string | null;
  teamName: string;
  university: string;
  country: string;
  city: string | null;
  foundedYear: number | null;
  website: string | null;
  description: string | null;
  focusAreas: string[];
  seekingSponsors: boolean;
  linkedin: string | null;
  instagram: string | null;
  youtube: string | null;
  contactName: string;
  contactRole: string | null;
  contactEmail: string;
  logoLightPath: string;
  logoDarkPath: string;
};

type ApplicationRow = {
  id: string;
  created_at: string;
  status: TeamApplication["status"];
  review_notes: string | null;
  team_id: string | null;
  team_name: string;
  university: string;
  country: string;
  city: string | null;
  founded_year: number | null;
  website: string | null;
  description: string | null;
  focus_areas: string[] | null;
  seeking_sponsors: boolean;
  linkedin_url: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  contact_name: string;
  contact_role: string | null;
  contact_email: string;
  logo_light_path: string;
  logo_dark_path: string;
};

function appFromRow(r: ApplicationRow): TeamApplication {
  return {
    id: r.id,
    createdAt: r.created_at,
    status: r.status,
    reviewNotes: r.review_notes,
    teamId: r.team_id,
    teamName: r.team_name,
    university: r.university,
    country: r.country,
    city: r.city,
    foundedYear: r.founded_year,
    website: r.website,
    description: r.description,
    focusAreas: r.focus_areas ?? [],
    seekingSponsors: r.seeking_sponsors,
    linkedin: r.linkedin_url,
    instagram: r.instagram_url,
    youtube: r.youtube_url,
    contactName: r.contact_name,
    contactRole: r.contact_role,
    contactEmail: r.contact_email,
    logoLightPath: r.logo_light_path,
    logoDarkPath: r.logo_dark_path,
  };
}

export async function fetchTeamApplications(): Promise<TeamApplication[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("team_applications")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data) {
    console.error("Failed to load team applications:", error);
    return [];
  }
  return (data as ApplicationRow[]).map(appFromRow);
}

/** Short-lived signed URL so an admin can preview a private logo. */
export async function signedLogoUrl(path: string): Promise<string | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.storage
    .from("team-applications")
    .createSignedUrl(path, 60 * 10);
  return error ? null : data.signedUrl;
}

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/**
 * Approves an application: copies both logos into the PUBLIC team-logos bucket,
 * creates the teams row (published) and marks the application approved.
 */
export async function approveTeamApplication(app: TeamApplication): Promise<{ error?: string }> {
  if (!supabase) return { error: "Supabase is not configured." };
  const { data: session } = await supabase.auth.getSession();
  const adminId = session.session?.user.id;

  const privateBucket = supabase.storage.from("team-applications");
  const publicBucket = supabase.storage.from("team-logos");
  const slug = `${slugify(app.teamName)}-${app.id.slice(0, 4)}`;

  const publicUrls: string[] = [];
  for (const [kind, path] of [
    ["light", app.logoLightPath],
    ["dark", app.logoDarkPath],
  ] as const) {
    const ext = path.split(".").pop() ?? "png";
    const download = await privateBucket.download(path);
    if (download.error || !download.data) return { error: `Couldn't read the ${kind} logo.` };
    const target = `${slug}-${kind}.${ext}`;
    const upload = await publicBucket.upload(target, download.data, {
      ...(download.data.type ? { contentType: download.data.type } : {}),
      upsert: true,
    });
    if (upload.error)
      return { error: `Couldn't publish the ${kind} logo: ${upload.error.message}` };
    publicUrls.push(publicBucket.getPublicUrl(target).data.publicUrl);
  }

  const { data: team, error: teamError } = await supabase
    .from("teams")
    .insert({
      slug,
      name: app.teamName,
      university: app.university,
      country: app.country,
      city: app.city,
      website: app.website,
      description: app.description,
      focus_areas: app.focusAreas,
      founded_year: app.foundedYear,
      seeking_sponsors: app.seekingSponsors,
      linkedin_url: app.linkedin,
      instagram_url: app.instagram,
      youtube_url: app.youtube,
      logo_light_url: publicUrls[0] ?? null,
      logo_dark_url: publicUrls[1] ?? null,
      // Dual logos replace the old badge/watermark hints for this team.
      logo_watermark: false,
      is_published: true,
      sort_order: 1000,
    })
    .select("id")
    .single();
  if (teamError || !team) return { error: teamError?.message ?? "Couldn't create the team." };

  const { error } = await supabase
    .from("team_applications")
    .update({
      status: "approved",
      team_id: (team as { id: string }).id,
      reviewed_at: new Date().toISOString(),
      reviewed_by: adminId ?? null,
    })
    .eq("id", app.id);
  return error ? { error: error.message } : {};
}

export async function rejectTeamApplication(
  id: string,
  notes: string,
): Promise<{ error?: string }> {
  if (!supabase) return { error: "Supabase is not configured." };
  const { data: session } = await supabase.auth.getSession();
  const { error } = await supabase
    .from("team_applications")
    .update({
      status: "rejected",
      review_notes: notes.trim() || null,
      reviewed_at: new Date().toISOString(),
      reviewed_by: session.session?.user.id ?? null,
    })
    .eq("id", id);
  return error ? { error: error.message } : {};
}
