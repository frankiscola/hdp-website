import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import heroVehicle from "../assets/hero-vehicle.jpg";
import tubeLandscape from "../assets/tube-landscape.jpg";
import testCenter from "../assets/test-center.jpg";
import ecosystemNetwork from "../assets/ecosystem-network.jpg";
import { LogoMarquee } from "../components/LogoMarquee";
import { Magnetic } from "../components/Magnetic";
import { Reveal } from "../components/Reveal";
import { StatCounter } from "../components/StatCounter";
import { NewsCard } from "../components/NewsCard";
import { TunnelCanvas } from "../components/TunnelCanvas";
import { ArrowLink, CtaButton, SectionHeading } from "../components/ui-kit";
import { facilities, news, partners, type Partner } from "../data/site";
import { cn } from "../lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hyperloop Development Program — Europe's hyperloop platform" },
      {
        name: "description",
        content:
          "The Hyperloop Development Program unites 25+ European industry parties, research institutions and public bodies to develop hyperloop as safe, energy-efficient high-speed transport.",
      },
      { property: "og:title", content: "Hyperloop Development Program" },
      {
        property: "og:description",
        content:
          "A European public-private partnership developing hyperloop as safe, energy-efficient high-speed transport for people and goods.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function PartnerLogoTile({ partner, size = "md" }: { partner: Partner; size?: "lg" | "md" }) {
  const isLg = size === "lg";
  return (
    <Magnetic strength={isLg ? 0.18 : 0.12} max={isLg ? 10 : 6}>
      <div className="group flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-surface/40 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-surface/70">
        <div className={cn("flex items-center justify-center", isLg ? "h-24" : "h-16")}>
          <img
            src={partner.logo}
            alt={`${partner.name} logo`}
            loading="lazy"
            className={cn(
              "logo-mono w-auto object-contain transition-transform duration-500 group-hover:scale-[1.05]",
              isLg ? "max-h-14 max-w-[9rem]" : "max-h-10 max-w-[6.5rem]"
            )}
          />
        </div>
        <p
          className={cn(
            "text-center font-medium leading-tight text-foreground/90",
            isLg ? "text-sm" : "text-xs"
          )}
        >
          {partner.name}
        </p>
      </div>
    </Magnetic>
  );
}

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative flex min-h-screen items-center overflow-hidden">
        <motion.img
          src={heroVehicle}
          alt="Hyperloop vehicle inside a vacuum tube lit by indigo light strips"
          width={1920}
          height={1088}
          style={reduce ? {} : { y: imageY, scale: imageScale }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <TunnelCanvas className="pointer-events-none absolute inset-0 h-full w-full opacity-70 mix-blend-screen" />
        <div className="veil absolute inset-0" />
        <motion.div
          style={reduce ? {} : { opacity: contentOpacity }}
          className="relative mx-auto w-full max-w-[1400px] px-6 pt-32 pb-24 lg:px-10"
        >
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Europe · Public-private partnership
          </motion.p>
          <motion.h1
            className="mt-6 max-w-5xl text-[2.6rem] leading-[0.98] font-semibold sm:text-7xl lg:text-[5.5rem]"
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Building the ground
            <br />
            <span className="text-gradient">for hyperloop.</span>
          </motion.h1>
          <motion.p
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            More than 25 organizations across Europe developing hyperloop as a safe,
            energy-efficient and commercially viable mode of high-speed transportation.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.42 }}
          >
            <CtaButton to="/about-hdp">Discover the program</CtaButton>
            <CtaButton to="/hyperloop" variant="ghost">
              How hyperloop works
            </CtaButton>
          </motion.div>
        </motion.div>
      </section>

      {/* Chairman quote */}
      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <blockquote className="max-w-4xl font-display text-2xl leading-[1.3] font-medium sm:text-4xl lg:text-5xl">
              “A global infrastructure project such as hyperloop can only be achieved when public
              and private parties cooperate in complementary ways.”
            </blockquote>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-10 text-sm text-muted-foreground">
              <span className="text-foreground">Jeroen in 't Veld</span> — Chairman of the Hyperloop
              Development Program
            </p>
          </Reveal>
        </div>
      </section>

      {/* About HDP */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-6 py-28 lg:grid-cols-2 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="About the program"
              title="One programme, one European ecosystem."
              intro="The Hyperloop Development Program is a public-private partnership of more than 25 organizations throughout Europe, including industry parties and research institutions, dedicated to developing hyperloop as a safe, energy-efficient and commercially viable mode of high-speed transportation."
            />
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              <StatCounter value={25} suffix="+" label="Partner organizations" />
              <StatCounter value={3} label="European test facilities" />
              <StatCounter value={9} label="Countries involved" />
            </div>
            <div className="mt-12">
              <ArrowLink to="/about-hdp">Learn more about HDP</ArrowLink>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="relative">
            <div className="glow-ring overflow-hidden rounded-[2rem] border border-border">
              <img
                src={tubeLandscape}
                alt="Elevated hyperloop tube crossing European countryside at blue hour"
                loading="lazy"
                width={1920}
                height={1088}
                className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* About hyperloop */}
      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="About hyperloop"
              title="Safe, energy-efficient, high-speed transport for people and goods."
              intro="Hyperloop is being developed as ground-based, high-speed and energy-efficient transportation for carrying large volumes of passengers and freight. It has the potential to create more capacity in transportation whilst being more environmentally friendly than existing modes."
            />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Magnetic levitation",
                text: "Vehicles float without wheels, removing rolling resistance and mechanical wear from the system.",
              },
              {
                title: "Near-vacuum tubes",
                text: "Low-pressure tubes cut air resistance, so high speed no longer means high energy use.",
              },
              {
                title: "Network switching",
                text: "Lane switching without moving track turns single corridors into a European network.",
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.1}>
                <Magnetic>
                  <div className="h-full rounded-3xl border border-border bg-background/60 p-8 transition-all duration-500 hover:border-primary/50">
                    <span className="font-display text-sm text-primary-glow">0{i + 1}</span>
                    <h3 className="mt-6 text-xl font-semibold">{card.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{card.text}</p>
                  </div>
                </Magnetic>
              </Reveal>

            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-14">
              <ArrowLink to="/hyperloop">Explore the technology</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testing infrastructure */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <div className="grid items-end gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                eyebrow="EU testing infrastructure"
                title="A coordinated European test cluster."
                intro="The Hyperloop Testing Infrastructure Cluster brings together leading test facilities in Europe, coordinated by the Hyperloop Development Program. Each site contributes unique capabilities, from propulsion and suspension to vacuum infrastructure and switching."
              />
            </Reveal>
            <Reveal delay={0.15}>
              <div className="overflow-hidden rounded-[2rem] border border-border">
                <img
                  src={testCenter}
                  alt="Interior of a European hyperloop test facility with large vacuum tube segments"
                  loading="lazy"
                  width={1600}
                  height={1008}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105"
                />
              </div>
            </Reveal>
          </div>

          <div className="mt-16 divide-y divide-border border-t border-border">
            {facilities.map((facility, i) => (
              <Reveal key={facility.name} delay={i * 0.08}>
                <div className="group grid gap-4 py-8 md:grid-cols-[1fr_1.4fr] md:items-baseline">
                  <div>
                    <h3 className="text-xl font-semibold transition-colors group-hover:text-primary-glow">
                      {facility.name}
                    </h3>
                    <p className="mt-2 text-xs tracking-[0.16em] text-muted-foreground uppercase">
                      {facility.location}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{facility.focus}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-12">
              <ArrowLink to="/testing-infrastructure">See the test cluster</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="relative overflow-hidden border-y border-border">
        <img
          src={ecosystemNetwork}
          alt="Abstract map of Europe with glowing connected nodes"
          loading="lazy"
          width={1600}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="veil absolute inset-0" />
        <div className="relative mx-auto max-w-[1400px] px-6 py-32 lg:px-10 lg:py-44">
          <Reveal>
            <SectionHeading
              eyebrow="The ecosystem"
              title="An inclusive ecosystem, accelerating together."
              intro="The HDP is an inclusive ecosystem where organizations collaborate to accelerate the development of hyperloop — industry, research, infrastructure operators and public bodies working from one shared roadmap."
              align="center"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-20">
              <div className="mb-6 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-primary/60" />
                <span className="text-xs tracking-[0.2em] text-primary-glow uppercase">Core Members</span>
                <span className="h-px w-10 bg-primary/60" />
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
                {partners
                  .filter((p) => p.tier === "Core")
                  .map((partner) => (
                    <PartnerLogoTile key={partner.name} partner={partner} size="lg" />
                  ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-20">
              <div className="mb-6 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-border" />
                <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Associate Members</span>
                <span className="h-px w-10 bg-border" />
              </div>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 lg:gap-4">
                {partners
                  .filter((p) => p.tier === "Associate")
                  .map((partner) => (
                    <PartnerLogoTile key={partner.name} partner={partner} size="md" />
                  ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-14 flex justify-center">
              <CtaButton to="/partners">Meet the partners</CtaButton>
            </div>
          </Reveal>
        </div>
      </section>


      {/* News */}
      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading eyebrow="Latest news" title="From the programme." />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {news.slice(0, 3).map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.1}>
                <NewsCard item={item} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-12">
              <ArrowLink to="/news">All news</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-[1400px] px-6 py-28 text-center lg:px-10 lg:py-36">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
              Want to shape European hyperloop development?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Whether you build technology, fund infrastructure or set policy, there is a place for
              your organization in the programme.
            </p>
            <div className="mt-10 flex justify-center">
              <CtaButton to="/contact">Get in touch</CtaButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
