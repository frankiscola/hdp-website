import { createFileRoute } from "@tanstack/react-router";
import { absoluteUrl } from "../lib/seo";
import { ArrowUpRight, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import tubeLandscape from "../assets/tube-landscape.jpg";
import tubeLandscapeLight from "../assets/tube-landscape-light.jpg";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/ui-kit";
import { cn } from "../lib/utils";
import { portalDocuments, portalTags, type PortalCategory } from "../data/portal";

export const Route = createFileRoute("/hyperloop-portal")({
  head: () => ({
    meta: [
      { title: "Hyperloop Portal – Hyperloop Development Program" },
      {
        name: "description",
        content:
          "A searchable repository of hyperloop knowledge: research, company publications, EU-funded project outputs and student team papers, filterable by topic and year.",
      },
      { property: "og:title", content: "Hyperloop Portal – Hyperloop Development Program" },
      {
        property: "og:description",
        content: "The growing repository of hyperloop research, company and student team knowledge.",
      },
      { property: "og:url", content: absoluteUrl("/hyperloop-portal") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/hyperloop-portal") }],
  }),
  component: HyperloopPortal,
});

const categories: (PortalCategory | "All")[] = [
  "All",
  "Research",
  "Companies",
  "Projects",
  "Student Teams",
];

function HyperloopPortal() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PortalCategory | "All">("All");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [year, setYear] = useState<string>("All");

  const years = useMemo(() => {
    const set = new Set(portalDocuments.map((d) => d.year));
    return ["All", ...Array.from(set).sort((a, b) => Number(b) - Number(a))];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return portalDocuments.filter((doc) => {
      if (category !== "All" && doc.category !== category) return false;
      if (year !== "All" && doc.year !== year) return false;
      if (activeTags.length > 0 && !activeTags.some((t) => doc.tags.includes(t))) return false;
      if (q && !doc.title.toLowerCase().includes(q) && !doc.abstract.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [query, category, year, activeTags]);

  function toggleTag(tag: string) {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  function clearFilters() {
    setQuery("");
    setCategory("All");
    setActiveTags([]);
    setYear("All");
  }

  const hasActiveFilters = query || category !== "All" || activeTags.length > 0 || year !== "All";

  return (
    <>
      <PageHero
        eyebrow="Hub"
        title="Hyperloop Portal."
        intro="One growing repository for hyperloop knowledge — research from the programme, publications from companies and EU-funded projects, and papers from student teams. Search, filter, and find what you need."
        image={tubeLandscape}
        imageLight={tubeLandscapeLight}
        imageAlt="Hyperloop tube stretching across a landscape"
        priority
      />

      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="Search the repository"
              title="Find what you're looking for."
              intro="Search by title or abstract, or narrow down by category, topic and year."
            />
          </Reveal>

          {/* Search bar */}
          <Reveal delay={0.08}>
            <div className="relative mt-10 max-w-xl">
              <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title or abstract…"
                className="w-full rounded-full border border-border bg-surface/50 py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
              />
            </div>
          </Reveal>

          {/* Category pills */}
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300",
                    category === c
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-surface/40 text-muted-foreground hover:text-foreground",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Tag chips + year select */}
          <Reveal delay={0.12}>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="rounded-full border border-border bg-surface/40 px-4 py-2 text-sm text-muted-foreground focus:border-primary/50 focus:outline-none"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y === "All" ? "All years" : y}
                  </option>
                ))}
              </select>
              <span className="h-5 w-px bg-border" />
              {portalTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors duration-300",
                    activeTags.includes(tag)
                      ? "border-primary-glow bg-primary/15 text-primary-glow"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  {tag}
                </button>
              ))}
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear filters
                </button>
              ) : null}
            </div>
          </Reveal>

          {/* Results */}
          <div className="mt-14">
            <p className="text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "document" : "documents"}
            </p>

            {filtered.length === 0 ? (
              <div className="mt-8 rounded-3xl border border-border bg-surface/40 p-10 text-center">
                <p className="text-sm text-muted-foreground">
                  {category !== "All" && category !== "Research"
                    ? `The ${category} category is still being populated — check back soon.`
                    : "No documents match these filters. Try clearing some."}
                </p>
              </div>
            ) : (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((doc) => (
                  <a
                    key={doc.href}
                    href={doc.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-full flex-col justify-between rounded-3xl border border-border bg-surface/50 p-7 transition-all duration-300 hover:border-primary/50 hover:bg-surface"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 text-xs tracking-[0.12em] text-muted-foreground uppercase">
                        <span>{doc.category}</span>
                        <span>{doc.year}</span>
                      </div>
                      <h3 className="mt-4 text-base leading-snug font-semibold">{doc.title}</h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {doc.abstract}
                      </p>
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      {doc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                      <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
