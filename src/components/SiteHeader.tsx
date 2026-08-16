import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "../data/site";
import { logoHdpUrl } from "../data/logo";
import { ThemeToggle } from "./ThemeToggle";

import { cn } from "../lib/utils";

export function SiteHeader() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileGroupOpen, setMobileGroupOpen] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setCondensed(latest > 24);
  });

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        condensed && "border-b border-border bg-background/80 backdrop-blur-xl",
      )}
    >
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
          aria-label="Hyperloop Development Program – home"
        >
          <img
            src={logoHdpUrl}
            alt="Hyperloop Development Program"
            className={cn(
              "h-10 w-auto transition-[filter,transform] duration-500 group-hover:scale-[1.02] md:h-12",
              // Not condensed: header floats transparently over the permanently-dark
              // hero photo, so the logo must stay white no matter the site theme.
              // Condensed: header sits on the theme-aware background, so the logo
              // switches to its native navy/indigo mark in light mode and stays
              // white in dark mode for reliable contrast either way.
              !condensed && "brightness-0 invert",
              condensed && "dark:brightness-0 dark:invert",
            )}
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
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="group/nav relative">
                  <button
                    type="button"
                    className={cn(
                      "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                      item.children.some((c) => c.to === pathname) &&
                        "bg-secondary/70 text-foreground",
                    )}
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover/nav:rotate-180" />
                  </button>
                  <div className="invisible absolute top-full left-0 pt-2 opacity-0 transition-all duration-200 group-hover/nav:visible group-hover/nav:opacity-100">
                    <div className="surface-glass min-w-[220px] rounded-2xl border border-border p-2 shadow-xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.to + (child.hash ?? "")}
                          to={child.to}
                          {...(child.hash ? { hash: child.hash } : {})}
                          className="block rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground"
                          activeProps={{ className: "text-foreground bg-secondary/70" }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground bg-secondary/70" }}
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle
            className={cn(
              "hidden h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors duration-300 hover:text-foreground lg:flex",
              condensed ? "surface-glass" : "hover:bg-foreground/10",
            )}
          />

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
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 z-40 flex flex-col justify-center gap-2 overflow-y-auto bg-background/95 px-8 py-24 backdrop-blur-xl lg:hidden"
          >
            {navItems.map((item, i) =>
              item.children ? (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                  className="border-b border-border"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setMobileGroupOpen((v) => (v === item.label ? null : item.label))
                    }
                    className="font-display flex w-full items-center justify-between py-4 text-2xl font-semibold"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform duration-300",
                        mobileGroupOpen === item.label && "rotate-180",
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileGroupOpen === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-1 pb-4 pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.to + (child.hash ?? "")}
                              to={child.to}
                              {...(child.hash ? { hash: child.hash } : {})}
                              onClick={() => setOpen(false)}
                              className="py-2 text-lg text-muted-foreground transition-colors hover:text-foreground"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
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
              ),
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * navItems.length, duration: 0.4 }}
              className="flex items-center justify-between pt-6"
            >
              <span className="text-sm font-medium text-muted-foreground">Appearance</span>
              <ThemeToggle className="surface-glass flex h-11 w-11 items-center justify-center rounded-full text-foreground" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
