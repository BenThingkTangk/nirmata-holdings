import { Reveal } from "./Reveal";

const MODES = [
  {
    t: "Industrial stagnation",
    d: "Whole industries coasting on decades-old assumptions, mistaking incumbency for inevitability.",
    a: "Answered by Thingk Tangk & ATOM",
  },
  {
    t: "Fragile systems",
    d: "Software and operations that work until the first real shock, then fail all at once.",
    a: "Answered by NirmataOS & ATOM Workers",
  },
  {
    t: "AI fear",
    d: "Powerful intelligence deployed as a black box, so people fear it instead of governing it.",
    a: "Answered by the Ethical AI Covenant",
  },
  {
    t: "Health reactivity",
    d: "Medicine that waits for collapse when the physiological signals came hours or years earlier.",
    a: "Answered by PhysioPS & HumanOS",
  },
  {
    t: "Cyber risk",
    d: "Defenses built for yesterday's threat model, unready for a post-quantum, autonomous-attacker world.",
    a: "Answered by ATOM Red Team",
  },
  {
    t: "Degraded land",
    d: "Soil, livestock and crops depleted by the very inputs meant to sustain them.",
    a: "Answered by ALC Bio Innovations",
  },
];

export function FailureModes() {
  return (
    <section id="failure-modes" className="section" data-testid="failure-modes">
      <div className="glow-iris absolute inset-0 opacity-40" aria-hidden />
      <div className="container relative">
        <Reveal>
          <span className="eyebrow">
            <span className="dot text-coral" /> Failure modes we refuse to accept
          </span>
          <h2 className="h-section mt-7 max-w-3xl">
            We choose our ventures by the failures we won&apos;t tolerate.
          </h2>
          <p className="lead mt-5">
            Each venture is a first-principles answer to a specific way the world is currently
            breaking. If a problem doesn&apos;t matter to people, it doesn&apos;t belong here.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODES.map((m, i) => (
            <Reveal key={m.t} delay={i * 60}>
              <article className="card card--glow-teal group h-full p-7">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-coral shadow-[0_0_10px_#ff7b6b]" aria-hidden />
                </div>
                <h3 className="mt-5 font-display text-xl text-ink-text">{m.t}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">{m.d}</p>
                <p className="mt-5 border-t border-white/[0.06] pt-4 font-mono text-[10.5px] uppercase tracking-[0.12em] text-primary">
                  {m.a}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
