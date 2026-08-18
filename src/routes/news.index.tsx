import { createFileRoute } from "@tanstack/react-router";
import { NewsCard } from "../components/NewsCard";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { news } from "../data/site";
import testCenter from "../assets/test-center.jpg";
import testCenterLight from "../assets/test-center-light.jpg";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "News – Hyperloop Development Program" },
      {
        name: "description",
        content:
          "Updates from the Hyperloop Development Program: technology milestones, European test infrastructure, policy work and programme news.",
      },
      { property: "og:title", content: "News from the Hyperloop Development Program" },
      {
        property: "og:description",
        content: "Technology milestones, test infrastructure updates and policy work from HDP.",
      },
      { property: "og:url", content: "/news" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: News,
});

function News() {
  const [lead, ...rest] = news;

  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="Latest from the programme."
        intro="Milestones, infrastructure updates and policy work from across the European hyperloop ecosystem."
        image={testCenter}
        imageLight={testCenterLight}
        imageAlt="Engineers inspecting hyperloop tube segments inside a test facility"
        priority
      />

      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          {lead ? (
            <Reveal>
              <div className="grid overflow-hidden rounded-[2rem] border border-border bg-surface/50 lg:grid-cols-2">
                {lead.image ? (
                  <div className="aspect-[16/10] w-full overflow-hidden bg-surface lg:aspect-auto">
                    <img src={lead.image} alt={lead.title} className="h-full w-full object-cover" />
                  </div>
                ) : null}
                <div className="p-8 lg:p-14">
                  <div className="flex flex-wrap items-center gap-4 text-xs tracking-[0.18em] text-muted-foreground uppercase">
                    <span>{lead.category}</span>
                    <span>{lead.date}</span>
                  </div>
                  <h2 className="mt-6 max-w-3xl text-3xl leading-tight font-semibold lg:text-5xl">
                    {lead.title}
                  </h2>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                    {lead.excerpt}
                  </p>
                  <div className="mt-10">
                    <a
                      href={`/news/${lead.slug}`}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-glow"
                    >
                      Read the story
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ) : null}

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.08}>
                <NewsCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
