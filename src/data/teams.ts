import { supabase } from "../lib/supabase";

export type Team = {
  id: string;
  name: string;
  university: string;
  country: string;
  city?: string;
  logoUrl?: string;
  website?: string;
  description?: string;
  focusAreas: string[];
  highlights?: string;
  foundedYear?: number;
  seekingSponsors: boolean;
};

type TeamRow = {
  id: string;
  name: string;
  university: string;
  country: string;
  city: string | null;
  logo_url: string | null;
  website: string | null;
  description: string | null;
  focus_areas: string[] | null;
  highlights: string | null;
  founded_year: number | null;
  seeking_sponsors: boolean;
};

/**
 * Shown when Supabase isn't configured (e.g. a missing build variable) or is
 * unreachable, so the page never renders empty. Keep in sync with the seed in
 * supabase/migrations/0001_hyperhub_teams.sql.
 */
export const fallbackTeams: Team[] = [
  { id: "delft-hyperloop", name: "Delft Hyperloop", university: "TU Delft", country: "Netherlands", highlights: "EHW founding team · winner 2022, 2025", focusAreas: [], seekingSponsors: false },
  { id: "swissloop", name: "Swissloop", university: "ETH Zurich", country: "Switzerland", highlights: "EHW founding team · winner 2021, 2023, 2026", focusAreas: [], seekingSponsors: false },
  { id: "hyperloop-upv", name: "Hyperloop UPV", university: "Universitat Politècnica de València", country: "Spain", highlights: "EHW founding team · winner 2024", focusAreas: [], seekingSponsors: false },
  { id: "hyped", name: "HYPED", university: "University of Edinburgh", country: "United Kingdom", highlights: "EHW founding team", focusAreas: [], seekingSponsors: false },
  { id: "tum-hyperloop", name: "TUM Hyperloop", university: "Technical University of Munich", country: "Germany", highlights: "HDP associate partner", focusAreas: [], seekingSponsors: false },
  { id: "turkuaz-hyperloop", name: "Turkuaz Hyperloop", university: "Turkish university consortium", country: "Türkiye", highlights: "TEKNOFEST HDC 2022 · 1st place", focusAreas: [], seekingSponsors: false },
  { id: "su-kapsul-hyperloop", name: "SÜ Kapsül Hyperloop", university: "Selçuk University", country: "Türkiye", highlights: "TEKNOFEST HDC 2022 · 1st place", focusAreas: [], seekingSponsors: false },
  { id: "hyperhawk", name: "HyperHawk", university: "Turkish university consortium", country: "Türkiye", highlights: "TEKNOFEST HDC 2022 · 2nd place", focusAreas: [], seekingSponsors: false },
];

function fromRow(row: TeamRow): Team {
  return {
    id: row.id,
    name: row.name,
    university: row.university,
    country: row.country,
    focusAreas: row.focus_areas ?? [],
    seekingSponsors: row.seeking_sponsors,
    ...(row.city ? { city: row.city } : {}),
    ...(row.logo_url ? { logoUrl: row.logo_url } : {}),
    ...(row.website ? { website: row.website } : {}),
    ...(row.description ? { description: row.description } : {}),
    ...(row.highlights ? { highlights: row.highlights } : {}),
    ...(row.founded_year ? { foundedYear: row.founded_year } : {}),
  };
}

export async function fetchTeams(): Promise<Team[]> {
  if (!supabase) return fallbackTeams;
  try {
    const { data, error } = await supabase
      .from("teams")
      .select(
        "id,name,university,country,city,logo_url,website,description,focus_areas,highlights,founded_year,seeking_sponsors",
      )
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });
    if (error || !data) {
      console.error("Supabase teams query failed:", error);
      return fallbackTeams;
    }
    return (data as TeamRow[]).map(fromRow);
  } catch (err) {
    console.error("Supabase unreachable:", err);
    return fallbackTeams;
  }
}
