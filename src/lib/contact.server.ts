import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

export type ContactFormPayload = {
  name: string;
  email: string;
  organization?: string;
  topic: string;
  message: string;
};

const CONTACT_RECIPIENT = "matteo.dragoni@hyperloopdevelopmentprogram.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const sendContactMessage = createServerFn({ method: "POST" })
  .validator((data: ContactFormPayload) => {
    if (!data.name?.trim()) throw new Error("Name is required.");
    if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new Error("A valid email is required.");
    }
    if (!data.topic?.trim()) throw new Error("Topic is required.");
    if (!data.message?.trim()) throw new Error("Message is required.");
    return data;
  })
  .handler(async ({ data }) => {
    // Read from an environment variable, never hardcoded — this file ships
    // to a public GitHub repo, and a key committed in source would be
    // scraped and abused within minutes of the push.
    const apiKey = process.env["RESEND_API_KEY"];
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured.");
      throw new Error("Email sending is not configured on the server.");
    }

    const resend = new Resend(apiKey);
    const { name, email, organization, topic, message } = data;

    const html = `
      <div style="font-family: sans-serif; font-size: 14px; color: #111;">
        <h2 style="margin-bottom: 16px;">New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${organization ? `<p><strong>Organization:</strong> ${escapeHtml(organization)}</p>` : ""}
        <p><strong>Topic:</strong> ${escapeHtml(topic)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>
    `.trim();

    const { error } = await resend.emails.send({
      // Until a custom domain is verified in Resend, sending must use this
      // shared sandbox address as the "from". Switch to something like
      // "HDP Website <contact@hyperloopdevelopmentprogram.com>" once the
      // domain is verified in the Resend dashboard.
      from: "HDP Website <onboarding@resend.dev>",
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject: `New enquiry: ${topic} — ${name}`,
      html,
    });

    if (error) {
      console.error("Resend API error:", error);
      throw new Error("Failed to send the message. Please try again shortly.");
    }

    return { ok: true as const };
  });

