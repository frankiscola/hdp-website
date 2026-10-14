import { Check, CircleDashed, CircleDot, Lightbulb } from "lucide-react";
import { useMemo, useState } from "react";
import {
  FACILITY_DATA_UPDATED,
  SPEC_KEYS,
  capabilities,
  facilitySpecs,
  levelLabels,
  openResearchTopics,
  specLabels,
  type FacilityId,
  type Level,
} from "../data/facility-specs";
import { cn } from "../lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./ui-kit";

const PENDING = "To be confirmed";

function LevelIcon({ level, className }: { level: Level; className?: string }) {
  const base = cn("h-4 w-4", className);
  if (level === "available") return <Check className={base} aria-hidden="true" />;
  if (level === "possible") return <CircleDot className={base} aria-hidden="true" />;
  return <CircleDashed className={base} aria-hidden="true" />;
}

const levelStyles: Record<Level, string> = {
  available: "border-primary/60 bg-primary/15 text-primary-glow",
  possible: "border-primary/40 bg-transparent text-primary-glow",
  unknown: "border-dashed border-border bg-transparent text-muted-foreground",
};

function AwaitingBadge() {
  return (
    <span className="mt-2 inline-block rounded-full border border-dashed border-border px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
      Awaiting operator confirmation
    </span>
  );
}

