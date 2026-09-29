import { createFileRoute, Link } from "@tanstack/react-router";
import { absoluteUrl } from "../lib/seo";
import { ExternalLink, Search, Trophy, X } from "lucide-react";
import { useMemo, useState } from "react";
import hyperloopLandscapeTube from "../assets/hyperloop-landscape-tube.jpg";
import hyperloopLandscapeTubeLight from "../assets/hyperloop-landscape-tube-light.jpg";
import { Magnetic } from "../components/Magnetic";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { CtaButton, SectionHeading } from "../components/ui-kit";
import { fetchTeams, type Team } from "../data/teams";
import { cn } from "../lib/utils";

export const Route = createFileRoute("/hyperhub")({
  head: () => ({
    meta: [
      { title: "HyperHub Network – Hyperloop Development Program" },
      {
        name: "description",
        content:
          "The HyperHub Network connects hyperloop student teams with sponsors, partners and future employers. Explore the teams, the competitions and how to get involved.",
      },
      { property: "og:title", content: "HyperHub Network – Hyperloop Development Program" },
      {
        property: "og:description",
        content:
          "Discover the student teams building hyperloop across Europe and connect with them as a sponsor, partner or employer.",
      },
      { property: "og:url", content: absoluteUrl("/hyperhub") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/hyperhub") }],
  }),
  loader: () => fetchTeams(),
  component: HyperHub,
});

type Edition = { edition: string; year: string; location: string; winner: string };

const ehwEditions: Edition[] = [
  { edition: "1st", year: "2021", location: "Valencia & Cheste, Spain", winner: "Swissloop" },
  {
    edition: "2nd",
    year: "2022",
    location: "Delft & Hilversum, Netherlands",
    winner: "Delft Hyperloop",
  },
  { edition: "3rd", year: "2023", location: "Edinburgh, Scotland", winner: "Swissloop" },
  {
    edition: "4th",
    year: "2024",
    location: "Zurich & Dübendorf, Switzerland",
    winner: "Hyperloop UPV",
  },
  {
    edition: "5th",
    year: "2025",
    location: "Groningen & Veendam, Netherlands",
    winner: "Delft Hyperloop",
  },
  {
    edition: "6th",
    year: "2026",
    location: "Groningen & Veendam, Netherlands",
    winner: "Swissloop",
  },
];

const teknofestCategories = [
  {
    title: "Performance",
    text: "Teams race their capsules inside a 208-metre hyperloop tunnel, judged on speed and technical execution.",
  },
  {
    title: "Technology Demonstration",
    text: "Recognises standout progress on a specific subsystem, such as levitation, propulsion or communication.",
  },
  {
    title: "Defined Problem Solving",
    text: "Teams submit a report addressing a specific technical or systemic challenge set by the organisers.",
  },
];

function TeamCard({ team }: { team: Team }) {
  const initials = team.name
    .split(/\s+/)
    .map((w) => w[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const place = [team.city, team.country].filter(Boolean).join(", ");

  return (
    <Magnetic>
      <div className="flex h-full flex-col rounded-3xl border border-border bg-background/60 p-7 transition-all duration-500 hover:border-primary/50">
        <div className="flex items-start justify-between gap-4">
          {team.logoUrl ? (
            <img
              src={team.logoUrl}
              alt={`${team.name} logo`}
              loading="lazy"
              className="h-14 w-14 rounded-xl bg-white object-contain p-1.5"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-sm font-semibold text-muted-foreground">
              {initials}
            </div>
          )}
          {team.seekingSponsors && (
            <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-medium tracking-[0.08em] text-primary-glow uppercase">
              Seeking sponsors
            </span>
          )}
        </div>

        <h3 className="mt-5 text-lg leading-snug font-semibold">{team.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{team.university}</p>
        <p className="mt-1 text-xs tracking-[0.1em] text-muted-foreground/70 uppercase">{place}</p>

        {team.description && (
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{team.description}</p>
        )}
        {team.highlights && (
          <p className="mt-4 text-xs leading-relaxed text-primary-glow">{team.highlights}</p>
        )}
        {team.focusAreas.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {team.focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
              >
                {area}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
          {team.website && (
            <a
              href={team.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-glow hover:text-foreground"
            >
              Website
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          {team.seekingSponsors && (
            <Link
              to="/contact"
              search={{ topic: "Sponsorship & talent", team: team.name }}
              className="text-sm font-semibold text-foreground underline-offset-4 hover:text-primary-glow hover:underline"
            >
              Sponsor this team
            </Link>
          )}
        </div>
      </div>
    </Magnetic>
  );
}

function HyperHub() {
  const teams = Route.useLoaderData();
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All");
  const [sponsorsOnly, setSponsorsOnly] = useState(false);

  const countries = useMemo(
    () => ["All", ...Array.from(new Set(teams.map((t) => t.country))).sort()],
    [teams],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return teams.filter((t) => {
      if (country !== "All" && t.country !== country) return false;
      if (sponsorsOnly && !t.seekingSponsors) return false;
      if (
        q &&
        !`${t.name} ${t.university} ${t.city ?? ""}`.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [teams, query, country, sponsorsOnly]);

  const hasFilters = query || country !== "All" || sponsorsOnly;

  function clearFilters() {
    setQuery("");
    setCountry("All");
    setSponsorsOnly(false);
  }

  return (
    <>
      <PageHero
        eyebrow="HyperHub Network"
        title="Where hyperloop students, teams and companies meet."
        intro="Discover the student teams building hyperloop across Europe and beyond, and connect with them as a sponsor, partner or future employer."
        image={hyperloopLandscapeTube}
        imageLight={hyperloopLandscapeTubeLight}
        imageAlt="Hyperloop tube stretching across a landscape"
        priority
      />

      {/* Team directory */}
      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="Student teams"
              title="The people behind the pods."
              intro="Search the teams by name, university or country. Teams marked as seeking sponsors are open to hearing from companies."
            />
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by team, university or city…"
                  className="w-full rounded-full border border-border bg-surface/50 py-3 pr-4 pl-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
                />
              </div>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                aria-label="Filter by country"
                className="rounded-full border border-border bg-surface/50 px-4 py-3 text-sm text-foreground focus:border-primary/50 focus:outline-none"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c === "All" ? "All countries" : c}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setSponsorsOnly((v) => !v)}
                aria-pressed={sponsorsOnly}
                className={cn(
                  "rounded-full border px-4 py-3 text-sm font-medium transition-colors duration-300",
                  sponsorsOnly
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-surface/40 text-muted-foreground hover:text-foreground",
                )}
              >
                Seeking sponsors
              </button>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear
                </button>
              )}
            </div>
          </Reveal>

          <p className="mt-8 text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "team" : "teams"}
          </p>

          {filtered.length === 0 ? (
            <p className="mt-10 rounded-3xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              No teams match these filters. Try clearing some.
            </p>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((team, i) => (
                <Reveal key={team.id} delay={Math.min(i, 7) * 0.04}>
                  <TeamCard team={team} />
                </Reveal>
              ))}
            </div>
          )}

          <Reveal delay={0.1}>
            <div className="mt-14 flex flex-wrap gap-4">
              <CtaButton to="/contact" search={{ topic: "Sponsorship & talent" }}>
                Sponsor or hire
              </CtaButton>
              <CtaButton
                to="/contact"
                search={{ topic: "Sponsorship & talent", addTeam: "1" }}
                variant="ghost"
              >
                Add your team
              </CtaButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Competitions overview */}
      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="The competitions"
              title="Two stages, one shared ambition."
              intro="Both competitions push student teams from concept to a working, testable hyperloop system — and both feed the wider ecosystem with fresh talent and research."
            />
          </Reveal>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[2rem] border border-border bg-surface/50 p-10 lg:p-12">
                <p className="eyebrow">Founded 2021</p>
                <h3 className="mt-4 text-2xl font-semibold">European Hyperloop Week</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Founded by four student teams — Delft Hyperloop, HYPED, Hyperloop UPV and
                  Swissloop — EHW is the largest annual hyperloop event in the world. Teams
                  compete on live pod demonstrations as well as technical and socio-economic
                  research submissions, judged by a jury of industry experts, academics and
                  former team members.
                </p>
                <a
                  href="https://www.hyperloopweek.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-glow hover:text-foreground"
                >
                  hyperloopweek.com
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-[2rem] border border-border bg-surface/50 p-10 lg:p-12">
                <p className="eyebrow">Founded 2022</p>
                <h3 className="mt-4 text-2xl font-semibold">
                  TEKNOFEST Hyperloop Development Competition
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Run under the technical leadership of TÜBİTAK RUTE with TCDD, as part of
                  Türkiye's TEKNOFEST festival. Open to students in Türkiye and abroad, the HDC
                  advances fifth-generation transport technologies across three categories.
                </p>
                <a
                  href="https://www.teknofest.org/en/competitions/hyperloop-development-competition/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-glow hover:text-foreground"
                >
                  teknofest.org
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EHW edition history */}
      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="European Hyperloop Week"
              title="Six editions, six hosts."
              intro="From Valencia to Veendam, hosted each year by a different university and test facility."
            />
          </Reveal>
          <div className="mt-14 overflow-hidden rounded-3xl border border-border">
            <div className="grid grid-cols-[auto_1fr_auto] gap-x-6 bg-surface/60 px-6 py-4 text-xs tracking-[0.15em] text-muted-foreground uppercase sm:px-8">
              <span>Edition</span>
              <span>Location</span>
              <span>Winner</span>
            </div>
            <div className="divide-y divide-border">
              {ehwEditions.map((row) => (
                <div
                  key={row.year}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-x-6 px-6 py-5 sm:px-8"
                >
                  <span className="text-sm font-medium text-muted-foreground">
                    {row.edition} · {row.year}
                  </span>
                  <span className="text-sm sm:text-base">{row.location}</span>
                  <span className="flex items-center gap-2 text-sm font-semibold text-primary-glow">
                    <Trophy className="h-4 w-4" />
                    {row.winner}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEKNOFEST categories */}
      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="TEKNOFEST HDC"
              title="Three ways to compete."
              intro="Since 2026 the competition runs across three categories, each recognising a different kind of progress."
            />
          </Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {teknofestCategories.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 0.08}>
                <Magnetic>
                  <div className="h-full rounded-3xl border border-border bg-background/60 p-8 transition-all duration-500 hover:border-primary/50">
                    <h3 className="text-lg font-semibold">{cat.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {cat.text}
                    </p>
                  </div>
                </Magnetic>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
