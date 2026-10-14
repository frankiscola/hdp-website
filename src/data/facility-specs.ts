/**
 * Single source of truth for the testing-infrastructure comparison on
 * /testing-infrastructure (WP2 – HDP Research Infrastructures Capability Statement).
 *
 * Rules
 * - `null` means "no confirmed value yet" and renders as "To be confirmed".
 * - A facility with `approval: "awaiting"` has not yet signed off its text. The page
 *   shows a small badge on it. Flip to "approved" once the operator has approved.
 * - Pressure is always in mbar (100 Pa = 1 mbar).
 * - Design values are never presented as demonstrated values.
 * - Provenance of every figure is kept in HDP_Facility_Inventory.xlsx (Inventory sheet).
 */

export type FacilityId = "ehc" | "demotube" | "gotube";

export type Approval = "approved" | "awaiting";

export const SPEC_KEYS = [
  "location",
  "tubeLength",
  "tubeDiameter",
  "tubeMaterial",
  "pressure",
  "levitation",
  "propulsion",
  "laneSwitch",
  "demonstratedSpeed",
  "vehicleMass",
  "access",
  "availability",
] as const;

export type SpecKey = (typeof SPEC_KEYS)[number];

export const specLabels: Record<SpecKey, string> = {
  location: "Location",
  tubeLength: "Tube length",
  tubeDiameter: "Tube diameter",
  tubeMaterial: "Tube material",
  pressure: "Operating pressure",
  levitation: "Levitation and guidance",
  propulsion: "Propulsion",
  laneSwitch: "Lane switch",
  demonstratedSpeed: "Demonstrated speed",
  vehicleMass: "Vehicle mass (indicative)",
  access: "Access",
  availability: "Availability 2026–2029",
};

export type FacilitySpec = {
  id: FacilityId;
  name: string;
  shortName: string;
  approval: Approval;
  href: string;
  specs: Record<SpecKey, string | null>;
  /** Short, approved remarks shown in the "Good to know" row. */
  notes: string[];
};

export const FACILITY_DATA_UPDATED = "October 2026";

export const facilitySpecs: FacilitySpec[] = [
  {
    id: "ehc",
    name: "European Hyperloop Center",
    shortName: "EHC",
    approval: "approved",
    href: "https://hyperloopcenter.eu/test-center",
    specs: {
      location: "Veendam, Netherlands",
      tubeLength: "420 m",
      tubeDiameter: "2.5 m",
      tubeMaterial: "Steel",
      pressure: "≈1 mbar (100 Pa)",
      levitation: "Electromagnetic suspension (EMS) with guidance",
      propulsion: "Linear synchronous reluctance motor",
      laneSwitch: "Yes, open to external developers",
      demonstratedSpeed: "100 km/h on the straight, 75 km/h in the curve",
      vehicleMass: "Up to about 3,000 kg",
      access: "Open to everyone; free or paid depending on the collaboration",
      availability: "Available",
    },
    notes: [
      "Demonstrated speeds are limited by the vehicle's battery power, not by the infrastructure.",
      "The infrastructure was designed for up to 300 and 700 km/h on its two legs (design values, not yet demonstrated).",
      "Pump-down to 1 mbar takes about 16 hours with the current pump.",
      "External vehicles are accepted after a compliance check that protects the infrastructure.",
    ],
  },
  {
    id: "demotube",
    name: "EuroTube DemoTube",
    shortName: "DemoTube",
    approval: "awaiting",
    href: "https://eurotube.org/demotube/",
    specs: {
      location: "Dübendorf, Switzerland",
      tubeLength: "≈120 m",
      tubeDiameter: "2.2 m",
      tubeMaterial: "Sealed, post-tensioned concrete with a membrane",
      pressure: null,
      levitation: null,
      propulsion: null,
      laneSwitch: null,
      demonstratedSpeed: null,
      vehicleMass: null,
      access: "Research groups and companies",
      availability: null,
    },
    notes: ["Allows testing of a large-diameter hyperloop vacuum valve (DN2200)."],
  },
  {
    id: "gotube",
    name: "goTube – Institute of Hyperloop Technology",
    shortName: "goTube",
    approval: "awaiting",
    href: "https://iht.hs-emden-leer.de/",
    specs: {
      location: "Emden, Germany",
      tubeLength: "27 m",
      tubeDiameter: null,
      tubeMaterial: "Steel",
      pressure: "1 bar down to 1 mbar",
      levitation: null,
      propulsion: "Infrastructure for testing propulsion systems and vehicle concepts",
      laneSwitch: null,
      demonstratedSpeed: null,
      vehicleMass: null,
      access: null,
      availability: null,
    },
    notes: ["Steel tube with quick evacuation capability."],
  },
];

