import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  image: string;
  /** Light-theme counterpart of `image`. Optional so pages without one yet
   *  keep working — they fall back to the dark photo forced into the
   *  dark-theme palette (the old behavior), rather than breaking. */
  imageLight?: string;
  imageAlt: string;
  priority?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageLight,
  imageAlt,
  priority,
}: PageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[52vh] items-end overflow-hidden lg:min-h-[56vh]"
    >
      <div className={imageLight ? "absolute inset-0 hidden dark:block" : "contents"}>
        <motion.img
          src={image}
          alt={imageAlt}
          loading={priority ? "eager" : "lazy"}
          style={reduce ? {} : { y, scale }}
          className={
            imageLight
              ? "h-full w-full object-cover"
              : "absolute inset-0 h-full w-full object-cover"
          }
        />
        <div className="veil absolute inset-0" />
      </div>
      {imageLight ? (
        <div className="absolute inset-0 block dark:hidden">
          <motion.img
            src={imageLight}
            alt={imageAlt}
            loading={priority ? "eager" : "lazy"}
            style={reduce ? {} : { y, scale }}
            className="h-full w-full object-cover"
          />
          <div className="veil-light-bottom absolute inset-0" />
        </div>
      ) : null}
      <div
        className={
          imageLight
            ? "relative mx-auto w-full max-w-[1400px] px-6 pb-14 lg:px-10 lg:pb-20"
            : "dark relative mx-auto w-full max-w-[1400px] px-6 pb-14 text-foreground lg:px-10 lg:pb-20"
        }
      >
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          className="mt-5 max-w-4xl text-4xl leading-[1.02] font-semibold sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h1>
        {intro ? (
          <motion.p
            className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {intro}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}
