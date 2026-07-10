"use client";
import { motion } from "framer-motion";

export function Philosophy() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 ambient-violet opacity-40" aria-hidden />
      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <span className="chip chip-violet">
          <span className="chip-dot" /> Philosophy
        </span>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="mt-8 font-display font-medium text-white leading-[1.05]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          Nirmata is Sanskrit for{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #b987ff, #00e6d3)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            creator, maker, architect.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-10 text-white/70 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
        >
          We do not build tools. We build the nervous systems those tools
          run on. Every venture in this portfolio is a first-principles
          answer to a broken system &mdash; in commerce, in medicine, in
          soil, in story, in security. The through-line is not a market.
          It is a moral posture: build the machinery humankind actually
          deserves, and refuse to ship anything that isn&apos;t worthy of
          being trusted with a life.
        </motion.p>

        <div className="mt-16 grid md:grid-cols-3 gap-4">
          <Pillar
            k="01"
            title="First Principles"
            body="Every product starts from physics, physiology, or philosophy — never from a competitor's roadmap."
          />
          <Pillar
            k="02"
            title="Ethical Covenant"
            body="An AI covenant governs every ΔTOM deployment: transparency, consent, human primacy, no dark patterns, ever."
            violet
          />
          <Pillar
            k="03"
            title="For Humankind"
            body="If a product doesn't measurably make someone's life, work, or health better — it doesn't ship."
          />
        </div>
      </div>
    </section>
  );
}

function Pillar({
  k,
  title,
  body,
  violet,
}: {
  k: string;
  title: string;
  body: string;
  violet?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className={`glass ${violet ? "glass-violet" : ""} p-6 text-left`}
    >
      <div
        className={`font-mono text-[11px] tracking-[0.22em] ${
          violet ? "text-violet-400" : "text-teal-500"
        }`}
      >
        {k}
      </div>
      <div className="mt-4 font-display text-xl text-white">{title}</div>
      <p className="mt-3 text-white/60 text-[15px] leading-relaxed">{body}</p>
    </motion.div>
  );
}
