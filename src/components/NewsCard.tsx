import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { NewsItem } from "../data/site";

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link
      to="/news/$slug"
      params={{ slug: item.slug }}
      className="group flex h-full flex-col justify-between rounded-3xl border border-border bg-surface/50 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:bg-surface"
    >
      <div>
        <div className="flex items-center justify-between gap-4 text-xs tracking-[0.18em] text-muted-foreground uppercase">
          <span>{item.category}</span>
          <span>{item.date}</span>
        </div>
        <h3 className="mt-6 text-2xl leading-snug font-semibold">{item.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.excerpt}</p>
      </div>
      <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-glow">
        Read more
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </span>
    </Link>
  );
}
