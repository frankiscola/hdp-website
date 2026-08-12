import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLink } from "../components/ui-kit";
import { Reveal } from "../components/Reveal";
import { NewsCard } from "../components/NewsCard";
import { news } from "../data/site";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const item = news.find((n) => n.slug === params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Not found – HDP" }, { name: "robots", content: "noindex" }],
      };
    }
    const { item } = loaderData;
    return {
      meta: [
        { title: `${item.title} – HDP` },
        { name: "description", content: item.excerpt },
        { property: "og:title", content: item.title },
        { property: "og:description", content: item.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/news/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/news/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: item.title,
            datePublished: item.date,
            description: item.excerpt,
          }),
        },
      ],
    };
  },
  component: NewsArticle,
});

function NewsArticle() {
  const { item } = Route.useLoaderData();
  const related = news.filter((n) => n.slug !== item.slug).slice(0, 3);

  return (
    <>
      <article>
        <div className="mx-auto max-w-3xl px-6 pt-40 pb-20 lg:pt-52">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4 text-xs tracking-[0.18em] text-muted-foreground uppercase">
              <span>{item.category}</span>
              <span>{item.date}</span>
            </div>
            <h1 className="mt-6 text-4xl leading-[1.08] font-semibold lg:text-6xl">{item.title}</h1>
          </Reveal>
          {item.image ? (
            <Reveal delay={0.08}>
              <div className="mt-10 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border bg-surface">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              </div>
            </Reveal>
          ) : null}
          <Reveal delay={0.12}>
            <div className="mt-12 space-y-6 text-lg leading-relaxed text-muted-foreground">
              {item.body.map((paragraph: string) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-14 border-t border-border pt-8">
              <ArrowLink to="/news">Back to all news</ArrowLink>
            </div>
          </Reveal>
        </div>
      </article>

      <section className="border-t border-border bg-surface/30">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <p className="eyebrow">More from the programme</p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.08}>
                <NewsCard item={r} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
