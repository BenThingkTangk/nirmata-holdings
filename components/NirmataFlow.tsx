"use client";
import { useId, useState } from "react";
import type { Accent } from "@/lib/portfolio";
import { ACCENT_HEX } from "./marks";

type Stage = {
  k: string;
  role: string;
  detail: string;
  accent: Accent;
};

const STAGES: Stage[] = [
  {
    k: "Human",
    role: "Sets intent · holds the stop",
    detail:
      "Every flow begins and ends with a person. Intent, authority, and an always-available stop live with the human — never with the machine.",
    accent: "teal",
  },
  {
    k: "Brain",
    role: "Reasons · plans · routes",
    detail:
      "Reasoning and orchestration. It decomposes the goal, routes the work, and escalates anything consequential back to a human.",
    accent: "iris",
  },
  {
    k: "Spine",
    role: "Identity · memory · policy · evidence",
    detail:
      "The shared runtime. Identity, memory, policy and a tamper-evident evidence trail — inherited identically by every venture in the house.",
    accent: "azure",
  },
  {
    k: "Worker",
    role: "Observes · decides · acts · records",
    detail:
      "Specialized agents that act inside real workflows: they observe, decide, act, and record exactly what they did and why.",
    accent: "gold",
  },
  {
    k: "Outcome",
    role: "A measurable result — and a record of how",
    detail:
      "Work becomes a measurable result paired with a defensible account of how it happened. The record flows back to the human, and the loop closes.",
    accent: "coral",
  },
];

/**
 * Living Brain·Spine·Worker flow: Human → Brain → Spine → Worker → Outcome.
 * Nodes are real, SSR-rendered buttons; the connecting "signal" is CSS-only
 * (marching-ants dashes) and freezes under reduced motion. Selecting a stage
 * updates an aria-live detail region. Deterministic — no randomness.
 */
export function NirmataFlow() {
  const [active, setActive] = useState(0);
  const detailId = useId();
  const current = STAGES[active];
  const hex = ACCENT_HEX[current.accent];

  return (
    <div className="w-full" data-testid="nirmata-flow">
      <ol className="relative flex flex-col gap-0" aria-label="How work flows through NirmataOS">
        {STAGES.map((s, i) => {
          const c = ACCENT_HEX[s.accent];
          const isActive = i === active;
          const last = i === STAGES.length - 1;
          return (
            <li key={s.k} className="relative">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                aria-describedby={detailId}
                className="group flex w-full items-center gap-4 rounded-xl border p-3.5 text-left transition-all duration-200 ease-atom"
                style={{
                  borderColor: isActive ? c : "rgba(255,255,255,0.08)",
                  background: isActive ? `${c}0f` : "rgba(255,255,255,0.02)",
                  boxShadow: isActive ? `0 0 26px ${c}22` : undefined,
                }}
                data-testid={`flow-stage-${s.k.toLowerCase()}`}
              >
                <span
                  className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold uppercase tracking-[0.06em] transition-transform duration-200 ease-atom group-hover:scale-105"
                  style={{
                    color: isActive ? "#041012" : c,
                    background: isActive ? c : `${c}18`,
                    border: `1px solid ${c}`,
                    boxShadow: isActive ? `0 0 14px ${c}` : undefined,
                  }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[17px] leading-tight text-ink-text">
                    {s.k}
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
                    {s.role}
                  </span>
                </span>
              </button>

              {!last && (
                <div className="flex h-6 justify-start pl-[30px]" aria-hidden>
                  <svg width="12" height="24" viewBox="0 0 12 24" fill="none">
                    <line
                      x1="6"
                      y1="0"
                      x2="6"
                      y2="24"
                      stroke={c}
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      opacity="0.55"
                      className="flow-dash"
                    />
                  </svg>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div
        id={detailId}
        role="status"
        aria-live="polite"
        className="mt-5 rounded-xl border p-5"
        style={{ borderColor: `${hex}44`, background: `${hex}08` }}
      >
        <div className="mlabel" style={{ color: hex }}>
          {current.k}
        </div>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{current.detail}</p>
      </div>
    </div>
  );
}
