"use client";
import { useMemo, useState } from "react";
import { Reveal } from "./Reveal";

/**
 * ATOM Worker Outcome Simulation — a deterministic, human-governed run:
 * objective → the Worker plans → policy/covenant gate → HUMAN approval →
 * execution/evidence → measurable (illustrative) outcome. No randomness; all
 * figures are labelled SAMPLE. The human-approval step cannot be skipped, and
 * the covenant gate can hold the run — demonstrating that the human keeps the
 * stop. Fully keyboard operable; the run log is an aria-live region.
 */

type Objective = {
  id: string;
  label: string;
  brief: string;
  plan: string[];
  gate: { rule: string; verdict: "pass" | "hold" }[];
  evidence: string[];
  outcome: { metric: string; value: string; note: string }[];
};

const OBJECTIVES: Objective[] = [
  {
    id: "pipeline",
    label: "Recover a stalled sales pipeline",
    brief:
      "Re-engage 240 dormant opportunities without breaching contact-consent or compliance rules.",
    plan: [
      "Segment 240 dormant opps by last-touch, intent and consent status",
      "Draft channel-appropriate re-engagement for each segment",
      "Sequence outreach inside quiet-hours and frequency caps",
      "Flag 18 accounts missing valid consent for human review",
    ],
    gate: [
      { rule: "TCPA / contact-consent verified per record", verdict: "hold" },
      { rule: "Frequency + quiet-hours policy satisfied", verdict: "pass" },
      { rule: "Covenant: human retains final send authority", verdict: "pass" },
    ],
    evidence: [
      "18 non-consented accounts withheld and queued for a human",
      "222 approved sends hash-logged with policy snapshot",
      "Every message traceable to the approving operator",
    ],
    outcome: [
      { metric: "Meetings booked", value: "31", note: "from 222 compliant touches" },
      { metric: "Consent violations", value: "0", note: "18 risky records blocked pre-send" },
      { metric: "Operator time saved", value: "~14 hrs", note: "vs. manual re-engagement" },
    ],
  },
  {
    id: "support",
    label: "Clear a support backlog overnight",
    brief:
      "Resolve a 900-ticket backlog while escalating anything that needs human judgment.",
    plan: [
      "Classify 900 tickets by intent, risk and sentiment",
      "Auto-draft resolutions for 612 low-risk, high-confidence tickets",
      "Route 74 refund / legal / safety tickets to human owners",
      "Prepare summaries so humans decide in seconds, not minutes",
    ],
    gate: [
      { rule: "No refund or account change without human sign-off", verdict: "hold" },
      { rule: "Sentiment-risk threshold enforced before auto-reply", verdict: "pass" },
      { rule: "Covenant: escalation path always available", verdict: "pass" },
    ],
    evidence: [
      "74 sensitive tickets escalated with decision-ready context",
      "612 draft replies held until a human released the batch",
      "Full audit trail of what was auto-handled vs. escalated",
    ],
    outcome: [
      { metric: "Backlog cleared", value: "68%", note: "612 of 900, human-released" },
      { metric: "Wrong auto-actions", value: "0", note: "sensitive cases never auto-resolved" },
      { metric: "First-response time", value: "-71%", note: "illustrative, vs. baseline" },
    ],
  },
  {
    id: "winback",
    label: "Win back churned accounts",
    brief:
      "Identify recoverable churned accounts and propose offers — humans approve the economics.",
    plan: [
      "Rank 130 churned accounts by recover-likelihood and lifetime value",
      "Draft tailored win-back offers within margin guardrails",
      "Simulate discount cost and flag any offer over policy limit",
      "Assemble an approval sheet for the revenue owner",
    ],
    gate: [
      { rule: "Any discount above 15% requires human approval", verdict: "hold" },
      { rule: "Offer stays inside per-account margin floor", verdict: "pass" },
      { rule: "Covenant: no commitment sent without approval", verdict: "pass" },
    ],
    evidence: [
      "9 above-limit offers withheld for human pricing decision",
      "121 in-policy offers staged, none auto-sent",
      "Projected margin impact attached to each recommendation",
    ],
    outcome: [
      { metric: "Accounts re-opened", value: "17", note: "after human-approved offers" },
      { metric: "Margin breaches", value: "0", note: "9 over-limit offers held" },
      { metric: "Pipeline recovered", value: "$—", note: "reported only when realized" },
    ],
  },
];

