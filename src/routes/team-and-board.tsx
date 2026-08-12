import { createFileRoute } from "@tanstack/react-router";
import { Landmark, ScrollText, Handshake, Building2 } from "lucide-react";
import tubeLandscape from "../assets/tube-landscape.jpg";
import { Magnetic } from "../components/Magnetic";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { CtaButton, SectionHeading } from "../components/ui-kit";
import { executiveBoard, supervisoryBoard } from "../data/site";

export const Route = createFileRoute("/team-and-board")({
  head: () => ({
    meta: [
      { title: "Team and Board – Hyperloop Development Program" },
      {
        name: "description",
        content:
          "The Stichting Hyperloop Development Program is governed by an Executive Board and a Supervisory Board, advised by the Advisory Council and the Program Partner Council.",
      },
      { property: "og:title", content: "Team and Board – Hyperloop Development Program" },
      {
        property: "og:description",
        content:
          "Meet the Executive Board and Supervisory Board steering Europe's coordinating platform for hyperloop development.",
      },
      { property: "og:url", content: "/team-and-board" },
    ],
    links: [{ rel: "canonical", href: "/team-and-board" }],
  }),
  component: TeamAndBoard,
});

const responsibilities = [
  {
    icon: Landmark,
    title: "Facilitate & administer",
    text: "Facilitating and administering the implementation of the activities in the Hyperloop Development Program.",
  },
  {
    icon: ScrollText,
    title: "Establish R&D programmes",
    text: "Establishing and supporting different R&D programmes up to TRL-9.",
  },
  {
    icon: Handshake,
    title: "Foster partnerships",
    text: "Fostering public-private partnerships, by building and maintaining alliances with the public sector and promoting pathways.",
  },
  {
    icon: Building2,
    title: "Coordinate the ecosystem",
    text: "Coordinating and expanding the international ecosystem across Europe.",
  },
];

function TeamAndBoard() {
  return (
    <>
      <PageHero
        eyebrow="Team and Board"
        title="Governance for a technology built to last."
        intro="The Hyperloop Development Program is governed through the Stichting Hyperloop Development Program, acting as quartermaster and lead partner of the consortium."
        image={tubeLandscape}
        imageAlt="Hyperloop tube crossing open landscape at dusk"
        priority
      />

      {/* Who are we */}
      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="Who are we"
              title="A foundation acting as quartermaster for the consortium."
              intro="The foundation achieves its objectives by facilitating the programme, establishing R&D activities, fostering public-private partnerships and coordinating the international ecosystem. The HDP is registered under number 561046952224-02 in the EU Transparency Register."
            />
          </Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {responsibilities.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 0.08}>
                  <Magnetic>
                    <div className="h-full rounded-3xl border border-border bg-background/60 p-8 transition-all duration-500 hover:border-primary/50">
                      <Icon className="h-6 w-6 text-primary-glow" />
                      <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {item.text}
                      </p>
                    </div>
                  </Magnetic>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Governance structure */}
      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="How we are governed"
              title="Chaired by the Program Board, advised on two sides."
              intro="The Hyperloop Development Program is chaired by the Program Board, which is advised externally by the Advisory Council and internally by the Program Partner Council. Programme management is responsible for the day-to-day implementation of the programme."
            />
          </Reveal>
        </div>
      </section>

      {/* Executive Board */}
      <section id="executive-board" className="scroll-mt-24">
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <p className="eyebrow">Executive Board</p>
            <h2 className="mt-4 text-3xl leading-[1.05] font-semibold sm:text-4xl lg:text-5xl">
              Day-to-day leadership of the programme.
            </h2>
          </Reveal>
          <div className="mt-14 divide-y divide-border border-t border-border">
            {executiveBoard.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.06}>
                <div className="grid gap-2 py-7 md:grid-cols-[1fr_1.4fr] md:items-baseline">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{member.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Supervisory Board */}
      <section id="supervisory-board" className="border-t border-border bg-surface/30 scroll-mt-24">
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <p className="eyebrow">Supervisory Board</p>
            <h2 className="mt-4 text-3xl leading-[1.05] font-semibold sm:text-4xl lg:text-5xl">
              Oversight from partners and the programme chair.
            </h2>
          </Reveal>
          <div className="mt-14 divide-y divide-border border-t border-border">
            {supervisoryBoard.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.06}>
                <div className="grid gap-2 py-7 md:grid-cols-[1fr_1.4fr] md:items-baseline">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{member.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <div className="mt-12">
              <CtaButton to="/contact">Get in touch</CtaButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
