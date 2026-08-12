import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Globe2, Megaphone, Wallet, Wrench } from "lucide-react";
import tubeLandscape from "../assets/tube-landscape.jpg";
import { Magnetic } from "../components/Magnetic";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { CtaButton, SectionHeading } from "../components/ui-kit";

export const Route = createFileRoute("/open-positions")({
  head: () => ({
    meta: [
      { title: "Open Positions – Hyperloop Development Program" },
      {
        name: "description",
        content:
          "The HDP foundation is expanding its team. Explore open roles across EU research collaboration, communication, funding and operations & finance.",
      },
      { property: "og:title", content: "Open Positions – Hyperloop Development Program" },
      {
        property: "og:description",
        content: "The HDP foundation is expanding its team — explore current open roles.",
      },
      { property: "og:url", content: "/open-positions" },
    ],
    links: [{ rel: "canonical", href: "/open-positions" }],
  }),
  component: OpenPositions,
});

const positions = [
  {
    icon: Globe2,
    role: "EU Research Collaboration",
    type: "Full-time",
    text: "Deepen joint research across institutions and programmes, coordinating work packages between HDP partners and European research bodies.",
  },
  {
    icon: Megaphone,
    role: "Communication",
    type: "Full-time",
    text: "Make hyperloop progress legible to industry, policy makers and the public — from press materials to the content on this website.",
  },
  {
    icon: Wallet,
    role: "Funding",
    type: "Full-time",
    text: "Secure new public and private funding instruments to sustain the programme's long-horizon development and infrastructure investment.",
  },
  {
    icon: Wrench,
    role: "Operations & Finance",
    type: "Full-time",
    text: "Strengthen the foundation that carries the programme — from day-to-day operations to financial planning and reporting.",
  },
];

function OpenPositions() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Help build the case for hyperloop."
        intro="The Stichting Hyperloop Development Program foundation is currently expanding its team across four strategic roles. Join a small, mission-driven team working at the intersection of policy, industry and research."
        image={tubeLandscape}
        imageAlt="Hyperloop tube stretching across a landscape"
        priority
      />

      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="Current openings"
              title="Four roles, one shared mission."
            />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {positions.map((position, i) => {
              const Icon = position.icon;
              return (
                <Reveal key={position.role} delay={i * 0.08}>
                  <Magnetic>
                    <div className="h-full rounded-3xl border border-border bg-surface/50 p-8 transition-all duration-500 hover:border-primary/50">
                      <div className="flex items-center justify-between">
                        <Icon className="h-6 w-6 text-primary-glow" />
                        <span className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                          {position.type}
                        </span>
                      </div>
                      <h3 className="mt-5 text-xl font-semibold">{position.role}</h3>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {position.text}
                      </p>
                      <Link
                        to="/contact"
                        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary-glow underline underline-offset-4 hover:text-primary"
                      >
                        Express your interest
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </Magnetic>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.15}>
            <div className="mt-16 rounded-3xl border border-border bg-surface/30 p-8 text-center sm:p-12">
              <h3 className="text-xl font-semibold">Don't see the right fit?</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                HDP is an open, growing ecosystem. If you believe you can contribute value to the
                programme in another way, we would still like to hear from you.
              </p>
              <div className="mt-8 flex justify-center">
                <CtaButton to="/contact">Get in touch</CtaButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
