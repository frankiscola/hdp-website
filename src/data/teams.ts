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
 * unreachable, so the page never renders empty. Source: the EHW 2026
 * participating teams list (hyperloopweek.com/participating-teams, captured
 * 2026-09-29). Keep in sync with supabase/migrations/0002_ehw_2026_teams.sql.
 */
export const fallbackTeams: Team[] = [
  { id: "delft-hyperloop", name: "Delft Hyperloop", university: "TU Delft", country: "Netherlands", website: "https://delfthyperloop.nl/", focusAreas: [], seekingSponsors: false },
  { id: "hyped", name: "HYPED", university: "University of Edinburgh", country: "United Kingdom", website: "https://www.hyp-ed.com/", focusAreas: [], seekingSponsors: false },
  { id: "hyperloop-upv", name: "Hyperloop UPV", university: "Universitat Politècnica de València", country: "Spain", website: "https://hyperloopupv.com/about", focusAreas: [], seekingSponsors: false },
  { id: "swissloop", name: "Swissloop", university: "ETH Zurich", country: "Switzerland", website: "https://swissloop.ch/", focusAreas: [], seekingSponsors: false },
  { id: "vegapod-hyperloop", name: "VegaPod Hyperloop", university: "MIT World Peace University", country: "India", website: "https://www.vegapodhyperloop.in/", focusAreas: [], seekingSponsors: false },
  { id: "itu-hyperbee", name: "ITU HyperBee", university: "Istanbul Technical University", country: "Türkiye", focusAreas: [], seekingSponsors: false },
  { id: "creatiny-technology-society", name: "Creatiny Technology Society", university: "Karadeniz Technical University", country: "Türkiye", website: "https://www.creatiny.com/", focusAreas: [], seekingSponsors: false },
  { id: "hermod-hyperloop", name: "Hermod Hyperloop", university: "Turkish-German University", country: "Türkiye", focusAreas: [], seekingSponsors: false },
  { id: "loopmit", name: "LoopMIT", university: "Manipal Institute of Technology", country: "India", website: "https://loopmit.in/", focusAreas: [], seekingSponsors: false },
  { id: "mu-zero-hyperloop", name: "mu-zero HYPERLOOP", university: "Karlsruhe Institute of Technology", country: "Germany", website: "https://www.mu-zero.de/", focusAreas: [], seekingSponsors: false },
  { id: "kilavuz-hyperush", name: "KILAVUZ HYPERUSH", university: "University of Kocaeli", country: "Türkiye", focusAreas: [], seekingSponsors: false },
  { id: "hyperloop-manchester", name: "Hyperloop Manchester", university: "University of Manchester", country: "United Kingdom", website: "https://hyperloop-manchester.com/", focusAreas: [], seekingSponsors: false },
  { id: "avishkar-hyperloop", name: "Avishkar Hyperloop", university: "Indian Institute of Technology Madras", country: "India", website: "https://avishkarhyperloop.com/", focusAreas: [], seekingSponsors: false },
  { id: "selcuk-kapsul", name: "Selcuk Kapsul", university: "Selçuk University", country: "Türkiye", focusAreas: [], seekingSponsors: false },
  { id: "hyperlink", name: "Hyperlink", university: "Queen Mary University of London", country: "United Kingdom", website: "https://www.hyperlinklondon.com/", focusAreas: [], seekingSponsors: false },
  { id: "duke-hyperloop", name: "Duke Hyperloop", university: "Duke University", country: "United States", website: "https://mystarlightco.wixstudio.com/my-site-5", focusAreas: [], seekingSponsors: false },
  { id: "smith-engineering-hyperloop", name: "Smith Engineering Hyperloop", university: "Queen's University", country: "Canada", website: "https://www.queenshyperloop.ca/", focusAreas: [], seekingSponsors: false },
  { id: "hyperloopin-srm", name: "Hyperloopin SRM", university: "SRM Institute of Science and Technology KTR", country: "India", website: "https://hyperloop-in.vercel.app/", focusAreas: [], seekingSponsors: false },
  { id: "infinity-hyperloop", name: "Infinity Hyperloop", university: "Indian Institute of Technology Delhi", country: "India", website: "https://infinityhyperloop.iitd.ac.in/", focusAreas: [], seekingSponsors: false },
  { id: "warwick-hyperloop", name: "Warwick Hyperloop", university: "University of Warwick", country: "United Kingdom", website: "https://warwickhyperloop.com/", focusAreas: [], seekingSponsors: false },
  { id: "partech", name: "PARTECH", university: "Karabük University", country: "Türkiye", focusAreas: [], seekingSponsors: false },
  { id: "albertaloop", name: "Albertaloop", university: "University of Alberta", country: "Canada", website: "https://albertaloop.ca/", focusAreas: [], seekingSponsors: false },
  { id: "polyloop", name: "Polyloop", university: "Polytechnique Montreal", country: "Canada", website: "https://www.polyloop.ca/", focusAreas: [], seekingSponsors: false },
  { id: "texas-guadaloop", name: "Texas Guadaloop", university: "University of Texas at Austin", country: "United States", website: "https://guadaloop-website.vercel.app/", focusAreas: [], seekingSponsors: false },
  { id: "vac-vectoor-hyperloop", name: "Vac-Vectoor Hyperloop ADYPU", university: "Ajeenkya D Y Patil University", country: "India", focusAreas: [], seekingSponsors: false },
  { id: "cornell-hyperloop", name: "Cornell Hyperloop", university: "Cornell University", country: "United States", website: "https://www.cornellhyperloop.com/", focusAreas: [], seekingSponsors: false },
  { id: "dromos", name: "DROMOS", university: "Vellore Institute of Technology - Chennai", country: "India", focusAreas: [], seekingSponsors: false },
  { id: "force-hyperloop", name: "FORCE HYPERLOOP", university: "NIT Tiruchirappalli", country: "India", website: "https://www.forcehyperloop.com/", focusAreas: [], seekingSponsors: false },
  { id: "transpeed", name: "Transpeed", university: "AGH University of Science and Technology", country: "Poland", focusAreas: [], seekingSponsors: false },
  { id: "hyper-pwr", name: "HYPER", university: "Politechnika Wrocławska", country: "Poland", website: "https://hypewr.pwr.edu.pl/", focusAreas: [], seekingSponsors: false },
  { id: "levitate-hyperloop", name: "Team Levitate Hyperloop", university: "Vellore Institute of Technology", country: "India", website: "https://www.levitatehyperloop.com/", focusAreas: [], seekingSponsors: false },
  { id: "spectraloop", name: "Spectraloop", university: "Samsun Üniversitesi", country: "Türkiye", website: "https://spectraloop.com/", focusAreas: [], seekingSponsors: false },
  { id: "hypercage", name: "Hypercage", university: "Gebze Technical University", country: "Türkiye", focusAreas: [], seekingSponsors: false },
  { id: "metropolitan-hyperloop", name: "Metropolitan Hyperloop", university: "Toronto Metropolitan University", country: "Canada", website: "https://methyperloop.netlify.app/", focusAreas: [], seekingSponsors: false },
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
