import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { NewsItem } from "../data/site";

const CYCLE_MS = 4500;

export function LiveNewsBar({ items }: { items: NewsItem[] }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || items.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [reduce, items.length]);

  if (items.length === 0) return null;
  const active = items[index];

  return (
    <div className="surface-glass absolute inset-x-4 bottom-6 z-10 mx-auto flex max-w-3xl items-center gap-3 rounded-full py-2 pr-5 pl-2 sm:inset-x-0 sm:bottom-10 sm:gap-4">
      <Link
        to="/news/$slug"
        params={{ slug: active.slug }}
        className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-full border border-border"
        aria-label={`Read: ${active.title}`}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={active.slug}
            src={active.image}
            alt=""
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <span className="absolute -right-0.5 -bottom-0.5 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-glow opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-primary-glow ring-2 ring-surface" />
        </span>
      </Link>

      <span className="hidden flex-shrink-0 text-[11px] font-bold tracking-[0.18em] text-primary-glow uppercase sm:inline">
        Latest
      </span>
      <span className="hidden h-5 w-px flex-shrink-0 bg-border sm:inline-block" />

      <Link
        to="/news/$slug"
        params={{ slug: active.slug }}
        className="relative h-5 min-w-0 flex-1 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={active.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute inset-0 flex items-center gap-3 truncate text-sm font-medium"
          >
            <span className="hidden flex-shrink-0 text-[11px] font-bold tracking-[0.1em] text-primary-glow uppercase sm:inline">
              {active.category}
            </span>
            <span className="truncate">{active.title}</span>
          </motion.span>
        </AnimatePresence>
      </Link>

      <Link
        to="/news"
        className="flex flex-shrink-0 items-center gap-1.5 text-sm font-semibold whitespace-nowrap text-foreground transition-colors hover:text-primary-glow"
      >
        <span className="hidden sm:inline">All news</span>
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
