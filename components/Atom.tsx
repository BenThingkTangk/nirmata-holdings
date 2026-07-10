"use client";
import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AtomMark, ACCENT_HEX } from "./marks";
import type { Accent } from "@/lib/portfolio";
import { Reveal } from "./Reveal";

type Control =
  | { kind: "segment"; label: string; options: string[] }
  | { kind: "toggle"; label: string; on: boolean; locked?: boolean; note?: string }
  | { kind: "meter"; label: string; value: number; unit: string };

type Action = { title: string; detail: string; gate: "approved" | "awaiting" | "logged" };

type Vertical = {
  id: string;
  accent: Accent;
  label: string;
  worker: string;
  runs: string; // the venture it maps to
  mission: string;
  metrics: { k: string; v: string; note: string }[];
  controls: Control[];
  actions: Action[];
};

/**
 * The five ATOM verticals. Every value here is fixed and deterministic — this
 * is a canonical interface preview, not live telemetry. Metrics are labelled
 * SAMPLE and framed to the same honesty bar as the portfolio copy.
 */
const VERTICALS: Vertical[] = [
  {
    id: "revenue",
    accent: "gold",
    label: "Revenue",
    worker: "SalesOS Operator",
    runs: "ATOM SalesOS · Workers",
    mission: "Runs the top of the funnel — voice-first, real-time, compliance-aware.",
    metrics: [
      { k: "Pipeline touched", v: "1,284", note: "sample queue" },
      { k: "Human approvals", v: "100%", note: "before any outreach" },
      { k: "TCPA gate", v: "On", note: "compliance-locked" },
    ],
    controls: [
      { kind: "segment", label: "Channel", options: ["Voice", "Email", "SMS"] },
      { kind: "meter", label: "Outreach cadence", value: 3, unit: "/ wk" },
      {
        kind: "toggle",
        label: "Human-in-the-loop",
        on: true,
        locked: true,
        note: "Covenant-locked — SalesOS cannot dial without an operator's approval.",
      },
    ],
    actions: [
      { title: "Draft follow-up to 42 warm leads", detail: "Sequenced, TCPA-checked, queued for review.", gate: "awaiting" },
      { title: "Book discovery call · Acme", detail: "Slot proposed after rep confirmation.", gate: "awaiting" },
      { title: "Log call summary + next step", detail: "Written to the shared evidence spine.", gate: "logged" },
    ],
  },
  {
    id: "trust",
    accent: "iris",
    label: "Trust & Security",
    worker: "EvidenceOS Sentinel",
    runs: "EvidenceOS · ATOM Red Team",
    mission: "Turns every AI-mediated action into tamper-evident, auditable evidence.",
    metrics: [
      { k: "Consent ledger", v: "Hash-chained", note: "append-only" },
      { k: "Audit log", v: "SHA-256", note: "tamper-evident" },
      { k: "Crypto posture", v: "PQC-ready", note: "NIST 203/204/205" },
    ],
    controls: [
      { kind: "segment", label: "Mode", options: ["Monitor", "Gate", "Red-team"] },
      { kind: "meter", label: "Pre-action checks", value: 6, unit: "gates" },
      {
        kind: "toggle",
        label: "Pre-action compliance gate",
        on: true,
        locked: true,
        note: "Covenant-locked — no action clears without passing the gate first.",
      },
    ],
    actions: [
      { title: "Verify consent before send", detail: "Checked against the hash-chained ledger.", gate: "approved" },
      { title: "Seal interaction to audit log", detail: "SHA-256 entry, tamper-evident.", gate: "logged" },
      { title: "Flag anomalous request", detail: "Held for human review — never auto-resolved.", gate: "awaiting" },
    ],
  },
  {
    id: "health",
    accent: "coral",
    label: "Health",
    worker: "PhysioPS Insight",
    runs: "PhysioPS · HumanOS",
    mission: "Surfaces autonomic (ANS/HRV) signal patterns to support earlier insight.",
    metrics: [
      { k: "P&S measurement", v: "Independent", note: "parasympathetic + sympathetic" },
      { k: "Every flag", v: "Cited", note: "to peer-reviewed literature" },
      { k: "Clinician review", v: "Required", note: "before any conclusion" },
    ],
    controls: [
      { kind: "segment", label: "Signal", options: ["HRV", "Sympathetic", "Parasympathetic"] },
      { kind: "meter", label: "Look-back window", value: 12, unit: "wks" },
      {
        kind: "toggle",
        label: "Clinician-in-the-loop",
        on: true,
        locked: true,
        note: "Covenant-locked — PhysioPS supports insight; it never diagnoses on its own.",
      },
    ],
    actions: [
      { title: "Summarize ANS trend for clinician", detail: "Pattern only — framed as 'supports earlier insight'.", gate: "awaiting" },
      { title: "Attach source citations", detail: "Each flag linked to peer-reviewed work.", gate: "logged" },
      { title: "Escalate outlier to human", detail: "No autonomous clinical claim is ever made.", gate: "awaiting" },
    ],
  },
  {
    id: "agriculture",
    accent: "azure",
    label: "Agriculture",
    worker: "ALC Field Advisor",
    runs: "ALC Bio Innovations US",
    mission: "Plans fulvic & humic inputs as a biostimulant complement to fertilizer.",
    metrics: [
      { k: "Feed efficiency", v: "Improved", note: "peer-reviewed support" },
      { k: "Antibiotic reliance", v: "May reduce", note: "framed as complement" },
      { k: "NPK", v: "Complements", note: "not a blanket replacement" },
    ],
    controls: [
      { kind: "segment", label: "Program", options: ["Soil", "Livestock", "Crop"] },
      { kind: "meter", label: "Application rate", value: 2, unit: "L/ac" },
      {
        kind: "toggle",
        label: "Agronomist-in-the-loop",
        on: true,
        locked: true,
        note: "Covenant-locked — recommendations complement, never replace, expert judgment.",
      },
    ],
    actions: [
      { title: "Draft fulvic program for pasture", detail: "Biostimulant complement, not a fertilizer swap.", gate: "awaiting" },
      { title: "Model nutrient-use efficiency", detail: "Digestibility + uptake, framed honestly.", gate: "logged" },
      { title: "Send plan to agronomist", detail: "Human signs off before the field acts.", gate: "awaiting" },
    ],
  },
  {
    id: "learning",
    accent: "teal",
    label: "Learning",
    worker: "Mousington Narrator",
    runs: "Adventures in Mousington",
    mission: "Renders an accessibility-first storyworld for every kind of reader.",
    metrics: [
      { k: "Design", v: "Accessibility-first", note: "from the first page" },
      { k: "Reading modes", v: "Multiple", note: "read-aloud · dyslexia-friendly" },
      { k: "Story IP", v: "Original", note: "not licensed filler" },
    ],
    controls: [
      { kind: "segment", label: "Mode", options: ["Read-aloud", "Dyslexia", "High-contrast"] },
      { kind: "meter", label: "Ages", value: 4, unit: "–8" },
      {
        kind: "toggle",
        label: "Guardian-in-the-loop",
        on: true,
        locked: true,
        note: "Covenant-locked — content stays inside what a guardian has allowed.",
      },
    ],
    actions: [
      { title: "Render chapter in read-aloud", detail: "Narrated, captioned, dyslexia-friendly.", gate: "approved" },
      { title: "Adapt to high-contrast", detail: "Same story, inclusive of visual needs.", gate: "logged" },
      { title: "Suggest next adventure", detail: "Within guardian-approved bounds.", gate: "awaiting" },
    ],
  },
];

