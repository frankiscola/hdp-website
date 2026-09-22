import { createFileRoute } from "@tanstack/react-router";
import { absoluteUrl } from "../lib/seo";
import { ExternalLink, Trophy } from "lucide-react";
import hyperloopLandscapeTube from "../assets/hyperloop-landscape-tube.jpg";
import hyperloopLandscapeTubeLight from "../assets/hyperloop-landscape-tube-light.jpg";
import { Magnetic } from "../components/Magnetic";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { CtaButton, SectionHeading } from "../components/ui-kit";

export const Route = createFileRoute("/student-teams-and-competitions")({
  head: () => ({
    meta: [
      { title: "Student Teams and Competitions – Hyperloop Development Program" },
      {
        name: "description",
        content:
          "European Hyperloop Week, the TEKNOFEST Hyperloop Development Competition, and the student teams driving hyperloop research and demonstration across Europe and beyond.",
      },
      {
        property: "og:title",
        content: "Student Teams and Competitions – Hyperloop Development Program",
      },
      {
        property: "og:description",
        content:
          "European Hyperloop Week, the TEKNOFEST Hyperloop Development Competition, and the student teams behind them.",
      },
      { property: "og:url", content: absoluteUrl("/student-teams-and-competitions") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/student-teams-and-competitions") }],
  }),
  component: StudentTeamsAndCompetitions,
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

type StudentTeam = { name: string; affiliation: string; country: string; note: string };

const studentTeams: StudentTeam[] = [
  {
    name: "Delft Hyperloop",
    affiliation: "TU Delft",
    country: "Netherlands",
    note: "EHW founding team · winner 2022, 2025",
  },
  {
    name: "Swissloop",
    affiliation: "ETH Zurich",
    country: "Switzerland",
    note: "EHW founding team · winner 2021, 2023, 2026",
  },
  {
    name: "Hyperloop UPV",
    affiliation: "Universitat Politècnica de València",
    country: "Spain",
    note: "EHW founding team · winner 2024",
  },
  {
    name: "HYPED",
    affiliation: "University of Edinburgh",
    country: "Scotland, UK",
    note: "EHW founding team",
  },
  {
    name: "TUM Hyperloop",
    affiliation: "Technical University of Munich",
    country: "Germany",
    note: "HDP associate partner",
  },
  {
    name: "Turkuaz Hyperloop",
    affiliation: "Turkish university consortium",
    country: "Türkiye",
    note: "TEKNOFEST HDC 2022 · 1st place",
  },
  {
    name: "SÜ Kapsül Hyperloop",
    affiliation: "Selçuk University",
    country: "Türkiye",
    note: "TEKNOFEST HDC 2022 · 1st place",
  },
  {
    name: "HyperHawk",
    affiliation: "Turkish university consortium",
    country: "Türkiye",
    note: "TEKNOFEST HDC 2022 · 2nd place",
  },
];

function StudentTeamsAndCompetitions() {
  return (
    <>
      <PageHero
        eyebrow="Student teams & competitions"
        title="Where the next generation builds hyperloop."
        intro="European Hyperloop Week and the TEKNOFEST Hyperloop Development Competition bring together dozens of student teams each year to design, build and race full-scale hyperloop prototypes."
        image={hyperloopLandscapeTube}
        imageLight={hyperloopLandscapeTubeLight}
        imageAlt="Hyperloop tube stretching across a landscape"
        priority
      />

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

      {/* Student team directory */}
      <section className="border-t border-border bg-surface/30">
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="Student teams"
              title="The people behind the pods."
              intro="A growing directory of student teams active across European and international hyperloop competitions. Missing your team? Get in touch to be added."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {studentTeams.map((team, i) => (
              <Reveal key={team.name} delay={i * 0.05}>
                <Magnetic>
                  <div className="h-full rounded-3xl border border-border bg-background/60 p-7 transition-all duration-500 hover:border-primary/50">
                    <h3 className="text-lg leading-snug font-semibold">{team.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{team.affiliation}</p>
                    <p className="mt-1 text-xs tracking-[0.1em] text-muted-foreground/70 uppercase">
                      {team.country}
                    </p>
                    <p className="mt-4 text-xs leading-relaxed text-primary-glow">{team.note}</p>
                  </div>
                </Magnetic>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <div className="mt-14">
              <CtaButton to="/contact">Add your team</CtaButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
