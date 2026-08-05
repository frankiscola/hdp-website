import { createFileRoute } from "@tanstack/react-router";
import heroVehicle from "../assets/hero-vehicle.jpg";
import { Magnetic } from "../components/Magnetic";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { StatCounter } from "../components/StatCounter";
import { CtaButton, SectionHeading } from "../components/ui-kit";

export const Route = createFileRoute("/hyperloop")({
  head: () => ({
    meta: [
      { title: "Hyperloop technology — how it works | HDP" },
      {
        name: "description",
        content:
          "Magnetic levitation, near-vacuum tubes and lane switching: how hyperloop delivers high-speed, energy-efficient transport for passengers and freight.",
      },
      { property: "og:title", content: "How hyperloop works" },
      {
        property: "og:description",
        content:
          "Levitation, low-pressure tubes and network switching — the technology behind energy-efficient high-speed transport.",
      },
      { property: "og:url", content: "/hyperloop" },
    ],
    links: [{ rel: "canonical", href: "/hyperloop" }],
  }),
  component: Hyperloop,
});

const principles = [
  {
    title: "Levitation",
    text: "Passive and active magnetic systems lift the vehicle off the guideway. No wheels, no rolling resistance, minimal wear.",
  },
  {
    title: "Propulsion",
    text: "Linear motors in the infrastructure accelerate and brake the vehicle, with energy recovered on deceleration.",
  },
  {
    title: "Low-pressure tube",
    text: "Reducing air pressure removes most aerodynamic drag, so very high cruise speeds become energy-efficient.",
  },
  {
    title: "Lane switching",
    text: "Vehicles change lanes electromagnetically, without moving track — the prerequisite for a real network.",
  },
];

const benefits = [
  {
    title: "Capacity",
    text: "Small vehicles departing on demand create high throughput without the peak-hour constraints of conventional rail.",
  },
  {
    title: "Energy",
    text: "Low drag and electric propulsion mean far lower energy use per passenger-kilometre than aviation.",
  },
  {
    title: "Land use",
    text: "Elevated tubes follow existing corridors and leave the ground beneath them in use.",
  },
];

const timeline = [
  { year: "2020–2023", text: "Component research, sub-scale demonstrators and the first European partnerships." },
  { year: "2024", text: "European Hyperloop Center opens; full-scale testing of vehicles and infrastructure begins." },
  { year: "2025–2027", text: "Lane switching at speed, certification groundwork and freight-first corridor studies." },
  { year: "2028+", text: "First commercial corridor development, starting with cargo connections." },
];

function Hyperloop() {
  return (
    <>
      <PageHero
        eyebrow="The technology"
        title="High speed, without the energy penalty."
        intro="Hyperloop is being developed as ground-based, high-speed and energy-efficient transportation for carrying large volumes of passengers and freight."
        image={heroVehicle}
        imageAlt="Hyperloop vehicle inside an illuminated vacuum tube"
        priority
      />

      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="Principles"
              title="Four systems working as one."
              intro="Hyperloop is not one invention but the integration of four engineering domains, each validated at full scale in European test infrastructure."
            />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {principles.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <Magnetic>
                  <div className="h-full rounded-3xl border border-border bg-surface/50 p-8 transition-all duration-500 hover:border-primary/50">
                    <span className="font-display text-sm text-primary-glow">0{i + 1}</span>
                    <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                </Magnetic>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading eyebrow="Why it matters" title="More capacity, less impact." />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {benefits.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <Magnetic>
                  <div className="h-full rounded-3xl border border-border bg-background/60 p-8 transition-colors duration-500 hover:border-primary/50">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                </Magnetic>
              </Reveal>
            ))}

          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <StatCounter value={700} suffix=" km/h" label="Target cruise speed range" />
            <StatCounter value={90} suffix="%" label="Lower drag than open air travel" />
            <StatCounter value={100} suffix="%" label="Electric propulsion" />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading eyebrow="Development path" title="From component to corridor." />
          </Reveal>
          <div className="mt-14 divide-y divide-border border-t border-border">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.06}>
                <div className="grid gap-3 py-8 md:grid-cols-[1fr_1.6fr] md:items-baseline">
                  <p className="font-display text-2xl font-semibold text-primary-glow">
                    {item.year}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <div className="mt-12">
              <CtaButton to="/testing-infrastructure">Where it is tested</CtaButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
