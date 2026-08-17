import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, FileDown } from "lucide-react";
import tubeLandscape from "../assets/tube-landscape.jpg";
import tubeLandscapeLight from "../assets/tube-landscape-light.jpg";
import { Magnetic } from "../components/Magnetic";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/ui-kit";
import { downloadDocuments, resultDocuments, type DocumentLink } from "../data/documents";

export const Route = createFileRoute("/results-and-downloads")({
  head: () => ({
    meta: [
      { title: "Results and Downloads – Hyperloop Development Program" },
      {
        name: "description",
        content:
          "Reports, position papers and feasibility studies published by the Hyperloop Development Program and its partners since 2020.",
      },
      {
        property: "og:title",
        content: "Results and Downloads – Hyperloop Development Program",
      },
      {
        property: "og:description",
        content:
          "Reports, position papers and feasibility studies published by the Hyperloop Development Program since 2020.",
      },
      { property: "og:url", content: "/results-and-downloads" },
    ],
    links: [{ rel: "canonical", href: "/results-and-downloads" }],
  }),
  component: ResultsAndDownloads,
});

function DocumentList({ documents }: { documents: DocumentLink[] }) {
  return (
    <ul className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-surface/50">
      {documents.map((doc) => (
        <li key={doc.href}>
          <a
            href={doc.href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between gap-6 px-6 py-5 transition-colors duration-300 hover:bg-surface sm:px-8"
          >
            <span className="flex items-center gap-4">
              <FileDown className="h-5 w-5 shrink-0 text-primary-glow" />
              <span className="text-sm leading-snug font-medium text-foreground sm:text-base">
                {doc.title}
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-3">
              <span className="text-xs tracking-[0.15em] text-muted-foreground uppercase">
                {doc.year}
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function ResultsAndDownloads() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Results and Downloads."
        intro="Reports, position papers and feasibility studies published by the HDP and its partners, from the programme's first studies in 2020 to today."
        image={tubeLandscape}
        imageLight={tubeLandscapeLight}
        imageAlt="Hyperloop tube stretching across a landscape"
        priority
      />

      <section>
        <div className="mx-auto max-w-[1000px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="Downloads"
              title="Position papers and reports."
              intro="An overview of documents, including research results and position papers, published by the HDP and its partners."
            />
          </Reveal>
          <div className="mt-12">
            <Magnetic strength={0.02} max={4}>
              <DocumentList documents={downloadDocuments} />
            </Magnetic>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-[1000px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="Results and reports"
              title={"Public results, 2020\u20112024."}
              intro={
                "Public results produced by HDP under the grant provided by the Dutch Ministry of Economic Affairs over the period 2020\u20112024."
              }
            />
          </Reveal>
          <div className="mt-12">
            <Magnetic strength={0.02} max={4}>
              <DocumentList documents={resultDocuments} />
            </Magnetic>
          </div>
        </div>
      </section>
    </>
  );
}
