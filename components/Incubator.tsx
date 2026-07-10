import { Reveal } from "./Reveal";

const NOT_GATED = ["Nationality", "Culture", "Background", "Neurotype", "Discipline", "Credential"];

/**
 * The singular "Brilliance has no passport" moment — a full-bleed, high-contrast
 * beat. The struck criteria read as rejected passport stamps; the one gate we
 * keep resolves the moment. Stamp motion is decorative and off under reduced motion.
 */
export function Incubator() {
  return (
    <section id="incubator" className="section overflow-hidden" data-testid="incubator">
      <div className="glow-teal absolute inset-0 opacity-70" aria-hidden />
      <div className="glow-iris absolute inset-0 opacity-50" aria-hidden />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
        <div className="orbit-ring" style={{ width: "min(120vw,1100px)", height: "min(120vw,1100px)" }} />
        <div className="orbit-ring orbit-ring--iris" style={{ width: "min(84vw,760px)", height: "min(84vw,760px)" }} />
      </div>

      <div className="container relative text-center">
        <Reveal>
          <span className="eyebrow eyebrow--teal">
            <span className="dot dot--pulse" /> The incubator
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h2
            className="mx-auto mt-8 max-w-5xl font-display text-ink-text"
            style={{
              fontSize: "clamp(2.8rem, 1rem + 8vw, 7rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.05em",
            }}
          >
            Brilliance has
            <br />
            no <span className="grad-tealiris">passport</span>.
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <p className="lead mx-auto mt-8 text-center">
            Nirmata is an ecosystem and incubator for rare interdisciplinary thinkers — the people
            who see the seam between two fields no one else is looking at. We do not gate talent by
            where it comes from.
          </p>
        </Reveal>

        {/* rejected criteria — passport stamps */}
        <Reveal delay={200}>
          <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-3" data-testid="passport-stamps">
            {NOT_GATED.map((o, i) => (
              <span
                key={o}
                className="stamp inline-flex items-center rounded-md border-2 border-coral/45 px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-coral/70 line-through decoration-coral/60"
                style={{ animationDelay: `${i * 90}ms`, transform: "rotate(-11deg)" }}
              >
                {o}
              </span>
            ))}
          </div>
          <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-faint">
            Not criteria
          </div>
        </Reveal>

        {/* the one gate */}
        <Reveal delay={260}>
          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-primary/30 bg-primary/[0.04] p-8 md:p-10">
            <div className="mlabel" style={{ color: "var(--primary)" }}>
              The only gate
            </div>
            <p className="mt-4 font-display text-2xl leading-snug text-ink-text md:text-3xl">
              Does it help people?
              <br />
              Does it hold up under scrutiny?
            </p>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <p className="mx-auto mt-8 max-w-xl text-[15px] leading-relaxed text-ink-muted">
            If you build from first principles, refuse to ship things that don&apos;t help people, and
            want your work judged by what actually reaches the world — there is a place for you here.
          </p>
          <a href="#contact" className="btn btn--primary mt-8" data-testid="incubator-cta">
            Start a conversation
          </a>
        </Reveal>
      </div>
    </section>
  );
}
