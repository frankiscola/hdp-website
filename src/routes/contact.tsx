import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Mail, MapPin } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/ui-kit";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Hyperloop Development Program" },
      {
        name: "description",
        content:
          "Get in touch with the Hyperloop Development Program about partnership, test infrastructure access, research collaboration or media enquiries.",
      },
      { property: "og:title", content: "Contact the Hyperloop Development Program" },
      {
        property: "og:description",
        content: "Partnership, test infrastructure, research collaboration and media enquiries.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const topics = ["Partnership", "Test infrastructure", "Research", "Press"];

function Contact() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState(topics[0]);

  return (
    <section>
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 pt-40 pb-28 lg:grid-cols-[1fr_1.1fr] lg:px-10 lg:pt-52 lg:pb-36">
        <div>
          <Reveal>
            <SectionHeading
              eyebrow="Contact"
              title="Let's talk about hyperloop in Europe."
              intro="Tell us which part of the programme you are interested in and the right people will get back to you."
            />
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-12 space-y-6 text-sm text-muted-foreground">
              <p className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary-glow" />
                info@hyperloopdevelopmentprogram.com
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary-glow" />
                Hyperloop Development Program Foundation, Netherlands
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="rounded-[2rem] border border-border bg-surface/50 p-8 lg:p-12">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="py-14 text-center"
              >
                <h3 className="text-2xl font-semibold">Thank you — message received.</h3>
                <p className="mt-4 text-sm text-muted-foreground">
                  We will come back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-8 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-primary/60"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Name" name="name" />
                  <Field label="Organization" name="organization" required={false} />
                </div>
                <Field label="Email" name="email" type="email" />

                <div>
                  <span className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                    Topic
                  </span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {topics.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTopic(t)}
                        className={
                          topic === t
                            ? "rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
                            : "rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                        }
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-xs tracking-[0.16em] text-muted-foreground uppercase"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="mt-3 w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-glow"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-3 w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
      />
    </div>
  );
}
