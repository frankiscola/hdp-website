import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Briefcase, Check, GraduationCap, Handshake, Loader2, Send, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { fetchMyProfile, type Company, type CompanyProfile } from "../data/companies";
import { useIsMobile } from "../hooks/use-mobile";
import { sendCompanyInquiry, type InquiryInterest } from "../lib/company-contact.server";
import { supabase } from "../lib/supabase";
import { cn } from "../lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from "./ui/drawer";

const MAX_MESSAGE = 4000;

const INTEREST_META: Record<
  InquiryInterest,
  {
    label: string;
    short: string;
    icon: typeof Handshake;
    subject: string;
    starter: (c: string) => string;
  }
> = {
  sponsorship: {
    label: "Sponsorship",
    short: "sponsorship",
    icon: Handshake,
    subject: "Sponsorship enquiry via HyperHub",
    starter: (c) =>
      `Hi, we're interested in the sponsorship offered by ${c} through the HyperHub Portal.\n\n`,
  },
  careers: {
    label: "Careers",
    short: "careers",
    icon: Briefcase,
    subject: "Careers enquiry via HyperHub",
    starter: (c) =>
      `Hi, we're interested in the graduate programme / career opportunities offered by ${c} through the HyperHub Portal.\n\n`,
  },
  thesis: {
    label: "Thesis projects",
    short: "thesis",
    icon: GraduationCap,
    subject: "Thesis project enquiry via HyperHub",
    starter: (c) =>
      `Hi, we're interested in the master's/PhD thesis or research project opportunities offered by ${c} through the HyperHub Portal.\n\n`,
  },
};

const fieldClass =
  "mt-2 w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary sm:text-sm";
const labelClass = "text-xs tracking-[0.16em] text-muted-foreground uppercase";

/**
 * "Ask about …" popup. A centred dialog on desktop and a bottom sheet on
 * mobile; both share the same form. The message is emailed by the server
 * straight to the contact configured for that company and enquiry type — the
 * address is never exposed to the browser.
 */
export function AskCompanyDialog({
  company,
  interest,
  onClose,
}: {
  company: Company | null;
  interest: InquiryInterest | null;
  onClose: () => void;
}) {
  const isMobile = useIsMobile();
  const open = Boolean(company && interest);

  const body =
    company && interest ? (
      <AskBody
        key={`${company.id}-${interest}`}
        company={company}
        interest={interest}
        onClose={onClose}
      />
    ) : null;

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={(o) => !o && onClose()} shouldScaleBackground={false}>
        <DrawerContent className="max-h-[92dvh] rounded-t-3xl border-border bg-background">
          <DrawerTitle className="sr-only">Send a message</DrawerTitle>
          <DrawerDescription className="sr-only">
            Write a message to the company contact.
          </DrawerDescription>
          {body}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90dvh] max-w-xl gap-0 overflow-hidden rounded-3xl border-border bg-background p-0 sm:rounded-3xl [&>button]:hidden">
        <DialogTitle className="sr-only">Send a message</DialogTitle>
        <DialogDescription className="sr-only">
          Write a message to the company contact.
        </DialogDescription>
        {body}
      </DialogContent>
    </Dialog>
  );
}

function AskBody({
  company,
  interest,
  onClose,
}: {
  company: Company;
  interest: InquiryInterest;
  onClose: () => void;
}) {
  const meta = INTEREST_META[interest];
  const Icon = meta.icon;
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const uid = useId();
  const starter = meta.starter(company.name);

  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [subject, setSubject] = useState(meta.subject);
  const [message, setMessage] = useState(starter);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetchMyProfile().then((p) => alive && setProfile(p));
    return () => {
      alive = false;
    };
  }, []);

  const untouched = message.trim() === starter.trim();
  const canSend =
    status === "idle" && subject.trim().length > 0 && !untouched && message.length <= MAX_MESSAGE;

  async function handleSend() {
    if (!canSend) return;
    setStatus("sending");
    setError(null);
    try {
      const { data: session } = await supabase!.auth.getSession();
      const accessToken = session.session?.access_token;
      if (!accessToken) throw new Error("Please sign in again to send a message.");
      await sendCompanyInquiry({
        data: { accessToken, companyId: company.id, interest, subject, message },
      });
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setStatus("idle");
    }
  }

  return (
    <div className="flex min-h-0 flex-col">
      {/* Header */}
      <div className="flex items-start gap-4 border-b border-border/60 px-6 pt-6 pb-5 sm:px-8 sm:pt-8">
        {company.logoUrl ? (
          <img
            src={company.logoUrl}
            alt=""
            className="h-12 w-12 shrink-0 rounded-xl bg-white object-contain p-1.5"
          />
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-sm font-semibold text-muted-foreground">
            {company.name.slice(0, 2).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.1em] text-primary-glow uppercase">
            <Icon className="h-3.5 w-3.5" />
            {meta.label}
          </p>
          <h2 className="mt-1 truncate text-lg leading-snug font-semibold sm:text-xl">
            Message {company.name}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="-mt-1 -mr-2 hidden h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:flex"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="px-6 pt-10 pb-[max(2rem,env(safe-area-inset-bottom))] text-center sm:px-8"
          >
            <motion.div
              initial={reduce ? false : { scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.1 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary-glow"
            >
              <Check className="h-8 w-8" strokeWidth={2.5} />
            </motion.div>
            <h3 className="mt-6 text-xl font-semibold">Message sent</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              We've sent your {meta.short} request to {company.name}.
              {profile?.contactEmail ? (
                <>
                  {" "}
                  Replies will go to <span className="text-foreground">{profile.contactEmail}</span>
                  .
                </>
              ) : null}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-glow"
            >
              Done
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={false}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onSubmit={(e) => {
              e.preventDefault();
              void handleSend();
            }}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                void handleSend();
              }
            }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-6 sm:px-8">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Goes straight to {company.name}'s {meta.short} contact
                {profile ? (
                  <>
                    . Sending as{" "}
                    <span className="text-foreground">
                      {profile.contactName || profile.companyName}
                    </span>
                    {profile.contactEmail ? (
                      <>
                        {" "}
                        <span className="break-all">({profile.contactEmail})</span>
                      </>
                    ) : null}
                    .
                  </>
                ) : (
                  "."
                )}
              </p>

              <div>
                <label htmlFor={`${uid}-subject`} className={labelClass}>
                  Subject
                </label>
                <input
                  id={`${uid}-subject`}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  maxLength={150}
                  className={fieldClass}
                />
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <label htmlFor={`${uid}-message`} className={labelClass}>
                    Message
                  </label>
                  <span
                    className={cn(
                      "text-[11px] tabular-nums text-muted-foreground/70",
                      message.length > MAX_MESSAGE && "text-destructive",
                    )}
                  >
                    {message.length}/{MAX_MESSAGE}
                  </span>
                </div>
                <textarea
                  id={`${uid}-message`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={7}
                  autoFocus={!isMobile}
                  className={cn(fieldClass, "resize-none leading-relaxed")}
                />
                {untouched && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Add a few words about what you're looking for.
                  </p>
                )}
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    role="alert"
                    className="overflow-hidden rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-border/60 px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-end sm:px-8 sm:pb-6">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!canSend}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary-glow disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send message
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
