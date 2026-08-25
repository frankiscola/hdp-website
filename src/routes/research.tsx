import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Cpu, Globe2, Layers, ShieldCheck, TrendingUp, Users } from "lucide-react";
import ecosystemNetwork from "../assets/ecosystem-network.jpg";
import ecosystemNetworkLight from "../assets/ecosystem-network-light.jpg";
import { Magnetic } from "../components/Magnetic";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { CtaButton, SectionHeading } from "../components/ui-kit";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research – Hyperloop Development Program" },
      {
        name: "description",
        content:
          "The seven key research aspects driving the Hyperloop Development Program: safety, standards, integration, socio-economic costs and benefits, public adoption, ecosystem and technology.",
      },
      { property: "og:title", content: "Research – Hyperloop Development Program" },
      {
        property: "og:description",
        content: "Seven key aspects driving hyperloop research and innovation across Europe.",
      },
      { property: "og:url", content: "/research" },
    ],
    links: [{ rel: "canonical", href: "/research" }],
  }),
  component: Research,
});

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

function Research() {
  return (
    <>
      <PageHero
        eyebrow="Program"
        title="Seven key aspects driving the programme."
        intro="During this initial 3-year programme, hyperloop research and innovation is advanced by building up on a comprehensive set of seven key aspects."
        image={ecosystemNetwork}
        imageLight={ecosystemNetworkLight}
        imageAlt="Abstract map of Europe with glowing connected nodes"
        priority
      />

      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="Research aspects"
              title="What the programme is working to answer."
              intro="Each aspect is carried by one or more Work Groups, and feeds directly into the roadmap toward the European Hyperloop Center."
              align="left"
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
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {aspect.text}
                      </p>
                    </div>
                  </Magnetic>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.15}>
            <div className="mt-16">
              <CtaButton to="/about-hdp">Back to The HDP</CtaButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
