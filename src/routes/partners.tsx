import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import ecosystemNetwork from "../assets/ecosystem-network.jpg";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { CtaButton, SectionHeading } from "../components/ui-kit";
import { partners, type Partner } from "../data/site";
import { cn } from "../lib/utils";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners — the HDP ecosystem | Hyperloop Development Program" },
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
              title="More than 25 organizations across Europe."
              intro="Industry parties, research institutions, infrastructure operators and public bodies each bring a distinct capability to the programme."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-wrap gap-3">
              {filters.map((f) => (
                <button
                  key={f}
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
              ))}
            </div>
          </Reveal>

          <motion.div layout className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((partner) => (
                <motion.div
                  key={partner.name}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-border bg-surface/50 p-6 transition-colors duration-300 hover:border-primary/50"
                >
                  <p className="text-lg font-semibold">{partner.name}</p>
                  <p className="mt-2 text-xs tracking-[0.16em] text-muted-foreground uppercase">
                    {partner.country} · {partner.category}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-border bg-surface/40">
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