/* ------------------------------------------------------------------ */
/* "What can be tested where"                                         */
/* ------------------------------------------------------------------ */

export type Level = "available" | "possible" | "unknown";

export type CapabilityCell = { level: Level; note?: string };

export type Capability = {
  id: string;
  label: string;
  cells: Record<FacilityId, CapabilityCell>;
};

export const capabilities: Capability[] = [
  {
    id: "ems",
    label: "Electromagnetic suspension (EMS)",
    cells: {
      ehc: { level: "available", note: "EMS levitation and guidance on the 420 m steel track." },
      demotube: { level: "unknown" },
      gotube: { level: "unknown" },
    },
  },
  {
    id: "propulsion",
    label: "Propulsion systems",
    cells: {
      ehc: { level: "available", note: "Linear synchronous reluctance propulsion." },
      demotube: { level: "unknown" },
      gotube: {
        level: "available",
        note: "Infrastructure for testing propulsion systems and different vehicle concepts.",
      },
    },
  },
  {
    id: "switch",
    label: "Lane switching",
    cells: {
      ehc: {
        level: "available",
        note: "A dedicated curve that external developers can use. Speed depends on the vehicle.",
      },
      demotube: { level: "unknown" },
      gotube: { level: "unknown" },
    },
  },
  {
    id: "steel",
    label: "Steel tube and vacuum operation",
    cells: {
      ehc: { level: "available", note: "Steel tube operated at about 1 mbar." },
      demotube: { level: "unknown" },
      gotube: {
        level: "available",
        note: "Steel tube with quick evacuation, 1 bar down to 1 mbar.",
      },
    },
  },
  {
    id: "concrete",
    label: "Concrete tube and sealing",
    cells: {
      ehc: {
        level: "possible",
        note: "One tube section can be replaced by a concrete one; a support is already designed for it.",
      },
      demotube: {
        level: "available",
        note: "Sealed, post-tensioned concrete tube with a membrane.",
      },
      gotube: { level: "unknown" },
    },
  },
  {
    id: "valve",
    label: "Large-diameter vacuum valve",
    cells: {
      ehc: { level: "unknown" },
      demotube: {
        level: "available",
        note: "Allows testing of a large-diameter hyperloop vacuum valve (DN2200).",
      },
      gotube: { level: "unknown" },
    },
  },
  {
    id: "external",
    label: "Open to external developers",
    cells: {
      ehc: {
        level: "available",
        note: "Open to everyone, free or paid depending on the collaboration.",
      },
      demotube: { level: "available", note: "Open to research groups and companies." },
      gotube: { level: "unknown" },
    },
  },
];

export const levelLabels: Record<Level, string> = {
  available: "Available",
  possible: "Possible with modifications",
  unknown: "To be confirmed",
};

/* ------------------------------------------------------------------ */
/* Open research topics                                               */
/* ------------------------------------------------------------------ */

export type ResearchTopic = { title: string; text: string; proposedBy: string };

export const openResearchTopics: ResearchTopic[] = [
  {
    title: "Vehicle operation at low pressure",
    text: "Running a vehicle in a low-pressure tube has not yet been done at the cluster's tracks. It requires upgrades to the vehicle.",
    proposedBy: "European Hyperloop Center",
  },
  {
    title: "Wireless power transfer",
    text: "A wireless power transfer system is not yet available. Vehicle battery power currently limits the speeds demonstrated on the track.",
    proposedBy: "European Hyperloop Center",
  },
  {
    title: "Concrete tube section on a steel track",
    text: "Replacing one steel section with a concrete one, for which a support is already designed, would allow concrete tube testing on an existing track.",
    proposedBy: "European Hyperloop Center",
  },
];
