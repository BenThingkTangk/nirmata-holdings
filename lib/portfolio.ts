export type Accent = "teal" | "iris" | "coral" | "gold" | "azure";
export type Status = "live" | "active" | "dev";
export type DomainId =
  | "foundations"
  | "revenue"
  | "trust"
  | "health"
  | "agriculture"
  | "learning";

export type Domain = {
  id: DomainId;
  label: string;
  blurb: string;
  accent: Accent;
};

export const DOMAINS: Domain[] = [
  {
    id: "foundations",
    label: "Foundations",
    blurb: "The shared substrate and the thinking that shapes every venture.",
    accent: "teal",
  },
  {
    id: "revenue",
    label: "Revenue & Growth",
    blurb: "Autonomous, human-governed digital workers built for measurable outcomes.",
    accent: "gold",
  },
  {
    id: "trust",
    label: "Trust & Security",
    blurb: "Post-quantum resilience and defensible evidence you can audit.",
    accent: "iris",
  },
  {
    id: "health",
    label: "Health & Performance",
    blurb: "Earlier physiological insight for a reactive healthcare world.",
    accent: "coral",
  },
  {
    id: "agriculture",
    label: "Agriculture & Land",
    blurb: "Regenerative soil, livestock and crop outcomes from natural intelligence.",
    accent: "azure",
  },
  {
    id: "learning",
    label: "Learning & Story",
    blurb: "Accessibility-first worlds that make ideas and literacy inclusive.",
    accent: "teal",
  },
];

export const STATUS_LABEL: Record<Status, string> = {
  live: "Live",
  active: "Active",
  dev: "In development",
};

export type Venture = {
  id: string;
  name: string;
  parent?: string;
  domain: DomainId;
  accent: Accent;
  status: Status;
  tagline: string;
  what: string;
  problem: string;
  edge: string[];
  proof: string;
};

