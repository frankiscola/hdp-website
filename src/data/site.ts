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
  // Core Members
  {
    name: "European Hyperloop Center",
    category: "Infrastructure",
    tier: "Core",
    logo: logos.europeanHyperloopCenter,
  },
  { name: "EuroTube Foundation", category: "Infrastructure", tier: "Core", logo: logos.eurotube },
  { name: "Hardt Hyperloop", category: "Industry", tier: "Core", logo: logos.hardt },
  { name: "Zeleros", category: "Industry", tier: "Core", logo: logos.zeleros },
  { name: "Denys", category: "Industry", tier: "Core", logo: logos.denys },
  { name: "POSCO", category: "Industry", tier: "Core", logo: logos.posco },
  { name: "Tata Steel", category: "Industry", tier: "Core", logo: logos.tataSteel },

  // Associate Members
  { name: "Delft Hyperloop", category: "Research", tier: "Associate", logo: logos.delftHyperloop },
  { name: "TUM Hyperloop", category: "Research", tier: "Associate", logo: logos.tumHyperloop },
  { name: "ADSE", category: "Industry", tier: "Associate", logo: logos.adse },
  { name: "Berenschot", category: "Industry", tier: "Associate", logo: logos.berenschot },
  {
    name: "Dutch Boosting Group",
    category: "Industry",
    tier: "Associate",
    logo: logos.dutchBoostingGroup,
  },
  { name: "Erciyas", category: "Industry", tier: "Associate", logo: logos.erciyas },
  { name: "GESTE", category: "Industry", tier: "Associate", logo: logos.geste },
  { name: "The Hague", category: "Public", tier: "Associate", logo: logos.hague },
  {
    name: "Hochschule Emden/Leer",
    category: "Research",
    tier: "Associate",
    logo: logos.hochschuleEmdenLeer,
  },
  { name: "Royal IHC", category: "Industry", tier: "Associate", logo: logos.ihc },
  { name: "INTIS", category: "Industry", tier: "Associate", logo: logos.intis },
  { name: "Mercon", category: "Industry", tier: "Associate", logo: logos.mercon },
  {
    name: "Nederlandse Spoorwegen",
    category: "Infrastructure",
    tier: "Associate",
    logo: logos.ns,
  },
  { name: "Nevomo", category: "Industry", tier: "Associate", logo: logos.nevomo },
  {
    name: "Schweizer Design Consulting",
    category: "Industry",
    tier: "Associate",
    logo: logos.schweizer,
  },
  {
    name: "Utilities Valves",
    category: "Industry",
    tier: "Associate",
    logo: logos.utilitiesValves,
  },
  { name: "Vattenfall", category: "Industry", tier: "Associate", logo: logos.vattenfall },
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
      "The new roles cover four areas: turning early-stage ideas from the partner network into funded projects, coordinating the growing European research infrastructure cluster, leading communication and public affairs, and running the Foundation's operations and finance.",
      "Together they form the backbone of a programme that connects more than 25 industry parties, research institutions and public bodies working towards a safe, energy-efficient and commercially viable mode of high-speed transport. Interested candidates can reach out via general@hyperloopdevelopmentprogram.com.",
    ],
  },
  {
    slug: "hyperloop-key-reports-2025",
    title: "HDP publishes its 2024 review and a vision paper for 2025",
    date: "January 2025",
    category: "Publication",
    excerpt:
      "Two new publications set out what the programme achieved in 2024 and the direction it is taking next: a year-in-review report and a vision paper for Europe's sustainable transport goals.",
    body: [
      "HDP has released two documents that together summarise its progress and set out its direction: a 2024 review report and a vision paper on accelerating toward Europe's sustainable transport goals.",
      "The review covers the year's milestones across technology, infrastructure and policy, from progress at the test facilities to advances in lane-switching and regulatory developments.",
      "The vision paper builds on discussions held at the 2024 Partners Day in Dübendorf and lays out the strategic direction for the programme, including alignment with EU policy, a roadmap toward commercialisation, and the sustainability case for hyperloop.",
    ],
  },
  {
    slug: "hyper4rail-kickoff",
    title: "Hyper4Rail research project kicks off",
    date: "5 December 2024",
    category: "Research",
    excerpt:
      "A new European project dedicated to advancing hyperloop technology has officially started.",
    body: [
      "Hyper4Rail, a European research project focused on advancing hyperloop technology, has officially kicked off with partners from across the programme's ecosystem.",
      "The project adds to a growing portfolio of EU-funded research that HDP partners are contributing to as part of the broader push to move hyperloop from testing toward deployment.",
    ],
  },
  {
    slug: "testing-cluster-expands",
    title: "The European hyperloop testing cluster expands",
    date: "9 October 2024",
    category: "Infrastructure",
    excerpt:
      "Partner organisations have signed a Letter of Intent to deepen collaboration across Europe's hyperloop test sites.",
    body: [
      "The Hyperloop Testing Infrastructure Cluster is growing. Partner organisations have signed a Letter of Intent to intensify collaboration across the various test sites coordinated by HDP.",
      "The cluster brings together the European Hyperloop Center, EuroTube's DemoTube and the goTube of the Institute of Hyperloop Technology, each contributing distinct capabilities to the programme's shared research agenda.",
    ],
  },
  {
    slug: "hdp-partners-day-2024",
    title: "Hyperloop ecosystem gathers in Switzerland for the annual Partners Day",
    date: "24 July 2024",
    category: "Organisation",
    excerpt:
      "Over 35 participants from HDP partner organisations met in Dübendorf for a day of discussion, knowledge exchange and strategic planning.",
    body: [
      "On 18 July, EuroTube hosted the annual HDP Partners Day in Dübendorf, Switzerland. The meeting brought together more than 35 participants from partner organisations and other stakeholders for a day of discussion, knowledge exchange and strategic planning.",
      "HDP's Director General at the time, Klaus Rudischhauser, spoke about the importance of cooperation among partners and the programme's role as an intermediary with the public sector, as well as the ongoing European Commission impact assessment on hyperloop regulation.",
    ],
  },
  {
    slug: "ten-t-regulation-revision",
    title: "The EU recognises hyperloop in its transport network policy",
    date: "14 June 2024",
    category: "Policy",
    excerpt:
      "The revised TEN-T regulation names hyperloop among the emerging technologies the trans-European transport network should encourage.",
    body: [
      "The EU's revised TEN-T regulation now explicitly encourages projects that promote and deploy sustainable emerging transport technologies — naming hyperloop as one of the new railway technologies member states should consider.",
      "HDP welcomed the recognition and reaffirmed its intention to work with EU member states, the European Parliament and the European Commission to help turn hyperloop from a research effort into part of a seamless, multimodal European transport network.",
    ],
  },
];