export function FacilityExplorer() {
  const [selected, setSelected] = useState<FacilityId[]>(facilitySpecs.map((f) => f.id));
  const [activeCell, setActiveCell] = useState<{ cap: string; fac: FacilityId } | null>(null);

  const shown = useMemo(() => facilitySpecs.filter((f) => selected.includes(f.id)), [selected]);

  function toggle(id: FacilityId) {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.length > 1 ? prev.filter((x) => x !== id) : prev;
      return facilitySpecs.map((f) => f.id).filter((x) => prev.includes(x) || x === id);
    });
  }

  const detail = useMemo(() => {
    if (!activeCell) return null;
    const cap = capabilities.find((c) => c.id === activeCell.cap);
    const fac = facilitySpecs.find((f) => f.id === activeCell.fac);
    if (!cap || !fac) return null;
    const cell = cap.cells[activeCell.fac];
    return { cap, fac, cell };
  }, [activeCell]);

  return (
    <>
      {/* ---------------------------------------------------------- Compare */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="Compare facilities"
              title="Side by side, on the same terms."
              intro="Pick the facilities you want to compare. Values come from the facility operators and are expressed in common units, so they can be read across."
            />
          </Reveal>

          <div
            className="mt-12 flex flex-wrap gap-3"
            role="group"
            aria-label="Facilities to compare"
          >
            {facilitySpecs.map((f) => {
              const on = selected.includes(f.id);
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(f.id)}
                  className={cn(
                    "rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                    on
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-surface/50 text-muted-foreground hover:text-foreground",
                  )}
                >
                  {f.shortName}
                </button>
              );
            })}
          </div>

          <div className="mt-8 overflow-x-auto rounded-[2rem] border border-border bg-surface/50">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Comparison of the selected European hyperloop test facilities
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th
                    scope="col"
                    className="w-48 px-6 py-5 text-xs tracking-[0.2em] text-muted-foreground uppercase"
                  >
                    Parameter
                  </th>
                  {shown.map((f) => (
                    <th key={f.id} scope="col" className="px-6 py-5 align-top">
                      <span className="block text-base font-semibold text-foreground">
                        {f.shortName}
                      </span>
                      {f.approval === "awaiting" ? <AwaitingBadge /> : null}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SPEC_KEYS.map((key) => (
                  <tr key={key} className="border-b border-border/70 last:border-b-0">
                    <th
                      scope="row"
                      className="px-6 py-4 align-top font-medium text-muted-foreground"
                    >
                      {specLabels[key]}
                    </th>
                    {shown.map((f) => {
                      const value = f.specs[key];
                      return (
                        <td key={f.id} className="px-6 py-4 align-top">
                          {value ? (
                            <span className="text-foreground">{value}</span>
                          ) : (
                            <span className="text-muted-foreground italic">{PENDING}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="px-6 py-4 align-top font-medium text-muted-foreground">
                    Good to know
                  </th>
                  {shown.map((f) => (
                    <td key={f.id} className="px-6 py-4 align-top">
                      {f.notes.length ? (
                        <ul className="space-y-2 text-muted-foreground">
                          {f.notes.map((n) => (
                            <li key={n}>{n}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-muted-foreground italic">{PENDING}</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Pressures in mbar (100 Pa = 1 mbar). Last updated {FACILITY_DATA_UPDATED}.
          </p>
        </div>
      </section>

      {/* ----------------------------------------------------------- Matrix */}
      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="Complementarity"
              title="What can be tested where."
              intro="Select a cell for details. Open circles mean the capability has not been confirmed yet by the operator."
            />
          </Reveal>

          <div className="mt-12 overflow-x-auto rounded-[2rem] border border-border bg-background/60">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <caption className="sr-only">Test capabilities by facility</caption>
              <thead>
                <tr className="border-b border-border">
                  <th
                    scope="col"
                    className="px-6 py-5 text-xs tracking-[0.2em] text-muted-foreground uppercase"
                  >
                    Capability
                  </th>
                  {facilitySpecs.map((f) => (
                    <th key={f.id} scope="col" className="px-4 py-5 text-center font-semibold">
                      {f.shortName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {capabilities.map((cap) => (
                  <tr key={cap.id} className="border-b border-border/70 last:border-b-0">
                    <th scope="row" className="px-6 py-4 font-medium text-foreground">
                      {cap.label}
                    </th>
                    {facilitySpecs.map((f) => {
                      const cell = cap.cells[f.id];
                      const isActive = activeCell?.cap === cap.id && activeCell.fac === f.id;
                      return (
                        <td key={f.id} className="px-4 py-3 text-center">
                          <button
                            type="button"
                            aria-pressed={isActive}
                            aria-label={`${cap.label} at ${f.name}: ${levelLabels[cell.level]}`}
                            onClick={() =>
                              setActiveCell(isActive ? null : { cap: cap.id, fac: f.id })
                            }
                            className={cn(
                              "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                              levelStyles[cell.level],
                              isActive && "ring-2 ring-primary",
                            )}
                          >
                            <LevelIcon level={cell.level} />
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
            {(Object.keys(levelLabels) as Level[]).map((lvl) => (
              <li key={lvl} className="inline-flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex h-6 w-6 items-center justify-center rounded-full border",
                    levelStyles[lvl],
                  )}
                >
                  <LevelIcon level={lvl} className="h-3 w-3" />
                </span>
                {levelLabels[lvl]}
              </li>
            ))}
          </ul>

          <div
            aria-live="polite"
            className="mt-6 min-h-[5.5rem] rounded-[1.5rem] border border-border bg-surface/50 p-6"
          >
            {detail ? (
              <>
                <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  {detail.fac.name}
                </p>
                <p className="mt-2 font-semibold text-foreground">
                  {detail.cap.label}: {levelLabels[detail.cell.level]}
                </p>
                <p className="mt-1 text-muted-foreground">
                  {detail.cell.note ??
                    "No confirmed information yet. The operator has been asked to complete this."}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">
                Select a capability and a facility to see what it offers.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- Topics */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="Shared research agenda"
              title="Open topics for joint projects."
              intro="Research questions that no facility in the cluster has addressed yet, proposed by the operators as starting points for the shared agenda."
            />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {openResearchTopics.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.1}>
                <article className="h-full rounded-[2rem] border border-border bg-surface/50 p-8">
                  <Lightbulb className="h-6 w-6 text-primary-glow" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-semibold">{t.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{t.text}</p>
                  <p className="mt-5 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    Proposed by {t.proposedBy}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
