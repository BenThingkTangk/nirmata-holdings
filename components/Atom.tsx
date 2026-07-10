"use client";
import { motion } from "framer-motion";

const workers = [
  { name: "ATOM Sales Dominator", role: "The AI sales command center" },
  { name: "ATOM Red Team", role: "Adversarial AI for resilience" },
  { name: "ATOM Console", role: "The operator's cockpit" },
  { name: "ATOM Support", role: "Autonomous customer care" },
  { name: "ATOM Performance Coach", role: "Rep enablement at scale" },
  { name: "Aletheia", role: "The truth engine" },
  { name: "Researcher", role: "Deep autonomous research" },
  { name: "Customer Twin", role: "Digital account replicas" },
  { name: "Prospect Atlas", role: "Territory mapping" },
  { name: "Live Call Ghost", role: "Real-time call coaching" },
  { name: "Deal Autopsy", role: "Post-mortem intelligence" },
  { name: "War Room", role: "Cross-functional strike ops" },
  { name: "Revenue Battlefield", role: "Pipeline theater" },
  { name: "Objection Dojo", role: "Live objection training" },
  { name: "Compliance Vault", role: "Governance & audit" },
  { name: "EvidenceOS", role: "Defensible-evidence engine" },
];

export function Atom() {
  return (
    <section id="atom" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 ambient-teal" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          {/* Left column */}
          <div className="md:col-span-5 md:sticky md:top-28">
            <span className="chip">
              <span className="chip-dot" /> ΔTOM Innovations
            </span>
            <h2
              className="mt-6 font-display font-medium text-white leading-[1.02]"
              style={{ fontSize: "clamp(2.2rem, 4.6vw, 3.6rem)" }}
            >
              ΔTOM is the{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#00e6d3,#b987ff)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                operating nervous system
              </span>{" "}
              of the Nirmata portfolio.
            </h2>
            <p className="mt-6 text-white/70 text-lg leading-relaxed">
              A single agent orchestration spine &mdash;{" "}
              <span className="font-mono text-teal-500">
                Brain · Spine · Worker
              </span>{" "}
              &mdash; deployed across every venture. ATOM workers are
              specialized AI agents that observe, decide, and act inside
              real workflows. Where competitors ship chatbots, we ship
              operators.
            </p>

            <div className="mt-10 space-y-4">
              <Line k="Architecture" v="Brain · Spine · Worker" />
              <Line k="Governance" v="5-layer fabric · SOC2 · HIPAA · FedRAMP-ready" />
              <Line k="Runtime" v="Cloud · VPC · on-prem · edge · air-gap" />
              <Line k="Interface" v="GenUI — agents render their own controls" />
              <Line k="Framework" v="ΔTOM 25-Dimension Vendor Framework" />
            </div>
          </div>

          {/* Right column — workers grid */}
          <div className="md:col-span-7">
            <div className="mb-8 flex items-center justify-between">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/50">
                ATOM Workers · Selected
              </div>
              <div className="font-mono text-[11px] text-teal-500">
                {workers.length} agents
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {workers.map((w, i) => (
                <motion.div
                  key={w.name}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (i % 8) * 0.04 }}
                  className="group relative p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-teal-500/40 hover:bg-teal-500/[0.04] transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(0,230,211,0.8)] group-hover:animate-pulse" />
                    <div>
                      <div className="font-display text-[15px] text-white leading-tight">
                        {w.name}
                      </div>
                      <div className="mt-1 text-[13px] text-white/50 leading-snug">
                        {w.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Line({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-start gap-4 py-2 border-t border-white/[0.06]">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40 w-28 pt-1 shrink-0">
        {k}
      </div>
      <div className="text-[15px] text-white/85">{v}</div>
    </div>
  );
}
