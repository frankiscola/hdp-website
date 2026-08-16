import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import ecosystemNetwork from "../assets/ecosystem-network.jpg";
import { Magnetic } from "../components/Magnetic";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { CtaButton, SectionHeading } from "../components/ui-kit";
import { partners, supportingGovernments, type Partner } from "../data/site";
import { cn } from "../lib/utils";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners – the HDP ecosystem | Hyperloop Development Program" },
      {
        name: "description",
        content:
          "More than 25 industry parties, research institutions, infrastructure operators and public bodies collaborating to accelerate hyperloop development in Europe.",
      },
      { property: "og:title", content: "The HDP ecosystem" },
      {
        property: "og:description",
        content:
          "Industry, research, infrastructure and public partners accelerating European hyperloop development.",
      },
      { property: "og:url", content: "/partners" },
    ],
    links: [{ rel: "canonical", href: "/partners" }],
  }),
  component: Partners,
});

const filters = ["All", "Industry", "Research", "Infrastructure", "Public"] as const;
type Filter = (typeof filters)[number];

const tiers = [
  {
    tier: "Core" as const,
    title: "Core Members",
    intro:
      "Organizations that actively develop hyperloop technology, operate test infrastructure or fund the programme's roadmap.",
  },
  {
    tier: "Associate" as const,
    title: "Associate Members",
    intro:
      "Contributors bringing specialist expertise, components, research and public support to the programme.",
  },
];

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <Magnetic strength={0.12} max={8}>
      <div className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface/50 p-5 transition-colors duration-300 hover:border-primary/50">
        <div className="logo-tile flex h-28 items-center justify-center rounded-xl px-6">
          <img
            src={partner.logo}
            alt={`${partner.name} logo`}
            loading="lazy"
            className="logo-mono max-h-16 w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <div>
          <p className="text-sm leading-snug font-semibold">{partner.name}</p>
          <p className="mt-1.5 text-xs tracking-[0.16em] text-muted-foreground uppercase">
            {partner.category}
          </p>
        </div>
      </div>
    </Magnetic>
  );
}

function Partners() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo<Partner[]>(
    () => (filter === "All" ? partners : partners.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <>
      <PageHero
        eyebrow="The ecosystem"
        title="An inclusive ecosystem, built on collaboration."
        intro="The HDP is an inclusive ecosystem where organizations collaborate to accelerate the development of hyperloop."
        image={ecosystemNetwork}
        imageAlt="Illuminated network of connected nodes across Europe"
        priority
      />

      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="Partners"
              title="Core and Associate Members across Europe."
              intro="Core Members drive the technology and infrastructure roadmap. Associate Members contribute specialist capabilities, research and public support."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-wrap gap-3">
              {filters.map((f) => (
                <Magnetic key={f} as="span" strength={0.25} max={8}>
                  <button
                    type="button"
                    onClick={() => setFilter(f)}
                    className={cn(
                      "rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300",
                      filter === f
                        ? "border-transparent bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
                    )}
                  >
                    {f}
                  </button>
                </Magnetic>
              ))}
            </div>
          </Reveal>

          {tiers.map((group) => {
            const items = visible.filter((p) => p.tier === group.tier);
            if (items.length === 0) return null;

            return (
              <div key={group.tier} className="mt-20 first:mt-16">
                <Reveal>
                  <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
                    <div className="max-w-2xl">
                      <h2 className="text-2xl font-semibold sm:text-3xl">{group.title}</h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {group.intro}
                      </p>
                    </div>
                    <span className="eyebrow">
                      {items.length} {items.length === 1 ? "organization" : "organizations"}
                    </span>
                  </div>
                </Reveal>

                <motion.div layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((partner) => (
                      <motion.div
                        key={partner.name}
                        layout
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <PartnerCard partner={partner} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <Reveal>
            <p className="eyebrow text-center">Public support</p>
            <h2 className="mx-auto mt-4 max-w-2xl text-center text-2xl font-semibold sm:text-3xl">
              Supporting Governments
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
              National, regional and state authorities backing hyperloop development across
              Europe.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-14 flex max-w-4xl flex-wrap items-center justify-center gap-x-16 gap-y-10">
              {supportingGovernments.map((gov) => (
                <Magnetic key={gov.name} strength={0.12} max={8}>
                  <div className="flex h-20 items-center justify-center rounded-2xl bg-foreground px-6 py-3 shadow-lg shadow-black/20">
                    <img
                      src={gov.logo}
                      alt={`${gov.name} logo`}
                      loading="lazy"
                      className="max-h-14 w-auto max-w-[200px] object-contain"
                    />
                  </div>
                </Magnetic>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-28 text-center lg:px-10 lg:py-36">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-4xl leading-[1.05] font-semibold sm:text-5xl">
              Join the ecosystem.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Membership is open to organizations that contribute technology, infrastructure,
              research or public support to hyperloop development in Europe.
            </p>
            <div className="mt-10 flex justify-center">
              <CtaButton to="/contact">Request information</CtaButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
