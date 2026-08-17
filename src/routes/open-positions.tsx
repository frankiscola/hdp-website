import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Download, Linkedin, Mail } from "lucide-react";
import tubeLandscape from "../assets/tube-landscape.jpg";
import tubeLandscapeLight from "../assets/tube-landscape-light.jpg";
import { Magnetic } from "../components/Magnetic";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/ui-kit";

export const Route = createFileRoute("/open-positions")({
  head: () => ({
    meta: [
      { title: "Open Positions – Hyperloop Development Program" },
      {
        name: "description",
        content:
          "The Hyperloop Development Program Foundation is expanding its team. Explore current open positions and get in touch about future opportunities.",
      },
      { property: "og:title", content: "Open Positions – Hyperloop Development Program" },
      {
        property: "og:description",
        content: "The HDP foundation is expanding its team — explore current open positions.",
      },
      { property: "og:url", content: "/open-positions" },
    ],
    links: [{ rel: "canonical", href: "/open-positions" }],
  }),
  component: OpenPositions,
});

const openRoles = [
  {
    title: "Operations & Finance Manager",
    type: "Part-time",
    pdfUrl: "https://www.hyperloopdevelopmentprogram.com/s/Operations-Finance-Manager.pdf",
  },
];

function OpenPositions() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Open Positions."
        intro="The Hyperloop Development Program Foundation (HDP) is expanding its team. As Europe's coordinating platform for hyperloop development, HDP seeks to fill open positions to strengthen its foundation and accelerate collaboration, innovation and visibility across the continent."
        image={tubeLandscape}
        imageLight={tubeLandscapeLight}
        imageAlt="Hyperloop tube stretching across a landscape"
        priority
      />

      <section>
        <div className="mx-auto max-w-[1000px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <p className="text-lg leading-relaxed text-muted-foreground">
              The team carries out HDP's mission, focusing on deepening EU research collaboration,
              enhancing external communication, securing new funding, and operations & finance.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mt-16">
              <SectionHeading eyebrow="Current openings" title="Open positions" align="left" />
            </div>
          </Reveal>

          <div className="mt-10 space-y-4">
            {openRoles.map((role, i) => (
              <Reveal key={role.title} delay={0.08 + i * 0.06}>
                <Magnetic>
                  <a
                    href={role.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-4 rounded-3xl border border-border bg-surface/50 p-8 transition-all duration-500 hover:border-primary/50 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <span className="text-xs font-semibold tracking-[0.16em] text-primary-glow uppercase">
                        {role.type}
                      </span>
                      <h3 className="mt-2 text-xl font-semibold">{role.title}</h3>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors group-hover:border-primary/50">
                      <Download className="h-4 w-4" />
                      Download job description
                    </span>
                  </a>
                </Magnetic>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.16}>
            <div className="mt-16 rounded-3xl border border-border bg-surface/30 p-8 sm:p-12">
              <h3 className="text-xl font-semibold">Questions about a role?</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                In case of interest or any inquiries about the roles, reach out directly:
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:klaus@hyperloopdevelopmentprogram.com"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50"
                >
                  <Mail className="h-4 w-4" />
                  klaus@hyperloopdevelopmentprogram.com
                </a>
                <a
                  href="mailto:general@hyperloopdevelopmentprogram.com"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50"
                >
                  <Mail className="h-4 w-4" />
                  general@hyperloopdevelopmentprogram.com
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
              <Linkedin className="h-4 w-4" />
              <a
                href="https://www.linkedin.com/company/european-hyperloop-center/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-4 hover:text-primary-glow"
              >
                Follow the European Hyperloop Center on LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
