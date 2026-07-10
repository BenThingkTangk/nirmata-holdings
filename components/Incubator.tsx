import { Reveal } from "./Reveal";

const OPEN_TO = [
  "Nationality",
  "Culture",
  "Background",
  "Neurotype",
  "Discipline",
  "Credential",
];

export function Incubator() {
  return (
    <section id="incubator" className="section" data-testid="incubator">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <span className="eyebrow">
              <span className="dot text-azure" /> The incubator
            </span>
            <h2 className="h-section mt-7">
              Brilliance has
              <br />
              no <span className="grad-tealiris">passport</span>.
            </h2>
            <p className="lead mt-6">
              Nirmata is an ecosystem and incubator for rare interdisciplinary thinkers &mdash; the
              people who see the seam between two fields no one else is looking at. We do not gate
              talent by where it comes from. We gate it by one question:
              <span className="text-ink-text"> does it help people, and does it hold up?</span>
            </p>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-muted">
              If you build from first principles, refuse to ship things that don&apos;t help people,
              and want your work judged by what actually reaches the world &mdash; there is a place
              for you here.
            </p>
            <a href="#contact" className="btn btn--primary mt-8" data-testid="incubator-cta">
              Start a conversation
            </a>
          </Reveal>

          <Reveal delay={120}>
            <div className="card p-7">
              <div className="mlabel">We do not gate by</div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {OPEN_TO.map((o) => (
                  <li
                    key={o}
                    className="rounded-full border border-white/[0.1] bg-white/[0.02] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted line-through decoration-coral/70"
                  >
                    {o}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-white/[0.06] pt-6">
                <div className="mlabel">We gate by</div>
                <p className="mt-3 font-display text-xl leading-snug text-ink-text">
                  Does it help people? Does it hold up under scrutiny?
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
