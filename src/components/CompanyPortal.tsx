import { Link } from "@tanstack/react-router";
import { Briefcase, GraduationCap, Handshake, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  fetchCompanies,
  fetchMyProfile,
  signInCompany,
  signOutCompany,
  signUpCompany,
  type Company,
  type CompanyProfile,
} from "../data/companies";
import { supabase } from "../lib/supabase";
import { Magnetic } from "./Magnetic";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./ui-kit";

type ViewState = "loading" | "signed-out" | "pending" | "rejected" | "approved";

export type CompanyInterest = "sponsorship" | "careers" | "thesis";

/**
 * Shared access state for the gated company directory: who is signed in,
 * whether they are approved, and (only when approved) the companies list.
 * Row Level Security in Supabase is what really enforces the gate; this
 * only decides what to render.
 */
function useCompanyAccess() {
  const [view, setView] = useState<ViewState>("loading");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [profile, setProfile] = useState<CompanyProfile | null>(null);

  async function refresh() {
    const p = await fetchMyProfile();
    setProfile(p);
    if (!p) {
      setCompanies([]);
      setView("signed-out");
      return;
    }
    if (p.status === "approved") {
      setCompanies(await fetchCompanies());
      setView("approved");
      return;
    }
    setCompanies([]);
    setView(p.status === "rejected" ? "rejected" : "pending");
  }

  useEffect(() => {
    refresh();
    if (!supabase) return;
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      refresh();
    });
    return () => sub.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { view, companies, profile, refresh };
}

const INTEREST_COPY: Record<CompanyInterest, { empty: string; count: (n: number) => string }> = {
  sponsorship: {
    empty: "No companies are open to sponsorship requests yet — check back soon.",
    count: (n) => `${n} ${n === 1 ? "company" : "companies"} open to sponsoring student teams`,
  },
  careers: {
    empty: "No companies are taking career or graduate-programme requests yet — check back soon.",
    count: (n) =>
      `${n} ${n === 1 ? "company" : "companies"} open to career & graduate-programme requests`,
  },
  thesis: {
    empty: "No companies are offering academic thesis projects yet — check back soon.",
    count: (n) => `${n} ${n === 1 ? "company" : "companies"} offering academic thesis projects`,
  },
};

/**
 * Members-only list for one interest (sponsors / careers / academic thesis).
 * Signed-out and not-yet-approved visitors only ever see the sign-in / status
 * message, never the companies.
 */
export function CompanyInterestPanel({ interest }: { interest: CompanyInterest }) {
  const { view, companies, profile, refresh } = useCompanyAccess();

  if (view === "loading") {
    return <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />;
  }
  if (view === "signed-out") {
    return (
      <div>
        <p className="mb-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
          This list is for approved HDP partner companies only. Sign in or request access to see it.
        </p>
        <SignInUp onDone={refresh} />
      </div>
    );
  }
  if (view === "pending") {
    return (
      <StatusMessage
        title="Your request is under review."
        text={`Thanks${profile?.companyName ? `, ${profile.companyName}` : ""} — an HDP team member will approve your account shortly. You'll see this list here once approved.`}
      />
    );
  }
  if (view === "rejected") {
    return (
      <StatusMessage
        title="This account wasn't approved."
        text="If you think this is a mistake, get in touch and we'll take another look."
      />
    );
  }

  const list = companies.filter((c) =>
    interest === "sponsorship"
      ? c.offersSponsorship
      : interest === "careers"
        ? c.offersCareers
        : c.offersThesis,
  );

  return (
    <CompanyDirectory
      companies={list}
      onSignOut={refresh}
      interest={interest}
      countLabel={INTEREST_COPY[interest].count(list.length)}
      emptyLabel={INTEREST_COPY[interest].empty}
    />
  );
}