const STEPS = ["Objective", "Plan", "Policy gate", "Human approval", "Execute", "Outcome"] as const;

export function WorkerSim() {
  const [objId, setObjId] = useState(OBJECTIVES[0].id);
  const [step, setStep] = useState(0);
  const [approved, setApproved] = useState(false);

  const obj = useMemo(
    () => OBJECTIVES.find((o) => o.id === objId) ?? OBJECTIVES[0],
    [objId]
  );

  const chooseObjective = (id: string) => {
    setObjId(id);
    setStep(1);
    setApproved(false);
  };
  const reset = () => {
    setStep(0);
    setApproved(false);
  };

  const canAdvance = step > 0 && step < 3;
  const atApproval = step === 3;

  return (
    <section id="worker-sim" className="section" data-testid="worker-sim" data-accent="gold">
      <div className="container">
        <Reveal className="max-w-3xl">
          <span className="eyebrow" style={{ color: "#f5c842", borderColor: "rgba(245,200,66,0.3)" }}>
            <span className="dot dot--pulse" style={{ color: "#f5c842" }} /> ATOM Worker · outcome simulation
          </span>
          <h2 className="h-section mt-7">
            Autonomous work. <span style={{ color: "#f5c842" }}>Human authority.</span>
          </h2>
          <p className="lead mt-6">
            Pick a commercial objective and run it. The Worker plans and executes revenue-first —
            but the covenant gate can hold the run, and nothing ships until a human approves. This
            is a deterministic <strong>SIMULATION</strong>; every figure is labelled SAMPLE.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Objective picker */}
          <Reveal>
            <div className="card p-6">
              <div className="mlabel">1 · Choose an objective</div>
              <div className="mt-4 flex flex-col gap-3" role="radiogroup" aria-label="Commercial objective">
                {OBJECTIVES.map((o) => {
                  const active = o.id === objId;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => chooseObjective(o.id)}
                      data-testid={`objective-${o.id}`}
                      className="rounded-xl border p-4 text-left transition-colors duration-200"
                      style={{
                        borderColor: active ? "#f5c842" : "rgba(255,255,255,0.1)",
                        background: active ? "rgba(245,200,66,0.06)" : "rgba(255,255,255,0.02)",
                      }}
                    >
                      <div className="font-display text-[15px] text-ink-text">{o.label}</div>
                      <div className="mt-1 text-[13px] leading-snug text-ink-muted">{o.brief}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Run panel */}
          <Reveal delay={100}>
            <div className="card p-6">
              {/* Stepper */}
              <ol className="flex flex-wrap gap-2" aria-label="Run progress">
                {STEPS.map((s, i) => (
                  <li
                    key={s}
                    className="step-chip"
                    data-state={i < step ? "done" : i === step ? "active" : "todo"}
                    data-testid={`step-${i}`}
                  >
                    {s}
                  </li>
                ))}
              </ol>

              {/* Live run log */}
              <div
                className="mt-5 min-h-[280px]"
                role="region"
                aria-live="polite"
                aria-label="Simulation run log"
                data-testid="sim-log"
              >
                {step === 0 && (
                  <p className="text-[14px] text-ink-muted">
                    Select an objective to begin the run.
                  </p>
                )}

                {step >= 1 && (
                  <Group title="Worker plan" show={step >= 1}>
                    {obj.plan.map((p, i) => (
                      <LogLine key={p} i={i}>{p}</LogLine>
                    ))}
                  </Group>
                )}

                {step >= 2 && (
                  <Group title="Policy · covenant gate" show={step >= 2}>
                    {obj.gate.map((g, i) => (
                      <LogLine key={g.rule} i={i}>
                        <span
                          className="font-mono text-[10px] font-bold uppercase tracking-[0.1em]"
                          style={{ color: g.verdict === "pass" ? "#00f0df" : "#f5c842" }}
                        >
                          {g.verdict === "pass" ? "PASS" : "HOLD"}
                        </span>{" "}
                        {g.rule}
                      </LogLine>
                    ))}
                    <p className="mt-2 text-[12.5px] text-gold" style={{ color: "#f5c842" }}>
                      The gate holds risky actions. A human must release the run.
                    </p>
                  </Group>
                )}

                {step >= 3 && (
                  <Group title="Human approval" show={step >= 3}>
                    {atApproval && !approved ? (
                      <div>
                        <p className="text-[14px] text-ink-muted">
                          Review the plan and gate, then approve. The Worker cannot proceed on its
                          own — <strong>the human holds the stop</strong>.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-3">
                          <button
                            type="button"
                            className="btn btn--primary"
                            onClick={() => {
                              setApproved(true);
                              setStep(4);
                            }}
                            data-testid="approve-run"
                          >
                            Approve &amp; run
                          </button>
                          <button
                            type="button"
                            className="btn btn--ghost"
                            onClick={reset}
                            data-testid="decline-run"
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    ) : (
                      <LogLine i={0}>
                        <span style={{ color: "#00f0df" }}>APPROVED</span> by human operator —
                        withheld items remain queued for review.
                      </LogLine>
                    )}
                  </Group>
                )}

                {step >= 4 && (
                  <Group title="Execution · evidence" show={step >= 4}>
                    {obj.evidence.map((e, i) => (
                      <LogLine key={e} i={i}>{e}</LogLine>
                    ))}
                  </Group>
                )}

                {step >= 5 && (
                  <Group title="Outcome · SAMPLE" show={step >= 5}>
                    <div className="mt-1 grid gap-3 sm:grid-cols-3" data-testid="sim-outcome">
                      {obj.outcome.map((o) => (
                        <div key={o.metric} className="rounded-lg border border-white/[0.08] p-3">
                          <div className="proof-figure text-2xl" style={{ color: "#f5c842" }}>
                            {o.value}
                          </div>
                          <div className="mt-1 text-[12px] text-ink-text">{o.metric}</div>
                          <div className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink-faint">
                            {o.note}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
                      SAMPLE figures for demonstration — not a performance claim.
                    </p>
                  </Group>
                )}
              </div>

              {/* Controls */}
              <div className="mt-5 flex flex-wrap gap-3 border-t border-white/[0.06] pt-5">
                {canAdvance && (
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={() => setStep((s) => s + 1)}
                    data-testid="sim-next"
                  >
                    {step === 1 ? "Run policy gate" : "Send to human"}
                  </button>
                )}
                {step >= 4 && step < 5 && (
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={() => setStep(5)}
                    data-testid="sim-outcome-next"
                  >
                    See outcome
                  </button>
                )}
                {step > 0 && (
                  <button type="button" className="btn btn--ghost" onClick={reset} data-testid="sim-reset">
                    Reset run
                  </button>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Group({
  title,
  show,
  children,
}: {
  title: string;
  show: boolean;
  children: React.ReactNode;
}) {
  if (!show) return null;
  return (
    <div className="mt-4 first:mt-0">
      <div className="mlabel">{title}</div>
      <div className="mt-2 space-y-1.5">{children}</div>
    </div>
  );
}

function LogLine({ i, children }: { i: number; children: React.ReactNode }) {
  return (
    <p
      className="sim-line flex gap-2 text-[13.5px] leading-snug text-ink-text/85"
      style={{ animationDelay: `${i * 60}ms` }}
    >
      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/40" aria-hidden />
      <span>{children}</span>
    </p>
  );
}
