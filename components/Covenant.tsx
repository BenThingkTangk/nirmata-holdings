import { Reveal } from "./Reveal";

const TENETS = [
  {
    n: "I",
    t: "Human primacy",
    d: "No agent takes an irreversible action a human wouldn't. Every decision has a lineage, an operator, and a stop.",
  },
  {
    n: "II",
    t: "Radical transparency",
    d: "Every worker names itself, cites its sources, and can show its reasoning. No black boxes ship out of Nirmata.",
  },
  {
    n: "III",
    t: "Consent by default",
    d: "Customers own their IP. We never train on their data, and consent is informed, revocable, and respected.",
  },
  {
    n: "IV",
    t: "No dark patterns",
    d: "We never manipulate the people we serve — not in copy, not in UI, not in models, not in metrics.",
  },
  {
    n: "V",
    t: "Do no silent harm",
    d: "Products are stress-tested for misuse before they reach a customer, and failures are surfaced, not buried.",
  },
  {
    n: "VI",
    t: "Betterment or bust",
    d: "If a venture cannot make someone's life, work, or health measurably better, it does not ship under Nirmata.",
  },
];

export function Covenant() {
  return (
    <section id="covenant" className="section" data-testid="covenant">
      <div className="glow-iris absolute inset-0 opacity-50" aria-hidden />
      <div className="container relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow eyebrow--teal">
            <span className="dot dot--pulse" /> The Ethical AI Covenant
          </span>
          <h2 className="h-section mt-7">
            Six tenets. <span className="grad-tealiris">No exceptions.</span>
          </h2>
          <p className="lead mx-auto mt-6">
            One signed covenant governs every venture in the house. It is encoded in the shared
            substrate, applied to every worker, and binding on every company that ships under the
            Nirmata name.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TENETS.map((t, i) => (
            <Reveal key={t.n} delay={i * 50}>
              <article className="card card--glow-teal h-full p-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-2xl text-primary">{t.n}.</span>
                  <h3 className="font-display text-lg text-ink-text">{t.t}</h3>
                </div>
                <p className="mt-4 text-[14px] leading-relaxed text-ink-muted">{t.d}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mx-auto mt-14 max-w-2xl">
          <div className="card p-8 text-center md:p-10">
            <div className="mlabel">Signed</div>
            <div className="mt-6 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
              <Signatory name="Ben O’Leary" role="Co-Founder · Chief Quantum Officer" />
              <div className="hidden h-10 w-px bg-white/10 sm:block" />
              <Signatory name="Joel Bedard" role="Co-Founder · Chief Philosophy & Innovation Officer" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Signatory({ name, role }: { name: string; role: string }) {
  return (
    <div>
      <div className="font-display text-xl text-ink-text">{name}</div>
      <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
        {role}
      </div>
    </div>
  );
}
