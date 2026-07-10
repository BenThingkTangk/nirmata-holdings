import { Reveal } from "./Reveal";

type Founder = {
  initial: string;
  accent: "teal" | "iris";
  name: string;
  role: string;
  focus: string;
  bio: string;
  work: string[];
};

const FOUNDERS: Founder[] = [
  {
    initial: "B",
    accent: "teal",
    name: "Ben O’Leary",
    role: "Co-Founder · Chief Quantum Officer",
    focus: "Architect of the ΔTOM substrate",
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
    bio: "A polymath across agritech, philosophy, systems theory and emergent AI. Joel translates first-principles thinking into tangible product architecture across the portfolio — the conceptual conscience and innovation engine of the company.",
    work: [
      "Philosophical foundation of ΔTOM",
      "Agritech and regenerative-land research",
      "Cross-domain product innovation",
    ],
  },
];

export function Founders() {
  return (
    <section id="founders" className="section" data-testid="founders">
      <div className="container">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">
            <span className="dot text-iris" /> Co-founders
          </span>
          <h2 className="h-section mt-7">
            The architect and the <span className="grad-tealiris">philosopher</span>.
          </h2>
          <p className="lead mt-6">
            Nirmata is founded by two operators who share one belief: build the systems humankind
            actually deserves, or don&apos;t build at all.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {FOUNDERS.map((f, i) => {
            const isTeal = f.accent === "teal";
            return (
              <Reveal key={f.name} delay={i * 100}>
                <article className={`card card--glow-${f.accent} h-full p-8 md:p-10`} data-testid={`founder-${f.initial.toLowerCase()}`}>
                  <div className="flex items-center gap-5">
                    <div
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full font-display text-2xl"
                      style={{
                        background: isTeal
                          ? "linear-gradient(135deg,#00f0df,#00b8ae)"
                          : "linear-gradient(135deg,#c084fc,#9333ea)",
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
                        style={{ color: isTeal ? "#00f0df" : "#c084fc" }}
                      >
                        {f.role}
                      </div>
                    </div>
                  </div>

                  <div
                    className="mt-6 font-display text-[15px]"
                    style={{ color: isTeal ? "#00f0df" : "#c084fc" }}
                  >
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
                            style={{ background: isTeal ? "#00f0df" : "#c084fc" }}
                            aria-hidden
                          />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