export function CompanyPortal() {
  const { view, companies, profile, refresh } = useCompanyAccess();

  return (
    <section id="companies" className="border-t border-border bg-surface/30 scroll-mt-24">
      <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
        <Reveal>
          <SectionHeading
            eyebrow="For companies"
            title="Companies behind hyperloop."
            intro="A directory for HDP partner companies only — sponsorship opportunities, graduate careers and master's/PhD thesis projects for student teams, and a place to offer all three. Sign up and we'll review your request."
          />
        </Reveal>

        <div className="mt-12">
          {view === "loading" && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
          {view === "signed-out" && <SignInUp onDone={refresh} />}
          {view === "pending" && (
            <StatusMessage
              title="Your request is under review."
              text={`Thanks${profile?.companyName ? `, ${profile.companyName}` : ""} — an HDP team member will approve your account shortly. You'll see the sponsor, careers & thesis directory here once approved.`}
            />
          )}
          {view === "rejected" && (
            <StatusMessage
              title="This account wasn't approved."
              text="If you think this is a mistake, get in touch and we'll take another look."
            />
          )}
          {view === "approved" && <CompanyDirectory companies={companies} onSignOut={refresh} />}
        </div>
      </div>
    </section>
  );
}

function StatusMessage({ title, text }: { title: string; text: string }) {
  return (
    <div className="max-w-xl rounded-3xl border border-border bg-background/60 p-8">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
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

function SignInUp({ onDone }: { onDone: () => void }) {
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    const result =
      mode === "signup"
        ? await signUpCompany({ email, password, companyName, contactName })
        : await signInCompany({ email, password });
    if (result.error) {
      setError(result.error);
      setStatus("idle");
      return;
    }
    if (mode === "signup") {
      setStatus("done");
      return;
    }
    onDone();
  }

  if (status === "done") {
    return (
      <StatusMessage
        title="Check your inbox."
        text="Confirm your email to activate your account, then sign in — we'll review your request once you're in."
      />
    );
  }

  return (
    <div className="max-w-xl rounded-3xl border border-border bg-background/60 p-8">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={
            mode === "signup"
              ? "rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
              : "rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
          }
        >
          Sign up
        </button>
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={
            mode === "signin"
              ? "rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
              : "rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
          }
        >
          Sign in
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        {mode === "signup" && (
          <>
            <LabeledInput
              label="Company name"
              value={companyName}
              onChange={setCompanyName}
              required
            />
            <LabeledInput
              label="Contact name"
              value={contactName}
              onChange={setContactName}
              required
            />
          </>
        )}
        <LabeledInput label="Email" type="email" value={email} onChange={setEmail} required />
        <LabeledInput
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          required
        />

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        <Magnetic className="w-full" strength={0.2} max={10}>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary-glow disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting"
              ? "Please wait…"
              : mode === "signup"
                ? "Request access"
                : "Sign in"}
          </button>
        </Magnetic>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Access is limited to companies partnering with HDP. After signing up, an HDP team member
          reviews and approves your account before you can see the directory.
        </p>
      </form>
    </div>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs tracking-[0.16em] text-muted-foreground uppercase">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-3 w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
      />
    </div>
  );
}

function CompanyDirectory({
  companies,
  onSignOut,
  interest,
  countLabel,
  emptyLabel,
}: {
  companies: Company[];
  onSignOut: () => void;
  /** When set, only that block (and its contact link) is shown on each card. */
  interest?: CompanyInterest;
  countLabel?: string;
  emptyLabel?: string;
}) {
  const showSponsorship = !interest || interest === "sponsorship";
  const showCareers = !interest || interest === "careers";
  const showThesis = !interest || interest === "thesis";
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {countLabel ??
            `${companies.length} ${companies.length === 1 ? "company" : "companies"} in the directory`}
        </p>
        <button
          type="button"
          onClick={() => signOutCompany().then(onSignOut)}
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Sign out
        </button>
      </div>

      {companies.length === 0 ? (
        <p className="mt-8 rounded-3xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          {emptyLabel ?? "No companies listed yet — check back soon."}
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((c) => (
            <Magnetic key={c.id}>
              <div className="flex h-full flex-col rounded-3xl border border-border bg-background/60 p-7">
                <div className="flex items-start gap-4">
                  {c.logoUrl ? (
                    <img
                      src={c.logoUrl}
                      alt={`${c.name} logo`}
                      loading="lazy"
                      className="h-12 w-12 rounded-xl bg-white object-contain p-1.5"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-sm font-semibold text-muted-foreground">
                      {c.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <h3 className="mt-1 text-lg leading-snug font-semibold">{c.name}</h3>
                </div>

                {c.description && (
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {c.description}
                  </p>
                )}

                {showSponsorship && c.offersSponsorship && c.sponsorshipOffer && (
                  <div className="mt-4 rounded-2xl border border-border/60 p-4">
                    <p className="flex items-center gap-2 text-xs font-semibold text-primary-glow uppercase">
                      <Handshake className="h-3.5 w-3.5" />
                      Sponsorship
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {c.sponsorshipOffer}
                    </p>
                  </div>
                )}

                {showCareers && c.offersCareers && c.hiringInfo && (
                  <div className="mt-3 rounded-2xl border border-border/60 p-4">
                    <p className="flex items-center gap-2 text-xs font-semibold text-primary-glow uppercase">
                      <Briefcase className="h-3.5 w-3.5" />
                      Careers & graduate programmes
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {c.hiringInfo}
                    </p>
                  </div>
                )}

                {showThesis && c.offersThesis && c.thesisInfo && (
                  <div className="mt-3 rounded-2xl border border-border/60 p-4">
                    <p className="flex items-center gap-2 text-xs font-semibold text-primary-glow uppercase">
                      <GraduationCap className="h-3.5 w-3.5" />
                      Thesis & research projects
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {c.thesisInfo}
                    </p>
                  </div>
                )}

                <div className="mt-auto flex flex-wrap gap-4 pt-6">
                  {showSponsorship && c.offersSponsorship && (
                    <Link
                      to="/contact"
                      search={{
                        topic: "Sponsorship & talent",
                        company: c.name,
                        interest: "sponsorship",
                      }}
                      className="text-sm font-semibold text-foreground underline-offset-4 hover:text-primary-glow hover:underline"
                    >
                      Ask about sponsorship
                    </Link>
                  )}
                  {showCareers && c.offersCareers && (
                    <Link
                      to="/contact"
                      search={{
                        topic: "Sponsorship & talent",
                        company: c.name,
                        interest: "careers",
                      }}
                      className="text-sm font-semibold text-foreground underline-offset-4 hover:text-primary-glow hover:underline"
                    >
                      Ask about careers
                    </Link>
                  )}
                  {showThesis && c.offersThesis && (
                    <Link
                      to="/contact"
                      search={{
                        topic: "Sponsorship & talent",
                        company: c.name,
                        interest: "thesis",
                      }}
                      className="text-sm font-semibold text-foreground underline-offset-4 hover:text-primary-glow hover:underline"
                    >
                      Ask about thesis projects
                    </Link>
                  )}
                </div>
              </div>
            </Magnetic>
          ))}
        </div>
      )}
    </div>
  );
}
