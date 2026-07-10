"use client";
import { motion } from "framer-motion";

export function Founders() {
  return (
    <section id="founders" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 ambient-violet opacity-60" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl">
          <span className="chip chip-violet">
            <span className="chip-dot" /> Co-Founders
          </span>
          <h2
            className="mt-6 font-display font-medium text-white leading-[1.02]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)" }}
          >
            The architect and the{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#b987ff,#00e6d3)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              philosopher.
            </span>
          </h2>
          <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-2xl">
            Nirmata is founded by two operators who share one belief:
            build the systems humankind actually deserves, or don&apos;t
            build at all.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {/* Ben */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="glass p-8 md:p-10"
          >
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center font-display text-2xl text-ink-950 shadow-teal-glow">
                B
              </div>
              <div>
                <div className="font-display text-2xl text-white">
                  Ben O&apos;Leary
                </div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-teal-500">
                  Co-Founder · Chief Quantum Officer
                </div>
              </div>
            </div>

            <div className="mt-6 font-display text-teal-500 text-[15px]">
              Architect of the ΔTOM platform
            </div>
            <p className="mt-4 text-white/70 text-[15px] leading-relaxed">
              Autistic systems thinker and architect of the ΔTOM
              platform, the 25-dimension vendor framework, and the
              Ethical AI Covenant. Holds founding vision and
              long-horizon strategy for Nirmata Holdings &mdash; the
              parent company of every product in the portfolio.
            </p>

            <div className="mt-6 pt-6 border-t border-white/[0.06]">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45 mb-3">
                What Ben shipped
              </div>
              <ul className="space-y-2 text-[13.5px] text-white/70">
                <li className="flex gap-2.5">
                  <Dot /> ΔTOM platform architecture (9 products · 4 flagship)
                </li>
                <li className="flex gap-2.5">
                  <Dot /> AntimatterAI core platform
                </li>
                <li className="flex gap-2.5">
                  <Dot /> Ethical AI Covenant
                </li>
                <li className="flex gap-2.5">
                  <Dot /> 99+ enterprise projects
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Joel */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="glass glass-violet p-8 md:p-10"
          >
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center font-display text-2xl text-ink-950 shadow-violet-glow">
                J
              </div>
              <div>
                <div className="font-display text-2xl text-white">
                  Joel Bedard
                </div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-violet-400">
                  Co-Founder · Chief Philosophy &amp; Innovation Officer
                </div>
              </div>
            </div>

            <div className="mt-6 font-display text-violet-400 text-[15px]">
              Agritech · Philosophy · Systems Theory
            </div>
            <p className="mt-4 text-white/70 text-[15px] leading-relaxed">
              Savant-tier polymath with deep expertise across agritech,
              philosophy, systems theory, and emergent AI. Joel
              translates first-principles thinking into tangible
              product architecture across the Nirmata portfolio
              &mdash; the conceptual conscience and innovation engine
              of the company.
            </p>

            <div className="mt-6 pt-6 border-t border-white/[0.06]">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45 mb-3">
                What Joel shipped
              </div>
              <ul className="space-y-2 text-[13.5px] text-white/70">
                <li className="flex gap-2.5">
                  <Dot violet /> ΔTOM philosophical foundation
                </li>
                <li className="flex gap-2.5">
                  <Dot violet /> Agritech ML research
                </li>
                <li className="flex gap-2.5">
                  <Dot violet /> Cross-domain product innovation
                </li>
                <li className="flex gap-2.5">
                  <Dot violet /> Strategic partnerships
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Dot({ violet }: { violet?: boolean }) {
  return (
    <span
      className={`mt-2 w-1 h-1 rounded-full shrink-0 ${
        violet ? "bg-violet-500" : "bg-teal-500"
      }`}
    />
  );
}