export const VENTURES: Venture[] = [
  {
    id: "thingk-tangk",
    name: "Thingk Tangk",
    parent: "HumanOS",
    domain: "foundations",
    accent: "teal",
    status: "active",
    tagline: "Quantum Futurists — beyond trusted advisors.",
    what: "The translation layer of the holding company. Thingk Tangk turns emerging science, AI, systems theory and human factors into product and organizational architecture through HumanOS.",
    problem:
      "Most organizations meet frontier technology as consultants' slideware — advice that never becomes a working system.",
    edge: [
      "Interdisciplinary futurists, not a fixed-scope agency",
      "HumanOS: a human-factors method, not a black box",
      "First-principles translation into shippable architecture",
    ],
    proof:
      "Operates as the strategy engine feeding architecture into the rest of the portfolio.",
  },
  {
    id: "atom-console",
    name: "ATOM Console",
    parent: "314 ATOM",
    domain: "foundations",
    accent: "azure",
    status: "dev",
    tagline: "A category challenge to the interactive-compute model.",
    what: "A console and interactive-compute concept taking direct aim at the entrenched console and interactive-entertainment model — AI-native from the silicon up.",
    problem:
      "The interactive-entertainment stack is closed, static, and slow to reinvent around AI-native experiences.",
    edge: [
      "AI-native interaction, not bolted-on inference",
      "Edge-served compute for human-speed response",
      "Built on the shared NirmataOS substrate",
    ],
    proof:
      "In development. We publish claims when hardware ships — no benchmarks we can't stand behind.",
  },
  {
    id: "atom-workers",
    name: "ATOM Workers",
    domain: "revenue",
    accent: "gold",
    status: "active",
    tagline: "Autonomous, revenue-first digital workers — human-governed.",
    what: "Revenue-first digital workers designed for measurable operational and revenue-enhancing outcomes, with a human always in the loop. Includes Sales Dominator, Support and Performance Coach.",
    problem:
      "Teams drown in low-value, repeatable operational work while high-value judgment goes undone.",
    edge: [
      "Outcome-metered, not seat-metered",
      "Human-in-the-loop governance by default",
      "Runs on the ΔTOM Brain · Spine · Worker spine",
    ],
    proof:
      "Independent industry studies report revenue lifts and ROI well above traditional automation when agents are deployed with oversight.",
  },
  {
    id: "atom-salesos",
    name: "ATOM SalesOS",
    parent: "Sales Dominator",
    domain: "revenue",
    accent: "gold",
    status: "active",
    tagline: "A voice-first revenue operating system. Target. Engage. Close.",
    what: "An autonomous sales operating system that runs deals rather than just observing them — voice-first, real-time, and accountable.",
    problem:
      "Conversation-intelligence tools watch the deal. Reps still carry the entire top of the funnel by hand.",
    edge: [
      "Voice-first, real-time execution",
      "Coaching and outbound in one loop",
      "Compliance-aware by design",
    ],
    proof:
      "Shipped as a working product microsite; held to strict TCPA / AI-compliance gating before scale.",
  },
  {
    id: "atom-red-team",
    name: "ATOM Red Team",
    domain: "trust",
    accent: "iris",
    status: "dev",
    tagline: "Quantum-resilient security that anticipates the attack.",
    what: "A security venture leading with post-quantum cryptography, autonomous adversarial testing, and attack anticipation and containment.",
    problem:
      "Defenses tuned to yesterday's threat model won't survive a post-quantum world — or autonomous attackers.",
    edge: [
      "Post-quantum first (NIST FIPS 203 / 204 / 205)",
      "Continuous autonomous red-teaming",
      "Anticipate and contain, not just detect",
    ],
    proof:
      "Aligned to NIST's finalized post-quantum encryption standards. We build for a post-quantum threat model rather than promising unbreakable systems.",
  },
  {
    id: "evidenceos",
    name: "EvidenceOS",
    domain: "trust",
    accent: "iris",
    status: "live",
    tagline: "Defensible evidence and trust infrastructure.",
    what: "A compliance and trust layer that turns AI-mediated interactions into tamper-evident, auditable evidence.",
    problem:
      "When AI acts on your behalf, proving what happened — and that it was compliant — is nearly impossible after the fact.",
    edge: [
      "Pre-action compliance gate",
      "Hash-chained consent ledger",
      "Tamper-evident SHA-256 audit log",
    ],
    proof:
      "Live as a working product for legal / telecom compliance — concrete, low-hype, built around a verifiable audit trail.",
  },
  {
    id: "physiops",
    name: "PhysioPS",
    parent: "HumanOS",
    domain: "health",
    accent: "coral",
    status: "live",
    tagline: "Moving healthcare from reactive to proactive.",
    what: "Earlier physiological insight using autonomic-nervous-system (ANS/HRV) testing and AI-supported pattern recognition, built on Dr. Colombo's independent P&S methodology.",
    problem:
      "Healthcare mostly reacts after physiological collapse. Signals that precede it are measurable but under-used.",
    edge: [
      "Independent parasympathetic & sympathetic (P&S) measurement",
      "AI-supported pattern recognition, clinician-reviewed",
      "Every flag traceable to peer-reviewed literature",
    ],
    proof:
      "Peer-reviewed research links ANS/HRV signals to earlier detection of physiological stress and cardiovascular risk. We say 'supports earlier insight' — never 'diagnoses' — while the science matures.",
  },
  {
    id: "alc-bio",
    name: "ALC Bio Innovations US",
    domain: "agriculture",
    accent: "azure",
    status: "live",
    tagline: "Fulvic & humic intelligence for regenerative land.",
    what: "Bio-fermented fulvic and humic inputs that improve nutrient-use efficiency and support regenerative land, livestock and crop outcomes.",
    problem:
      "Industrial agriculture leans on antibiotics, hormones and blanket fertilizer while soil health degrades.",
    edge: [
      "Improves feed efficiency, digestibility and nutrient uptake",
      "May reduce reliance on antibiotics and hormones",
      "A complement to NPK, not a blanket replacement",
    ],
    proof:
      "Peer-reviewed studies support feed-efficiency, digestibility and antibiotic-reduction benefits; we frame nutrient effects as biostimulant complements to fertilizer, not a replacement.",
  },
  {
    id: "mousington",
    name: "Adventures in Mousington",
    domain: "learning",
    accent: "teal",
    status: "live",
    tagline: "An accessibility-first living storyworld.",
    what: "A children's media IP and living storyworld built accessibility-first — read-aloud, dyslexia-friendly, and inclusive of hearing and visual needs.",
    problem:
      "Early literacy media rarely designs for the children who need access most.",
    edge: [
      "Accessibility-first from the first page",
      "Multiple reading and narration modes",
      "Original story IP, not licensed filler",
    ],
    proof:
      "Live as a cozy underground adventure for ages 4–8 — courage, kindness, and the magic of stories.",
  },
];
