import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import testCenter from "../assets/test-center.jpg";
import testCenterLight from "../assets/test-center-light.jpg";
import { Magnetic } from "../components/Magnetic";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { CtaButton, SectionHeading } from "../components/ui-kit";
import { facilities } from "../data/site";

export const Route = createFileRoute("/testing-infrastructure")({
  head: () => ({
    meta: [
      { title: "EU Testing Infrastructure – hyperloop test cluster | HDP" },
      {
        name: "description",
        content:
          "The European hyperloop testing cluster: the European Hyperloop Center, EuroTube's DemoTube and the goTube of the Institute of Hyperloop Technology.",
      },
      { property: "og:title", content: "European hyperloop testing infrastructure" },
      {
        property: "og:description",
        content:
          "Three coordinated European test facilities covering propulsion, suspension, vacuum infrastructure and switching.",
      },
      { property: "og:url", content: "/testing-infrastructure" },
    ],
    links: [{ rel: "canonical", href: "/testing-infrastructure" }],
  }),
  component: TestingInfrastructure,
});

function TestingInfrastructure() {
  return (
    <>
      <PageHero
        eyebrow="EU testing infrastructure"
        title="Where hyperloop is proven at full scale."
        intro="The Hyperloop Testing Infrastructure Cluster brings together leading European test facilities, coordinated by the Hyperloop Development Program."
        image={testCenter}
        imageLight={testCenterLight}
        imageAlt="Large vacuum tube segments inside a European hyperloop test facility"
        priority
      />

      <section>
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

      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-[1400px] px-6 py-28 text-center lg:px-10 lg:py-36">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-4xl leading-[1.05] font-semibold sm:text-5xl">
              Planning a test campaign?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              The programme helps developers and research groups find the right facility and the
              right partners for their next validation step.
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
