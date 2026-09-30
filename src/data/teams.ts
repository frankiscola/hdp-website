import { supabase } from "../lib/supabase";

export type Team = {
  id: string;
  name: string;
  university: string;
  country: string;
  city?: string;
  logoUrl?: string;
  website?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
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
  instagram_url: string | null;
  linkedin_url: string | null;
  youtube_url: string | null;
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
 * 2026-09-29). Keep in sync with supabase/migrations/0003_team_social_links.sql.
 */
export const fallbackTeams: Team[] = [
  { id: "delft-hyperloop", logoUrl: "/team-logos/delft-hyperloop.png", name: "Delft Hyperloop", university: "TU Delft", country: "Netherlands", website: "https://delfthyperloop.nl/", instagram: "https://www.instagram.com/delfthyperloop/", linkedin: "https://www.linkedin.com/company/delft-hyperloop", youtube: "https://www.youtube.com/@delfthyperloop8143", focusAreas: [], seekingSponsors: false },
  { id: "hyped", logoUrl: "/team-logos/hyped.png", name: "HYPED", university: "University of Edinburgh", country: "United Kingdom", website: "https://www.hyp-ed.com/", instagram: "https://www.instagram.com/hypedinburgh/", linkedin: "https://www.linkedin.com/company/hyp-ed/", youtube: "https://www.youtube.com/@hypededinburgh2188", focusAreas: [], seekingSponsors: false },
  { id: "hyperloop-upv", logoUrl: "/team-logos/hyperloop-upv.png", name: "Hyperloop UPV", university: "Universitat Politècnica de València", country: "Spain", website: "https://hyperloopupv.com/about", instagram: "https://www.instagram.com/hyperloopupv/", linkedin: "https://www.linkedin.com/company/hyperloopupv", youtube: "https://www.youtube.com/@HyperloopUPVYT", focusAreas: [], seekingSponsors: false },
  { id: "swissloop", logoUrl: "/team-logos/swissloop.png", name: "Swissloop", university: "ETH Zurich", country: "Switzerland", website: "https://swissloop.ch/", instagram: "https://www.instagram.com/swissloop_ch/", linkedin: "https://ch.linkedin.com/company/swissloop", youtube: "https://www.youtube.com/channel/UCMenYwAd6L9STw5r8WWQ8ZQ", focusAreas: [], seekingSponsors: false },
  { id: "vegapod-hyperloop", logoUrl: "/team-logos/vegapod-hyperloop.png", name: "VegaPod Hyperloop", university: "MIT World Peace University", country: "India", website: "https://www.vegapodhyperloop.in/", instagram: "https://www.instagram.com/vegapodhyperloop/", linkedin: "https://www.linkedin.com/company/teamvegapodhyperloop/", youtube: "https://www.youtube.com/@TeamVegapodHyperloop", focusAreas: [], seekingSponsors: false },
  { id: "itu-hyperbee", logoUrl: "/team-logos/itu-hyperbee.png", name: "ITU HyperBee", university: "Istanbul Technical University", country: "Türkiye", instagram: "https://www.instagram.com/ituhyperbee/", linkedin: "https://www.linkedin.com/company/ituhyperbee/", youtube: "https://www.youtube.com/@ituhyperbee", focusAreas: [], seekingSponsors: false },
  { id: "creatiny-technology-society", logoUrl: "/team-logos/creatiny-technology-society.png", name: "Creatiny Technology Society", university: "Karadeniz Technical University", country: "Türkiye", website: "https://www.creatiny.com/", instagram: "https://www.instagram.com/creatiny/", focusAreas: [], seekingSponsors: false },
  { id: "hermod-hyperloop", logoUrl: "/team-logos/hermod-hyperloop.png", name: "Hermod Hyperloop", university: "Turkish-German University", country: "Türkiye", instagram: "https://www.instagram.com/tauhermodhyperloop/", linkedin: "https://www.linkedin.com/company/hermod-hyperloop/", focusAreas: [], seekingSponsors: false },
  { id: "loopmit", logoUrl: "/team-logos/loopmit.png", name: "LoopMIT", university: "Manipal Institute of Technology", country: "India", website: "https://loopmit.in/", instagram: "https://www.instagram.com/loopmit/", linkedin: "https://www.linkedin.com/company/loopmit/", focusAreas: [], seekingSponsors: false },
  { id: "mu-zero-hyperloop", logoUrl: "/team-logos/mu-zero-hyperloop.png", name: "mu-zero HYPERLOOP", university: "Karlsruhe Institute of Technology", country: "Germany", website: "https://www.mu-zero.de/", instagram: "https://www.instagram.com/muzero_hyperloop/", linkedin: "https://www.linkedin.com/company/mu-zero-hyperloop/", youtube: "https://www.youtube.com/@mu-zerohyperloop1883", focusAreas: [], seekingSponsors: false },
  { id: "kilavuz-hyperush", logoUrl: "/team-logos/kilavuz-hyperush.png", name: "KILAVUZ HYPERUSH", university: "University of Kocaeli", country: "Türkiye", instagram: "https://www.instagram.com/podhyperush/", linkedin: "https://www.linkedin.com/company/hyperush/", focusAreas: [], seekingSponsors: false },
  { id: "hyperloop-manchester", logoUrl: "/team-logos/hyperloop-manchester.png", name: "Hyperloop Manchester", university: "University of Manchester", country: "United Kingdom", website: "https://hyperloop-manchester.com/", instagram: "https://www.instagram.com/hyperloopmanchester/", linkedin: "https://www.linkedin.com/company/hyperloop-manchester/", focusAreas: [], seekingSponsors: false },
  { id: "avishkar-hyperloop", logoUrl: "/team-logos/avishkar-hyperloop.png", name: "Avishkar Hyperloop", university: "Indian Institute of Technology Madras", country: "India", website: "https://avishkarhyperloop.com/", instagram: "https://www.instagram.com/avishkarhyperloop/", linkedin: "https://www.linkedin.com/company/avishkarhyperloop", youtube: "https://www.youtube.com/@avishkarhyperloop1", focusAreas: [], seekingSponsors: false },
  { id: "selcuk-kapsul", logoUrl: "/team-logos/selcuk-kapsul.png", name: "Selcuk Kapsul", university: "Selçuk University", country: "Türkiye", instagram: "https://www.instagram.com/selcukkapsul.hyperloop/", linkedin: "https://www.linkedin.com/company/sukapsulhyperloop/", focusAreas: [], seekingSponsors: false },
  { id: "hyperlink", logoUrl: "/team-logos/hyperlink.png", name: "Hyperlink", university: "Queen Mary University of London", country: "United Kingdom", website: "https://www.hyperlinklondon.com/", instagram: "https://www.instagram.com/hyperlinklondon/", linkedin: "https://www.linkedin.com/company/hyperlinkhyperloop", focusAreas: [], seekingSponsors: false },
  { id: "duke-hyperloop", logoUrl: "/team-logos/duke-hyperloop.png", name: "Duke Hyperloop", university: "Duke University", country: "United States", website: "https://mystarlightco.wixstudio.com/my-site-5", instagram: "https://www.instagram.com/dukehyperloopclub/", focusAreas: [], seekingSponsors: false },
  { id: "smith-engineering-hyperloop", logoUrl: "/team-logos/smith-engineering-hyperloop.png", name: "Smith Engineering Hyperloop", university: "Queen's University", country: "Canada", website: "https://www.queenshyperloop.ca/", instagram: "https://www.instagram.com/smithhyperloop/", linkedin: "https://www.linkedin.com/company/queenshyperloop/", focusAreas: [], seekingSponsors: false },
  { id: "hyperloopin-srm", logoUrl: "/team-logos/hyperloopin-srm.png", name: "Hyperloopin SRM", university: "SRM Institute of Science and Technology KTR", country: "India", website: "https://hyperloop-in.vercel.app/", instagram: "https://www.instagram.com/hyperloopinsrm/", linkedin: "https://www.linkedin.com/company/hyperloopin", focusAreas: [], seekingSponsors: false },
  { id: "infinity-hyperloop", logoUrl: "/team-logos/infinity-hyperloop.png", name: "Infinity Hyperloop", university: "Indian Institute of Technology Delhi", country: "India", website: "https://infinityhyperloop.iitd.ac.in/", instagram: "https://www.instagram.com/infinity_hyperloop/", linkedin: "https://in.linkedin.com/company/infinity-hyperloop", focusAreas: [], seekingSponsors: false },
  { id: "warwick-hyperloop", logoUrl: "/team-logos/warwick-hyperloop.png", name: "Warwick Hyperloop", university: "University of Warwick", country: "United Kingdom", website: "https://warwickhyperloop.com/", instagram: "https://www.instagram.com/warwickhyperloop/", linkedin: "https://www.linkedin.com/company/warwickhyperloop/", focusAreas: [], seekingSponsors: false },
  { id: "partech", logoUrl: "/team-logos/partech.png", name: "PARTECH", university: "Karabük University", country: "Türkiye", instagram: "https://www.instagram.com/partechyperloop", linkedin: "https://www.linkedin.com/company/paradigmatech", focusAreas: [], seekingSponsors: false },
  { id: "albertaloop", logoUrl: "/team-logos/albertaloop.png", name: "Albertaloop", university: "University of Alberta", country: "Canada", website: "https://albertaloop.ca/", instagram: "https://www.instagram.com/albertaloopuofa/", linkedin: "https://www.linkedin.com/company/albertaloop", youtube: "https://www.youtube.com/channel/UCCboUWAQ9dxWE7PBmlDfFNg", focusAreas: [], seekingSponsors: false },
  { id: "polyloop", logoUrl: "/team-logos/polyloop.png", name: "Polyloop", university: "Polytechnique Montreal", country: "Canada", website: "https://www.polyloop.ca/", instagram: "https://www.instagram.com/polyloopmtl/", linkedin: "https://www.linkedin.com/company/polyloop-montreal/", youtube: "https://www.youtube.com/@polyloopmontreal52", focusAreas: [], seekingSponsors: false },
  { id: "texas-guadaloop", logoUrl: "/team-logos/texas-guadaloop.png", name: "Texas Guadaloop", university: "University of Texas at Austin", country: "United States", website: "https://guadaloop-website.vercel.app/", instagram: "https://www.instagram.com/texasguadaloop/", linkedin: "https://www.linkedin.com/company/texas-guadaloop/", focusAreas: [], seekingSponsors: false },
  { id: "vac-vectoor-hyperloop", logoUrl: "/team-logos/vac-vectoor-hyperloop.png", name: "Vac-Vectoor Hyperloop ADYPU", university: "Ajeenkya D Y Patil University", country: "India", instagram: "https://www.instagram.com/vac_vectoor_hyperloop/", focusAreas: [], seekingSponsors: false },
  { id: "cornell-hyperloop", logoUrl: "/team-logos/cornell-hyperloop.png", name: "Cornell Hyperloop", university: "Cornell University", country: "United States", website: "https://www.cornellhyperloop.com/", instagram: "https://www.instagram.com/cornellhyperloop/", linkedin: "https://www.linkedin.com/company/cornell-hyperloop/", focusAreas: [], seekingSponsors: false },
  { id: "dromos", logoUrl: "/team-logos/dromos.png", name: "DROMOS", university: "Vellore Institute of Technology - Chennai", country: "India", instagram: "https://www.instagram.com/teamdromos/", linkedin: "https://www.linkedin.com/company/team-dromos", focusAreas: [], seekingSponsors: false },
  { id: "force-hyperloop", logoUrl: "/team-logos/force-hyperloop.png", name: "FORCE HYPERLOOP", university: "NIT Tiruchirappalli", country: "India", website: "https://www.forcehyperloop.com/", instagram: "https://www.instagram.com/force_hyperloop/", focusAreas: [], seekingSponsors: false },
  { id: "transpeed", logoUrl: "/team-logos/transpeed.png", name: "Transpeed", university: "AGH University of Science and Technology", country: "Poland", instagram: "https://www.instagram.com/transpeed_agh/", linkedin: "https://www.linkedin.com/company/transpeed-agh/", focusAreas: [], seekingSponsors: false },
  { id: "hyper-pwr", logoUrl: "/team-logos/hyper-pwr.png", name: "HYPER", university: "Politechnika Wrocławska", country: "Poland", website: "https://hypewr.pwr.edu.pl/", instagram: "https://www.instagram.com/kn_hyper/", focusAreas: [], seekingSponsors: false },
  { id: "levitate-hyperloop", logoUrl: "/team-logos/levitate-hyperloop.png", name: "Team Levitate Hyperloop", university: "Vellore Institute of Technology", country: "India", website: "https://www.levitatehyperloop.com/", instagram: "https://www.instagram.com/levitate_vit/", linkedin: "https://www.linkedin.com/company/levitate-vit/", focusAreas: [], seekingSponsors: false },
  { id: "spectraloop", name: "Spectraloop", university: "Samsun Üniversitesi", country: "Türkiye", website: "https://spectraloop.com/", instagram: "https://www.instagram.com/spectraloop/", linkedin: "https://www.linkedin.com/company/spectraloop/", focusAreas: [], seekingSponsors: false },
  { id: "hypercage", logoUrl: "/team-logos/hypercage.png", name: "Hypercage", university: "Gebze Technical University", country: "Türkiye", instagram: "https://www.instagram.com/hypercage_gtu/", linkedin: "https://www.linkedin.com/company/hypercage/", focusAreas: [], seekingSponsors: false },
  { id: "metropolitan-hyperloop", logoUrl: "/team-logos/metropolitan-hyperloop.png", name: "Metropolitan Hyperloop", university: "Toronto Metropolitan University", country: "Canada", website: "https://methyperloop.netlify.app/", instagram: "https://www.instagram.com/metrohyperloop", linkedin: "https://ca.linkedin.com/company/metrohyperloop", focusAreas: [], seekingSponsors: false },
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
    ...(row.instagram_url ? { instagram: row.instagram_url } : {}),
    ...(row.linkedin_url ? { linkedin: row.linkedin_url } : {}),
    ...(row.youtube_url ? { youtube: row.youtube_url } : {}),
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
        "id,name,university,country,city,logo_url,website,instagram_url,linkedin_url,youtube_url,description,focus_areas,highlights,founded_year,seeking_sponsors",
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
