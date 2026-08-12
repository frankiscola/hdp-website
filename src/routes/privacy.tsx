import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/ui-kit";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy — Hyperloop Development Program" },
      {
        name: "description",
        content: "How the Hyperloop Development Program handles data collected through this website.",
      },
      { property: "og:title", content: "Privacy policy — Hyperloop Development Program" },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

const sections = [
  {
    title: "Consent",
    paragraphs: ["By using this website you agree to the terms described in this policy."],
  },
  {
    title: "Information we collect",
    paragraphs: [
      "What personal information we ask for, and why, is made clear at the point we ask for it.",
      "If you contact us directly — for example through the contact form — we may receive information such as your name, email address, phone number, organization, and the content of your message or any attachments.",
      "If you register for an account, we may ask for contact details such as your name, company name, address, email address and telephone number.",
    ],
  },
  {
    title: "How we use your information",
    paragraphs: [
      "We use the information we collect to run and maintain this website; to improve and develop it over time; to understand how visitors use the site; to communicate with you, including for customer service, updates and — where relevant — marketing; to send emails; and to detect and prevent fraud.",
    ],
  },
  {
    title: "Log files",
    paragraphs: [
      "Like most hosting providers, our host keeps standard server log files that record visits. These typically include IP address, browser type, internet service provider, date and time, and referring or exit pages. This data isn't linked to anyone's identity and is used only to analyse trends, administer the site and gather general usage statistics.",
    ],
  },
  {
    title: "Cookies",
    paragraphs: [
      "This site may use cookies to remember visitor preferences and the pages you've viewed, so we can tailor the experience to your browser and usage patterns. You can disable cookies at any time through your browser settings; most browsers explain how to do this in their own help pages.",
    ],
  },
  {
    title: "Advertising and third-party services",
    paragraphs: [
      "Where third-party advertising partners or services place cookies, scripts or web beacons through this site, those technologies operate under the respective third party's own privacy policy — we don't control or have access to that data, and we'd encourage you to check those policies directly if you want more detail, including how to opt out.",
    ],
  },
  {
    title: "Your rights under the GDPR",
    paragraphs: [
      "As a data subject under EU law, you have the right to: request a copy of the personal data we hold about you; ask us to correct inaccurate or incomplete data; ask us to erase your data under certain conditions; ask us to restrict how we process your data; object to certain processing; and request that we transfer your data to another organization or to you directly, where technically feasible.",
      "We respond to such requests within one month. To exercise any of these rights, contact us at info@hyperloopdevelopmentprogram.com.",
    ],
  },
  {
    title: "Your rights under the CCPA",
    paragraphs: [
      "California residents have the right to ask what categories and specific pieces of personal data we've collected about them, to request deletion of that data, and to ask that we not sell their personal data (we do not sell personal data). As with GDPR requests, we aim to respond within one month.",
    ],
  },
  {
    title: "Children's privacy",
    paragraphs: [
      "This site is not directed at children, and we do not knowingly collect personal information from anyone under 13. If you believe a child has shared personal information with us, please get in touch and we will remove it promptly.",
    ],
  },
  {
    title: "Changes to this policy",
    paragraphs: [
      "We may update this policy from time to time. Changes take effect as soon as they're posted on this page, so we'd encourage checking back periodically.",
    ],
  },
  {
    title: "Scope",
    paragraphs: [
      "This policy covers only our online activity on hyperloopdevelopmentprogram.com. It doesn't apply to information collected offline or through any other channel.",
    ],
  },
  {
    title: "Contact us",
    paragraphs: ["Questions or requests about this policy can be sent to info@hyperloopdevelopmentprogram.com."],
  },
];

function Privacy() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-6 pt-40 pb-28 lg:px-10 lg:pt-52 lg:pb-36">
        <Reveal>
          <SectionHeading
            eyebrow="Legal"
            title="Privacy policy"
            intro="At the Hyperloop Development Program, accessible from www.hyperloopdevelopmentprogram.com, the privacy of our visitors matters to us. This page explains what information we collect through this website and how we use it. If anything here is unclear, or you'd like more detail, just get in touch."
          />
        </Reveal>

        <div className="mt-16 space-y-12">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={Math.min(i * 0.05, 0.4)}>
              <h2 className="text-xl font-semibold">{s.title}</h2>
              <div className="mt-3 space-y-3">
                {s.paragraphs.map((p, j) => (
                  <p key={j} className="text-sm leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.5}>
          <p className="mt-16 text-xs text-muted-foreground">Last updated: August 2026.</p>
        </Reveal>
      </div>
    </section>
  );
}
