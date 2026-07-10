"use client";
import { motion } from "framer-motion";

const tenets = [
  {
    n: "I",
    t: "Human Primacy",
    d: "No agent takes an irreversible action a human wouldn't. Every decision has a lineage, an operator, and a stop.",
  },
  {
    n: "II",
    t: "Radical Transparency",
    d: "Every ATOM worker names itself, cites its sources, and shows its reasoning. No black boxes ship out of Nirmata.",
  },
  {
    n: "III",
    t: "Consent by Default",
    d: "Data is entered into ΔTOM the same way a patient enters a clinic — informed, revocable, respected.",
  },
  {
    n: "IV",
    t: "No Dark Patterns",
    d: "We never manipulate the humans we serve. Not in copy, not in UI, not in models, not in metrics.",
  },
  {
    n: "V",
    t: "Do No Silent Harm",
    d: "Every product is stress-tested by ATOM Red Team against misuse before it ships to a single customer.",
  },
  {
    n: "VI",
    t: "Betterment or Bust",
    d: "If a venture cannot make someone's life, work, or health measurably better — it does not ship under Nirmata.",
  },
];

export function Covenant() {
  return (
    <section id="covenant" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 ambient-teal opacity-70" aria-hidden />
      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="chip">
            <span className="chip-dot" /> The Ethical AI Covenant
          </span>
          <h2
            className="mt-6 font-display font-medium text-white leading-[1.02]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)" }}
          >
            Six tenets.{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#00e6d3,#b987ff)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              No exceptions.
            </span>
          </h2>
          <p className="mt-6 text-white/70 text-lg leading-relaxed">
            The Nirmata Ethical AI Covenant governs every ΔTOM
            deployment, every ATOM worker, and every venture inside
            this house. It is signed by the founders, encoded in the
            substrate, and enforced by the ATOM Red Team.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tenets.map((t, i) => (
            <motion.div
              key={t.n}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="glass p-6 h-full"
            >
              <div className="flex items-baseline gap-4">
                <div className="font-display text-3xl text-teal-500">
                  {t.n}.
                </div>
                <div className="font-display text-lg text-white">{t.t}</div>
              </div>
              <p className="mt-4 text-white/60 text-[14.5px] leading-relaxed">
                {t.d}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 glass p-8 md:p-10 text-center max-w-3xl mx-auto">
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-teal-500">
            Signed
          </div>
          <div className="mt-6 flex items-center justify-center gap-8 font-display text-white">
            <div>
              <div className="text-lg">Ben O&apos;Leary</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
                Chief Quantum Officer
              </div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <div className="text-lg">Joel Bedard</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
                Chief Philosophy &amp; Innovation Officer
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
