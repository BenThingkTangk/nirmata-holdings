"use client";
import { motion } from "framer-motion";

type Company = {
  id: string;
  n: string;
  name: string;
  tag: string;
  desc: string;
  bullets: string[];
  glyph: React.ReactNode;
  accent?: "teal" | "violet";
};

const companies: Company[] = [
  {
    id: "thingk-tangk",
    n: "01",
    name: "Thingk Tangk",
    tag: "HumanOS — the human-centered operating system",
    desc: "The origin brand and the interface layer. Thingk Tangk builds HumanOS: a personal operating system that augments how humans think, decide, and remember — without becoming the thinker.",
    bullets: [
      "Personal cognition & decision architecture",
      "Ambient-agent interface layer",
      "Human-primacy design principles",
    ],
    glyph: <GlyphPerson />,
  },
  {
    id: "atom-console",
    n: "02",
    name: "ATOM Console",
    tag: "The operator's cockpit for the ΔTOM ecosystem",
    desc: "One command surface for every ATOM worker, workflow, and portfolio operation. Side-by-side operator wall, live kill-chain timeline, GenUI panels that render themselves as the situation changes.",
    bullets: [
      "Unified command surface",
      "Live agent telemetry",
      "GenUI operator wall",
    ],
    glyph: <GlyphConsole />,
    accent: "violet",
  },
  {
    id: "physiops",
    n: "03",
    name: "PhysioPS",
    tag: "Advanced ANS diagnostic intelligence",
    desc: "A biopsychosocial diagnostic platform built on the HumanOS ANS engine and Dr. Colombo's P&S methodology. Purpose-built for veterans, aerotoxicity, and complex physiology no clinic maps well today.",
    bullets: [
      "HumanOS ANS Diagnostic Engine",
      "Veteran & aerotoxicity focus",
      "Akamai edge compute delivery",
    ],
    glyph: <GlyphPulse />,
  },
  {
    id: "alc-bio",
    n: "04",
    name: "ALC Bio Innovations US",
    tag: "The global fulvic & humic intelligence platform",
    desc: "A first-of-its-kind intelligence layer for the world's oldest natural compounds. RAG-driven research, Kieffer-lineage domain expertise, and a Sonar-powered agent that reads soil, biology, and industry at once.",
    bullets: [
      "Fulvic & humic knowledge graph",
      "Sonar Pro research agent",
      "Global regulatory intelligence",
    ],
    glyph: <GlyphMolecule />,
    accent: "violet",
  },
  {
    id: "mousington",
    n: "05",
    name: "Adventures in Mousington",
    tag: "A living storybook for the next generation",
    desc: "Susan O'Leary's children's world, produced through Nirmata as an accessibility-first living storybook and publisher-ready IP. Character-led, narrated, tactile — a story kids can walk into.",
    bullets: [
      "Accessibility-first storybook app",
      "Original narration & motion",
      "Publisher pitch package",
    ],
    glyph: <GlyphMoon />,
  },
  {
    id: "atom-innovations",
    n: "06",
    name: "ATOM Innovations",
    tag: "The R&D house — ΔTOM · SalesOS · Red Team · EvidenceOS · 314 ATOM",
    desc: "The applied AI research and product line inside Nirmata. Sales OS, adversarial Red Team, EvidenceOS trust engine, Support, Performance Coach — all built on the same ΔTOM substrate and ethical covenant.",
    bullets: [
      "ATOM Sales Dominator · Red Team · EvidenceOS",
      "ATOM Support · Performance Coach · 314 ATOM",
      "One substrate, one covenant, many operators",
    ],
    glyph: <GlyphAtom />,
    accent: "violet",
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-32 md:py-40 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl">
          <span className="chip">
            <span className="chip-dot" /> Portfolio
          </span>
          <h2
            className="mt-6 font-display font-medium text-white leading-[1.02]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)" }}
          >
            Six ventures.{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#00e6d3,#b987ff)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              One thesis.
            </span>
          </h2>
          <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-2xl">
            Each company inside Nirmata is a category-defining answer to
            a first-principles problem &mdash; and every one of them runs
            on shared ΔTOM infrastructure, shared ethics, shared soul.
          </p>
        </div>

        <div className="mt-16 space-y-6">
          {companies.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.03 }}
              className={`glass ${
                c.accent === "violet" ? "glass-violet" : ""
              } p-8 md:p-10 grid md:grid-cols-12 gap-8 items-start`}
            >
              {/* Number + glyph */}
              <div className="md:col-span-3 flex items-center gap-5">
                <div
                  className={`w-16 h-16 rounded-xl border ${
                    c.accent === "violet"
                      ? "border-violet-500/30 bg-violet-500/[0.06]"
                      : "border-teal-500/30 bg-teal-500/[0.06]"
                  } flex items-center justify-center shrink-0`}
                >
                  {c.glyph}
                </div>
                <div>
                  <div
                    className={`font-mono text-[10px] tracking-[0.24em] ${
                      c.accent === "violet"
                        ? "text-violet-400"
                        : "text-teal-500"
                    }`}
                  >
                    VENTURE {c.n}
                  </div>
                  <div className="mt-2 font-display text-2xl md:text-[26px] text-white leading-tight">
                    {c.name}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-6">
                <div
                  className={`font-display text-[15px] ${
                    c.accent === "violet" ? "text-violet-400" : "text-teal-500"
                  }`}
                >
                  {c.tag}
                </div>
                <p className="mt-3 text-white/70 text-[15px] leading-relaxed">
                  {c.desc}
                </p>
              </div>

              {/* Bullets */}
              <div className="md:col-span-3">
                <ul className="space-y-2.5">
                  {c.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-[13px] text-white/70"
                    >
                      <span
                        className={`mt-1.5 w-1 h-1 rounded-full ${
                          c.accent === "violet" ? "bg-violet-500" : "bg-teal-500"
                        } shrink-0`}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----- Glyphs (inline SVG, no external icons) ----- */
function GlyphPerson() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="9" r="4" stroke="#00e6d3" strokeWidth="1.4" />
      <path
        d="M5 24c1.5-4.5 5-7 9-7s7.5 2.5 9 7"
        stroke="#00e6d3"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
function GlyphConsole() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="6" width="20" height="16" rx="2" stroke="#b987ff" strokeWidth="1.4" />
      <path d="M8 12l3 2-3 2M14 16h6" stroke="#b987ff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function GlyphPulse() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M3 14h5l2-6 4 12 3-8 2 2h6"
        stroke="#00e6d3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function GlyphMolecule() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="3" fill="#b987ff" />
      <circle cx="6" cy="8" r="2.2" stroke="#b987ff" strokeWidth="1.4" />
      <circle cx="22" cy="8" r="2.2" stroke="#b987ff" strokeWidth="1.4" />
      <circle cx="6" cy="20" r="2.2" stroke="#b987ff" strokeWidth="1.4" />
      <circle cx="22" cy="20" r="2.2" stroke="#b987ff" strokeWidth="1.4" />
      <path d="M8 9l4 4M20 9l-4 4M8 19l4-4M20 19l-4-4" stroke="#b987ff" strokeWidth="1.2" />
    </svg>
  );
}
function GlyphMoon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M20 16A8 8 0 019 5a9 9 0 1011 11z"
        stroke="#00e6d3"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="19" cy="9" r="0.9" fill="#00e6d3" />
      <circle cx="23" cy="14" r="0.7" fill="#00e6d3" />
    </svg>
  );
}
function GlyphAtom() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="1.8" fill="#b987ff" />
      <ellipse cx="14" cy="14" rx="10" ry="4" stroke="#b987ff" strokeWidth="1.2" />
      <ellipse cx="14" cy="14" rx="10" ry="4" stroke="#b987ff" strokeWidth="1.2" transform="rotate(60 14 14)" />
      <ellipse cx="14" cy="14" rx="10" ry="4" stroke="#b987ff" strokeWidth="1.2" transform="rotate(120 14 14)" />
    </svg>
  );
}
