import { AtomMark } from "./marks";
import type { Accent } from "@/lib/portfolio";
import { Reveal } from "./Reveal";

const TAXONOMY: { accent: Accent; k: string; v: string }[] = [
  { accent: "teal", k: "Core", v: "The runtime and orchestration spine every worker plugs into." },
  { accent: "iris", k: "Reasoning", v: "Planning, tool-use and judgment — governed, never a black box." },
  { accent: "coral", k: "Voice", v: "Real-time, voice-first interaction for human-speed workflows." },
  { accent: "gold", k: "Signals", v: "Observation and telemetry that turn activity into evidence." },
  { accent: "azure", k: "Tools", v: "The connectors and actions workers use to actually get work done." },
];

export function Atom() {
  return (
    <section id="atom" className="section" data-testid="atom">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-24">
            <span className="eyebrow eyebrow--teal">
              <span className="dot dot--pulse" /> ΔTOM · the agent layer
            </span>
            <div className="mt-8 flex items-center gap-4">
              <AtomMark size={64} accent="teal" title="ATOM" />
              <div>
                <div className="font-display text-2xl text-ink-text">ATOM</div>
                <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-faint">
                  One mark · five accents
                </div>
              </div>
            </div>
            <h2 className="h-section mt-7">
              Where others ship chatbots,
              <br />
              we ship <span className="grad-tealiris">operators</span>.
            </h2>
            <p className="lead mt-6">
              ATOM is the canonical agent framework the revenue and trust ventures are built on.
              Its design language is deliberately fixed: one orbital mark, five accents, and a
              single motion signature &mdash; <span className="font-mono text-primary">180ms cubic-bezier(0.16, 1, 0.3, 1)</span>.
            </p>
            <div className="mt-5 flex flex-wrap gap-2" aria-hidden>
              {(["teal", "iris", "coral", "gold", "azure"] as Accent[]).map((a) => (
                <AtomMark key={a} size={30} accent={a} title="" />
              ))}
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {TAXONOMY.map((t, i) => (
              <Reveal key={t.k} delay={(i % 2) * 60}>
                <article className={`card card--glow-${t.accent} h-full p-6`}>
                  <div className="flex items-center gap-3">
                    <AtomMark size={34} accent={t.accent} title="" />
                    <h3 className="font-display text-lg text-ink-text">{t.k}</h3>
                  </div>
                  <p className="mt-4 text-[14px] leading-relaxed text-ink-muted">{t.v}</p>
                </article>
              </Reveal>
            ))}
            <Reveal delay={60}>
              <article className="card h-full p-6">
                <div className="mlabel">Attribution</div>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-muted">
                  ATOM&apos;s mark and accent system are reproduced from the canonical ATOM design
                  language and applied consistently across every venture that runs on it.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
