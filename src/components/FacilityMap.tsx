import { EUROPE_MAP, type MapView } from "../data/europe-map";
import {
  facilityCoordinates,
  facilitySpecs,
  tumDemonstrator,
  type FacilityId,
} from "../data/facility-specs";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./ui-kit";

/** Mercator projection with the per-view scale and translate stored in europe-map.ts. */
function project(view: MapView, lat: number, lng: number) {
  return {
    x: view.tx + view.scale * ((lng * Math.PI) / 180),
    y: view.ty - view.scale * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)),
  };
}

/** Straight-line distance in km (haversine). */
function distanceKm(a: FacilityId, b: FacilityId) {
  const p = facilityCoordinates[a];
  const q = facilityCoordinates[b];
  const rad = (d: number) => (d * Math.PI) / 180;
  const h =
    Math.sin(rad(q.lat - p.lat) / 2) ** 2 +
    Math.cos(rad(p.lat)) * Math.cos(rad(q.lat)) * Math.sin(rad(q.lng - p.lng) / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

const IDS: FacilityId[] = ["ehc", "gotube", "demotube"];

const halo = "fill-primary/25 stroke-primary/0 transition-colors group-hover:fill-primary/45";
const labelStyle = { paintOrder: "stroke", strokeLinejoin: "round" } as const;

function Marker({ view, id, r }: { view: MapView; id: FacilityId; r: number }) {
  const c = facilityCoordinates[id];
  const spec = facilitySpecs.find((f) => f.id === id);
  const { x, y } = project(view, c.lat, c.lng);
  return (
    <a
      href={`#site-${id}`}
      className="group outline-none"
      aria-label={`${spec?.name ?? id}, ${c.city}, ${c.country}: jump to details`}
    >
      <title>{`${spec?.name ?? id} – ${c.city}, ${c.country}`}</title>
      <circle cx={x} cy={y} r={r * 2.6} className={`${halo} group-focus-visible:stroke-primary`} />
      <circle cx={x} cy={y} r={r} className="fill-primary" />
    </a>
  );
}

function TumMarker({ view, r }: { view: MapView; r: number }) {
  const { x, y } = project(view, tumDemonstrator.lat, tumDemonstrator.lng);
  const text = `${tumDemonstrator.name} – ${tumDemonstrator.city}, ${tumDemonstrator.country} (vehicle demonstrator, opens TUM site)`;
  return (
    <a
      href={tumDemonstrator.href}
      target="_blank"
      rel="noreferrer"
      className="group outline-none"
      aria-label={text}
    >
      <title>{text}</title>
      <circle cx={x} cy={y} r={r * 2.6} className={`${halo} group-focus-visible:stroke-primary`} />
      <circle
        cx={x}
        cy={y}
        r={r}
        className="fill-background stroke-primary"
        strokeWidth={r * 0.45}
      />
    </a>
  );
}

function Label({
  x,
  y,
  side,
  title,
  sub,
  size,
}: {
  x: number;
  y: number;
  side: "left" | "right";
  title: string;
  sub?: string;
  size: number;
}) {
  const dx = side === "right" ? size * 1.1 : -size * 1.1;
  return (
    <text
      x={x + dx}
      y={y}
      textAnchor={side === "right" ? "start" : "end"}
      className="fill-foreground stroke-background"
      strokeWidth={size * 0.28}
      style={labelStyle}
      fontSize={size}
      fontWeight={600}
    >
      {title}
      {sub ? (
        <tspan x={x + dx} dy={size * 1.2} fontSize={size * 0.85} fontWeight={400}>
          {sub}
        </tspan>
      ) : null}
    </text>
  );
}

function Base({ view }: { view: MapView }) {
  return (
    <>
      <rect width={view.width} height={view.height} className="fill-background" />
      <path d={view.land} className="fill-surface-elevated" />
      <path d={view.borders} fill="none" className="stroke-border" strokeWidth={0.8} />
    </>
  );
}

const COUNTRY_LABELS: { name: string; lat: number; lng: number }[] = [
  { name: "NETHERLANDS", lat: 52.0, lng: 5.2 },
  { name: "GERMANY", lat: 50.9, lng: 9.8 },
  { name: "BELGIUM", lat: 50.55, lng: 4.55 },
  { name: "FRANCE", lat: 48.3, lng: 5.0 },
  { name: "SWITZERLAND", lat: 46.55, lng: 8.1 },
];

export function FacilityMap() {
  const { overview, detail } = EUROPE_MAP;

  // Where the close-up sits on the Europe map.
  const [w, s, e, n] = detail.bounds;
  const a = project(overview, n, w);
  const b = project(overview, s, e);

  const veendam = project(overview, facilityCoordinates.ehc.lat, facilityCoordinates.ehc.lng);
  const emden = project(overview, facilityCoordinates.gotube.lat, facilityCoordinates.gotube.lng);
  const pairX = (veendam.x + emden.x) / 2;
  const pairY = (veendam.y + emden.y) / 2;
  const tumOverview = project(overview, tumDemonstrator.lat, tumDemonstrator.lng);
  const tumDetail = project(detail, tumDemonstrator.lat, tumDemonstrator.lng);
  const zurich = project(
    overview,
    facilityCoordinates.demotube.lat,
    facilityCoordinates.demotube.lng,
  );

  const near = Math.round(distanceKm("ehc", "gotube") / 5) * 5;
  const far = Math.round(distanceKm("ehc", "demotube") / 10) * 10;

  return (
    <section id="map" className="scroll-mt-24">
      <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
        <Reveal>
          <SectionHeading
            eyebrow="Locations"
            title="Test sites across three countries."
            intro="The three test facilities are in the Netherlands, Germany and Switzerland. The TUM Hyperloop Demonstrator near Munich is shown separately, as a vehicle demonstrator. Select a site on the map for more."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
            <figure className="overflow-hidden rounded-[2rem] border border-border">
              <svg
                viewBox={`0 0 ${overview.width} ${overview.height}`}
                className="block h-auto w-full"
                role="group"
                aria-label="Map of Europe with the three test facilities"
              >
                <Base view={overview} />
                <rect
                  x={a.x}
                  y={a.y}
                  width={b.x - a.x}
                  height={b.y - a.y}
                  fill="none"
                  strokeDasharray="5 4"
                  className="stroke-muted-foreground"
                  strokeWidth={1}
                />
                <text
                  x={b.x + 8}
                  y={a.y + 14}
                  fontSize={13}
                  className="fill-muted-foreground"
                  letterSpacing="0.12em"
                >
                  CLOSE-UP
                </text>
                {IDS.map((id) => (
                  <Marker key={id} view={overview} id={id} r={5} />
                ))}
                <Label x={pairX} y={pairY + 4} side="left" title="Veendam · Emden" size={16} />
                <Label x={zurich.x} y={zurich.y + 5} side="left" title="Dübendorf" size={16} />
                <TumMarker view={overview} r={5} />
                <Label
                  x={tumOverview.x}
                  y={tumOverview.y + 5}
                  side="right"
                  title="Ottobrunn"
                  size={16}
                />
              </svg>
            </figure>

            <figure className="overflow-hidden rounded-[2rem] border border-border">
              <svg
                viewBox={`0 0 ${detail.width} ${detail.height}`}
                className="block h-auto w-full"
                role="group"
                aria-label="Close-up map of the Netherlands, Germany and Switzerland"
              >
                <Base view={detail} />
                {COUNTRY_LABELS.map((c) => {
                  const p = project(detail, c.lat, c.lng);
                  return (
                    <text
                      key={c.name}
                      x={p.x}
                      y={p.y}
                      textAnchor="middle"
                      fontSize={12}
                      letterSpacing="0.22em"
                      className="fill-muted-foreground"
                      opacity={0.7}
                    >
                      {c.name}
                    </text>
                  );
                })}
                {IDS.map((id) => (
                  <Marker key={id} view={detail} id={id} r={7} />
                ))}
                <TumMarker view={detail} r={7} />
                <Label
                  x={tumDetail.x}
                  y={tumDetail.y + 6}
                  side="left"
                  title={tumDemonstrator.shortName}
                  sub={tumDemonstrator.cityShort}
                  size={17}
                />
                {IDS.map((id) => {
                  const c = facilityCoordinates[id];
                  const p = project(detail, c.lat, c.lng);
                  const spec = facilitySpecs.find((f) => f.id === id);
                  return (
                    <Label
                      key={id}
                      x={p.x}
                      y={p.y + (id === "ehc" ? 10 : id === "gotube" ? -4 : 5)}
                      side={id === "ehc" ? "left" : "right"}
                      title={spec?.shortName ?? id}
                      sub={c.city}
                      size={17}
                    />
                  );
                })}
              </svg>
            </figure>
          </div>
        </Reveal>

        <ul
          aria-label="Map legend"
          className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground"
        >
          <li className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-primary" aria-hidden="true" />
            Test infrastructure
          </li>
          <li className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-full border-2 border-primary bg-background"
              aria-hidden="true"
            />
            Vehicle demonstrator
          </li>
        </ul>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {IDS.map((id) => {
            const c = facilityCoordinates[id];
            const spec = facilitySpecs.find((f) => f.id === id);
            return (
              <li key={id}>
                <a
                  href={`#site-${id}`}
                  className="block rounded-2xl border border-border bg-surface/50 p-5 transition-colors hover:border-primary/50"
                >
                  <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    {c.city}, {c.country}
                  </p>
                  <p className="mt-2 font-semibold">{spec?.name}</p>
                </a>
              </li>
            );
          })}
          <li>
            <a
              href={tumDemonstrator.href}
              target="_blank"
              rel="noreferrer"
              className="block h-full rounded-2xl border border-dashed border-border bg-surface/30 p-5 transition-colors hover:border-primary/50"
            >
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                {tumDemonstrator.city}, {tumDemonstrator.country}
              </p>
              <p className="mt-2 font-semibold">{tumDemonstrator.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">Vehicle demonstrator</p>
            </a>
          </li>
        </ul>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Veendam and Emden are about {near} km apart in a straight line, on either side of the
          Dutch–German border. Dübendorf lies about {far} km to the south, and the TUM demonstrator
          is near Munich. Locations are shown at city level. Map data: Natural Earth.
        </p>
      </div>
    </section>
  );
}
