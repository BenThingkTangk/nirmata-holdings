"use client";
import { motion } from "framer-motion";
import { Logo } from "./Logo";

export function Contact() {
  return (
    <section id="contact" className="relative pt-32 pb-16 overflow-hidden">
      <div className="absolute inset-0 ambient-teal" aria-hidden />
      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="font-display font-medium text-white leading-[1.02]"
          style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}
        >
          Build with{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#00e6d3,#b987ff)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Nirmata.
          </span>
        </motion.h2>
        <p className="mt-6 text-white/70 text-lg max-w-2xl mx-auto">
          Enterprise partnership, portfolio collaboration, philanthropic
          coalition, or press &mdash; we read every note.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="mailto:ben.oleary@thingktangk.com" className="cta-primary">
            ben.oleary@thingktangk.com
          </a>
          <a href="mailto:joel@nirmataholdings.com" className="cta-ghost">
            joel@nirmataholdings.com
          </a>
        </div>
      </div>

      <div className="mt-24 border-t border-white/[0.06] pt-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo />
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
            © {new Date().getFullYear()} Nirmata Holdings · The maker&apos;s
            holding company
          </div>
          <div className="flex items-center gap-6 text-[13px] text-white/50">
            <a href="#atom" className="hover:text-white transition-colors">
              ΔTOM
            </a>
            <a href="#portfolio" className="hover:text-white transition-colors">
              Portfolio
            </a>
            <a href="#covenant" className="hover:text-white transition-colors">
              Covenant
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