const GATE_LABEL: Record<Action["gate"], string> = {
  approved: "Approved",
  awaiting: "Awaiting human",
  logged: "Logged",
};

export function Atom() {
  const [idx, setIdx] = useState(0);
  const [nudge, setNudge] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const v = VERTICALS[idx];
  const hex = ACCENT_HEX[v.accent];

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    setIdx((i) => {
      const next = e.key === "ArrowRight" ? (i + 1) % VERTICALS.length : (i - 1 + VERTICALS.length) % VERTICALS.length;
      tabRefs.current[next]?.focus();
      return next;
    });
  }, []);

  const tryUnlock = () => {
    setNudge(true);
    window.setTimeout(() => setNudge(false), 1800);
  };

  return (
    <section id="atom" className="section" data-testid="atom">
      <div className="container container-wide">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-24">
            <span className="eyebrow eyebrow--teal">
              <span className="dot dot--pulse" /> ΔTOM · the agent layer
            </span>
            <div className="mt-8 flex items-center gap-4">
              <AtomMark size={64} accent={v.accent} title="ATOM" />
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
              ATOM is the canonical agent framework the portfolio is built on. Its design language is
              deliberately fixed: one orbital mark, five accents, and a single motion signature —{" "}
              <span className="font-mono text-primary">180ms cubic-bezier(0.16, 1, 0.3, 1)</span>.
            </p>
            <p className="mt-5 text-[14px] leading-relaxed text-ink-muted">
              Pick a vertical. ATOM renders its own controls for that domain — the same operator,
              re-skinned to the work. Every action stays behind a human gate you cannot switch off.
            </p>
            <div className="mt-6 flex flex-wrap gap-2" aria-hidden>
              {VERTICALS.map((x) => (
                <AtomMark key={x.id} size={30} accent={x.accent} title="" />
              ))}
            </div>
          </Reveal>

          {/* The GenUI console */}
          <Reveal delay={80}>
            <div
              className="card overflow-hidden"
              data-testid="atom-genui"
              style={{ borderColor: `${hex}33` }}
            >
              {/* console chrome */}
              <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: hex, boxShadow: `0 0 10px ${hex}` }} aria-hidden />
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                    ATOM · GenUI runtime
                  </span>
                </div>
                <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-faint">
                  deterministic preview
                </span>
              </div>

              {/* vertical tabs */}
              <div
                role="tablist"
                aria-label="ATOM verticals"
                aria-orientation="horizontal"
                className="flex flex-wrap gap-2 border-b border-white/[0.07] px-4 py-3"
                onKeyDown={onKeyDown}
                data-testid="atom-tabs"
              >
                {VERTICALS.map((x, i) => {
                  const active = i === idx;
                  const c = ACCENT_HEX[x.accent];
                  return (
                    <button
                      key={x.id}
                      ref={(el) => { tabRefs.current[i] = el; }}
                      role="tab"
                      id={`atom-tab-${x.id}`}
                      aria-selected={active}
                      aria-controls={`atom-panel-${x.id}`}
                      tabIndex={active ? 0 : -1}
                      onClick={() => setIdx(i)}
                      className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] transition-all duration-200 ease-atom"
                      style={{
                        color: active ? "#041012" : "#9aa8ad",
                        background: active ? c : "rgba(255,255,255,0.02)",
                        borderColor: active ? c : "rgba(255,255,255,0.1)",
                      }}
                      data-testid={`atom-tab-${x.id}`}
                    >
                      {x.label}
                    </button>
                  );
                })}
              </div>

              {/* panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={v.id}
                  role="tabpanel"
                  id={`atom-panel-${v.id}`}
                  aria-labelledby={`atom-tab-${v.id}`}
                  aria-live="polite"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="p-5 md:p-6"
                  data-testid="atom-panel"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <AtomMark size={34} accent={v.accent} title="" />
                      <div>
                        <div className="font-display text-lg text-ink-text">{v.worker}</div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: hex }}>
                          runs {v.runs}
                        </div>
                      </div>
                    </div>
                    <span className="status" style={{ color: hex }}>
                      <span className="dot dot--pulse" /> Operator online
                    </span>
                  </div>

                  <p className="mt-4 text-[14px] leading-relaxed text-ink-muted">{v.mission}</p>

                  {/* metrics */}
                  <dl className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02]">
                    {v.metrics.map((m) => (
                      <div key={m.k} className="bg-bg/40 px-3 py-3.5 text-center">
                        <dd className="font-display text-[17px] leading-tight text-ink-text">{m.v}</dd>
                        <dt className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-ink-faint">{m.k}</dt>
                        <div className="mt-0.5 text-[9.5px] leading-tight text-ink-faint/80">{m.note}</div>
                      </div>
                    ))}
                  </dl>

                  {/* rendered controls */}
                  <div className="mt-5">
                    <div className="mlabel">Rendered controls</div>
                    <div className="mt-3 space-y-3">
                      {v.controls.map((ctl) => (
                        <RenderedControl key={ctl.label} ctl={ctl} hex={hex} nudge={nudge} onTryUnlock={tryUnlock} />
                      ))}
                    </div>
                  </div>

                  {/* action queue */}
                  <div className="mt-5">
                    <div className="mlabel">Action queue</div>
                    <ul className="mt-3 space-y-2">
                      {v.actions.map((a) => (
                        <li key={a.title} className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: hex }}
                            aria-hidden
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-[13.5px] text-ink-text">{a.title}</div>
                            <div className="mt-0.5 text-[12px] leading-snug text-ink-muted">{a.detail}</div>
                          </div>
                          <GateChip gate={a.gate} hex={hex} />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-5 border-t border-white/[0.06] pt-4 font-mono text-[10px] leading-relaxed text-ink-faint">
                    Deterministic interface preview — illustrative, not live data. Metrics marked
                    &ldquo;sample&rdquo; are placeholders; ATOM ships claims only when they can be verified.
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function RenderedControl({
  ctl,
  hex,
  nudge,
  onTryUnlock,
}: {
  ctl: Control;
  hex: string;
  nudge: boolean;
  onTryUnlock: () => void;
}) {
  const [seg, setSeg] = useState(0);

  if (ctl.kind === "segment") {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3.5 py-3">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-muted">{ctl.label}</span>
        <div className="flex gap-1" role="group" aria-label={ctl.label}>
          {ctl.options.map((o, i) => {
            const active = i === seg;
            return (
              <button
                key={o}
                type="button"
                onClick={() => setSeg(i)}
                aria-pressed={active}
                className="rounded-lg px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.06em] transition-all duration-200 ease-atom"
                style={{
                  color: active ? "#041012" : "#9aa8ad",
                  background: active ? hex : "rgba(255,255,255,0.03)",
                }}
              >
                {o}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (ctl.kind === "meter") {
    const pct = Math.min(100, (ctl.value / (ctl.value + 6)) * 100 + 24);
    return (
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-3.5 py-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-muted">{ctl.label}</span>
          <span className="font-display text-[13px] text-ink-text">
            {ctl.value}
            <span className="ml-1 text-ink-faint">{ctl.unit}</span>
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]" aria-hidden>
          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: hex }} />
        </div>
      </div>
    );
  }

  // toggle (covenant-locked human-in-the-loop)
  return (
    <div
      className={`rounded-xl border bg-white/[0.02] px-3.5 py-3 transition-colors duration-200 ${
        nudge ? "border-coral/60" : "border-white/[0.07]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-text">
          {ctl.label}
          {ctl.locked && (
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden style={{ color: hex }}>
              <rect x="2.5" y="5.5" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" />
              <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" stroke="currentColor" strokeWidth="1.1" />
            </svg>
          )}
        </span>
        <button
          type="button"
          onClick={ctl.locked ? onTryUnlock : undefined}
          role="switch"
          aria-checked={ctl.on}
          aria-label={`${ctl.label}${ctl.locked ? " (covenant-locked)" : ""}`}
          className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200"
          style={{ background: ctl.on ? hex : "rgba(255,255,255,0.12)", cursor: ctl.locked ? "not-allowed" : "pointer" }}
        >
          <span
            className="absolute h-5 w-5 rounded-full bg-bg transition-transform duration-200 ease-atom"
            style={{ transform: ctl.on ? "translateX(22px)" : "translateX(2px)" }}
          />
        </button>
      </div>
      {ctl.note && (
        <p className={`mt-2 text-[11.5px] leading-snug ${nudge ? "text-coral" : "text-ink-muted"}`}>
          {nudge && ctl.locked ? "Human-in-the-loop is covenant-locked — it cannot be switched off. " : ""}
          {ctl.note}
        </p>
      )}
    </div>
  );
}

function GateChip({ gate, hex }: { gate: Action["gate"]; hex: string }) {
  const styles: Record<Action["gate"], { color: string; bg: string }> = {
    approved: { color: hex, bg: `${hex}14` },
    awaiting: { color: "#f5c842", bg: "rgba(245,200,66,0.1)" },
    logged: { color: "#9aa8ad", bg: "rgba(255,255,255,0.05)" },
  };
  const s = styles[gate];
  return (
    <span
      className="shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.08em]"
      style={{ color: s.color, background: s.bg }}
    >
      {GATE_LABEL[gate]}
    </span>
  );
}
