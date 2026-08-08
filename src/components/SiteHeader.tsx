import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "../data/site";
import { logoHdpUrl } from "../data/logo";

import { cn } from "../lib/utils";

export function SiteHeader() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setCondensed(latest > 24);
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto flex max-w-[1400px] items-center justify-between px-6 transition-all duration-500 lg:px-10",
          condensed ? "py-3" : "py-6",
        )}
      >
        <Link
          to="/"
          className="group flex items-center"
          onClick={() => setOpen(false)}
          aria-label="Hyperloop Development Program — home"
        >
          <img
            src={logoHdpUrl}
            alt="Hyperloop Development Program"
            className="h-10 w-auto transition-transform duration-500 group-hover:scale-[1.02] md:h-12"
            style={{ filter: "brightness(0) invert(1)" }}
            width={1500}
            height={512}
          />



        </Link>


        <nav className="hidden items-center gap-1 lg:flex">
          <div
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-500",
              condensed ? "surface-glass" : "bg-transparent",
            )}
          >
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground bg-secondary/70" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="surface-glass flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 z-40 flex flex-col justify-center gap-2 bg-background/95 px-8 backdrop-blur-xl lg:hidden"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.4 }}
              >
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="font-display block border-b border-border py-4 text-2xl font-semibold"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
