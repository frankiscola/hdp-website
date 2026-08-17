import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/ui-kit";
import tubeLandscape from "../assets/tube-landscape.jpg";
import tubeLandscapeLight from "../assets/tube-landscape-light.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ – Frequently Asked Questions | HDP" },
      {
        name: "description",
        content:
          "Answers about the Hyperloop Development Program, hyperloop technology, safety, travel experience, costs, integration and environmental impact.",
      },
      { property: "og:title", content: "Hyperloop FAQ" },
      {
        property: "og:description",
        content:
          "Everything you want to know about the Hyperloop Development Program and hyperloop technology, answered.",
      },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: Faq,
});

type QA = { q: string; a: string };
type Category = { name: string; intro?: string; items: QA[] };

const categories: Category[] = [
  {
    name: "About the Hyperloop Development Program",
    items: [
      {
        q: "What is the Hyperloop Development Program?",
        a: "HDP is a proposed public-private partnership between the Dutch Ministries of Economic Affairs & Climate and Infrastructure & Water Management, the Dutch Province of Groningen, and a group of industry and research organizations, working to develop hyperloop into a safe, sustainable and commercially viable mode of high-speed transport.",
      },
      {
        q: "What concrete results will the program deliver?",
        a: "The program aims to gather everything needed to make a well-founded decision on a first hyperloop route for cargo and a passenger test facility. These answers come from studies and full-scale tests carried out at the European Hyperloop Center in Groningen.",
      },
      {
        q: "How did this program come about?",
        a: "It grew out of conversations between early hyperloop industry partners and the Dutch ministries on how to approach hyperloop development holistically. Building hyperloop is about far more than the vehicle technology – safety, standards, integration, public adoption, socio-economic impact and the wider ecosystem all need dedicated attention from an early stage, which is why many different public and private parties are involved.",
      },
      {
        q: "Can new parties still join the ecosystem?",
        a: "Yes. HDP is an open ecosystem – any organization that can contribute value and is willing to invest is welcome to join and participate on equal footing with existing partners.",
      },
      {
        q: "How does HDP relate to the European Hyperloop Center?",
        a: "The European Hyperloop Center in Groningen is an integral part of the program and serves as its main research site, used for testing and validating hyperloop safety standards, among other activities. The Center's foundation receives funding from the HDP foundation.",
      },
    ],
  },
  {
    name: "About Hyperloop",
    items: [
      {
        q: "Will hyperloop replace trains or planes?",
        a: "Hyperloop is designed to complement existing transport rather than replace it outright, though it will change how other modes are used. It targets connections of roughly 50–3,000 km, offering a faster and more energy-efficient alternative to high-speed rail while substituting some short-haul flights and freeing up capacity at congested airports. Up to around 70% of hyperloop infrastructure could integrate with existing hubs and stations.",
      },
      {
        q: "How does hyperloop capacity compare to rail?",
        a: "Because vehicles are autonomous and can switch lanes, a hyperloop network can behave more like a highway than a fixed railway – vehicles merge and depart independently at short intervals. This gives it a capacity comparable to, or higher than, high-speed rail, potentially exceeding 20,000 passengers per direction per hour, and capacity can scale further by coupling vehicles together.",
      },
      {
        q: "How many passengers can a vehicle carry?",
        a: "A hyperloop vehicle is roughly the size of a train compartment and can carry up to around 60 passengers.",
      },
      {
        q: "What are the advantages of traveling through a tube?",
        a: "The near-vacuum inside the tube removes almost all air resistance, so vehicles reach and hold high speeds using little energy. The enclosed environment also shields the system from weather, which is responsible for a large share of disruptions on conventional rail, improving both reliability and safety.",
      },
      {
        q: "Where will the first hyperloop route be built?",
        a: "A first route is meant as the seed of a larger network – hyperloop already makes sense from distances as short as 50 km, but its real strength is longer routes and network effects, for example linking Amsterdam and Eindhoven and later extending toward Germany's Ruhr area.",
      },
      {
        q: "When will hyperloop travel be possible?",
        a: "A cargo-scale hyperloop system could be operating as early as 2029, validated at the European Hyperloop Center. A first commercial passenger route could follow by around 2034, with a connected pan-European passenger network achievable before 2050.",
      },
      {
        q: "What problems does hyperloop solve?",
        a: "Global demand for passenger and freight transport is expected to triple by 2050. Meeting that growth sustainably requires smarter, more flexible infrastructure – and hyperloop's low implementation and operating costs, zero direct emissions, compact footprint and high capacity make it a strong candidate.",
      },
      {
        q: "How fast is hyperloop?",
        a: "While speeds beyond 1,000 km/h are technically achievable, real-world routes are expected to run at roughly 500–700 km/h. The goal isn't maximum speed but the shortest practical travel time at minimal energy use.",
      },
      {
        q: "Who is hyperloop for?",
        a: "Hyperloop is being designed to be broadly accessible, with ticket pricing competitive with existing modes – for commuting, visiting family, or leisure travel.",
      },
    ],
  },
  {
    name: "Technology",
    items: [
      {
        q: "Is the system sensitive to track imperfections at high speed?",
        a: "No. The magnetic levitation gap is on the order of centimeters, letting the system tolerate far larger track imperfections than high-speed rail, which stays in constant steel-on-steel contact. Onboard lasers measure the distance to the guideway over a thousand times per second to keep the vehicle stable.",
      },
      {
        q: "How low is the pressure inside the tube?",
        a: "Current studies target around 1 millibar – about 0.1% of atmospheric pressure. That's the balance point between minimizing drag and keeping the energy cost of the vacuum pumps low.",
      },
      {
        q: "Can hyperloop vehicles take turns at high speed?",
        a: "Yes – for example, a 400 km/h turn can have a radius of around 2.5 km, since the vehicle can bank steeply as it levitates toward the upper track.",
      },
      {
        q: "How does a vehicle accelerate?",
        a: "A linear electric motor built into the track accelerates the vehicle and regenerates energy during braking. For most of the journey little power is needed, since the vehicle coasts with minimal losses in the low-pressure tube.",
      },
      {
        q: "How does the levitation system work?",
        a: "Magnets on top of the vehicle levitate it toward electrical-steel tracks, while onboard lasers continuously measure and correct the gap over a thousand times per second – giving a smoother ride than trains or turbulence-prone flights.",
      },
    ],
  },
  {
    name: "Safety & Travel Experience",
    intro:
      "Hyperloop is being developed collaboratively with safety as the top priority, involving specialized companies alongside governments, research institutions and standardization bodies.",
    items: [
      {
        q: "What is it like to travel without windows?",
        a: "Hyperloop vehicles have no windows, since there's nothing to see inside a tube. Instead, curved ceiling screens can display landscapes, night skies or destination weather, combined with bright, open interior design to preserve a sense of space.",
      },
      {
        q: "What will acceleration and deceleration feel like?",
        a: "Both happen gradually over long distances for a smooth ride comparable to high-speed rail. At full speed, passengers won't perceive motion, much like in a cruising aircraft.",
      },
      {
        q: "Is it risky to have no pilot on board?",
        a: "The enclosed tube removes crossing traffic and external hazards, creating a favorable environment for autonomous operation. Vehicles communicate with each other to respond jointly to any situation, similar to how autonomous metro systems already operate today.",
      },
      {
        q: "What happens if there's a leak or breach in the tube?",
        a: "Small leaks are compensated automatically by the vacuum pumps – a well-understood challenge given Europe's extensive experience with pressurized oil and gas pipeline networks. In the rare case of a substantial breach, the affected tube segment is sealed off, vehicles brake jointly, and the resulting air resistance helps slow them gradually.",
      },
      {
        q: "Could the low pressure cause the tube to implode?",
        a: "Buckling under external pressure is a well-studied engineering problem, and hyperloop tube design follows existing infrastructure standards with adequate safety margins, making such an event highly unlikely.",
      },
      {
        q: "Can the infrastructure withstand thermal expansion or earthquakes?",
        a: "Expansion joints at every tube connection absorb thermal movement and help localize the impact of seismic activity, while foundations and pipe construction are engineered for earthquake resistance. As with Japanese high-speed rail, the system can link into national early-warning networks to bring vehicles to a stop when triggered.",
      },
      {
        q: "Can the magnetic fields harm passengers?",
        a: "No – the fields passengers are exposed to are far weaker than those of an ordinary fridge magnet, since the magnets are oriented toward the steel tracks and away from the cabin.",
      },
      {
        q: "How are passengers evacuated in an emergency?",
        a: "Affected vehicles stop together, the tube segment is sealed and repressurized, and passengers exit through emergency exits spaced roughly every 500 meters, similar to conventional tunnel infrastructure.",
      },
      {
        q: "What happens if there's a power failure?",
        a: "Vehicles run on onboard batteries topped up by inductive charging from the infrastructure – each system backs up the other, so a failure on either side still allows the vehicle to complete its trip safely.",
      },
    ],
  },
  {
    name: "Costs",
    intro:
      "The European Commission estimates roughly €1,500 billion of transport infrastructure investment is needed across Europe over the next decade, making the long-term value of new solutions like hyperloop an important part of that decision.",
    items: [
      {
        q: "How much will a hyperloop ticket cost?",
        a: "Hyperloop is designed as mass transit with competitive pricing – comparable to a typical commute for shorter distances, and to regular rail or air fares for longer ones.",
      },
      {
        q: "How much does it cost to build a hyperloop system?",
        a: "Implementation costs are expected to be in the same range as high-speed rail (roughly €25–40M per km), though likely lower – a hyperloop tunnel is only about 3.5 m in diameter versus roughly 13 m for two-way rail tunnels, and up to 70% of the route can integrate with existing infrastructure and hubs.",
      },
      {
        q: "How do maintenance costs compare to other modes?",
        a: "Because vehicles never physically touch the track, lane switching involves no moving parts, and the enclosed tube shields the system from weather, wear and maintenance needs are significantly lower than for conventional rail.",
      },
    ],
  },
  {
    name: "Integration",
    items: [
      {
        q: "How does hyperloop fit into busy urban or rural areas?",
        a: "Hyperloop can be built at ground level, elevated, or underground, since the tube is its own tunnel. In dense areas underground routing is likely (though costlier); elevated infrastructure needs only about a 4 m footprint, far less than the roughly 25 m required by high-speed rail.",
      },
      {
        q: "How much noise does hyperloop make?",
        a: "Magnetic levitation removes wheel-rail contact noise, and the near-vacuum tube removes aerodynamic noise – the main remaining source is the vacuum pumps, which can be placed below the surface to further reduce emitted sound.",
      },
    ],
  },
  {
    name: "Environmental Impact",
    items: [
      {
        q: "Would a sustainable aviation industry make hyperloop redundant?",
        a: "Even if aviation fully switches to sustainable fuels, hyperloop's overall energy use would remain roughly an order of magnitude lower, since energy efficiency – not just emissions – is the deciding factor.",
      },
      {
        q: "How much energy does hyperloop use?",
        a: "Estimated at around 40 Wh per passenger-kilometer – roughly an order of magnitude below aviation and comparable to high-speed rail. Losses from magnetic and aerodynamic drag are small, and much of the propulsion energy is recovered during braking.",
      },
      {
        q: "How much CO2 does hyperloop emit during operation?",
        a: "The system runs entirely on electricity, so it produces no direct CO2 emissions. Indirect emissions depend on the electricity mix at the time and place of operation, which is expected to keep getting cleaner.",
      },
    ],
  },
];

function Faq() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Frequently Asked Questions."
        intro="Everything you want to know about the Hyperloop Development Program and hyperloop technology – from safety and travel experience to costs and environmental impact."
        image={tubeLandscape}
        imageLight={tubeLandscapeLight}
        imageAlt="Hyperloop tube stretching across a landscape"
        priority
      />

      <section>
        <div className="mx-auto max-w-[1000px] px-6 py-28 lg:px-10 lg:py-36">
          {categories.map((category, ci) => (
            <div key={category.name} className={ci > 0 ? "mt-20" : ""}>
              <Reveal>
                <SectionHeading
                  eyebrow={`0${ci + 1}`}
                  title={category.name}
                  {...(category.intro ? { intro: category.intro } : {})}
                />
              </Reveal>
              <Reveal delay={0.08}>
                <Accordion type="single" collapsible className="mt-10">
                  {category.items.map((item, i) => (
                    <AccordionItem key={item.q} value={`${ci}-${i}`}>
                      <AccordionTrigger className="text-left text-base font-medium sm:text-lg">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Reveal>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
