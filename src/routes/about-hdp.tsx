import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  Cpu,
  Globe2,
  Layers,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import tubeLandscape from "../assets/tube-landscape.jpg";
import { Magnetic } from "../components/Magnetic";
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

const goals = [
  {
    title: "Prove feasibility",
    text: "Prove the feasibility of hyperloop as a safe and sustainable low-emission transport mode for people and goods.",
  },
  {
    title: "Test & demonstrate",
    text: "Test and demonstrate at the European Hyperloop Center that the technology works as designed and can be operated safely.",
  },
  {
    title: "Identify opportunities",
    text: "Identify the future prospects and opportunities for industry and stakeholders clustered around the hyperloop ecosystem.",
  },
];

const workGroups = [
  {
    name: "WG Cargo",
    type: "Feasibility",
    text: "To prove the feasibility of hyperloop as a safe and sustainable low-emission method of transport for goods.",
  },
  {
    name: "WG Passengers",
    type: "Feasibility",
    text: "To prove the feasibility of hyperloop as a safe and sustainable low-emission method of transport for people.",
  },
  {
    name: "WG European Hyperloop Center",
    type: "Realization",
    text: "To demonstrate in the European Hyperloop Center Groningen that the technology works as intended and can be operated safely.",
  },
  {
    name: "WG Future Prospects",
    type: "Marketability",
    text: "To identify the future prospects and opportunities for industry and stakeholders clustered around the center of excellence of hyperloop.",
  },
];

const researchAspects = [
  {
    icon: ShieldCheck,
    title: "Safety",
    text: "The appropriate level of safety needs to be defined in line with the zero-accidents ambition.",
  },
  {
    icon: BadgeCheck,
    title: "Standards",
    text: "Standards are key to create a certified, sustainable, interoperable system and transport network with the appropriate level of safety.",
  },
  {
    icon: Layers,
    title: "Integration",
    text: "Hyperloop needs to be integrated into the physical domain as well as into the mobility system for passengers or the logistics system for goods.",
  },
  {
    icon: TrendingUp,
    title: "Socio-Economic Costs and Benefits",
    text: "Hyperloop routes need to have a positive business case in social, economic, financial and environmental terms to be implemented.",
  },
  {
    icon: Users,
    title: "Public Adoption",
    text: "The needs and wishes of end-users will be incorporated in the adoption roadmap.",
  },
  {
    icon: Globe2,
    title: "Ecosystem",
    text: "The global opportunity of hyperloop implementation and the role that partners in the ecosystem can play need to be assessed.",
  },
  {
    icon: Cpu,
    title: "Technology",
    text: "A test facility and learning center is required to test all the facets for safe operation of hyperloop and to provide answers to open questions.",
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

          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {goals.map((goal, i) => (
              <Reveal key={goal.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-border bg-background/60 p-8 transition-all duration-500 hover:border-primary/50">
                  <span className="font-display text-sm text-primary-glow">0{i + 1}</span>
                  <h3 className="mt-6 text-xl font-semibold">{goal.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{goal.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Work groups */}
      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="How we work"
              title="Four Work Groups, one shared roadmap."
              intro="HDP's goals are addressed by four Work Groups, each focused on activities such as R&D projects, feasibility studies and the realization of the European Hyperloop Center in the Dutch Province of Groningen."
            />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {workGroups.map((group, i) => (
              <Reveal key={group.name} delay={i * 0.08}>
                <Magnetic>
                  <div className="h-full rounded-3xl border border-border bg-background/60 p-8 transition-all duration-500 hover:border-primary/50">
                    <span className="text-xs font-semibold tracking-[0.16em] text-primary-glow uppercase">
                      {group.type}
                    </span>
                    <h3 className="mt-4 text-xl font-semibold">{group.name}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{group.text}</p>
                  </div>
                </Magnetic>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Research aspects */}
      <section id="research-aspects" className="scroll-mt-24">
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="Research aspects"
              title="Seven key aspects driving the programme."
              intro="During this initial 3-year programme, hyperloop research and innovation is advanced by building up on a comprehensive set of seven key aspects."
            />
          </Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {researchAspects.map((aspect, i) => {
              const Icon = aspect.icon;
              return (
                <Reveal key={aspect.title} delay={i * 0.06}>
                  <Magnetic>
                    <div className="h-full rounded-3xl border border-border bg-background/60 p-8 transition-all duration-500 hover:border-primary/50">
                      <Icon className="h-6 w-6 text-primary-glow" />
                      <h3 className="mt-5 text-lg font-semibold">{aspect.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{aspect.text}</p>
                    </div>
                  </Magnetic>
                </Reveal>
              );
            })}
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
