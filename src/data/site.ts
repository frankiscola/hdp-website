import { logos } from "./logos";

export type NavItem = { label: string; to: string };


export const navItems: NavItem[] = [
  { label: "About HDP", to: "/about-hdp" },
  { label: "Hyperloop", to: "/hyperloop" },
  { label: "Testing Infrastructure", to: "/testing-infrastructure" },
  { label: "Partners", to: "/partners" },
  { label: "News", to: "/news" },
  { label: "Contact", to: "/contact" },
];

export type PartnerCategory = "Industry" | "Research" | "Infrastructure" | "Public";
export type PartnerTier = "Core" | "Associate";

export type Partner = {
  name: string;
  category: PartnerCategory;
  tier: PartnerTier;
  logo: string;
};

export const partners: Partner[] = [
  { name: "Hardt Hyperloop", category: "Industry", tier: "Core", logo: logos.hardt },
  { name: "Zeleros", category: "Industry", tier: "Core", logo: logos.zeleros },
  { name: "Nevomo", category: "Industry", tier: "Core", logo: logos.nevomo },
  { name: "TSB Transport System Bögl", category: "Industry", tier: "Core", logo: logos.tsb },
  { name: "Tata Steel", category: "Industry", tier: "Core", logo: logos.tataSteel },
  { name: "POSCO", category: "Industry", tier: "Core", logo: logos.posco },
  { name: "Busch Vacuum Solutions", category: "Industry", tier: "Core", logo: logos.busch },
  { name: "Denys", category: "Industry", tier: "Core", logo: logos.denys },
  { name: "Mercon", category: "Industry", tier: "Associate", logo: logos.mercon },
  { name: "Erciyas", category: "Industry", tier: "Associate", logo: logos.erciyas },
  { name: "INTIS", category: "Industry", tier: "Associate", logo: logos.intis },
  {
    name: "Utilities Valves",
    category: "Industry",
    tier: "Associate",
    logo: logos.utilitiesValves,
  },
  { name: "PROSE", category: "Industry", tier: "Associate", logo: logos.prose },
  { name: "Neoways", category: "Industry", tier: "Associate", logo: logos.neoways },
  { name: "Vattenfall", category: "Industry", tier: "Associate", logo: logos.vattenfall },
  { name: "KLM", category: "Industry", tier: "Associate", logo: logos.klm },
  {
    name: "Schweizer Design Consulting",
    category: "Industry",
    tier: "Associate",
    logo: logos.schweizer,
  },
  { name: "TÜV Rheinland", category: "Industry", tier: "Associate", logo: logos.tuvRheinland },
  { name: "GESTE", category: "Industry", tier: "Associate", logo: logos.geste },
  { name: "TUM Hyperloop", category: "Research", tier: "Associate", logo: logos.tumHyperloop },
  { name: "Delft Hyperloop", category: "Research", tier: "Associate", logo: logos.delftHyperloop },
  {
    name: "European Hyperloop Center",
    category: "Infrastructure",
    tier: "Core",
    logo: logos.europeanHyperloopCenter,
  },
  { name: "EuroTube Foundation", category: "Infrastructure", tier: "Core", logo: logos.eurotube },
  {
    name: "Institute of Hyperloop Technology",
    category: "Infrastructure",
    tier: "Core",
    logo: logos.iht,
  },
  {
    name: "Nederlandse Spoorwegen",
    category: "Infrastructure",
    tier: "Associate",
    logo: logos.ns,
  },
  {
    name: "Deutsche Rail",
    category: "Infrastructure",
    tier: "Associate",
    logo: logos.deutscheRail,
  },
  {
    name: "Ministerie van Infrastructuur en Waterstaat",
    category: "Public",
    tier: "Core",
    logo: logos.ministerie,
  },
  {
    name: "Provincie Groningen",
    category: "Public",
    tier: "Core",
    logo: logos.provincieGroningen,
  },
  {
    name: "Niedersächsisches Ministerium für Wissenschaft und Kultur",
    category: "Public",
    tier: "Associate",
    logo: logos.niedersachsisches,
  },
];



export type Facility = {
  name: string;
  location: string;
  href: string;
  focus: string;
  capabilities: string[];
};

