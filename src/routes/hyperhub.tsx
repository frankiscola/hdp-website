import { createFileRoute, Link } from "@tanstack/react-router";
import { absoluteUrl } from "../lib/seo";
import { ChevronDown, ExternalLink, Instagram, Linkedin, Search, X, Youtube } from "lucide-react";
import { useMemo, useState } from "react";
import hyperloopLandscapeTube from "../assets/hyperloop-landscape-tube.jpg";
import hyperloopLandscapeTubeLight from "../assets/hyperloop-landscape-tube-light.jpg";
import { Magnetic } from "../components/Magnetic";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/ui-kit";
import { AddTeamForm } from "../components/AddTeamForm";
import { CompanyInterestPanel, type CompanyInterest } from "../components/CompanyPortal";
import { fetchTeams, type Team } from "../data/teams";
import { cn } from "../lib/utils";

export const Route = createFileRoute("/hyperhub")({
  head: () => ({
    meta: [
      { title: "HyperHub Portal – Hyperloop Development Program" },
      {
        name: "description",
        content:
          "The HyperHub Portal connects hyperloop student teams with sponsors, partners and future employers. Explore the teams and how to get involved.",
      },
      { property: "og:title", content: "HyperHub Portal – Hyperloop Development Program" },
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

const COMPANY_VIEWS: { id: CompanyInterest; label: string }[] = [
  { id: "sponsorship", label: "Seeking sponsors" },
  { id: "careers", label: "Careers" },
  { id: "thesis", label: "Academic thesis" },
];

function TeamCard({ team }: { team: Team }) {
  const initials = team.name
    .split(/\s+/)
    .map((w) => w[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const place = [team.city, team.country].filter(Boolean).join(", ");
  const socials = [
    { href: team.linkedin, label: `${team.name} on LinkedIn`, Icon: Linkedin },
    { href: team.instagram, label: `${team.name} on Instagram`, Icon: Instagram },
    { href: team.youtube, label: `${team.name} on YouTube`, Icon: Youtube },
  ].filter((s): s is { href: string; label: string; Icon: typeof Linkedin } => Boolean(s.href));

  return (
    <Magnetic>
      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background/60 p-7 transition-all duration-500 hover:border-primary/50">
        {/* Faint watermark of the team's own logo, sat large in the corner.
            Purely decorative: the small badge above stays the readable mark.
            Skipped for logos with no real transparency (logoWatermark is
            false), where this would show as an ugly solid block instead of a
            soft silhouette. */}
        {team.logoUrl && team.logoWatermark && (
          <img
            src={team.logoUrl}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="logo-watermark pointer-events-none absolute -right-8 -bottom-8 h-40 w-40 object-contain"
          />
        )}

        <div className="relative flex items-start justify-between gap-4">
          {team.logoLightUrl && team.logoDarkUrl ? (
            // The team supplied one logo per theme: show the matching one
            // straight on the card, no badge tile needed.
            <>
              <img
                src={team.logoLightUrl}
                alt={`${team.name} logo`}
                loading="lazy"
                className="h-14 w-auto max-w-[8rem] object-contain object-left dark:hidden"
              />
              <img
                src={team.logoDarkUrl}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="hidden h-14 w-auto max-w-[8rem] object-contain object-left dark:block"
              />
            </>
          ) : team.logoUrl ? (
            <img
              src={team.logoUrl}
              alt={`${team.name} logo`}
              loading="lazy"
              className={cn(
                "h-14 w-14 rounded-xl object-contain p-1.5",
                // Logos that are white/light on a transparent background
                // need a dark tile behind them to stay visible.
                team.logoBg === "dark" ? "bg-slate-900" : "bg-white",
              )}
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

        <h3 className="relative mt-5 text-lg leading-snug font-semibold">{team.name}</h3>
        <p className="relative mt-2 text-sm text-muted-foreground">{team.university}</p>
        <p className="relative mt-1 text-xs tracking-[0.1em] text-muted-foreground/70 uppercase">
          {place}
        </p>

        {team.description && (
          <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
            {team.description}
          </p>
        )}
        {team.highlights && (
          <p className="relative mt-4 text-xs leading-relaxed text-primary-glow">
            {team.highlights}
          </p>
        )}
        {team.focusAreas.length > 0 && (
          <div className="relative mt-4 flex flex-wrap gap-1.5">
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

        <div className="relative mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-6">
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
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-muted-foreground transition-colors hover:text-primary-glow"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
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
  // null = the normal student-team directory. Otherwise a members-only
  // company list (sponsors / careers / academic thesis) replaces the teams.
  const [companyView, setCompanyView] = useState<CompanyInterest | null>(null);

  const countries = useMemo(
    () => ["All", ...Array.from(new Set(teams.map((t) => t.country))).sort()],
    [teams],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return teams.filter((t) => {
      if (country !== "All" && t.country !== country) return false;
      if (q && !`${t.name} ${t.university} ${t.city ?? ""}`.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [teams, query, country]);

  const hasFilters = query || country !== "All" || companyView !== null;

  function clearFilters() {
    setQuery("");
    setCountry("All");
    setCompanyView(null);
  }

  return (
    <>
      <PageHero
        eyebrow="HyperHub Portal"
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
              intro="Search the teams by name, university or country. Partner companies can use the buttons to see who is open to sponsorship, careers and academic thesis requests."
            />
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="relative flex-1 lg:max-w-xs">
                <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by team, university or city…"
                  className="w-full rounded-full border border-border bg-surface/50 py-3 pr-4 pl-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
                />
              </div>
              <div className="relative">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  aria-label="Filter by country"
                  className="appearance-none rounded-full border border-border bg-surface/50 py-3 pr-10 pl-4 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                >
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c === "All" ? "All countries" : c}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              {COMPANY_VIEWS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setCompanyView((v) => (v === id ? null : id))}
                  aria-pressed={companyView === id}
                  className={cn(
                    "rounded-full border px-4 py-3 text-sm font-medium transition-colors duration-300",
                    companyView === id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-surface/40 text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                </button>
              ))}
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
              <a
                href="#add-your-team"
                className="rounded-full border border-primary-glow bg-primary-glow/10 px-5 py-3 text-center text-sm font-semibold text-foreground ring-1 ring-primary-glow/50 transition-colors duration-300 hover:bg-primary-glow/20 lg:ml-auto"
              >
                Add your team
              </a>
            </div>
          </Reveal>

          {companyView ? (
            <div className="mt-10">
              <CompanyInterestPanel key={companyView} interest={companyView} />
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </section>

      {/* Add your team */}
      <section id="add-your-team" className="scroll-mt-24 border-t border-border">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="Join the portal"
              title="Add your team."
              intro="Is your student team building hyperloop? Tell us about it and upload your logos. Once the HDP team has reviewed your application, your profile goes live in the directory above."
            />
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              <li>Takes about five minutes.</li>
              <li>
                Have your two logo versions ready: dark-on-light and light-on-dark, both
                transparent.
              </li>
              <li>Your reference contact stays private and is never published.</li>
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[2rem] border border-border bg-surface/50 p-8 lg:p-12">
              <AddTeamForm countries={countries.filter((c) => c !== "All")} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
