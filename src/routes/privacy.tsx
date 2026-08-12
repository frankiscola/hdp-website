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
    title: "What we collect",
    text: "When you use the contact form, we collect the information you enter — your name, email address, organization and message — so we can respond to your enquiry. We do not use tracking cookies or advertising pixels on this site.",
  },
  {
    title: "How we use it",
    text: "Contact-form submissions are used only to answer your enquiry and, where relevant, to follow up about partnership, test infrastructure access, research collaboration or press requests. We do not sell or share your data with third parties for marketing purposes.",
  },
  {
    title: "How long we keep it",
    text: "We keep enquiry data for as long as needed to handle your request and any related follow-up, after which it is deleted.",
  },
  {
    title: "Your rights",
    text: "Under the GDPR you can ask to see, correct or delete the personal data we hold about you at any time. To do so, or if you have questions about this policy, contact us at info@hyperloopdevelopmentprogram.com.",
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
            intro="This policy explains what data the Hyperloop Development Program website collects and how it is used. It applies only to this website, hyperloopdevelopmentprogram.com."
          />
        </Reveal>

        <div className="mt-16 space-y-12">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <h2 className="text-xl font-semibold">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <p className="mt-16 text-xs text-muted-foreground">Last updated: August 2026.</p>
        </Reveal>
      </div>
    </section>
  );
}
