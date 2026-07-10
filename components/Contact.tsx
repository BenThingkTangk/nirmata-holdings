import { Reveal } from "./Reveal";

/**
 * Proof points are drawn only from claims already made — and constrained —
 * elsewhere on the site. No invented logos, clients, testimonials or metrics.
 */
const PROOF = [
  {
    figure: "NIST",
    label: "FIPS 203 / 204 / 205",
    note: "ATOM Red Team builds to finalized post-quantum standards.",
  },
  {
    figure: "Peer-reviewed",
    label: "science, not slogans",
    note: "PhysioPS and ALC Bio frame claims to the published literature.",
  },
  {
    figure: "Live",
    label: "shipping products",
    note: "EvidenceOS, PhysioPS, ALC Bio and Mousington are in the world.",
  },
];

// Voice-matched routes into the experience — one primary conversion preserved.
const ROUTES = [
  { label: "Explore the system", note: "The Nirmata core, end to end", href: "#scroll-film" },
  { label: "Run the simulation", note: "See a human-governed Worker run", href: "#worker-sim" },
  { label: "Talk to a founder", note: "Architect & philosopher", href: "mailto:hello@nirmataholdings.com?subject=Talk%20to%20a%20founder" },
];

export function Contact() {
  return (
    <section id="contact" className="section" data-testid="contact">
      <div className="glow-teal absolute inset-0 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
        <div className="orbit-ring" style={{ width: "min(90vw,760px)", height: "min(90vw,760px)" }} />
      </div>
      <div className="container relative text-center">
        <Reveal className="mx-auto max-w-3xl">
          <span className="eyebrow eyebrow--teal">
            <span className="dot dot--pulse" /> Start a conversation
          </span>
          <h2 className="mt-7 font-display text-ink-text" style={{ fontSize: "clamp(2.2rem, 1rem + 4.4vw, 4.4rem)", lineHeight: 1.02, letterSpacing: "-0.04em" }}>
            Build with <span className="grad-tealiris">Nirmata</span>.
          </h2>
          <p className="lead mx-auto mt-6">
            Enterprise partnership, portfolio collaboration, incubator inquiry, or press &mdash; we
            read every note. Tell us what you&apos;re trying to make true.
          </p>
        </Reveal>

        {/* Proof strip — verifiable framing only */}
        <Reveal delay={80} className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-3" >
          <div className="sr-only">Proof points, drawn only from claims made elsewhere on this site.</div>
          {PROOF.map((p) => (
            <div key={p.figure} className="card p-5 text-left" data-testid="proof-item">
              <div className="proof-figure text-2xl text-primary">{p.figure}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                {p.label}
              </div>
              <p className="mt-2 text-[13px] leading-snug text-ink-muted">{p.note}</p>
            </div>
          ))}
        </Reveal>

        {/* Voice-matched routes */}
        <Reveal delay={120} className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-3">
          {ROUTES.map((r) => (
            <a
              key={r.label}
              href={r.href}
              className="card p-5 text-left transition-colors"
              data-testid="conversion-route"
            >
              <div className="font-display text-[15px] text-ink-text">{r.label}</div>
              <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
                {r.note}
              </div>
            </a>
          ))}
        </Reveal>

        {/* Primary conversion */}
        <Reveal delay={160} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="mailto:hello@nirmataholdings.com" className="btn btn--primary" data-testid="contact-email">
            hello@nirmataholdings.com
          </a>
          <a href="#portfolio" className="btn btn--ghost">
            Explore the portfolio
          </a>
        </Reveal>
      </div>
    </section>
  );
}
