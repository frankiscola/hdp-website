import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Gauge, Leaf, MapPin, Mic, ShieldCheck, TrendingDown } from "lucide-react";
import heroVehicle from "../assets/hero-vehicle.jpg";
import heroVehicleLight from "../assets/hero-vehicle-light.jpg";
import { Magnetic } from "../components/Magnetic";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { CtaButton, SectionHeading } from "../components/ui-kit";
import { absoluteUrl, SITE_URL } from "../lib/seo";

export const Route = createFileRoute("/innotrans-2026")({
  head: () => ({
    meta: [
      { title: "InnoTrans 2026 – Hyperloop Development Program" },
      {
        name: "description",
        content:
          "Meet HDP at InnoTrans 2026, Hall 2.2 Stand 100, Messe Berlin. Step inside Europe's first full-scale hyperloop vehicle and join the Hyperloop Conference.",
      },
      { property: "og:title", content: "InnoTrans 2026 – Hyperloop Development Program" },
      {
        property: "og:description",
        content: "Meet HDP at InnoTrans 2026 – booth, programme and the Hyperloop Conference.",
      },
      { property: "og:url", content: absoluteUrl("/innotrans-2026") },
      { property: "og:image", content: absoluteUrl("/og/hero-vehicle.jpg") },
      { name: "twitter:image", content: absoluteUrl("/og/hero-vehicle.jpg") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/innotrans-2026") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Hyperloop Conference 2026",
          description:
            "Building Europe's Hyperloop Future – political remarks, study results, the Hyper4Rail project and a high-level panel on the European hyperloop roadmap.",
          startDate: "2026-09-25T11:30:00+02:00",
          endDate: "2026-09-25T14:30:00+02:00",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: "Speakers' Corner, hub27, beta 6–7 – InnoTrans, Messe Berlin",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Berlin",
              addressCountry: "DE",
            },
          },
          image: absoluteUrl("/og/hero-vehicle.jpg"),
          organizer: {
            "@type": "Organization",
            name: "Hyperloop Development Program",
            url: SITE_URL,
          },
          url: absoluteUrl("/innotrans-2026"),
        }),
      },
    ],
  }),
  component: InnoTrans2026,
});

const highlights = [
  {
    icon: Gauge,
    title: "Faster",
    text: "750 km/h and beyond – once fully developed, hyperloop has the potential to become the world's fastest land transport system.",
  },
  {
    icon: Leaf,
    title: "Cleaner",
    text: "100% electric. Powered by renewables, hyperloop achieves zero operational emissions, using only around half the energy of high-speed rail.",
  },
  {
    icon: TrendingDown,
    title: "More efficient",
    text: "Low OPEX through reduced energy consumption and minimal mechanical wear, with capacity comparable to conventional rail.",
  },
  {
    icon: ShieldCheck,
    title: "Climate-resilient",
    text: "Shielded from disruptive weather, using only ~60% of the footprint of high-speed rail, and buildable alongside existing infrastructure.",
  },
];

type BoothSlot = { time: string; title: string; speakers?: string[]; location?: string };
type BoothDay = { day: string; date: string; slots: BoothSlot[] };

// Only the confirmed (highlighted) presentations at the HDP stand – open
// slots and unrelated official visits from the internal planning sheet are
// intentionally left out.
const boothProgramme: BoothDay[] = [
  {
    day: "Wed",
    date: "23 Sep",
    slots: [
      {
        time: "11:00 – 11:30",
        title: "Hyperloop in Türkiye: Activities, Competitions and Vision",
        speakers: ["Dr. Murat Güler – TÜBİTAK Rail Transportation Technologies Institute"],
      },
      {
        time: "13:00 – 14:00",
        title: "Converging on Europe's Hyperloop: The Harmonised Technical Concept",
        speakers: ["Luca Sandel – EuroTube Foundation"],
      },
    ],
  },
  {
    day: "Thu",
    date: "24 Sep",
    slots: [
      {
        time: "13:00 – 13:30",
        title: "A European Hyperloop Network: The Financial and Socio-Economic Case",
        speakers: ["Dr. Chrysostomos Mylonas – Centre for Research and Technology Hellas (CERTH)"],
      },
      {
        time: "14:00 – 14:30",
        title: "Latest Achievements in Hyperloop Full-Scale Testing and Next Steps",
        speakers: [
          "Dr. Domenik Radeck & Oliver Kleikemper – Technical University of Munich",
          "Gabriele Semino – Neoways Technologies",
        ],
      },
      {
        time: "16:00 – 16:30",
        title: "Vision on Hyperloop – Passenger Accommodation and Comfort",
        speakers: ["Oliver Schweizer – Schweizer Design Consulting GmbH"],
      },
    ],
  },
  {
    // The flyer prints this column as "Fri 23 Sep", which repeats
    // Wednesday's date – a typo in the source document. The correct date
    // (confirmed by the Quick facts section and JSON-LD above) is 25 Sep.
    day: "Fri",
    date: "25 Sep",
    slots: [
      {
        time: "11:30 – 14:30",
        title: "Hyperloop Conference 2026: Building Europe's Hyperloop Future",
        location: "Speakers' Corner, hub27, beta 6–7",
      },
    ],
  },
];

