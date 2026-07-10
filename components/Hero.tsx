"use client";
import { motion } from "framer-motion";
import { StarField } from "./StarField";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 ambient-teal" aria-hidden="true" />
      <div className="absolute inset-0 ambient-violet opacity-60" aria-hidden="true" />
      <StarField />

      {/* Orbital rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="orbit" style={{ width: "min(140vh, 1400px)", height: "min(140vh, 1400px)" }} />
        <div className="orbit orbit-2" style={{ width: "min(100vh, 1000px)", height: "min(100vh, 1000px)" }} />
        <div className="orbit" style={{ width: "min(64vh, 640px)", height: "min(64vh, 640px)", opacity: 0.5 }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 text-center pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="inline-flex mb-8"
        >
          <span className="chip">
            <span className="chip-dot" />
            The maker&apos;s holding company
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
          className="font-display font-semibold text-white leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
        >
          Nirmata{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #00e6d3 0%, #b987ff 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Holdings
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.35, ease: "easeOut" }}
          className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-white/75 leading-relaxed"
        >
          A parent company for category-defining ventures. We build
          the systems, and the systems that build systems &mdash; on{" "}
          <span className="text-teal-500">ΔTOM</span>, powered by ATOM
          workers, aligned to a single mission:{" "}
          <span className="text-white">the betterment of humankind</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#portfolio" className="cta-primary">
            Meet the Portfolio
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10m-4-4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="#atom" className="cta-ghost">
            What is ΔTOM?
          </a>
        </motion.div>

        {/* Metric strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.85 }}
          className="mt-16 glass px-6 md:px-10 py-6 md:py-8 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 divide-x divide-white/[0.06]">
            <Stat n="6" l="Flagship Ventures" />
            <Stat n="9+" l="Products Shipped" />
            <Stat n="99+" l="Enterprise Projects" />
            <Stat n="1" l="Ethical AI Covenant" />
          </div>
        </motion.div>

        <div className="mt-16 text-[10px] uppercase tracking-[0.35em] text-white/40 font-mono">
          Scroll
          <div className="mt-2 mx-auto w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="px-4 first:pl-0 last:pr-0">
      <div className="metric">{n}</div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
        {l}
      </div>
    </div>
  );
}
