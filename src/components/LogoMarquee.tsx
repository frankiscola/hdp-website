import { partners } from "../data/site";

/** Infinite, seamless marquee of partner logos. Pauses on hover, static when reduced motion. */
export function LogoMarquee() {
  const row = [...partners, ...partners];

  return (
    <div className="logo-marquee group relative overflow-hidden py-2">
      <div className="logo-marquee-track flex w-max items-center gap-4">
        {row.map((partner, i) => (
          <div
            key={`${partner.name}-${i}`}
            className="logo-tile flex h-24 w-44 shrink-0 items-center justify-center rounded-xl px-6"
          >
            <img
              src={partner.logo}
              alt={`${partner.name} logo`}
              loading="lazy"
              className="max-h-12 w-auto max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
