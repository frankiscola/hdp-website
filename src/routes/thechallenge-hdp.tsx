import { createFileRoute } from "@tanstack/react-router";
import { Coins, Gauge, Leaf, MapPinned, Users } from "lucide-react";
import ecosystemNetwork from "../assets/ecosystem-network.jpg";
import { Magnetic } from "../components/Magnetic";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { StatCounter } from "../components/StatCounter";
import { CtaButton, SectionHeading } from "../components/ui-kit";

export const Route = createFileRoute("/thechallenge-hdp")({
  head: () => ({
    meta: [
      { title: "The Challenge — Hyperloop Development Program" },
      {
        name: "description",
        content:
          "Why Europe needs hyperloop: a widening transport capacity gap, tightening emissions targets, and the origin of the public-private partnership built to close them.",
      },
      { property: "og:title", content: "The Challenge — Hyperloop Development Program" },
      {
        property: "og:description",
        content:
          "The transport and climate challenge hyperloop is built to address, and how HDP's public-private partnership came to be.",
      },
      { property: "og:url", content: "/thechallenge-hdp" },
    ],
    links: [{ rel: "canonical", href: "/thechallenge-hdp" }],
  }),
  component: TheChallenge,
});

const caseFor = [
  {
    icon: Coins,
    title: "Low cost to build and run",
    text: "Compared with other high-capacity infrastructure, hyperloop has relatively low implementation and operating costs — a rare combination for a transport mode of this scale.",
  },
  {
    icon: Leaf,
    title: "Zero emissions in operation",
    text: "Fully electric propulsion with no direct emissions gives hyperloop a natural fit with Europe's climate and clean-mobility targets.",
  },
  {
    icon: MapPinned,
    title: "Light footprint on the ground",
    text: "Elevated or buried guideways integrate into existing corridors and landscapes far more easily than new rail or road infrastructure.",
  },
  {
    icon: Gauge,
    title: "Short transport times",
    text: "Cruise speeds in the hundreds of km/h put city pairs across Europe within a fraction of today's travel time.",
  },
  {
    icon: Users,
    title: "High transport capacity",
    text: "Frequent, autonomous vehicles with electromagnetic lane switching let a hyperloop network carry passenger and freight volumes on par with — or beyond — high-speed rail.",
  },
];

const origin = [
  {
    label: "The starting point",
    text: "The programme originated from dialogue between an initial group of industry partners already working on early hyperloop technology and the Dutch ministries of Economic Affairs & Climate and of Infrastructure & Water Management.",
  },
  {
    label: "The opportunity",
    text: "In a period of economic uncertainty, investing in knowledge development and innovative technology was seen as a way to turn a societal challenge — future mobility — into economic opportunity.",
  },
  {
    label: "The response",
    text: "That dialogue became a shared willingness to invest jointly and integrally, structured as an open ecosystem rather than a single company's project — the model HDP still runs on today.",
  },
  {
    label: "The recognition",
    text: "The World Economic Forum has named hyperloop among its key markets of tomorrow, and HDP's own Vision Paper sets out a roadmap toward EU-aligned commercialisation.",
  },
];

function TheChallenge() {
  return (
    <>
      <PageHero
        eyebrow="The challenge"
        title="A capacity problem, and a climate deadline."
        intro="European transport demand keeps growing while the room to build more roads and rail keeps shrinking. Hyperloop exists to close that gap without the environmental cost of the alternatives."
        image={ecosystemNetwork}
        imageAlt="Abstract map of Europe with glowing connected transport corridors"
        priority
      />

      {/* Why now */}
      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="Why now"
              title="Existing networks are reaching their limits."
              intro="Passenger and freight volumes keep climbing, but road and rail capacity cannot expand at the same rate — and every new corridor competes with tightening emissions and land-use budgets. Hyperloop ticks the boxes future-proof infrastructure needs: low cost, zero emissions, easy integration, short travel times, and high capacity, all at once."
            />
          </Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caseFor.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 0.07}>
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

      {/* Network-scale answer */}
      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                eyebrow="A network-scale answer"
                title="Built to behave like a highway, not a railway."
                intro="Autonomous vehicles that merge and exit through electromagnetic lane switching let hyperloop depart at short intervals instead of fixed timetables. The result is capacity comparable to — or higher than — high-speed rail, with shorter waiting times for travellers and freight alike."
              />
              <div className="mt-10">
                <CtaButton to="/hyperloop" variant="ghost">
                  See how the technology works
                </CtaButton>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="grid gap-8 sm:grid-cols-2">
                <StatCounter value={20000} suffix="+" label="Passengers per direction, per hour" />
                <StatCounter value={25} suffix="+" label="Partners building the response" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Origin of the programme */}
      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="Where HDP came from"
              title="An open ecosystem, not a single company's bet."
              intro="No single organisation can carry a technology of this scale alone. HDP exists because industry and government reached the same conclusion at the same time."
            />
          </Reveal>
          <div className="mt-16 divide-y divide-border border-t border-border">
            {origin.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.07}>
                <div className="grid gap-3 py-8 md:grid-cols-[1fr_1.6fr] md:items-baseline">
                  <h3 className="text-lg font-semibold">{item.label}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-[1400px] px-6 py-28 text-center lg:px-10 lg:py-36">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
              The gap won't close itself.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              HDP brings the parties who can close it into one programme. See who's already
              involved, or get in touch to join them.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <CtaButton to="/partners">Meet the partners</CtaButton>
              <CtaButton to="/contact" variant="ghost">
                Get in touch
              </CtaButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
