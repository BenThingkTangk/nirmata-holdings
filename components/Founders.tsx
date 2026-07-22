"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";
import { Reveal } from "./Reveal";
import { NirmataOsMark } from "./marks";

type Founder = {
  initial: string;
  accent: "teal" | "iris" | "gold";
  name: string;
  role: string;
  focus: string;
  discipline: string;
  bio: string;
  work: string[];
};

const ACCENT_HEX: Record<Founder["accent"], string> = {
  teal: "#00f0df",
  iris: "#c084fc",
  gold: "#f5c842",
};

const BADGE_BG: Record<Founder["accent"], string> = {
  teal: "linear-gradient(135deg,#00f0df,#00b8ae)",
  iris: "linear-gradient(135deg,#c084fc,#9333ea)",
  gold: "linear-gradient(135deg,#f5c842,#c99a1e)",
};

const FOUNDERS: Founder[] = [
  {
    initial: "B",
    accent: "teal",
    name: "Ben O’Leary",
    role: "Co-Founder · Chief Quantum Officer",
    focus: "Architect of the ΔTOM substrate",
    discipline: "The architect",
    bio: "An autistic systems thinker and the architect of the ΔTOM operating substrate, the 25-dimension vendor framework, and the Ethical AI Covenant. Holds the founding vision and long-horizon strategy for the holding company.",
    work: [
      "ΔTOM substrate architecture",
      "25-dimension vendor framework",
      "The Ethical AI Covenant",
    ],
  },
  {
    initial: "J",
    accent: "iris",
    name: "Joel Bedard",
    role: "Co-Founder · Chief Philosophy & Innovation Officer",
    focus: "Agritech · philosophy · systems theory",
    discipline: "The philosopher",
    bio: "A polymath across agritech, philosophy, systems theory and emergent AI. Joel translates first-principles thinking into tangible product architecture across the portfolio — the conceptual conscience and innovation engine of the company.",
    work: [
      "Philosophical foundation of ΔTOM",
      "Agritech and regenerative-land research",
      "Cross-domain product innovation",
    ],
  },
  {
    initial: "JM",
    accent: "gold",
    name: "Josh Mellott",
    role: "Co-Founder & Chief Revenue Officer",
    focus: "GTM · Enterprise Sales · Revenue Acceleration",
    discipline: "The revenue force",
    bio: "The von Clausewitz of startup sales and growth. Josh’s genius is turning complex anything — physics, AI infrastructure, agentic systems, regulated workflows — into simple, understandable, sellable, high-adoption stories that close. He architects the GTM motion that takes Nirmata from early traction to category-defining inevitability. Where most CROs sell features, Josh sells worldviews. Where most pipelines stall, his accelerate. Mic. Drop.",
    work: [
      "Go-to-market architecture",
      "Enterprise sales motion",
      "Revenue acceleration",
    ],
  },
];

// Restrained manifesto — revealed line by line as the section is scrolled.
const MANIFESTO = [
  "We did not start a company to chase a market.",
  "We started it because too many ideas that could help people",
  "stay theoretical — trapped in slideware and gatekeeping.",
  "So we build the systems humankind actually deserves,",
  "or we don’t build at all.",
];

export function Founders() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [reveal, setReveal] = useState(0);
  const [reduce, setReduce] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "start 0.15"],
  });

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduce) {
      setReveal(MANIFESTO.length);
      return;
    }
    const unsub = scrollYProgress.on("change", (v) => {
      setReveal(Math.round(v * MANIFESTO.length));
    });
    return () => unsub();
  }, [scrollYProgress, reduce]);

  return (
    <section id="founders" ref={sectionRef} className="section" data-testid="founders">
      <div className="container">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">
            <span className="dot text-iris" /> Co-founders
          </span>
          <h2 className="h-section mt-7">
            The architect, the philosopher, and the{" "}
            <span className="grad-tealiris">revenue force</span>.
          </h2>
        </Reveal>

        {/* Scroll-directed manifesto climax */}
        <div className="mt-10 max-w-3xl" data-testid="founder-manifesto">
          {MANIFESTO.map((line, i) => {
            const on = reduce || i < reveal;
            const last = i === MANIFESTO.length - 1;
            return (
              <p
                key={line}
                className="manifesto-line font-display leading-tight"
                data-testid={`manifesto-line-${i}`}
                style={{
                  fontSize: last ? "clamp(1.6rem,1rem+2.4vw,2.6rem)" : "clamp(1.15rem,1rem+1vw,1.6rem)",
                  color: last ? "var(--text)" : "var(--text-muted)",
                  opacity: on ? 1 : 0.14,
                  transform: on ? "none" : "translateY(8px)",
                  marginTop: i === 0 ? 0 : "0.5rem",
                }}
              >
                {line}
              </p>
            );
          })}
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FOUNDERS.map((f, i) => {
            const hex = ACCENT_HEX[f.accent];
            return (
              <Reveal key={f.name} delay={i * 100}>
                <article
                  className={`card card--glow-${f.accent} h-full p-8 md:p-10`}
                  data-testid={`founder-${f.initial.toLowerCase()}`}
                >
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.18em]" style={{ color: hex }}>
                    {f.discipline}
                  </div>
                  <div className="mt-4 flex items-center gap-5">
                    <div
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full font-display text-2xl"
                      style={{
                        background: BADGE_BG[f.accent],
                        color: "#041012",
                      }}
                      aria-hidden
                    >
                      {f.initial}
                    </div>
                    <div>
                      <div className="font-display text-2xl text-ink-text">{f.name}</div>
                      <div
                        className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.16em]"
                        style={{ color: hex }}
                      >
                        {f.role}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 font-display text-[15px]" style={{ color: hex }}>
                    {f.focus}
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{f.bio}</p>

                  <div className="mt-6 border-t border-white/[0.06] pt-6">
                    <div className="mlabel">Focus areas</div>
                    <ul className="mt-3 space-y-2">
                      {f.work.map((w) => (
                        <li key={w} className="flex items-start gap-2.5 text-[13.5px] text-ink-text/80">
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: hex }}
                            aria-hidden
                          />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Typeset name facsimile — clearly a wordmark, never a forged signature */}
                  <div className="mt-8 flex items-center justify-between border-t border-white/[0.06] pt-5">
                    <span
                      className="text-2xl"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontStyle: "italic",
                        color: hex,
                        letterSpacing: "-0.02em",
                      }}
                      aria-hidden
                    >
                      {f.name}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
                      Typeset name
                    </span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Convergence — portfolio signals resolve back into the Nirmata mark */}
        <Reveal className="mt-16">
          <div className="card relative overflow-hidden p-10 text-center" data-testid="founder-convergence">
            <div className="glow-teal absolute inset-0 opacity-50" aria-hidden />
            <div className="relative flex flex-col items-center">
              <div className="floaty">
                <NirmataOsMark size={104} />
              </div>
              <p className="mt-6 font-display text-2xl text-ink-text md:text-3xl">
                Three disciplines. One covenant.
              </p>
              <p className="lead mx-auto mt-4">
                Every venture&apos;s signal converges here — architecture, philosophy, and
                go-to-market holding each other honest.
              </p>
              <p className="mt-6 font-display text-xl" style={{ color: "var(--iris)" }}>
                Brilliance has no passport.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
