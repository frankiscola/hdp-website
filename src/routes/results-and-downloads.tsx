import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, FileText, Newspaper, Presentation } from "lucide-react";
import tubeLandscape from "../assets/tube-landscape.jpg";
import { Magnetic } from "../components/Magnetic";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { CtaButton, SectionHeading } from "../components/ui-kit";

export const Route = createFileRoute("/results-and-downloads")({
  head: () => ({
    meta: [
      { title: "Results and Downloads – Hyperloop Development Program" },
      {
        name: "description",
        content:
          "Technical reports, feasibility studies and press materials from the Hyperloop Development Program, published here as they become available.",
      },
      {
        property: "og:title",
        content: "Results and Downloads – Hyperloop Development Program",
      },
      {
        property: "og:description",
        content: "Technical reports, studies and press materials from the programme.",
      },
      { property: "og:url", content: "/results-and-downloads" },
    ],
    links: [{ rel: "canonical", href: "/results-and-downloads" }],
  }),
  component: ResultsAndDownloads,
});

const categories = [
  {
    icon: FileText,
    title: "Technical reports & studies",
    text: "Feasibility studies, safety research and engineering findings from work carried out across the programme's Work Groups.",
  },
  {
    icon: Presentation,
    title: "Press kit",
    text: "Logos, imagery and boilerplate copy for journalists and partners covering the Hyperloop Development Program.",
  },
  {
    icon: Newspaper,
    title: "Partner publications",
    text: "Reports and publications co-authored with HDP partners, research institutions and public bodies.",
  },
];

function ResultsAndDownloads() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Results and Downloads."
        intro="As studies and full-scale tests at the European Hyperloop Center produce results, reports and downloadable materials will be published here."
        image={tubeLandscape}
        imageAlt="Hyperloop tube stretching across a landscape"
        priority
      />

      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading eyebrow="What to expect" title="What will be published here." />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {categories.map((category, i) => {
              const Icon = category.icon;
              return (
                <Reveal key={category.title} delay={i * 0.08}>
                  <Magnetic>
                    <div className="h-full rounded-3xl border border-border bg-surface/50 p-8 transition-all duration-500 hover:border-primary/50">
                      <Icon className="h-6 w-6 text-primary-glow" />
                      <h3 className="mt-5 text-lg font-semibold">{category.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {category.text}
                      </p>
                    </div>
                  </Magnetic>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.15}>
            <div className="mt-16 rounded-3xl border border-border bg-surface/30 p-8 text-center sm:p-12">
              <h3 className="text-xl font-semibold">Nothing published yet</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                The programme's first results are still in progress. In the meantime, follow the
                latest developments on the news page, or get in touch to request specific
                information.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <CtaButton to="/news">Read the latest news</CtaButton>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 rounded-full border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  Contact the team
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