export const facilities: Facility[] = [
  {
    name: "European Hyperloop Center",
    location: "Veendam, Netherlands",
    href: "https://hyperloopcenter.eu/",
    focus: "Full-scale testing of vehicles, lane switching and vacuum infrastructure.",
    capabilities: ["420 m test tube", "Lane switch", "Vehicle certification", "Open to all developers"],
  },
  {
    name: "EuroTube DemoTube",
    location: "Switzerland",
    href: "https://eurotube.org/",
    focus: "High-speed research on propulsion, levitation and tube dynamics.",
    capabilities: ["Linear propulsion", "High-speed runs", "Tube structural research", "Academic access"],
  },
  {
    name: "goTube — Institute of Hyperloop Technology",
    location: "Emden, Germany",
    href: "https://iht-emden.de/",
    focus: "Vacuum systems, suspension and component qualification.",
    capabilities: ["Vacuum engineering", "Suspension rigs", "Component testing", "Applied research"],
  },
];

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  body: string[];
};

export const news: NewsItem[] = [
  {
    slug: "hdp-opens-four-strategic-roles",
    title: "HDP opens four strategic roles to join the team",
    date: "27 August 2025",
    category: "Organisation",
    excerpt:
      "As Europe's coordinating platform for hyperloop development, HDP is introducing four positions to accelerate collaboration, innovation and visibility across the continent.",
    body: [
      "The Hyperloop Development Program Foundation is expanding its team. As Europe's coordinating platform for hyperloop development, HDP is introducing four positions to strengthen its foundation and accelerate collaboration, innovation and visibility across the continent.",
      "These four new roles will support HDP's mission with a focus on deepening EU research collaboration, enhancing external communication, securing new funding, and strengthening operations and finance.",
      "Together they form the backbone of a programme that connects more than 25 industry parties, research institutions and public bodies working towards a safe, energy-efficient and commercially viable mode of high-speed transport.",
    ],
  },
  {
    slug: "european-testing-cluster-takes-shape",
    title: "European hyperloop testing cluster takes shape",
    date: "12 June 2025",
    category: "Infrastructure",
    excerpt:
      "Three leading European test sites join forces to align capabilities, standards and research roadmaps for the coming decade.",
    body: [
      "The Hyperloop Testing Infrastructure Cluster brings together leading test facilities in Europe, coordinated by the Hyperloop Development Program.",
      "It includes the European Hyperloop Center, EuroTube's DemoTube facility and the goTube of the Institute of Hyperloop Technology. Each site contributes unique capabilities, ranging from propulsion and suspension systems to vacuum infrastructure and switching mechanisms.",
      "The cluster aims to accelerate innovation, improve coordination and lay the foundation for a pan-European approach to hyperloop development.",
    ],
  },
  {
    slug: "lane-switch-milestone-veendam",
    title: "Lane switch milestone reached at the European Hyperloop Center",
    date: "3 April 2025",
    category: "Technology",
    excerpt:
      "The first full-scale demonstration of vehicle-to-vehicle lane switching marks a decisive step towards network-scale hyperloop operations.",
    body: [
      "Lane switching is what turns a single tube into a network. At the European Hyperloop Center in Veendam, a full-scale demonstration confirmed that a vehicle can change lanes inside a vacuum environment without mechanical track movement.",
      "The result validates years of joint engineering between industry partners and research institutions within the programme, and forms a key input for European standardisation work.",
      "Next steps focus on repeatability at higher speeds and on integrating the switch with vehicle control systems.",
    ],
  },
  {
    slug: "hyperloop-in-eu-transport-policy",
    title: "Hyperloop enters the European transport policy conversation",
    date: "18 January 2025",
    category: "Policy",
    excerpt:
      "Public and private parties align on the regulatory groundwork needed before hyperloop corridors can be planned across borders.",
    body: [
      "A global infrastructure project such as hyperloop can only be achieved when public and private parties cooperate in complementary ways.",
      "Throughout 2024 the programme contributed to European working groups on safety, interoperability and certification, translating engineering evidence from the test cluster into policy-ready material.",
      "The ambition is a shared European framework so that corridors can be designed once and deployed across multiple member states.",
    ],
  },
  {
    slug: "freight-first-corridors-study",
    title: "New study explores freight-first hyperloop corridors",
    date: "9 October 2024",
    category: "Research",
    excerpt:
      "Cargo may be the fastest route to commercial viability. A joint study maps the most promising European corridors.",
    body: [
      "Freight operations impose fewer certification requirements than passenger services while still demanding the same core technology.",
      "The study, carried out with partners from ports, logistics and academia, evaluates corridor demand, energy use and construction cost across Northwest Europe.",
      "Early findings suggest that port-to-hinterland connections offer the strongest business case for a first commercial deployment.",
    ],
  },
];
