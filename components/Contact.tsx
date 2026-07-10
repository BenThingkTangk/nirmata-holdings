import { Reveal } from "./Reveal";

const ROUTES = [
  { label: "Partner with a venture", note: "Enterprise & portfolio collaboration" },
  { label: "Join the incubator", note: "Interdisciplinary builders & thinkers" },
  { label: "Press & briefings", note: "Media and speaking requests" },
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

        <Reveal delay={100} className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
          {ROUTES.map((r) => (
            <div key={r.label} className="card p-5 text-left">
              <div className="font-display text-[15px] text-ink-text">{r.label}</div>
              <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
                {r.note}
              </div>
            </div>
          ))}
        </Reveal>

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
