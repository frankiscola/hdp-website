import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export type InquiryInterest = "sponsorship" | "careers" | "thesis";

export type CompanyInquiryPayload = {
  /** The signed-in member's Supabase access token (verified server-side). */
  accessToken: string;
  companyId: string;
  interest: InquiryInterest;
  subject: string;
  message: string;
};

// Used when a company has no dedicated address for that enquiry type yet, so
// a message is never lost.
const FALLBACK_RECIPIENT = "general@hyperloopdevelopmentprogram.com";
const HOURLY_LIMIT = 5;

const INTERESTS: InquiryInterest[] = ["sponsorship", "careers", "thesis"];

const LABEL: Record<InquiryInterest, string> = {
  sponsorship: "Sponsorship",
  careers: "Careers & graduate programmes",
  thesis: "Thesis & research projects",
};
const CONTACT_COLUMN: Record<InquiryInterest, string> = {
  sponsorship: "sponsorship_email",
  careers: "careers_email",
  thesis: "thesis_email",
};
const OFFER_FLAG: Record<InquiryInterest, string> = {
  sponsorship: "offers_sponsorship",
  careers: "offers_careers",
  thesis: "offers_thesis",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Emails an enquiry about a company's sponsorship / careers / thesis offer
 * straight to the contact HDP configured for it in /admin.
 *
 * - Only signed-in, HDP-approved company members can send.
 * - The recipient address is read here, with the service-role key, and is
 *   never returned to the browser.
 * - The sender's name/email come from their approved profile, not the form.
 * - Max HOURLY_LIMIT messages per member per hour.
 *
 * Required server env vars: RESEND_API_KEY, SUPABASE_SERVICE_ROLE_KEY
 * (secret). Optional: SUPABASE_URL (defaults to VITE_SUPABASE_URL),
 * MAIL_FROM (a sender on a domain verified in Resend).
 */
export const sendCompanyInquiry = createServerFn({ method: "POST" })
  .validator((data: CompanyInquiryPayload) => {
    if (!data.accessToken) throw new Error("Please sign in again to send a message.");
    if (!UUID.test(data.companyId ?? "")) throw new Error("Unknown company.");
    if (!INTERESTS.includes(data.interest)) throw new Error("Unknown enquiry type.");
    const subject = String(data.subject ?? "")
      .replace(/[\r\n]+/g, " ")
      .trim()
      .slice(0, 150);
    const message = String(data.message ?? "").trim();
    if (!subject) throw new Error("Please add a subject.");
    if (message.length < 10) throw new Error("Please write a short message.");
    if (message.length > 4000) throw new Error("Your message is too long (4000 characters max).");
    return { ...data, subject, message };
  })
  .handler(async ({ data }) => {
    const supabaseUrl = process.env["SUPABASE_URL"] ?? import.meta.env.VITE_SUPABASE_URL;
    const serviceKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];
    const resendKey = process.env["RESEND_API_KEY"];
    if (!supabaseUrl || !serviceKey || !resendKey) {
      console.error(
        "company-contact: missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY / RESEND_API_KEY.",
      );
      throw new Error("Messaging isn't set up on the server yet. Please use the contact page.");
    }

    const db = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // 1. Who is sending? Verify the token, then require an approved profile.
    const { data: userData, error: userError } = await db.auth.getUser(data.accessToken);
    const user = userData?.user;
    if (userError || !user) throw new Error("Please sign in again to send a message.");

    const { data: profile } = await db
      .from("company_profiles")
      .select("company_name,contact_name,contact_email,status")
      .eq("id", user.id)
      .maybeSingle();
    if (!profile || profile.status !== "approved") {
      throw new Error("Only approved partner accounts can send messages.");
    }
    const senderEmail = String(profile.contact_email || user.email || "");
    if (!EMAIL.test(senderEmail)) throw new Error("Your account has no valid email address.");

    // 2. Is the company open to this kind of enquiry?
    const { data: company } = await db
      .from("companies")
      .select(`id,name,is_published,${OFFER_FLAG[data.interest]}`)
      .eq("id", data.companyId)
      .maybeSingle();
    const companyRow = company as unknown as Record<string, unknown> | null;
    if (!companyRow || !companyRow["is_published"] || !companyRow[OFFER_FLAG[data.interest]]) {
      throw new Error("This company isn't taking these requests right now.");
    }
    const companyName = String(companyRow["name"]);

    // 3. Simple rate limit per sender.
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count } = await db
      .from("company_contact_log")
      .select("id", { count: "exact", head: true })
      .eq("sender_id", user.id)
      .gte("created_at", since);
    if ((count ?? 0) >= HOURLY_LIMIT) {
      throw new Error("You've sent several messages in the last hour. Please try again later.");
    }

    // 4. Pick the recipient (never sent back to the browser).
    const { data: contacts } = await db
      .from("company_contacts")
      .select(CONTACT_COLUMN[data.interest])
      .eq("company_id", data.companyId)
      .maybeSingle();
    const configured = String(
      (contacts as unknown as Record<string, unknown> | null)?.[CONTACT_COLUMN[data.interest]] ??
        "",
    ).trim();
    const routed = EMAIL.test(configured);
    const recipient = routed ? configured : FALLBACK_RECIPIENT;

    const senderName = String(profile.contact_name || "");
    const senderOrg = String(profile.company_name || "");
    const label = LABEL[data.interest];

    const html = `
      <div style="font-family: sans-serif; font-size: 14px; color: #111; max-width: 560px;">
        ${
          routed
            ? ""
            : `<p style="padding: 10px 12px; background: #fff7e6; border: 1px solid #f5d28a; border-radius: 8px;">
                 <strong>No ${escapeHtml(label.toLowerCase())} contact is set for ${escapeHtml(companyName)}.</strong>
                 Please forward this to them.
               </p>`
        }
        <p style="color: #555; margin-bottom: 4px;">HyperHub Portal enquiry · ${escapeHtml(label)}</p>
        <h2 style="margin: 0 0 16px;">${escapeHtml(data.subject)}</h2>
        <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
        <p style="margin: 0;"><strong>From:</strong> ${escapeHtml(senderName || senderEmail)}${
          senderOrg ? ` · ${escapeHtml(senderOrg)}` : ""
        }</p>
        <p style="margin: 4px 0 0;"><strong>Reply to:</strong> ${escapeHtml(senderEmail)}</p>
        <p style="margin: 16px 0 0; color: #777; font-size: 12px;">
          Sent through the Hyperloop Development Program HyperHub Portal. Replying to this
          email answers ${escapeHtml(senderName || "the sender")} directly.
        </p>
      </div>
    `.trim();

    const resend = new Resend(resendKey);
    const { error } = await resend.emails.send({
      // Resend's shared sandbox sender only delivers to the Resend account
      // owner. To reach company contacts, verify a domain in Resend and set
      // MAIL_FROM, e.g. "HDP HyperHub <hyperhub@hyperloopdevelopmentprogram.com>".
      from: process.env["MAIL_FROM"] ?? "HDP HyperHub <onboarding@resend.dev>",
      to: recipient,
      replyTo: senderEmail,
      subject: `[HyperHub] ${data.subject}`,
      html,
    });
    if (error) {
      console.error("Resend API error:", error);
      throw new Error("We couldn't deliver your message. Please try again shortly.");
    }

    await db.from("company_contact_log").insert({
      sender_id: user.id,
      company_id: data.companyId,
      interest: data.interest,
    });

    return { ok: true as const, routed };
  });
