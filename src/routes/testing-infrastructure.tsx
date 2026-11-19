import { createFileRoute } from "@tanstack/react-router";
import { absoluteUrl } from "../lib/seo";
import { ArrowUpRight } from "lucide-react";
import testCenter from "../assets/test-center.jpg";
import testCenterLight from "../assets/test-center-light.jpg";
import { FacilityExplorer } from "../components/FacilityExplorer";
import { Magnetic } from "../components/Magnetic";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { CtaButton, SectionHeading } from "../components/ui-kit";
import { facilities } from "../data/site";
import { FACILITY_DATA_UPDATED, facilityHighlights, facilitySpecs } from "../data/facility-specs";

export const Route = createFileRoute("/testing-infrastructure")({
  head: () => ({
    meta: [
      { title: "EU Testing Infrastructure – hyperloop test cluster | HDP" },
      {
        name: "description",
        content:
          "Compare Europe's hyperloop test facilities: the 420 m European Hyperloop Center in Veendam, EuroTube's DemoTube in Dübendorf and the goTube of the Institute of Hyperloop Technology in Emden.",
      },
      { property: "og:title", content: "European hyperloop testing infrastructure" },
      {
        property: "og:description",
        content:
          "Three coordinated European test facilities covering propulsion, suspension, vacuum infrastructure and switching.",
      },
      { property: "og:url", content: absoluteUrl("/testing-infrastructure") },
      { property: "og:image", content: absoluteUrl("/og/test-center.jpg") },
      { name: "twitter:image", content: absoluteUrl("/og/test-center.jpg") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/testing-infrastructure") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "European hyperloop testing infrastructure cluster",
          itemListElement: [
            {
              name: "European Hyperloop Center",
              city: "Veendam",
              country: "NL",
              url: "https://hyperloopcenter.eu/",
            },
            {
              name: "EuroTube DemoTube",
              city: "Dübendorf",
              country: "CH",
              url: "https://eurotube.org/demotube/",
            },
            {
              name: "goTube – Institute of Hyperloop Technology",
              city: "Emden",
              country: "DE",
              url: "https://iht.hs-emden-leer.de/",
            },
          ].map((f, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Place",
              name: f.name,
              url: f.url,
              address: {
                "@type": "PostalAddress",
                addressLocality: f.city,
                addressCountry: f.country,
              },
            },
          })),
        }),
      },
    ],
  }),
  component: TestingInfrastructure,
});

function TestingInfrastructure() {
  return (
    <>
      <PageHero
        eyebrow="EU testing infrastructure"
        title="Where hyperloop technology is tested in Europe."
        intro="The Hyperloop Testing Infrastructure Cluster brings together leading European test facilities, coordinated by the Hyperloop Development Program."
        image={testCenter}
        imageLight={testCenterLight}
        imageAlt="Large vacuum tube segments inside a European hyperloop test facility"
        priority
      />

      <nav aria-label="On this page" className="border-b border-border">
        <ul className="mx-auto flex max-w-[1400px] flex-wrap gap-x-8 gap-y-2 px-6 py-4 text-sm lg:px-10">
          {[
            ["#facilities", "The facilities"],
            ["#compare", "Compare"],
            ["#capabilities", "What can be tested where"],
            ["#agenda", "Research agenda"],
            ["#campaign", "Plan a campaign"],
          ].map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="facilities" className="scroll-mt-24">
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="The cluster"
              title="Complementary sites, one European capability."
              intro="Each site contributes unique capabilities, ranging from propulsion and suspension systems to vacuum infrastructure and switching mechanisms. The cluster accelerates innovation, improves coordination and lays the foundation for a pan-European approach."
            />
          </Reveal>

          <div className="mt-16 space-y-6">
            {facilities.map((facility, i) => (
              <Reveal key={facility.name} delay={i * 0.1}>
                <Magnetic strength={0.06} max={8}>
                  <article className="rounded-[2rem] border border-border bg-surface/50 p-8 transition-all duration-500 hover:border-primary/50 lg:p-12">
                    <div className="flex flex-wrap items-start justify-between gap-6">
                      <div>
                        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                          {facility.location}
                        </p>
                        <h3 className="mt-3 text-3xl font-semibold lg:text-4xl">{facility.name}</h3>
                      </div>
                      <a
                        href={facility.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-primary-glow transition-colors hover:text-foreground"
                      >
                        Visit site
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </a>
                    </div>
                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
                      {facility.focus}
                    </p>
                    {facilityHighlights(facility.id).length ? (
                      <dl className="mt-8 grid max-w-2xl grid-cols-1 gap-6 border-t border-border pt-6 sm:grid-cols-3">
                        {facilityHighlights(facility.id).map((h) => (
                          <div key={h.label}>
                            <dt className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                              {h.label}
                            </dt>
                            <dd className="mt-1 text-lg font-semibold">{h.value}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}
                    {facilitySpecs.find((f) => f.id === facility.id)?.approval === "awaiting" ? (
                      <p className="mt-6 text-xs text-muted-foreground">
                        Figures shown are awaiting final confirmation by the operator.
                      </p>
                    ) : null}
                    <ul className="mt-8 flex flex-wrap gap-3">
                      {facility.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="rounded-full border border-border bg-background/60 px-4 py-2 text-xs tracking-wide text-muted-foreground"
                        >
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Magnetic>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FacilityExplorer />

      <section id="campaign" className="scroll-mt-24 border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="Plan a campaign"
              title="From test question to test track."
              intro="The programme is the single entry point for the cluster. Conditions are always agreed with the facility operator."
            />
          </Reveal>
          <ol className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              [
                "Describe the test need",
                "Say what you want to validate: a vehicle, a component, tube material, vacuum operation or switching.",
              ],
              [
                "Find the right site",
                "The programme helps match your need to a facility and partners, using the comparison above.",
              ],
              [
                "Agree conditions with the operator",
                "At the European Hyperloop Center, for example, external vehicles are accepted after a compliance check and the safety procedure depends on the campaign.",
              ],
            ].map(([title, text], i) => (
              <Reveal key={title} delay={i * 0.1}>
                <li className="h-full rounded-[2rem] border border-border bg-surface/50 p-8">
                  <span className="text-sm font-semibold text-primary-glow">0{i + 1}</span>
                  <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-[1400px] px-6 py-28 text-center lg:px-10 lg:py-36">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-4xl leading-[1.05] font-semibold sm:text-5xl">
              Planning a test campaign?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              The programme helps developers and research groups find the right facility and the
              right partners for their next validation step. Data last updated{" "}
              {FACILITY_DATA_UPDATED}.
            </p>
            <div className="mt-10 flex justify-center">
              <CtaButton to="/contact">Talk to the programme</CtaButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