type AgendaItem = {
  time: string;
  title: string;
  note?: string;
  people: string[];
};

const conferenceAgenda: AgendaItem[] = [
  {
    time: "11:30 – 11:40",
    title: "Welcome Address",
    people: ["Klaus Rudischhauser – Hyperloop Development Program"],
  },
  {
    time: "11:40 – 11:50",
    title: "Political Remarks",
    people: [
      "Dorothee Bär – German Federal Minister for Research, Technology and Space (video message)",
      "Markus Blume – Bavarian State Minister for Science and the Arts (video message)",
    ],
  },
  {
    time: "11:50 – 12:10",
    title: "Building the Foundations: Existing Test Facilities and Next Projects",
    people: ["Prof. Dr. Thomas Schüning – University of Applied Sciences Emden Leer"],
  },
  {
    time: "12:10 – 12:30",
    title:
      "Presentation of the Results of the Hyperloop Study – Current Development Status of the Hyperloop Concept",
    people: [
      "Waldemar Gaad – DZSF at the Federal Railway Authority (EBA)",
      "Jasne Prilop – Deutsche Rail Operations (DRO)",
    ],
  },
  {
    time: "12:30 – 13:20",
    title: "Hyper4Rail",
    people: [
      "Dr. Chrysostomos Mylonas (CERTH) – A European Hyperloop Network: The Financial and Socio-Economic Case",
      "Luca Sandel (EuroTube Foundation) – Converging on Europe's Hyperloop: The Harmonised Technical Concept",
      "Q&A",
    ],
  },
  {
    time: "13:20 – 14:10",
    title: "High-Level Panel: From Vision to Roadmap – Delivering a European Hyperloop Network",
    note: "Including the HDP Vision Paper. Panellists:",
    people: [
      "Gabriele Semino (Neoways)",
      "Iñigo Cruz-Martinez (European Commission, DG MOVE)",
      "Dr. Markus Bauer (thyssenkrupp Transrapid)",
      "Giorgio Travaini (Europe's Rail Joint Undertaking)",
      "Dieter Michell-Auli (DRO)",
      "Q&A",
    ],
  },
  {
    time: "14:25 – 14:30",
    title: "Closing Remarks",
    people: ["Jochen Wermuth – Wermuth Asset Management"],
  },
];

