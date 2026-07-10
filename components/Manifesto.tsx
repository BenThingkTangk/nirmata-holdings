import { Reveal } from "./Reveal";

const PILLARS = [
  {
    k: "First principles",
    v: "We reduce every problem to what is physically, ethically and economically true — then rebuild from there, not from the industry's inherited assumptions.",
  },
  {
    k: "Ethical covenant",
    v: "A single, signed covenant governs every venture: customers own their IP, we never train on their data, and a human stays in the loop.",
  },
  {
    k: "For humankind",
    v: "We only build things that help people. Benefit is meant to be broadly shared — not concentrated in the few who got there first.",
  },
];

export function Manifesto() {
  return (
    <section id="manifesto" className="section" data-testid="manifesto">
      <div className="container">
        <Reveal>
          <span className="eyebrow">
            <span className="dot text-primary" /> Why Nirmata exists
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h2
            className="mt-8 font-display text-ink-text"
            style={{ fontSize: "clamp(2.2rem, 1rem + 4.4vw, 4.4rem)", lineHeight: 1.02, letterSpacing: "-0.04em" }}
          >
            The future is not a forecast.
            <br />
            It is a <span className="grad-tealiris">responsibility</span>.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal delay={120} className="space-y-6">
            <p className="lead">
              Industrial stagnation. Fragile systems. A culture taught to fear the very
              intelligence it is building. Healthcare that waits for collapse before it acts.
              Cyber risk racing ahead of the cryptography meant to contain it. Land degrading
              under the practices meant to feed us.
            </p>
            <p className="lead">
              These are not separate problems. They are symptoms of the same habit: treating hard,
              important ideas as someone else&apos;s theory. Nirmata Holdings exists to end that
              habit &mdash; to take the ideas that matter most and make them ship, safely, in the
              open, for everyone.
            </p>
            <p className="lead">
              We are an ecosystem and an incubator for rare interdisciplinary thinkers and builders.
              Brilliance has no passport. We do not gate it by nationality, culture, background,
              neurotype, discipline, or conventional credential. We gate it by one question:
              <span className="text-ink-text"> does it help people, and does it hold up?</span>
            </p>
          </Reveal>

          <Reveal delay={200} className="space-y-4">
            {PILLARS.map((p) => (
              <div key={p.k} className="card p-6">
                <div className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-primary">
                  {p.k}
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{p.v}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
