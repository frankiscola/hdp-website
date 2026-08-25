import { logos } from "./logos";

export type NavItem =
  | { label: string; to: string; hash?: string; children?: undefined }
  | { label: string; to?: undefined; children: { label: string; to: string; hash?: string }[] };

export const navItems: NavItem[] = [
  {
    label: "Program",
    children: [
      { label: "The HDP", to: "/about-hdp" },
      { label: "Research", to: "/research" },
      { label: "The Challenge", to: "/thechallenge-hdp" },
    ],
  },
  { label: "Hyperloop", to: "/hyperloop" },
  { label: "Testing Infrastructure", to: "/testing-infrastructure" },
  { label: "Partners", to: "/partners" },
  {
    label: "Resources",
    children: [
      { label: "News", to: "/news" },
      { label: "Results and Downloads", to: "/results-and-downloads" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    label: "About us",
    children: [
      { label: "Team and Board", to: "/team-and-board" },
      { label: "Open Positions", to: "/open-positions" },
    ],
  },
  { label: "Contact", to: "/contact" },
];

export type BoardMember = { name: string; role: string };

export const executiveBoard: BoardMember[] = [
  { name: "Klaus Rudischhauser", role: "Director General" },
  { name: "Algara Castle", role: "Public Affairs & Communications Lead" },
  { name: "Carlos Villalba", role: "Project Developer" },
  { name: "Matteo Dragoni", role: "Research Infrastructure Cluster Manager" },
];

export const supervisoryBoard: BoardMember[] = [
  { name: "Jeroen in 't Veld", role: "Chair" },
  { name: "Antoine Juge", role: "On behalf of the EuroTube Foundation" },
  { name: "Maarten Vanneste", role: "On behalf of Denys" },
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

export type SupportingGovernment = {
  name: string;
  logo: string;
};

export const supportingGovernments: SupportingGovernment[] = [
  {
    name: "Ministerie van Infrastructuur en Waterstaat",
    logo: logos.ministerieInfrastructuurWaterstaat,
  },
  { name: "Provincie Groningen", logo: logos.provincieGroningen },
  {
    name: "Niedersächsisches Ministerium für Wissenschaft und Kultur",
    logo: logos.niedersachsischesMinisterium,
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
    name: "goTube – Institute of Hyperloop Technology",
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
  image: string;
  body: string[];
};

export const news: NewsItem[] = [
  {
    slug: "uitp-summit-2025-hamburg",
    title: "Advancing Hyperloop Development in Hamburg: UITP Summit 2025",
    date: "19 June 2025",
    category: "Partnership",
    excerpt: "During the UITP Global Public Transport Summit 2025, HDP and its European partners expressed full support for the City of Hamburg's ambition to develop a hyperloop reference track.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1750850735498-FUNAVBTO0X8Q8QTFW7GD/UITP.jpeg",
    body: [
      "During the UITP Global Public Transport Summit 2025, the Hyperloop Development Program (HDP) and its European partners expressed their full support for the City of Hamburg's ambition to develop a Hyperloop reference track.",
      "In a constructive exchange with representatives of the city government, the parties aligned on a shared vision to position the hyperloop track as a flagship project within Hamburg's innovation strategy. The track is also envisioned as a key component of the city's bid to host the Olympic Games.",
      "The City of Hamburg recognizes the Hyperloop Development Program as a strategic partner in mobilizing private finance for the construction and operation of the proposed infrastructure. The development may initially focus on a first-phase extension towards Kiel, strengthening regional connectivity and showcasing hyperloop's potential as a future mode of sustainable high-speed transport.",
      "This dialogue marks a significant step toward realizing a European hyperloop network, and HDP looks forward to continuing its collaboration with the City of Hamburg in the coming years, including a return to the city for the UITP Summit 2027.",
    ],
  },
  {
    slug: "hyperloop-key-reports-2025",
    title: "Hyperloop development: a look at progress and future plans",
    date: "17 January 2025",
    category: "Research",
    excerpt: "HDP publishes two critical documents: 'Hyperloop in Review - January 2025' and the 'HDP Vision Paper - Accelerating Toward Europe's Goal of Sustainable Transport'.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1737107843666-0XF5XAGNX3K5VHV52C1Z/HDP+Partners+Day+2024+02.jpg",
    body: [
      "The Hyperloop Development Program (HDP) is excited to announce the publication of two critical documents that together encapsulate our progress and vision for the future: 'Hyperloop in Review - January 2025' and 'HDP Vision Paper - Accelerating Toward Europe's Goal of Sustainable Transport'.",
      "As we look back on 2024's remarkable milestones and forward to the challenges and opportunities ahead, these publications serve as a comprehensive resource for stakeholders, researchers, and anyone passionate about the future of mobility.",
      "The Hyperloop in Review report chronicles the achievements of 2024, highlighting the strides made in hyperloop technology, infrastructure, and policy, from cutting-edge test facilities to advancements in lane-switching and regulatory updates including the TEN-T regulation.",
      "While the Review looks back, the HDP Vision Paper looks ahead. Discussions on a shared vision for hyperloop development were launched during the HDP Partners Day in July 2024 in Dübendorf, Switzerland, and culminated in a forward-thinking document published in December 2024 outlining the strategic direction needed to achieve hyperloop's potential as a cornerstone of Europe's sustainable transport strategy.",
      "As hyperloop gains traction in the public and private sectors, its potential to complement the existing transport network becomes increasingly evident. By leveraging innovation, collaboration, and policy alignment, HDP is determined to make hyperloop not just a concept but a critical part of the European and global transport network.",
    ],
  },
  {
    slug: "hyper4rail-kicked-off",
    title: "Hyper4Rail has kicked off — a groundbreaking European project to advance hyperloop technology",
    date: "5 December 2024",
    category: "Research",
    excerpt: "A new EU research project, co-funded by Europe's Rail Joint Undertaking, unites 27 organisations across 13 countries to build a common hyperloop design framework.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1750849805686-EPLJB13T1VTFDM40828G/Hyper4Rail-update.jpeg",
    body: [
      "Co-funded by the Europe's Rail Joint Undertaking (EU-Rail), Hyper4Rail is aimed at advancing the development of hyperloop, a concept for magnetically levitated trains running at high speeds inside nearly airless tubes. Coordinated by the Hyperloop Development Program, the 24-month project launched on 1 December 2024 in Munich, Germany.",
      "A consortium of 27 organisations across 13 countries — including hyperloop developers, rail operators, infrastructure managers, engineering companies and research institutions — unites expertise from multiple sectors in a research collaboration under Flagship Area 7, focused on innovation in new approaches for guided transport modes.",
      "As hyperloop technology is still in its early stages and there is a lack of standardisation across developers, Hyper4Rail offers the opportunity to build consensus on industrialisation, safety, regulatory and technical frameworks through a structured, all-stakeholder approach. The project will focus on hyperloop design definitions at Technology Readiness Level (TRL) 2, followed by validation of key subsystems at TRL 4.",
      "“We are excited to coordinate the project with such a wide array of organisations from the rail sector, and other industries in this first-ever industry-wide consortium,” said Sascha Lamme, Program Director of the Hyperloop Development Program. “By harmonising our efforts, we are building a unified framework for the future implementation of hyperloop technology.”",
      "Once Hyper4Rail is completed, attention will shift toward large-scale demonstrators, further collaboration within the industry, and pilot implementations, with the goal of hyperloop technology being industrialised and deployed at scale by the 2030s.",
    ],
  },
  {
    slug: "european-hyperloop-testing-infrastructure-expanding",
    title: "European hyperloop testing infrastructure is expanding",
    date: "9 October 2024",
    category: "Infrastructure",
    excerpt: "The Institute of Hyperloop Technology has joined the European Hyperloop Testing Infrastructure Cluster, coordinated by HDP alongside the European Hyperloop Center and EuroTube.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1728463209930-NGN8TDA1HM6PACRQCGTG/European+Hyperloop+Testing+Infrastructure+Cluster+background.png",
    body: [
      "Following the initiative by the European Hyperloop Center and EuroTube at the start of 2024, the Institute of Hyperloop Technology has now joined the European Hyperloop Testing Infrastructure Cluster. The collaboration of organizations in Germany, the Netherlands and Switzerland is coordinated by the Hyperloop Development Program, with the objective to significantly accelerate progress toward the realization of sustainable high-speed transportation systems across Europe.",
      "In a Letter of Intent signed by HDP, the European Hyperloop Center, EuroTube, and the Institute of Hyperloop Technology — part of the University of Applied Sciences Emden/Leer — a clear commitment has been made to support the further establishment of a testing cluster to advance research and development in hyperloop technology.",
      "The European Hyperloop Center focuses on testing electromagnetic suspension systems, vehicle-based propulsion technologies, switching systems and the viability of steel tubes for hyperloop transport. EuroTube's DemoTube facility will allow testing of the first hyperloop valve and the concept of sealed, post-tensioned concrete tubes. The Institute of Hyperloop Technology's goTube facility is a steel-based pipe with quick evacuation capabilities, providing infrastructure for testing propulsion systems and different vehicle concepts.",
      "The collaboration within the cluster enables all partners to pool their expertise and resources, resulting in greater efficiency and innovation. The ultimate aim is to create an equivalent of a 'European Space Agency' for hyperloop, with decentralized test sites across Europe, opening doors for increased funding and investment opportunities.",
    ],
  },
  {
    slug: "growing-public-support-for-hyperloop",
    title: "Growing public support for hyperloop technology",
    date: "20 September 2024",
    category: "Policy",
    excerpt: "Public sector support for hyperloop technology continues to rise, fueled by the Hyperloop Public Day in Brussels, EU endorsements and Mario Draghi's call for innovation.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1726821662808-SAOQVT6MKB4SUGYEZY2L/European+Hyperloop+Center+9.jpg",
    body: [
      "This month marked a significant leap forward for hyperloop technology, as public sector support continued to expand, fuelled by recent technological breakthroughs and high-profile endorsements across Europe.",
      "A standout event was the Hyperloop Public Day held at the Dutch Embassy in Brussels on 16 September, hosted by the Benelux Union and the Dutch Ministry of Infrastructure and Water Management. At the core of the discussions was the release of a new report: 'Hyperloop in the Benelux: Opportunities for Cross-Border Connectivity and High-Tech Cluster Development', positioning the Benelux region as a high-tech cluster for future hyperloop advancements.",
      "On the European Union front, Ursula von der Leyen, President of the European Commission, unveiled her priorities for the upcoming mandate, with sustainable transport plans featuring hyperloop technology as an addition to Europe's future infrastructure. Her proposal includes a request for Commissioner-designate Apostolos Tzitzikostas to present a timeline and investment plan to bring hyperloop closer to reality.",
      "Former Italian Prime Minister Mario Draghi also lent his voice to the promotion of high-tech industry, identifying hyperloop as a groundbreaking solution for Europe's transportation landscape. Meanwhile, in the Northern Netherlands, Dutch universities, educational institutions and SMEs have teamed up with the European Hyperloop Center on research and development, following the first successful test at the centre.",
    ],
  },
  {
    slug: "hdp-partners-day-2024-switzerland",
    title: "Hyperloop ecosystem gathers in Switzerland for annual Partners Day",
    date: "24 July 2024",
    category: "Organisation",
    excerpt: "Over 35 participants from HDP partner organizations gathered in Dübendorf, Switzerland, for discussion, knowledge exchange and strategic planning during European Hyperloop Week.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1721830975841-OBHE91JZFKINDAJAGCJM/HDP%2BPartners%2BDay%2B2024%2B04.jpg",
    body: [
      "On July 18th, EuroTube hosted the annual HDP Partners Day in Dübendorf, Switzerland. The meeting was kicked off by Jeroen in 't Veld, chairman of the Hyperloop Development Program, highlighting the significance of the meeting coinciding with European Hyperloop Week. Over 35 participants from HDP partner organizations and other committed stakeholders gathered to foster collaboration.",
      "Klaus Rudischhauser, Director General of HDP, emphasized the importance of cooperation among partners and the role of HDP as intermediary with the public sector, and addressed the TEN-T regulation in which hyperloop has recently been identified as a new railway technology. Sascha Lamme, Program Director, welcomed new HDP Partners Busch and Erciyas, and highlighted the completion of the European Hyperloop Center (EHC).",
      "A key focus of the discussions was the development of a HDP Storyline — a common narrative to convey the benefits and potential of hyperloop technology — covering safety, technology adoption, public accessibility and the need for a business-oriented approach.",
      "As the meeting concluded, a sense of optimism dominated: towards the end of the year new testing facilities were set to come into being with the DemoTube in Switzerland and the goTube in Germany, with more insights shared in the Hyperloop in Review report.",
    ],
  },
  {
    slug: "delft-hyperloop-lane-switch",
    title: "Delft Hyperloop demonstrates lane switch technology",
    date: "21 June 2024",
    category: "Technology",
    excerpt: "The Delft Hyperloop Helios III pod successfully took a lane switch while levitated in a scaled hyperloop test infrastructure — a key requirement for a future hyperloop network.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1718956788767-ANI3DFRB3FEZQYXQKGCZ/2024_06_11_Hyperloop+Pod+Reveal-165.jpg",
    body: [
      "In June 2024, Delft Hyperloop showcased their hyperloop pod taking a lane switch during a highly anticipated demonstration event. The Delft Hyperloop Helios III pod successfully took a lane switch while being levitated in a scaled hyperloop test infrastructure of 63 metres in length.",
      "“The achievement of successfully testing lane switch is an essential requirement for a future hyperloop network in Europe,” said Cem Celikas, Team Captain of Delft Hyperloop. The lane switch was demonstrated again during European Hyperloop Week in Switzerland that summer, alongside presentations on the research performed on the infrastructure.",
      "Since its start, hyperloop technology developers within the Hyperloop Development Program have worked on lane switch technology. In 2019, the first lane switch was developed and demonstrated in Delft within a single low-pressure tube of 30 metres. In 2024, at the European Hyperloop Center, lane switch technology is being tested within an enclosed test infrastructure of 420 metres in length.",
      "Founded in 2016, Delft Hyperloop is a student team continuously developing a climate-neutral, scalable hyperloop system, with its composition changing every academic year.",
    ],
  },
  {
    slug: "ten-t-regulation-recognizes-hyperloop",
    title: "EU recognizes hyperloop in its transport network policy",
    date: "14 June 2024",
    category: "Policy",
    excerpt: "The Council of the European Union adopted the revised TEN-T regulation, identifying hyperloop as a project of common interest for a sustainable, interconnected transport network.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1718351997968-L9X0HISPORVO4H7EHFMK/tent+regulation+logo.png",
    body: [
      "On June 13th, the Council of the European Union adopted the revised legislation for the Trans-European Transport Network (TEN-T), including the mentioning of hyperloop. The new law aims to build a reliable, seamless and high-quality transport network that ensures sustainable connectivity across Europe.",
      "The Council's decision follows the approval by the European Parliament earlier in the year and marks a milestone for the future of continental transportation. Hyperloop has been identified as a project of common interest and an opportunity for fostering an interconnected and innovative transport network.",
      "The Hyperloop Development Program (HDP) is particularly pleased that the regulation stresses the need for the trans-European transport network to keep up with innovative technological developments, encouraging Member States to promote and deploy sustainable emerging technologies such as hyperloop.",
      "HDP looks forward to collaborating with EU Member States, the European Parliament, the European Commission and other stakeholders to turn the vision of hyperloop into reality, creating a seamless, advanced and multimodal transport network that benefits everyone.",
    ],
  },
  {
    slug: "eurotube-starts-assembly-demotube",
    title: "EuroTube starts assembly of its hyperloop test facility",
    date: "22 May 2024",
    category: "Infrastructure",
    excerpt: "EuroTube, based in Zurich, has started setting up DemoTube, a 120-metre hyperloop test facility made of post-tensioned fibre-reinforced concrete segments.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1716371062307-QVUOOEH85MR3TF4EF48I/DemoTube+Projektstart-7.jpg",
    body: [
      "EuroTube, a research institute based in Zurich, Switzerland, has started setting up its hyperloop test facility. The new research infrastructure, named DemoTube, is part of the Hyperloop Development Program's EU Research Infrastructure and is expected to be fully completed by the end of 2025.",
      "The DemoTube entails a tube spanning 120 metres. A vacuum chamber and airlock are being built first. With the new facility, EuroTube aims to set a benchmark in future vacuum transport mobility with the first test facility of its length made of innovative composite material — post-tensioned fibre-reinforced concrete segments coated in a sealant to ensure vacuum properties.",
      "“We are very proud to have reached this milestone and to provide a first insight into how a new means of transport for a sustainable future could look,” said Doré de Morsier, founder and chairman of the EuroTube Foundation. “With DemoTube we also want to use this research at the Dübendorf site to get the public excited about sustainable technologies in the transport sector.”",
      "The DemoTube is being built at the Innovation Park Zurich, located in Dübendorf, Switzerland, and will accommodate different standing vehicle designs.",
    ],
  },
  {
    slug: "iht-develops-gotube",
    title: "Institute of Hyperloop Technology develops hyperloop demonstrator",
    date: "29 April 2024",
    category: "Infrastructure",
    excerpt: "The Institute of Hyperloop Technology in Emden, Germany, is bringing a new demonstrator to reality: GoTube, a 26-metre facility for cost-efficient freight transport research.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1713875467167-C4LZKBZB8YT77KACY5F4/IHT+GoTube+01.jpg",
    body: [
      "The Institute of Hyperloop Technology (IHT), located in Emden, Germany, is bringing a new hyperloop demonstrator to reality: GoTube. This research infrastructure, to be inaugurated in 2024, is aimed at performing tests for low-pressure tube transport, with the demonstrator targeting solutions for cost-efficient freight transport.",
      "The tube will have a length of 26 metres. Anchored by foundations extending 16 metres deep, the structure is designed to prevent any settling despite its substantial mass. Three robust concrete pillars have already been erected to support the tube.",
      "HDP partners Hochschule Emden/Leer and Nevomo are collaborating on the GoTube demonstrator, with Nevomo's magnetic propulsion technology and power electronics enhancing GoTube's capability. The progress of GoTube was officially celebrated in autumn 2024 with a ceremonial inauguration event, marking the beginning of a series of tests as part of innovation within freight transport.",
      "The IHT specializes in the research and development of high-speed transport solutions within low-pressure environments, aiming to substantially enhance the efficiency and sustainability of transport and freight logistics.",
    ],
  },
  {
    slug: "ehc-global-news-coverage",
    title: "European Hyperloop Center draws global news coverage",
    date: "28 March 2024",
    category: "Infrastructure",
    excerpt: "The unveiling of the European Hyperloop Center's test infrastructure received international attention, including from The Guardian, BFM Business and The Washington Post.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1711631727080-XJUMOHTT6NKKM50K0W9W/European+Hyperloop+Center.png",
    body: [
      "This week marked a significant milestone for the Hyperloop Development Program. The European Hyperloop Center (EHC) has unveiled its infrastructure, now fully equipped for testing and demonstrating — an essential next step for developing hyperloop as a new energy-efficient transport mode.",
      "The activities at the EHC's Veendam location, in the Netherlands, will be through open innovation, with developers and research institutes from around the world invited to participate. The unveiling of the newly built testing infrastructure received international attention from media, including The Guardian, BFM Business and The Washington Post.",
      "The Guardian's transport correspondent Gwyn Topham noted that the EHC is Europe's longest hyperloop test track, which could help Europe's innovation keep up with developments in China. BFM Business, a leading French TV news channel, underscored that the EHC is the only hyperloop testing centre that includes a lane switch, a necessity for connectivity between cities and regions in a transport network.",
      "The Washington Post's business section covered technical aspects, including the 34 separate sections of 2.5 metres in diameter, and the low-pressure environment needed to reduce air resistance and allow vehicles to travel fast. Partners are set to commence their first tests in the coming weeks.",
    ],
  },
  {
    slug: "hdp-supports-eu-regulatory-framework",
    title: "Hyperloop Development Program supports EU regulatory framework for hyperloop",
    date: "18 March 2024",
    category: "Policy",
    excerpt: "HDP fully supports the introduction of an EU regulatory framework for hyperloop by the European Commission, following its 2023 work programme and the ongoing impact assessment.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1710758812486-P6JX97XEBRC13SFUX8UB/HDP+position+paper+background.png",
    body: [
      "The Hyperloop Development Program (HDP) fully supports the introduction of the EU regulatory framework for hyperloop by the European Commission, following the announcement in its 2023 work programme and the ongoing impact assessment.",
      "A dedicated regulatory framework is considered one of the most important steps for the hyperloop sector to move from testing and demonstration towards certified, commercially viable operations across the European Union, and HDP has published a position paper setting out its recommendations to policymakers.",
    ],
  },
  {
    slug: "busch-joins-hdp",
    title: "Busch joins the Hyperloop Development Program",
    date: "11 March 2024",
    category: "Partnership",
    excerpt: "Busch Vacuum Solutions, a leading manufacturer of vacuum pumps, has joined HDP and will continue providing vacuum technology for hyperloop infrastructure.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1710147949958-1C1GSXYITK561W1RENIX/Busch+and+HDP.png",
    body: [
      "Busch Vacuum Solutions, a leading manufacturer of vacuum pumps, has joined as a partner of the Hyperloop Development Program. Busch has already supported hyperloop development in the past and will continue to do so, most importantly by providing vacuum technology for hyperloop infrastructure.",
      "“Becoming a partner of the Hyperloop Development Program represents a significant milestone in our hyperloop journey. Since 2019, Busch Vacuum Solutions has already provided a vacuum system for the low-speed test facility of Hardt Hyperloop,” said Rob Liefting, Sales Manager at Busch Vacuum Solutions. Busch is committed to further contribute with its expertise and equipment, most notably for the European Hyperloop Center (EHC), whose new 420-metre test track has recently been constructed in the Northern Netherlands.",
      "“We are excited to welcome Busch Vacuum Solutions as a partner to the Hyperloop Development Program, and look very much forward to involving the company in the project of the European Hyperloop Center,” added Sascha Lamme, Program Director at HDP.",
    ],
  },
  {
    slug: "erciyas-joins-hdp",
    title: "Investment group Erciyas joins the Hyperloop Development Program",
    date: "22 February 2024",
    category: "Partnership",
    excerpt: "Erciyas, a leading Turkish conglomerate and large-diameter tube manufacturer with 35 years of pipe manufacturing expertise, has joined HDP.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1708611993323-8SCTKSC29JWBSCN009I0/Erciyas+joins+as+HDP+Partner+-+February+2024.png",
    body: [
      "Erciyas, a leading Turkish conglomerate and large-diameter tube mass manufacturer, has joined the Hyperloop Development Program. The partnership was signed and announced at the Hello Tomorrow Türkiye event in Istanbul.",
      "As a keen hyperloop developer, Erciyas mainly brings to the table 35 years of expertise in pipe manufacturing — a critical component in hyperloop infrastructure. Over the years, Erciyas Holding has grown into an investment group active in steel pipes, railways, logistics, energy and mobility, alongside its commitment to innovation, high quality and sustainability.",
      "The Hyperloop Development Program is grateful to embark on this journey with Erciyas, and looks forward to the synergy that the combined expertise brings to making the hyperloop a reality.",
    ],
  },
  {
    slug: "klaus-rudischhauser-general-director",
    title: "The Hyperloop Development Program welcomes Klaus Rudischhauser as General Director",
    date: "16 February 2024",
    category: "Organisation",
    excerpt: "Klaus Rudischhauser, with a career at the European Commission spanning transport, international cooperation and diplomacy, has started as HDP's General Director.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1708089058365-IVDVC7MOVVGUFJ872RO5/Slide1.JPG",
    body: [
      "The Hyperloop Development Program is glad to announce that Klaus Rudischhauser has started as General Director. Klaus has been with the European Commission since 1989, and was among others Head of Department in the Directorate-General for Transport and Energy, where he was responsible for the Trans-European Transport Networks.",
      "Afterward, he was Deputy Director-General for International Cooperation and Development, responsible for general EU development policy and international cooperation. Most recently, he served as Ambassador Extraordinary and Plenipotentiary as head of the Delegation of the European Union in Mexico.",
      "Klaus' expertise spans transportation, international development, policy and public affairs. Combined with his long-lasting ties to the European Commission, he will be of key importance in taking the Hyperloop Development Program to the next level.",
    ],
  },
  {
    slug: "hyperloop-institutes-switzerland-netherlands-research-cluster",
    title: "Hyperloop institutes from Switzerland and the Netherlands start a European research infrastructure cluster",
    date: "8 February 2024",
    category: "Infrastructure",
    excerpt: "A groundbreaking partnership between HDP, the Swiss EuroTube Foundation and the European Hyperloop Center lays the foundation for a shared European research infrastructure cluster.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1707315923794-IVMFDJEEC1BMXO905F81/IMG_4301.jpeg",
    body: [
      "We are thrilled to announce a groundbreaking partnership between the Hyperloop Development Program (HDP), the Swiss EuroTube Foundation, and the European Hyperloop Center, marking the start of a shared European research infrastructure cluster for hyperloop.",
      "Together with more than 25 partner organisations, HDP accelerates the development and adoption of hyperloop technology in Europe and beyond, bringing together innovative companies, research institutes and industry leaders from both the Netherlands and Switzerland.",
      "By combining the test capabilities of institutes in Switzerland and the Netherlands, the cluster lays the groundwork for a coordinated, pan-European approach to hyperloop research — pooling knowledge, infrastructure and funding opportunities rather than duplicating effort at each individual site.",
    ],
  },
  {
    slug: "hdp-seeks-general-director",
    title: "HDP seeks General Director",
    date: "22 November 2023",
    category: "Organisation",
    excerpt: "The Hyperloop Development Program is looking for a new General Director to start from January 2024, to lead the programme's next phase of growth.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1700657228640-32PNLXDAZKHH4PN8CY9C/HDP+opportunity2.png",
    body: [
      "The Hyperloop Development Program is looking for a new General Director starting from January 2024, to lead the coordination of Europe's public-private hyperloop ecosystem into its next phase.",
      "The role calls for a leader able to bridge industry, research institutions and public authorities, building on HDP's position as the coordinating platform for more than 25 partner organisations across Europe.",
    ],
  },
  {
    slug: "ep-transport-committee-visits-hdp",
    title: "European Parliament's transport committee visits hyperloop development",
    date: "8 November 2023",
    category: "Policy",
    excerpt: "The European Parliament's Transport Committee visited hyperloop development in Rotterdam, engaging directly with the technology and its European roadmap.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1699433305833-DK0I1UOK5A4M6EZ4RT2J/2023-11-07+TRAN+visit+05.jpg",
    body: [
      "The European Parliament's Transport Committee (TRAN) visited hyperloop development in Rotterdam, gaining first-hand insight into the technology's progress and its role within the broader European transport agenda.",
      "Members of the committee met with representatives of the Hyperloop Development Program and its partners to discuss the regulatory groundwork, testing infrastructure and policy support needed to bring hyperloop corridors closer to reality across the continent.",
    ],
  },
  {
    slug: "zeleros-joins-hdp",
    title: "Zeleros strengthens European hyperloop ecosystem by joining the HDP",
    date: "7 November 2023",
    category: "Partnership",
    excerpt: "At the European Hyperloop Center kick-off event, Spanish hyperloop developer Zeleros joined HDP together with its partners and stakeholders.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1699260973904-PFJ9H6FHG5ROFX6ZOBQ6/Official-Zeleros.jpg",
    body: [
      "At the European Hyperloop Center (EHC) Kick-off Event, the Hyperloop Development Program (HDP), together with its partners, stakeholders and the wider hyperloop community, welcomed Zeleros as a new HDP partner.",
      "Zeleros, the Valencia-based hyperloop developer, brings its own vehicle and propulsion technology to the programme, strengthening the diversity of technical approaches represented within the European hyperloop ecosystem and reinforcing HDP's role as a coordinating platform for the sector.",
    ],
  },
  {
    slug: "hdp-presents-findings-spatial-planning-report",
    title: "HDP presents findings on spatial planning for hyperloop",
    date: "3 November 2023",
    category: "Research",
    excerpt: "The results of spatial planning workshops on hyperloop were officially presented to Mark Harbers, the Dutch Minister of Infrastructure and Water Management, at the Innovation Expo in Rotterdam.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1699001952255-MMC33UXJKCI6KVVPWIHA/Hand+over+of+spatial+planning+report+to+Minister+Harbers.jpg",
    body: [
      "The results of the spatial planning workshops about hyperloop were officially presented to Mark Harbers, the Dutch Minister of Infrastructure and Water Management, at the Innovation Expo event in Rotterdam.",
      "The workshops explored how hyperloop infrastructure could be integrated into the Dutch landscape and existing transport corridors, providing government and other stakeholders with practical insight into the spatial planning implications of a future hyperloop network.",
    ],
  },
  {
    slug: "ehc-kick-off-veendam",
    title: "European Hyperloop Center marks its kick-off in Veendam, Groningen",
    date: "27 September 2023",
    category: "Infrastructure",
    excerpt: "At the European Hyperloop Center kick-off event in Veendam, HDP and its partners celebrated the start of construction of Europe's leading hyperloop test facility.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1696587287524-SE8NVNYM2NXK6BVC62LS/YM_EHCkickoff_106.jpg",
    body: [
      "At the European Hyperloop Center (EHC) Kick-off Event in Veendam, in the province of Groningen, the Hyperloop Development Program, together with its partners, stakeholders and regional authorities, celebrated the start of construction of Europe's leading hyperloop test facility.",
      "The EHC is envisioned as an open innovation hub with a 420-metre test track and a full-scale lane switch, allowing hyperloop developers from across Europe to test and validate their technologies at a shared, publicly accessible facility.",
    ],
  },
  {
    slug: "hyperconnected-europe-community-growing",
    title: "The Hyperconnected Europe community is growing with more cities and regions",
    date: "24 August 2023",
    category: "Research",
    excerpt: "Berenschot completes its second exploratory study, Outlook II, giving governments and other parties fresh insight into the growing Hyperconnected Europe community of cities and regions.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/14a66f0c-eb30-4ab3-9147-4711d8e114cc/ezgif-3-f916baa371.jpg",
    body: [
      "As a partner in the Hyperloop Development Program, Berenschot has completed its second exploratory study, known as Outlook II. This Outlook II provides governments and other parties with insight into how the Hyperconnected Europe community of cities and regions is expanding.",
      "More cities and regions across Europe are joining the initiative to jointly shape a vision for a future hyperloop network, reflecting growing local and regional interest in the technology's potential to improve cross-border connectivity.",
    ],
  },
  {
    slug: "berenschot-second-exploratory-study",
    title: "Berenschot completes second exploratory study for Hyperloop Development Program",
    date: "4 April 2023",
    category: "Research",
    excerpt: "The Ministry of Science and Culture of Lower Saxony and the Province of Groningen sign a Letter of Intent, as HDP participants back the creation of a cross-border research corridor.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1694175327998-4YPK4ICDM6TVEIQ7ZGVD/Article+2.png",
    body: [
      "The Ministry of Science and Culture of Lower Saxony and the Province of Groningen signed a Letter of Intent, with Hyperloop Development Program participants indicating support for the creation of a joint research and testing corridor spanning the German-Dutch border region.",
      "The agreement builds on the second exploratory study completed by Berenschot for the programme, which examined the practical and institutional steps needed to deepen cross-border collaboration on hyperloop development between the two regions.",
    ],
  },
  {
    slug: "hyperloop-66-percent-flights-2050",
    title: "Hyperloop could replace 66% of European flights in 2050 — Hyperconnected Europe vision paper shows",
    date: "16 September 2022",
    category: "Research",
    excerpt: "The 'Hyperconnected Europe' vision paper outlines a future 25,000-kilometre European hyperloop network and its potential to replace two-thirds of short-haul flights by 2050.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/8c951261-9d79-4004-9283-9a4e46d23e67/Article+4.png",
    body: [
      "The 'Hyperconnected Europe' vision paper, published by the Hyperloop Development Program, outlines the future European hyperloop system and its benefits. The paper shows that a 25,000-kilometre network could connect major European cities and regions in a single high-speed, low-emission system.",
      "According to the study's projections, such a network could replace as much as 66% of European short-haul flights by 2050, offering a faster and more sustainable alternative for medium-distance passenger and freight journeys across the continent.",
    ],
  },
  {
    slug: "german-dutch-cross-border-collaboration",
    title: "German and Dutch institutions formalize intent to promote hyperloop research and development in first cross-border collaboration",
    date: "11 July 2022",
    category: "Partnership",
    excerpt: "German and Dutch institutions formalise their intent to jointly promote hyperloop research and development, marking the programme's first formal cross-border collaboration.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/7efb5ca9-b9b0-4c37-8c47-6a16cd5515e2/Article+3.png",
    body: [
      "German and Dutch institutions have formalized their intent to promote hyperloop research and development in the programme's first cross-border collaboration, laying the groundwork for shared testing infrastructure and knowledge exchange between the two countries.",
      "The agreement reflects the ambition set out in the 'Hyperconnected Europe' vision paper, published by the Hyperloop Development Program, which outlines a future European hyperloop system that connects cities and regions across national borders through a 25,000-kilometre network.",
    ],
  },
  {
    slug: "intis-joins-hdp",
    title: "INTIS joins Hyperloop Development Program to continue innovation research",
    date: "30 June 2022",
    category: "Partnership",
    excerpt: "INTIS GmbH, a German subsidiary of test and engineering service provider IABG, joins HDP to contribute to the growing transport and energy markets around hyperloop.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1694175831995-VRO5VIXQ76WW1KGK8UXG/Article%2B5.jpg",
    body: [
      "INTIS GmbH, a German company and a 100% subsidiary of the Munich-based test and engineering service provider IABG mbH, has joined the Hyperloop Development Program. INTIS caters to the growing transport and energy markets, bringing specialised engineering and testing expertise to the programme's research activities.",
      "The partnership adds further technical depth to HDP's network of industry and research partners working on the components and systems needed to bring hyperloop technology from concept to commercial reality.",
    ],
  },
  {
    slug: "visit-ministry-economic-affairs-delft",
    title: "Visit Ministry Economic Affairs testing facilities in Delft",
    date: "22 April 2022",
    category: "Policy",
    excerpt: "Officials from the innovation department of the Dutch Ministry of Economic Affairs and Climate Policy visited the hyperloop testing facilities in Delft.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1694176066012-65CK8PEQS6HRGF87OL2F/Article+6.jpg",
    body: [
      "A group of officials from the innovation department of the Ministry of Economic Affairs and Climate Policy — Ministerie van Economische Zaken en Klimaat — visited the hyperloop testing facilities in Delft, gaining a first-hand view of the technology under development.",
      "The visit forms part of the Dutch government's ongoing engagement with the Hyperloop Development Program, supporting the assessment of hyperloop's potential role within the country's future transport and innovation policy.",
    ],
  },
  {
    slug: "fieldworks-ehc-started",
    title: "Fieldworks EHC started",
    date: "22 March 2022",
    category: "Infrastructure",
    excerpt: "Fieldworks with soil investigations have started for the European Hyperloop Center Phase A on the site of HUSA Logistics in Veendam, Groningen.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1694176393023-KG6ZKRQ4MZG0DEXJVCOB/Article+7.jpg",
    body: [
      "Fieldworks have started with soil investigations for the European Hyperloop Center Phase A on the site of HUSA Logistics in Veendam, in the province of Groningen. The ground conditions need to be confirmed suitable ahead of construction.",
      "These early works mark a practical first step on site, following the selection of Veendam as the location for the European Hyperloop Center, paving the way for the construction phase of the test facility.",
    ],
  },
  {
    slug: "hdp-welcomes-denys-unstudio-mercon",
    title: "The HDP welcomes three partners DENYS, UNStudio, and Mercon to the program",
    date: "2 March 2022",
    category: "Partnership",
    excerpt: "HDP has signed agreements with three new partners — Denys as Core Program Partner, UNStudio as Work Package Partner, and Mercon — to join the network.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/1711a6a8-dfc7-48e0-89aa-a1336ef30f81/Article+8.jpg",
    body: [
      "HDP has signed agreements with three new partners to join the network of the Hyperloop Development Program: Denys, as Core Program Partner; UNStudio, as Work Package Partner; and Mercon.",
      "The three organisations bring complementary expertise in infrastructure construction, architecture and design, and steel structures respectively, further broadening the value chain represented within the HDP partner network as it works towards realising hyperloop as a new transport modality.",
    ],
  },
  {
    slug: "ehc-in-gesprek-husa-logistics-veendam",
    title: "European Hyperloop Center in gesprek met HUSA Logistics over tijdelijke locatie hyperloop testbaan in Veendam",
    date: "28 February 2022",
    category: "Infrastructure",
    excerpt: "Na de toekenning van 15 miljoen euro vanuit de Europese Commissie is er vaart gekomen in de ontwikkeling van het testcentrum voor de hyperloop in Groningen, in gesprek met HUSA Logistics.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/c56fb4ad-aba0-4345-8c5b-170a5e8112fc/Article+9.jpg",
    body: [
      "Na de toekenning eind 2021 van 15 miljoen euro vanuit de Europese Commissie is er vaart gekomen in de ontwikkeling van het testcentrum voor de hyperloop in Groningen. In Meerstad-gebied wordt gesproken met HUSA Logistics over een tijdelijke locatie voor de hyperloop testbaan in Veendam.",
      "De gesprekken maken deel uit van de voorbereidingen om het European Hyperloop Center zo snel mogelijk operationeel te krijgen, terwijl de definitieve locatie verder wordt ontwikkeld.",
    ],
  },
  {
    slug: "hyperconnected-europe-joint-vision",
    title: "'Hyperconnected Europe' brings together cities and regions to create a joint vision of hyperloop network across the continent",
    date: "9 February 2022",
    category: "Research",
    excerpt: "The Hyperconnected Europe initiative is a community of cities and regions jointly creating a vision for the European hyperloop network, established by the world's largest hyperloop public-private partnership.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/819b9e38-3ba1-4a2a-b748-3e59d0dca54d/Article+10.jpg",
    body: [
      "The Hyperconnected Europe initiative is a community of cities and regions jointly creating a vision for the European hyperloop network. It is established by the world's largest public-private partnership around hyperloop, the Hyperloop Development Program.",
      "Through the initiative, participating cities and regions contribute local knowledge and ambitions to a shared, continent-wide vision of how a future hyperloop network could connect Europe, complementing the technical and infrastructure work carried out by HDP's industry and research partners.",
    ],
  },
  {
    slug: "tuv-rheinland-certification-roadmap",
    title: "TÜV Rheinland develops Certification Roadmap for Hyperloop development",
    date: "3 January 2022",
    category: "Policy",
    excerpt: "TÜV Rheinland, specialist in international product certification, created a Certification Roadmap for HDP, in support of the future test and knowledge centre in Groningen.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/5809ff98-740a-4a0a-bec5-9663d585e739/Article+11.png",
    body: [
      "TÜV Rheinland, specialist in international product certification, recently created a 'Certification Roadmap' for the Hyperloop Development Program. In Groningen, a test and knowledge centre for the hyperloop will be realized, and certification is a key step on the path towards commercial deployment.",
      "The roadmap sets out the process and milestones required to bring hyperloop technology and infrastructure up to the safety and quality standards needed for certification, providing HDP partners with a clear framework to work towards.",
    ],
  },
  {
    slug: "berenschot-first-exploratory-study",
    title: "Berenschot presents first exploratory study for Hyperloop development pathway",
    date: "17 December 2021",
    category: "Research",
    excerpt: "Berenschot presented its first Outlook study to give governments and other parties insight into the current status and potential development pathway of hyperloop.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/97b57c6c-e325-4346-9554-dd807b78ad23/Article+12.png",
    body: [
      "As a partner in the Hyperloop Development Program, Berenschot has presented its first Outlook study to give governments and other parties insight into the current status and potential development pathway for hyperloop technology.",
      "The study forms an important input for policymakers assessing how hyperloop could fit within national and European transport strategy, and lays the groundwork for the follow-up studies that Berenschot would go on to produce for the programme.",
    ],
  },
  {
    slug: "co2-reduction-economic-benefits-hyperloop",
    title: "Feasibility study: CO2 reduction and economic benefits from transporting goods by hyperloop",
    date: "2 November 2021",
    category: "Research",
    excerpt: "A feasibility study finds 1,100 fewer trucks a day on the A4 motorway by 2030, thanks to a hyperloop freight route between Rotterdam and Amsterdam.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/575e2270-d749-4398-9250-96b704e63609/Article+13.png",
    body: [
      "1,100 fewer trucks on the A4 motorway every day in 2030 — that is one of the findings of a feasibility study into the CO2 reduction and economic benefits from transporting goods by hyperloop, made possible by a hyperloop route between Rotterdam and Amsterdam.",
      "The realisation of a hyperloop network for freight between the two cities is shown to offer substantial reductions in road congestion and emissions, alongside economic benefits for logistics operators along the corridor, strengthening the case for freight-first hyperloop deployment in the Netherlands.",
    ],
  },
  {
    slug: "coalition-dutch-governments-freight-corridor",
    title: "Coalition of Dutch governments and companies explores hyperloop solution for country's busiest freight corridor",
    date: "21 January 2021",
    category: "Research",
    excerpt: "A pilot route between Rotterdam and Amsterdam is being investigated as a first step towards a pan-European, emission-free hyperloop freight network.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/8cf40e11-1abc-4a6c-979a-80a114e1c441/Article+14.png",
    body: [
      "A pilot route that would constitute a first step in creating a pan-European emission-free hyperloop network is being investigated in the largest urban area of the Netherlands, between Rotterdam and Amsterdam.",
      "The preconditions for the route are being explored by a coalition of Dutch governments and companies, targeting the country's busiest freight corridor as a proving ground for hyperloop's potential to reduce road congestion and emissions in dense, high-traffic regions.",
    ],
  },
  {
    slug: "public-private-partnership-hdp",
    title: "The Netherlands commits to hyperloop in pursuit of clean transport future",
    date: "22 December 2020",
    category: "Organisation",
    excerpt: "Two Dutch ministries and several companies and research organizations reveal the establishment and funding of a public-private partnership to develop hyperloop: the Hyperloop Development Program.",
    image: "https://images.squarespace-cdn.com/content/v1/64e74196d472e811c33e6a78/25558885-e7cc-48f7-8a98-2c211a622f74/Article+15.png",
    body: [
      "Dutch ministries put millions towards hyperloop development programme. Two Dutch ministries and several companies and research organizations have revealed the establishment and funding of a public-private partnership to develop hyperloop: the Hyperloop Development Program.",
      "The partnership brings together government backing with industry and research expertise, laying the institutional foundation from which HDP would go on to coordinate more than 25 partner organisations across Europe in the years that followed.",
    ],
  },
];
