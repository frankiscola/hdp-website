import { Check, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  approveTeamApplication,
  fetchTeamApplications,
  rejectTeamApplication,
  signedLogoUrl,
  type TeamApplication,
} from "../data/team-applications";
import { cn } from "../lib/utils";

function LogoPreview({ path, dark }: { path: string; dark: boolean }) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    signedLogoUrl(path).then((u) => alive && setUrl(u));
    return () => {
      alive = false;
    };
  }, [path]);
  return (
    <div
      className={cn(
        "flex h-20 w-32 items-center justify-center rounded-xl border border-border p-2",
        dark ? "bg-slate-900" : "bg-white",
      )}
    >
      {url ? (
        <img src={url} alt="" className="max-h-full max-w-full object-contain" />
      ) : (
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string | number | null }) {
  if (!value && value !== 0) return null;
  return (
    <p className="text-sm">
      <span className="text-muted-foreground">{label}: </span>
      {value}
    </p>
  );
}

function ApplicationCard({ app, onChanged }: { app: TeamApplication; onChanged: () => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rejecting, setRejecting] = useState(false);
  const [notes, setNotes] = useState("");
  const pending = app.status === "pending";

  async function approve() {
    setBusy(true);
    setError(null);
    const { error: err } = await approveTeamApplication(app);
    setBusy(false);
    if (err) setError(err);
    else onChanged();
  }

  async function reject() {
    setBusy(true);
    setError(null);
    const { error: err } = await rejectTeamApplication(app.id, notes);
    setBusy(false);
    if (err) setError(err);
    else onChanged();
  }

  return (
    <div className="rounded-3xl border border-border bg-background/60 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{app.teamName}</h3>
          <p className="text-sm text-muted-foreground">
            {app.university} · {[app.city, app.country].filter(Boolean).join(", ")}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Submitted {new Date(app.createdAt).toLocaleString()}
          </p>
        </div>
        <span
          className={cn(
            "rounded-full border px-3 py-1 text-[11px] font-medium tracking-[0.08em] uppercase",
            app.status === "pending" && "border-amber-500/40 text-amber-500",
            app.status === "approved" && "border-emerald-500/40 text-emerald-500",
            app.status === "rejected" && "border-destructive/40 text-destructive",
          )}
        >
          {app.status}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-4">
        <LogoPreview path={app.logoLightPath} dark={false} />
        <LogoPreview path={app.logoDarkPath} dark />
      </div>

      <div className="mt-5 grid gap-x-8 gap-y-1 sm:grid-cols-2">
        <Row
          label="Reference"
          value={`${app.contactName}${app.contactRole ? `, ${app.contactRole}` : ""}`}
        />
        <Row label="Email" value={app.contactEmail} />
        <Row label="Website" value={app.website} />
        <Row label="Founded" value={app.foundedYear} />
        <Row label="LinkedIn" value={app.linkedin} />
        <Row label="Instagram" value={app.instagram} />
        <Row label="YouTube" value={app.youtube} />
        <Row label="Seeking sponsors" value={app.seekingSponsors ? "Yes" : "No"} />
        <Row label="Focus" value={app.focusAreas.join(", ")} />
      </div>
      {app.description && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{app.description}</p>
      )}
      {app.reviewNotes && <Row label="Review notes" value={app.reviewNotes} />}

      {error && (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      {pending && !rejecting && (
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            disabled={busy}
            onClick={approve}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-glow disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            Approve & publish
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => setRejecting(true)}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-60"
          >
            <X className="h-4 w-4" /> Reject
          </button>
        </div>
      )}
      {pending && rejecting && (
        <div className="mt-6 space-y-3">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Internal note (optional), e.g. duplicate, not a student team…"
            className="w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary"
          />
          <div className="flex gap-3">
            <button
              type="button"
              disabled={busy}
              onClick={reject}
              className="rounded-full bg-destructive px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              Confirm reject
            </button>
            <button
              type="button"
              onClick={() => setRejecting(false)}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function TeamApplicationsAdmin({
  onCountChange,
}: {
  onCountChange?: (pending: number) => void;
}) {
  const [apps, setApps] = useState<TeamApplication[] | null>(null);

  async function load() {
    const list = await fetchTeamApplications();
    setApps(list);
    onCountChange?.(list.filter((a) => a.status === "pending").length);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!apps) return <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />;
  if (apps.length === 0) {
    return <p className="text-sm text-muted-foreground">No team applications yet.</p>;
  }
  return (
    <div className="space-y-5">
      {apps.map((a) => (
        <ApplicationCard key={a.id} app={a} onChanged={load} />
      ))}
    </div>
  );
}
