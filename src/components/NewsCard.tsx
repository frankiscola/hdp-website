import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { NewsItem } from "../data/site";
import { Magnetic } from "./Magnetic";

export function NewsCard({ item }: { item: NewsItem }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Magnetic>
      <Link
        to="/news/$slug"
        params={{ slug: item.slug }}
        className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface/50 transition-all duration-500 hover:border-primary/50 hover:bg-surface"
      >
        <div>
          {item.image ? (
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
              {!loaded && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-surface via-border/40 to-surface bg-[length:200%_200%]" />
              )}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          ) : null}
          <div className="p-8 pb-0">
            <div className="flex items-center justify-between gap-4 text-xs tracking-[0.18em] text-muted-foreground uppercase">
              <span>{item.category}</span>
              <span>{item.date}</span>
            </div>
            <h3 className="mt-6 text-2xl leading-snug font-semibold">{item.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.excerpt}</p>
          </div>
        </div>
        <span className="mt-8 inline-flex items-center gap-2 px-8 pb-8 text-sm font-semibold text-primary-glow">
          Read more
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </span>
      </Link>
    </Magnetic>
  );
}

