import { createFileRoute } from "@tanstack/react-router";
import tubeLandscape from "../assets/tube-landscape.jpg";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { StatCounter } from "../components/StatCounter";
import { CtaButton, SectionHeading } from "../components/ui-kit";

export const Route = createFileRoute("/about-hdp")({
  head: () => ({
    meta: [
      { title: "About HDP — Hyperloop Development Program" },
      {
        name: "description",
        content:
          "How the Hyperloop Development Program works: mission, governance and the public-private partnership coordinating hyperloop development across Europe.",
      },
      { property: "og:title", content: "About the Hyperloop Development Program" },
      {
        property: "og:description",
        content:
          "Mission, governance and organisation of Europe's coordinating platform for hyperloop development.",
      },
      { property: "og:url", content: "/about-hdp" },
    ],
    links: [{ rel: "canonical", href: "/about-hdp" }],
  }),
  component: AboutHdp,
});

const pillars = [
  {
    title: "Shared roadmap",
    text: "One European development roadmap, agreed between industry, research institutions and public bodies, so effort compounds instead of duplicating.",
  },
  {
    title: "Open test infrastructure",
    text: "Coordinated access to European test facilities, giving every developer a route from concept to full-scale validation.",
  },
  {
    title: "Standards and safety",
    text: "Engineering evidence translated into certification, safety and interoperability groundwork for cross-border corridors.",
  },
  {
    title: "Funding and visibility",
    text: "Joint programmes and public funding instruments that de-risk the long horizon of infrastructure innovation.",
  },
];

const roles = [
  { role: "EU research collaboration", detail: "Deepening joint research across institutions and programmes." },
  { role: "Communication", detail: "Making hyperloop progress legible to industry, policy and the public." },
  { role: "Funding", detail: "Securing new instruments to sustain long-horizon development." },
  { role: "Operations & finance", detail: "Strengthening the foundation that carries the programme." },
];

function AboutHdp() {
  return (
    <>
      <PageHero
        eyebrow="About HDP"
        title="Europe's coordinating platform for hyperloop."
        intro="The Hyperloop Development Program Foundation brings public and private parties into one structure, so that a technology of this scale can actually be built."
        image={tubeLandscape}
        imageAlt="Hyperloop tube crossing open landscape at dusk"
        priority
      />

      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="Mission"
              title="Develop hyperloop as a safe, energy-efficient and viable mode of transport."
              intro="HDP is a public-private partnership of more than 25 organizations throughout Europe, including industry parties and research institutions. Together they align technology development, test infrastructure and regulation."
            />
          </Reveal>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <StatCounter value={25} suffix="+" label="Partner organizations" />
            <StatCounter value={9} label="Countries" />
            <StatCounter value={3} label="Test facilities" />
            <StatCounter value={1} label="Shared roadmap" />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading eyebrow="What we do" title="Four pillars of the programme." />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-border bg-background/60 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50">
                  <span className="font-display text-sm text-primary-glow">0{i + 1}</span>
                  <h3 className="mt-6 text-xl font-semibold">{pillar.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{pillar.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="Governance & team"
              title="A foundation built for the long horizon."
              intro="The programme is steered by a board chaired by Jeroen in 't Veld, supported by working groups per technology domain. The foundation is currently expanding its team across four strategic roles."
            />
          </Reveal>
          <div className="mt-14 divide-y divide-border border-t border-border">
            {roles.map((item, i) => (
              <Reveal key={item.role} delay={i * 0.06}>
                <div className="grid gap-3 py-7 md:grid-cols-[1fr_1.4fr] md:items-baseline">
                  <h3 className="text-lg font-semibold">{item.role}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <div className="mt-12">
              <CtaButton to="/contact">Work with us</CtaButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