function InnoTrans2026() {
  return (
    <>
      <PageHero
        eyebrow="22–25 September 2026 · Messe Berlin"
        title="InnoTrans 2026."
        intro="Step inside Europe's first full-scale hyperloop passenger vehicle. Discover the technology, explore first results from the EU-funded Hyper4Rail project, and find out what's next on the road to deployment."
        image={heroVehicle}
        imageLight={heroVehicleLight}
        imageAlt="Full-scale hyperloop passenger vehicle on display"
        priority
      />

      {/* Quick facts */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] gap-6 px-6 py-10 sm:grid-cols-2 lg:px-10">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 shrink-0 text-primary-glow" />
            <div>
              <p className="text-sm font-semibold">Where to find us</p>
              <p className="text-sm text-muted-foreground">Hall 2.2, Stand 100 · Messe Berlin</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mic className="h-5 w-5 shrink-0 text-primary-glow" />
            <div>
              <p className="text-sm font-semibold">Hyperloop Conference</p>
              <p className="text-sm text-muted-foreground">
                Fri 25 Sep, 11:30–14:30 · Speakers' Corner, hub27, beta 6–7
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why hyperloop */}
      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] dark bg-background p-10 sm:p-14 lg:p-16">
              <p className="font-display text-2xl font-black tracking-tight text-foreground uppercase sm:text-3xl lg:text-4xl">
                Connecting Europe
              </p>
              <div className="mt-8 sm:mt-10">
                <p className="font-display text-6xl font-black leading-[0.92] tracking-tight text-primary-glow uppercase sm:text-7xl lg:text-8xl">
                  Faster.
                </p>
                <p className="font-display text-6xl font-black leading-[0.92] tracking-tight text-primary-glow uppercase sm:text-7xl lg:text-8xl">
                  Cleaner.
                </p>
                <p className="font-display text-6xl font-black leading-[0.92] tracking-tight text-primary-glow uppercase sm:text-7xl lg:text-8xl">
                  Smarter.
                </p>
              </div>
            </div>
          </Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 0.08}>
                  <Magnetic>
                    <div className="h-full rounded-3xl border border-border bg-surface/50 p-8 transition-all duration-500 hover:border-primary/50">
                      <Icon className="h-6 w-6 text-primary-glow" />
                      <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {item.text}
                      </p>
                    </div>
                  </Magnetic>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booth programme – confirmed sessions only */}
      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="At our stand"
              title="Confirmed presentations."
              intro="A selection of the programme running throughout the week at Hall 2.2, Stand 100."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Tabs defaultValue={boothProgramme[0]?.day ?? "Wed"} className="mt-14">
              <TabsList className="h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0 sm:w-auto">
                {boothProgramme.map((d) => (
                  <TabsTrigger
                    key={d.day}
                    value={d.day}
                    className="rounded-full border border-border px-5 py-2.5 text-sm font-medium data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
                  >
                    {d.day} · {d.date}
                  </TabsTrigger>
                ))}
              </TabsList>

              {boothProgramme.map((d) => (
                <TabsContent key={d.day} value={d.day} className="mt-8">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {d.slots.map((slot) => (
                      <div
                        key={d.day + slot.time}
                        className="flex flex-col gap-3 rounded-2xl border border-border bg-background/60 p-6"
                      >
                        <span className="text-xs font-medium text-muted-foreground">
                          {slot.time}
                        </span>
                        <span className="text-sm leading-snug font-semibold sm:text-base">
                          {slot.title}
                        </span>
                        {slot.speakers?.length ? (
                          <ul className="space-y-1.5">
                            {slot.speakers.map((person) => (
                              <li
                                key={person}
                                className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                              >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-glow" />
                                <span>{person}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {slot.location ? (
                          <span className="flex items-center gap-1.5 text-sm text-primary-glow">
                            <MapPin className="h-3.5 w-3.5 shrink-0" />
                            {slot.location}
                          </span>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </Reveal>
        </div>
      </section>

      {/* Hyperloop Conference full agenda */}
      <section>
        <div className="mx-auto max-w-[1200px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <SectionHeading
              eyebrow="Hyperloop Conference 2026"
              title="Building Europe's Hyperloop Future."
              intro="Friday, 25 September 2026 · 11:30–14:30 · InnoTrans – Speakers' Corner, hub27, beta 6–7, Messe Berlin"
            />
          </Reveal>

          <div className="mt-14 space-y-4">
            {conferenceAgenda.map((item, i) => (
              <Reveal key={item.time + item.title} delay={i * 0.05}>
                <div className="flex flex-col gap-2 rounded-2xl border border-border bg-surface/40 p-6 sm:flex-row sm:gap-6 sm:p-7">
                  <span className="shrink-0 text-sm font-semibold text-primary-glow sm:w-24">
                    {item.time}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold leading-snug sm:text-lg">
                      {item.title}
                    </h3>
                    {item.note ? (
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {item.note}
                      </p>
                    ) : null}
                    <ul className="mt-2 space-y-1.5">
                      {item.people.map((person, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-glow" />
                          <span>{person}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-surface/30">
        <div className="mx-auto max-w-[1400px] px-6 py-20 text-center lg:px-10">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              See you at Messe Berlin.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground">
              Find us at Hall 2.2, Stand 100 – 22–25 September 2026.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <CtaButton to="/contact">Get in touch</CtaButton>
              <a
                href="https://www.linkedin.com/company/hyperloop-development-program/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-6 py-3.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                Follow us for updates
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
