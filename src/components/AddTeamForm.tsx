import { motion } from "motion/react";
import { AlertTriangle, CheckCircle2, ImagePlus, Loader2, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import {
  FOCUS_AREA_OPTIONS,
  LOGO_ACCEPT,
  inspectLogo,
  submitTeamApplication,
} from "../data/team-applications";
import { notifyTeamApplication } from "../lib/team-application.server";
import { cn } from "../lib/utils";
import { Magnetic } from "./Magnetic";

const inputClass =
  "mt-3 w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary";
const labelClass = "text-xs tracking-[0.16em] text-muted-foreground uppercase";

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  hint,
  list,
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  list?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label htmlFor={`team-${name}`} className={labelClass}>
        {label}
        {required && <span className="text-primary-glow"> *</span>}
      </label>
      <input
        id={`team-${name}`}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        list={list}
        maxLength={maxLength}
        className={inputClass}
      />
      {hint && <p className="mt-2 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function SubHeading({ children }: { children: string }) {
  return (
    <h4 className="border-b border-border pb-3 text-sm font-semibold tracking-wide">{children}</h4>
  );
}

/**
 * One logo slot. The preview sits on a tile of the colour the logo is meant
 * for (white for the "light background" logo, navy for the "dark background"
 * one), so a mixed-up or solid-background file is obvious at a glance.
 */
function LogoDrop({
  kind,
  file,
  onChange,
}: {
  kind: "light" | "dark";
  file: File | null;
  onChange: (file: File | null) => void;
}) {
  const inputId = useId();
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const isLight = kind === "light";

  async function handle(next: File | null) {
    setError(null);
    setWarning(null);
    if (!next) {
      onChange(null);
      return;
    }
    setChecking(true);
    const result = await inspectLogo(next, kind);
    setChecking(false);
    if (!result.ok) {
      setError(result.error);
      onChange(null);
      return;
    }
    if (result.warning) setWarning(result.warning);
    onChange(next);
  }

  return (
    <div>
      <label htmlFor={inputId} className={labelClass}>
        {isLight ? "Logo for light backgrounds" : "Logo for dark backgrounds"}
        <span className="text-primary-glow"> *</span>
      </label>
      <p className="mt-2 text-xs text-muted-foreground">
        {isLight
          ? "Your dark-coloured logo, as it looks on white."
          : "Your white or light-coloured logo, as it looks on dark."}{" "}
        Transparent PNG, WebP or SVG, max 2 MB.
      </p>

      <label
        htmlFor={inputId}
        className={cn(
          "mt-3 flex h-40 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed p-4 transition-colors hover:border-primary",
          isLight ? "bg-white" : "bg-slate-900",
          error ? "border-destructive" : "border-border",
        )}
      >
        {preview ? (
          <img
            src={preview}
            alt={`${kind} logo preview`}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <span
            className={cn(
              "flex flex-col items-center gap-2 text-xs",
              isLight ? "text-slate-500" : "text-slate-400",
            )}
          >
            {checking ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <ImagePlus className="h-6 w-6" />
            )}
            {checking ? "Checking…" : "Click to choose a file"}
          </span>
        )}
      </label>
      <input
        id={inputId}
        type="file"
        accept={LOGO_ACCEPT}
        className="sr-only"
        onChange={(e) => handle(e.target.files?.[0] ?? null)}
      />

      {file && (
        <div className="mt-2 flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className="truncate">{file.name}</span>
          <button
            type="button"
            onClick={() => handle(null)}
            className="inline-flex items-center gap-1 hover:text-foreground"
          >
            <X className="h-3 w-3" /> Remove
          </button>
        </div>
      )}
      {error && (
        <p className="mt-2 text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
      {warning && (
        <p className="mt-2 flex items-start gap-1.5 text-xs text-amber-500" role="status">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {warning}
        </p>
      )}
    </div>
  );
}

export function AddTeamForm({ countries }: { countries: string[] }) {
  const [logoLight, setLogoLight] = useState<File | null>(null);
  const [logoDark, setLogoDark] = useState<File | null>(null);
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [seekingSponsors, setSeekingSponsors] = useState(false);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  function toggleArea(area: string) {
    setFocusAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area],
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Honeypot: bots fill every field, people never see this one.
    if (data.get("_honey")) return;

    if (!logoLight || !logoDark) {
      setError("Please upload both logos: one for light and one for dark backgrounds.");
      return;
    }
    const get = (k: string) => String(data.get(k) ?? "");

    setStatus("submitting");
    setError(null);
    const result = await submitTeamApplication({
      teamName: get("teamName"),
      university: get("university"),
      country: get("country"),
      city: get("city"),
      foundedYear: get("foundedYear"),
      website: get("website"),
      description,
      focusAreas,
      seekingSponsors,
      linkedin: get("linkedin"),
      instagram: get("instagram"),
      youtube: get("youtube"),
      contactName: get("contactName"),
      contactRole: get("contactRole"),
      contactEmail: get("contactEmail"),
      logoLight,
      logoDark,
    });

    if (!result.ok) {
      setError(result.error);
      setStatus("idle");
      return;
    }
    // Saved. The email heads-up is a courtesy, so its failure is ignored.
    notifyTeamApplication({
      data: {
        teamName: get("teamName"),
        university: get("university"),
        country: get("country"),
        contactName: get("contactName"),
        contactEmail: get("contactEmail"),
      },
    }).catch(() => undefined);
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-14 text-center"
        role="status"
      >
        <CheckCircle2 className="mx-auto h-10 w-10 text-primary-glow" />
        <h3 className="mt-5 text-2xl font-semibold">Thank you, your application is in.</h3>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
          The HDP team will review your details and get back to your reference contact by email.
          Once approved, your team appears in the HyperHub Portal.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <datalist id="team-countries">
        {countries.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>

      <section className="space-y-6">
        <SubHeading>Your team</SubHeading>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Team name" name="teamName" required maxLength={120} />
          <Field label="University" name="university" required maxLength={200} />
          <Field label="Country" name="country" required list="team-countries" maxLength={100} />
          <Field label="City" name="city" maxLength={100} />
          <Field label="Website" name="website" placeholder="yourteam.com" maxLength={300} />
          <Field label="Founded in" name="foundedYear" type="number" placeholder="2019" />
        </div>

        <div>
          <label htmlFor="team-description" className={labelClass}>
            Short description
          </label>
          <textarea
            id="team-description"
            rows={3}
            maxLength={600}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What are you building, and where are you at this season?"
            className={inputClass}
          />
          <p className="mt-2 text-right text-xs text-muted-foreground">{description.length}/600</p>
        </div>

        <div>
          <span className={labelClass}>Focus areas</span>
          <div className="mt-3 flex flex-wrap gap-2">
            {FOCUS_AREA_OPTIONS.map((area) => (
              <button
                key={area}
                type="button"
                aria-pressed={focusAreas.includes(area)}
                onClick={() => toggleArea(area)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs transition-colors",
                  focusAreas.includes(area)
                    ? "bg-primary font-semibold text-primary-foreground"
                    : "border border-border font-medium text-muted-foreground hover:text-foreground",
                )}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={seekingSponsors}
            onChange={(e) => setSeekingSponsors(e.target.checked)}
            className="mt-1 h-4 w-4 accent-primary"
          />
          <span>
            We are looking for sponsors
            <span className="block text-xs text-muted-foreground">
              Adds a “Seeking sponsors” badge and a link for companies to contact you.
            </span>
          </span>
        </label>
      </section>

      <section className="space-y-6">
        <SubHeading>Logos</SubHeading>
        <p className="text-xs leading-relaxed text-muted-foreground">
          We show the right version automatically in the site’s light and dark themes, so your logo
          is always readable. Both must have a transparent background.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <LogoDrop kind="light" file={logoLight} onChange={setLogoLight} />
          <LogoDrop kind="dark" file={logoDark} onChange={setLogoDark} />
        </div>
      </section>

      <section className="space-y-6">
        <SubHeading>Links</SubHeading>
        <div className="grid gap-6 sm:grid-cols-3">
          <Field
            label="LinkedIn"
            name="linkedin"
            placeholder="linkedin.com/company/…"
            maxLength={300}
          />
          <Field label="Instagram" name="instagram" placeholder="instagram.com/…" maxLength={300} />
          <Field label="YouTube" name="youtube" placeholder="youtube.com/@…" maxLength={300} />
        </div>
      </section>

      <section className="space-y-6">
        <SubHeading>Reference contact</SubHeading>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Who we should write to about this application. This stays private and is never shown on
          the site.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Full name" name="contactName" required maxLength={120} />
          <Field
            label="Role in the team"
            name="contactRole"
            placeholder="Team lead, PR…"
            maxLength={120}
          />
        </div>
        <Field label="Email" name="contactEmail" type="email" required maxLength={200} />
      </section>

      <label className="flex cursor-pointer items-start gap-3 text-sm">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 accent-primary"
        />
        <span className="text-muted-foreground">
          I confirm I’m authorised to submit this team and agree that HDP stores these details to
          review the application and publish the team profile, as described in the{" "}
          <a href="/privacy" className="font-semibold text-primary-glow hover:text-foreground">
            privacy policy
          </a>
          .
        </span>
      </label>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <Magnetic className="w-full" strength={0.2} max={10}>
        <button
          type="submit"
          disabled={status === "submitting" || !consent}
          className="w-full rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary-glow disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Submitting…" : "Submit application"}
        </button>
      </Magnetic>
    </form>
  );
}
