"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { OrbitalCanvas } from "./OrbitalCanvas";

const STATS = [
  { n: "9", l: "Ventures" },
  { n: "4", l: "Live today" },
  { n: "6", l: "Human domains" },
  { n: "1", l: "Ethical covenant" },
];

export function Hero() {
  const artRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const ringsY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.15]);

  useEffect(() => {
    const el = artRef.current;
    if (!el) return;
    const mq = window.matchMedia("(hover: hover)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!mq.matches || reduce) return;
    const onMove = (e: MouseEvent) => {
      const dx = (e.clientX / window.innerWidth - 0.5) * 16;
      const dy = (e.clientY / window.innerHeight - 0.5) * 16;
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-20"
      data-testid="hero"
    >
      <div className="absolute inset-0 glow-teal" aria-hidden />
      <div className="absolute inset-0 glow-iris opacity-70" aria-hidden />
      <OrbitalCanvas className="absolute inset-0 h-full w-full opacity-70" />
      <motion.div
        style={{ y: ringsY }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <div className="orbit-ring" style={{ width: "min(128vh,1200px)", height: "min(128vh,1200px)" }} />
        <div className="orbit-ring orbit-ring--iris" style={{ width: "min(88vh,860px)", height: "min(88vh,860px)" }} />
      </motion.div>

      <div className="container container-wide relative z-10 grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div style={{ y: copyY, opacity: fade }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow eyebrow--teal">
              <span className="dot dot--pulse" /> Ethics-first innovation house · est. 2024
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 font-display text-ink-text"
            style={{
              fontSize: "clamp(2.4rem, 1rem + 5.4vw, 5.2rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.04em",
            }}
          >
            A holding company for ideas{" "}
            <span className="grad-tealiris">too important</span> to stay theoretical.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lead mt-7"
          >
            Nirmata &mdash; Sanskrit for <em className="not-italic text-ink-text">maker</em> &mdash;
            is a growing portfolio of category-defining ventures across revenue, security, health,
            agriculture and learning. One shared substrate. One covenant. Built for the betterment
            of humankind, and judged by what ships.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a href="#portfolio" className="btn btn--primary" data-testid="hero-cta-portfolio">
              Explore the portfolio
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#manifesto" className="btn btn--ghost">
              Why we exist
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-12 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] sm:grid-cols-4"
          >
            {STATS.map((s) => (
              <div key={s.l} className="bg-bg/40 px-4 py-5 text-center">
                <dd className="font-display text-3xl text-ink-text">{s.n}</dd>
                <dt className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                  {s.l}
                </dt>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Masterbrand art */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: artY }}
          className="relative mx-auto hidden aspect-square w-full max-w-md items-center justify-center lg:flex"
        >
          <div ref={artRef} className="relative transition-transform duration-300 ease-out">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/nirmata-mark.png"
              alt="The Nirmata Holdings masterbrand: a sculptural winged-N of interwoven teal and violet light threaded with circuitry."
              width={440}
              height={460}
              className="floaty relative z-10 h-auto w-[86%] mx-auto drop-shadow-[0_0_60px_rgba(0,240,223,0.25)]"
              fetchPriority="high"
            />
          </div>
        </motion.div>
      </div>

      {/* Mobile mark */}
      <div className="pointer-events-none absolute right-[-8%] top-[8%] w-52 opacity-30 blur-[1px] lg:hidden" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/nirmata-mark.png" alt="" width={208} height={218} className="h-auto w-full" />
      </div>
    </section>
  );
}
