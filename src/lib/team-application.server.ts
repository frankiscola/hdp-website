import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

export type TeamApplicationNotice = {
  teamName: string;
  university: string;
  country: string;
  contactName: string;
  contactEmail: string;
};

const RECIPIENT = "general@hyperloopdevelopmentprogram.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const short = (v: unknown, max = 160) => String(v ?? "").slice(0, max);

/**
 * Best-effort heads-up email. The application itself is already saved in
 * Supabase when this runs, so a failure here must never block the applicant:
 * the caller ignores errors, and HDP can always find it under /admin.
 */
export const notifyTeamApplication = createServerFn({ method: "POST" })
  .validator((data: TeamApplicationNotice) => ({
    teamName: short(data.teamName),
    university: short(data.university),
    country: short(data.country),
    contactName: short(data.contactName),
    contactEmail: short(data.contactEmail, 200),
  }))
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured; skipping application notification.");
      return { ok: false as const };
    }
    const resend = new Resend(apiKey);
    const html = `
      <div style="font-family: sans-serif; font-size: 14px; color: #111;">
        <h2 style="margin-bottom: 16px;">New HyperHub team application</h2>
        <p><strong>Team:</strong> ${escapeHtml(data.teamName)}</p>
        <p><strong>University:</strong> ${escapeHtml(data.university)} (${escapeHtml(data.country)})</p>
        <p><strong>Reference contact:</strong> ${escapeHtml(data.contactName)} &lt;${escapeHtml(data.contactEmail)}&gt;</p>
        <p>Review it in the admin panel: <a href="https://www.hyperloopdevelopmentprogram.com/admin">/admin</a> → Team applications.</p>
      </div>
    `.trim();

    const { error } = await resend.emails.send({
      from: "HDP Website <onboarding@resend.dev>",
      to: RECIPIENT,
      subject: `New team application: ${data.teamName}`,
      html,
    });
    if (error) {
      console.error("Resend API error:", error);
      return { ok: false as const };
    }
    return { ok: true as const };
  });
