import { NirmataOsMark } from "./marks";
import { Reveal } from "./Reveal";

const LAYERS = [
  {
    k: "Brain",
    v: "Reasoning and orchestration. Plans work, routes it, and keeps a human in the loop on anything consequential.",
  },
  {
    k: "Spine",
    v: "The shared runtime — identity, memory, policy and evidence — so every venture inherits the same guarantees.",
  },
  {
    k: "Worker",
    v: "Specialized agents that act inside real workflows: observe, decide, act, and record what they did.",
  },
];

const RUNTIME = [
  ["Governance", "Human-in-the-loop, policy-gated, audit-logged"],
  ["Runtime", "Cloud · VPC · on-prem · edge · air-gap"],
  ["Data", "Customers own their IP — we never train on it"],
  ["Interface", "Agents render their own controls (GenUI)"],
];

export function Substrate() {
  return (
    <section id="substrate" className="section" data-testid="substrate">
      <div className="glow-teal absolute inset-0 opacity-50" aria-hidden />
      <div className="container relative">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center">
              <span className="orbit-ring" style={{ width: "78%", height: "78%" }} />
              <span className="orbit-ring orbit-ring--iris" style={{ width: "100%", height: "100%" }} />
              <NirmataOsMark size={220} className="floaty relative drop-shadow-[0_0_40px_rgba(0,240,223,0.25)]" />
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="eyebrow eyebrow--teal">
                <span className="dot dot--pulse" /> The shared substrate
              </span>
              <h2 className="h-section mt-7">
                One operating system
                <br />
                beneath every venture.
              </h2>
              <p className="lead mt-6">
                NirmataOS &mdash; powered by the ΔTOM spine &mdash; is the common ground the whole
                portfolio stands on. <span className="font-mono text-primary">Brain · Spine · Worker</span>:
                one architecture, deployed everywhere, so a guarantee earned once holds across every company.
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-9 space-y-3">
              {LAYERS.map((l) => (
                <div key={l.k} className="card p-5">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                      {l.k}
                    </span>
                    <p className="text-[14.5px] leading-relaxed text-ink-muted">{l.v}</p>
                  </div>
                </div>
              ))}
            </Reveal>

            <Reveal delay={200}>
              <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] sm:grid-cols-2">
                {RUNTIME.map(([k, v]) => (
                  <div key={k} className="bg-bg/40 px-5 py-4">
                    <dt className="mlabel">{k}</dt>
                    <dd className="mt-1.5 text-[13.5px] text-ink-text/85">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
