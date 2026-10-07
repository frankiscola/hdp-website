import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Loader2, Trash2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import {
  checkIsAdmin,
  createCompany,
  deleteCompany,
  fetchAllCompanies,
  fetchAllProfiles,
  fetchReviewHistory,
  reviewProfile,
  signInCompany,
  signOutCompany,
  updateCompany,
  type Company,
  type CompanyInput,
  type CompanyProfile,
  type ReviewEntry,
} from "../data/companies";
import { supabase } from "../lib/supabase";
import { cn } from "../lib/utils";

// Not linked from the public nav on purpose. Access is gated twice: once by
// requiring a signed-in Supabase account, and again by Row Level Security,
// which only returns admin-only data (all profiles, all companies, the
// review history) to accounts listed in admin_users. A curious visitor who
// finds this URL but isn't an admin sees only a "not authorized" message —
// every query behind it comes back empty regardless of what the page does.
export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin – Hyperloop Development Program" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminPage,
});

type ViewState = "loading" | "signed-out" | "not-admin" | "admin";

function AdminPage() {
  const [view, setView] = useState<ViewState>("loading");

  async function refresh() {
    if (!supabase) {
      setView("signed-out");
      return;
    }
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) {
      setView("signed-out");
      return;
    }
    setView((await checkIsAdmin()) ? "admin" : "not-admin");
  }

  useEffect(() => {
    refresh();
    if (!supabase) return;
    const { data: sub } = supabase.auth.onAuthStateChange(() => refresh());
    return () => sub.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-6 py-24 lg:px-10 lg:py-32">
      <h1 className="text-3xl font-semibold">HDP admin</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Review HyperHub company sign-ups and manage the sponsors, careers & thesis directory.
      </p>

      <div className="mt-10">
        {view === "loading" && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
        {view === "signed-out" && <AdminSignIn onDone={refresh} />}
        {view === "not-admin" && <NotAdmin />}
        {view === "admin" && <AdminDashboard />}
      </div>
    </div>
  );
}

function AdminSignIn({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const result = await signInCompany({ email, password });
    setSubmitting(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    onDone();
  }

  return (
    <div className="max-w-sm rounded-3xl border border-border bg-background/60 p-8">
      <h2 className="text-lg font-semibold">Admin sign in</h2>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        For HDP team members only. Admin accounts are created in the Supabase dashboard, not
        through this page.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </div>
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary-glow disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Please wait…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

function NotAdmin() {
  return (
    <div className="max-w-sm rounded-3xl border border-border bg-background/60 p-8">
      <h2 className="text-lg font-semibold">Not authorized</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        This account isn't set up as an HDP admin.
      </p>
      <button
        type="button"
        onClick={() => signOutCompany()}
        className="mt-6 text-sm font-semibold text-primary-glow hover:text-foreground"
      >
        Sign out
      </button>
    </div>
  );
}

type Tab = "pending" | "companies" | "history";

function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("pending");
  const [profiles, setProfiles] = useState<CompanyProfile[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [history, setHistory] = useState<ReviewEntry[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadAll() {
    setLoading(true);
    const [p, c, h] = await Promise.all([
      fetchAllProfiles(),
      fetchAllCompanies(),
      fetchReviewHistory(),
    ]);
    setProfiles(p);
    setCompanies(c);
    setHistory(h);
    setLoading(false);
  }

  useEffect(() => {
    loadAll();
  }, []);

  const pendingCount = profiles.filter((p) => p.status === "pending").length;

  async function handleReview(id: string, status: "approved" | "rejected") {
    await reviewProfile(id, status);
    loadAll();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <TabButton active={tab === "pending"} onClick={() => setTab("pending")}>
            Pending{pendingCount > 0 ? ` (${pendingCount})` : ""}
          </TabButton>
          <TabButton active={tab === "companies"} onClick={() => setTab("companies")}>
            Companies
          </TabButton>
          <TabButton active={tab === "history"} onClick={() => setTab("history")}>
            History
          </TabButton>
        </div>
        <button
          type="button"
          onClick={() => signOutCompany()}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Sign out
        </button>
      </div>

      <div className="mt-8">
        {loading && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
        {!loading && tab === "pending" && (
          <PendingList profiles={profiles} onReview={handleReview} />
        )}
        {!loading && tab === "companies" && (
          <CompaniesAdmin companies={companies} onChange={loadAll} />
        )}
        {!loading && tab === "history" && <HistoryList entries={history} />}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
        active
          ? "bg-primary text-primary-foreground"
          : "border border-border text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function StatusBadge({ status }: { status: CompanyProfile["status"] }) {
  const styles: Record<CompanyProfile["status"], string> = {
    pending: "border-amber-400/40 bg-amber-400/10 text-amber-400",
    approved: "border-primary/40 bg-primary/10 text-primary-glow",
    rejected: "border-destructive/40 bg-destructive/10 text-destructive",
  };
  return (
    <span
      className={cn(
        "rounded-full border px-3 py-1 text-[11px] font-medium tracking-[0.08em] uppercase",
        styles[status],
      )}
    >
      {status}
    </span>
  );
}

function PendingList({
  profiles,
  onReview,
}: {
  profiles: CompanyProfile[];
  onReview: (id: string, status: "approved" | "rejected") => void;
}) {
  const pending = profiles.filter((p) => p.status === "pending");
  const reviewed = profiles.filter((p) => p.status !== "pending");

  if (profiles.length === 0) {
    return <p className="text-sm text-muted-foreground">No sign-up requests yet.</p>;
  }

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
          Pending ({pending.length})
        </h3>
        {pending.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">Nothing to review.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {pending.map((p) => (
              <div
                key={p.id}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-background/60 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold">{p.companyName || "(no company name)"}</p>
                  <p className="text-sm text-muted-foreground">
                    {p.contactName} · {p.contactEmail}
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    Requested {new Date(p.requestedAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onReview(p.id, "approved")}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary-glow"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => onReview(p.id, "rejected")}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
                  >
                    <XCircle className="h-3.5 w-3.5" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
          Already reviewed
        </h3>
        {reviewed.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">None yet.</p>
        ) : (
          <div className="mt-4 space-y-2">
            {reviewed.map((p) => (
              <div
                key={p.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border/60 px-5 py-3 text-sm"
              >
                <span>
                  {p.companyName} <span className="text-muted-foreground">· {p.contactEmail}</span>
                </span>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const emptyForm: CompanyInput = {
  name: "",
  logoUrl: "",
  website: "",
  description: "",
  sponsorshipOffer: "",
  hiringInfo: "",
  thesisInfo: "",
  isPublished: true,
};

function CompaniesAdmin({
  companies,
  onChange,
}: {
  companies: Company[];
  onChange: () => void;
}) {
  const [editing, setEditing] = useState<Company | "new" | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {companies.length} {companies.length === 1 ? "company" : "companies"}
        </p>
        <button
          type="button"
          onClick={() => setEditing("new")}
          className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary-glow"
        >
          + Add company
        </button>
      </div>

      {editing && (
        <CompanyForm
          initial={editing === "new" ? null : editing}
          onCancel={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            onChange();
          }}
        />
      )}

      <div className="mt-6 space-y-3">
        {companies.map((c) => (
          <div
            key={c.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-background/60 p-5"
          >
            <div>
              <p className="font-semibold">{c.name}</p>
              <p className="text-xs text-muted-foreground">
                {c.isPublished ? "Published" : "Unpublished (hidden from directory)"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEditing(c)}
                className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (confirm(`Delete ${c.name}? This can't be undone.`)) {
                    await deleteCompany(c.id);
                    onChange();
                  }
                }}
                className="inline-flex items-center gap-1 rounded-full border border-destructive/40 px-4 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompanyForm({
  initial,
  onCancel,
  onSaved,
}: {
  initial: Company | null;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<CompanyInput>(
    initial
      ? {
          name: initial.name,
          logoUrl: initial.logoUrl ?? "",
          website: initial.website ?? "",
          description: initial.description ?? "",
          sponsorshipOffer: initial.sponsorshipOffer ?? "",
          hiringInfo: initial.hiringInfo ?? "",
          thesisInfo: initial.thesisInfo ?? "",
          isPublished: initial.isPublished ?? true,
        }
      : emptyForm,
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const result = initial ? await updateCompany(initial.id, form) : await createCompany(form);
    setSubmitting(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    onSaved();
  }

  function field(key: keyof CompanyInput, label: string, textarea = false) {
    const value = form[key];
    return (
      <div key={key}>
        <label className="text-xs tracking-[0.16em] text-muted-foreground uppercase">{label}</label>
        {textarea ? (
          <textarea
            rows={3}
            value={(value as string) ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
            className="mt-2 w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary"
          />
        ) : (
          <input
            type="text"
            value={(value as string) ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
            className="mt-2 w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary"
          />
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-4 rounded-3xl border border-border bg-background/60 p-6"
    >
      <h3 className="text-sm font-semibold">{initial ? `Edit ${initial.name}` : "New company"}</h3>
      {field("name", "Company name")}
      {field("logoUrl", "Logo URL")}
      {field("website", "Website")}
      {field("description", "Description", true)}
      {field("sponsorshipOffer", "Sponsorship offer", true)}
      {field("hiringInfo", "Careers & graduate programmes", true)}
      {field("thesisInfo", "Thesis & research projects", true)}
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.isPublished}
          onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))}
        />
        Published (visible to approved companies)
      </label>
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function HistoryList({ entries }: { entries: ReviewEntry[] }) {
  if (entries.length === 0) {
    return <p className="text-sm text-muted-foreground">No reviews yet.</p>;
  }
  return (
    <div className="space-y-2">
      {entries.map((e) => (
        <div
          key={e.id}
          className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border/60 px-5 py-3 text-sm"
        >
          <span>
            <span className="font-medium">{e.companyName}</span>{" "}
            <span className="text-muted-foreground">
              {e.oldStatus ?? "new"} → {e.newStatus}
              {e.reviewedByEmail ? ` by ${e.reviewedByEmail}` : ""}
            </span>
          </span>
          <span className="text-xs text-muted-foreground/70">
            {new Date(e.reviewedAt).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
