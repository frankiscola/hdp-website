import { Link } from "@tanstack/react-router";
import { navItems } from "../data/site";
import { logoHdpUrl } from "../data/logo";


export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div>
          <img
            src={logoHdpUrl}
            alt="Hyperloop Development Program"
            className="h-12 w-auto invert md:h-14"
            width={1500}
            height={512}
            loading="lazy"
          />


          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">

            A public-private partnership of more than 25 organizations across Europe, developing
            hyperloop as a safe, energy-efficient and commercially viable mode of high-speed
            transportation.
          </p>
        </div>

        <div>
          <p className="eyebrow">Navigate</p>
          <ul className="mt-5 space-y-3">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Test cluster</p>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>
              <a
                href="https://hyperloopcenter.eu/"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground"
              >
                European Hyperloop Center
              </a>
            </li>
            <li>
              <a
                href="https://eurotube.org/"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground"
              >
                EuroTube DemoTube
              </a>
            </li>
            <li>
              <a
                href="https://iht-emden.de/"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground"
              >
                goTube — IHT Emden
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px] flex-col gap-2 border-t border-border px-6 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p>© {new Date().getFullYear()} Hyperloop Development Program Foundation</p>
        <p>Veendam · Rotterdam · Europe</p>
      </div>
    </footer>
  );
}
