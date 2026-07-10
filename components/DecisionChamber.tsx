"use client";
import { useMemo, useState } from "react";
import { Reveal } from "./Reveal";

/**
 * Ethical Decision Chamber — three genuinely hard trade-offs. The visitor picks
 * a defensible action; NirmataOS evaluates it against the covenant, policy,
 * human authority and evidence — showing the trade-off rather than a verdict of
 * "good/bad". No choice is scored as simply correct; each carries a cost. The
 * evaluation is an aria-live region. The stop always stays with the human.
 */

type Choice = {
  id: string;
  label: string;
  stance: string; // one-line summary of the trade
  covenant: "aligned" | "conditional" | "breach";
  reads: string[]; // how NirmataOS reasons about it
  cost: string; // the honest downside
};

type Scenario = {
  id: string;
  tension: string;
  title: string;
  situation: string;
  choices: Choice[];
};

const SCENARIOS: Scenario[] = [
  {
    id: "profit-trust",
    tension: "Profit vs. Trust",
    title: "A quarter-saving deal that erodes trust",
    situation:
      "An enterprise buyer will sign today if the ATOM Worker auto-sends outreach to a purchased contact list. It hits the number — but consent is unverified.",
    choices: [
      {
        id: "send",
        label: "Auto-send to hit the number",
        stance: "Revenue now, consent unverified.",
        covenant: "breach",
        reads: [
          "Covenant tenet on consent fails — records lack verifiable permission",
          "EvidenceOS cannot produce a defensible consent trail",
          "Short-term revenue, long-term trust and legal exposure",
        ],
        cost: "The number is hit, but a single complaint is now indefensible.",
      },
      {
        id: "gate",
        label: "Hold non-consented records, send the rest",
        stance: "Smaller win, fully defensible.",
        covenant: "aligned",
        reads: [
          "Consented segment proceeds with a hash-logged trail",
          "Non-consented records queued for a human decision",
          "Deal slips or shrinks — but every action is auditable",
        ],
        cost: "You may miss this quarter's target on this account.",
      },
      {
        id: "escalate",
        label: "Escalate the whole deal to a human owner",
        stance: "Slowest path, human owns the call.",
        covenant: "conditional",
        reads: [
          "Human authority invoked before any send",
          "Revenue owner weighs risk with full context",
          "Defensible, but relies on human availability and speed",
        ],
        cost: "Speed suffers; the buyer may lose momentum.",
      },
    ],
  },
  {
    id: "speed-evidence",
    tension: "Speed vs. Evidence",
    title: "Ship the health insight before the evidence is in",
    situation:
      "PhysioPS surfaces a striking ANS pattern that could help users act early. Marketing wants to call it 'detection'. The peer-reviewed backing supports 'insight', not diagnosis.",
    choices: [
      {
        id: "claim",
        label: "Call it early 'detection' to move fast",
        stance: "Bigger claim, thinner ground.",
        covenant: "breach",
        reads: [
          "Overstates evidence — violates the honesty tenet",
          "'Diagnoses' is a claim the literature does not yet support",
          "Regulatory and clinical trust risk",
        ],
        cost: "One challenged claim can discredit the whole science.",
      },
      {
        id: "insight",
        label: "Ship as 'supports earlier insight', clinician-reviewed",
        stance: "Truthful framing, slower adoption.",
        covenant: "aligned",
        reads: [
          "Every flag traceable to peer-reviewed literature",
          "Clinician stays in the loop on interpretation",
          "Grows only as fast as the evidence does",
        ],
        cost: "A more modest message converts more slowly.",
      },
    ],
  },
  {
    id: "personalization-privacy",
    tension: "Personalization vs. Privacy",
    title: "Deeper personalization from sensitive data",
    situation:
      "An ATOM experience could personalize far better by retaining sensitive behavioral data across sessions. Users would likely never notice the collection.",
    choices: [
      {
        id: "retain",
        label: "Silently retain everything for best results",
        stance: "Best UX, no informed consent.",
        covenant: "breach",
        reads: [
          "Collection without informed consent breaches the covenant",
          "'Users won't notice' is the reddest flag there is",
          "Personalization quality bought with trust",
        ],
        cost: "The moment it surfaces, it reads as surveillance.",
      },
      {
        id: "optin",
        label: "Explicit opt-in with plain-language control",
        stance: "Consent-first, some users decline.",
        covenant: "aligned",
        reads: [
          "Informed, revocable consent recorded as evidence",
          "Users can see and delete what is retained",
          "Personalization is opt-in, so coverage is lower",
        ],
        cost: "Fewer users opt in; personalization is weaker on average.",
      },
      {
        id: "ephemeral",
        label: "Personalize in-session only, retain nothing",
        stance: "Maximum privacy, least memory.",
        covenant: "aligned",
        reads: [
          "No sensitive data persisted between sessions",
          "Nothing to leak, nothing to misuse",
          "Experience resets each visit",
        ],
        cost: "The product can't learn a returning user over time.",
      },
    ],
  },
];

const COVENANT_LABEL: Record<Choice["covenant"], { text: string; color: string }> = {
  aligned: { text: "Covenant-aligned", color: "#00f0df" },
  conditional: { text: "Conditional — needs a human", color: "#f5c842" },
  breach: { text: "Covenant breach", color: "#ff7b6b" },
};

export function DecisionChamber() {
  const [scenarioId, setScenarioId] = useState(SCENARIOS[0].id);
  const [chosen, setChosen] = useState<string | null>(null);

  const scenario = useMemo(
    () => SCENARIOS.find((s) => s.id === scenarioId) ?? SCENARIOS[0],
    [scenarioId]
  );
  const choice = scenario.choices.find((c) => c.id === chosen) ?? null;

  const pickScenario = (id: string) => {
    setScenarioId(id);
    setChosen(null);
  };

  return (
    <section id="chamber" className="section world" data-testid="chamber" data-accent="iris">
      <div className="container">
        <Reveal className="max-w-3xl">
          <span className="eyebrow eyebrow--teal" style={{ color: "#c084fc", borderColor: "rgba(192,132,252,0.3)", background: "rgba(192,132,252,0.05)" }}>
            <span className="dot dot--pulse" style={{ color: "#c084fc" }} /> The ethical decision chamber
          </span>
          <h2 className="h-section mt-7">
            The hard calls, <span className="grad-tealiris">out loud</span>.
          </h2>
          <p className="lead mt-6">
            Ethics isn&apos;t a slogan — it&apos;s what you do when the profitable choice and the
            right choice diverge. Take a decision below. NirmataOS won&apos;t moralize; it shows the
            trade-off, the covenant reading, and where a human must hold the stop.
          </p>
        </Reveal>

        {/* Scenario tabs */}
        <Reveal className="mt-10">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Ethical scenarios">
            {SCENARIOS.map((s) => {
              const active = s.id === scenarioId;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => pickScenario(s.id)}
                  data-testid={`scenario-${s.id}`}
                  className="rounded-full border px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] transition-all duration-200"
                  style={{
                    color: active ? "#041012" : "#9aa8ad",
                    background: active ? "#c084fc" : "rgba(255,255,255,0.02)",
                    borderColor: active ? "#c084fc" : "rgba(255,255,255,0.1)",
                  }}
                >
                  {s.tension}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* Situation + choices */}
          <Reveal>
            <div className="card p-7">
              <div className="mlabel" style={{ color: "#c084fc" }}>
                {scenario.tension}
              </div>
              <h3 className="mt-3 font-display text-2xl text-ink-text">{scenario.title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">
                {scenario.situation}
              </p>

              <div className="mt-6 flex flex-col gap-3" role="group" aria-label="Choose an action">
                {scenario.choices.map((c) => {
                  const active = c.id === chosen;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setChosen(c.id)}
                      data-testid={`choice-${scenario.id}-${c.id}`}
                      className="rounded-xl border p-4 text-left transition-colors duration-200"
                      style={{
                        borderColor: active ? "#c084fc" : "rgba(255,255,255,0.1)",
                        background: active ? "rgba(192,132,252,0.06)" : "rgba(255,255,255,0.02)",
                      }}
                    >
                      <div className="font-display text-[15px] text-ink-text">{c.label}</div>
                      <div className="mt-1 text-[12.5px] text-ink-muted">{c.stance}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Evaluation */}
          <Reveal delay={100}>
            <div
              className="card p-7 lg:sticky lg:top-24 lg:self-start"
              role="region"
              aria-live="polite"
              aria-label="NirmataOS evaluation"
              data-testid="chamber-evaluation"
            >
              <div className="mlabel">NirmataOS evaluation</div>
              {!choice ? (
                <p className="mt-4 text-[14px] text-ink-muted">
                  Choose an action to see how NirmataOS reasons about it. There is no free
                  choice here — each one costs something.
                </p>
              ) : (
                <div className="mt-4">
                  <span
                    className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.1em]"
                    style={{
                      color: COVENANT_LABEL[choice.covenant].color,
                      borderColor: `${COVENANT_LABEL[choice.covenant].color}55`,
                      background: `${COVENANT_LABEL[choice.covenant].color}11`,
                    }}
                    data-testid="chamber-verdict"
                  >
                    {COVENANT_LABEL[choice.covenant].text}
                  </span>

                  <div className="mt-5 space-y-2">
                    {choice.reads.map((r, i) => (
                      <p
                        key={r}
                        className="sim-line flex gap-2 text-[13.5px] leading-snug text-ink-text/85"
                        style={{ animationDelay: `${i * 70}ms` }}
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/40" aria-hidden />
                        {r}
                      </p>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-white/[0.06] pt-4">
                    <div className="mlabel">The cost you accept</div>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{choice.cost}</p>
                  </div>
                </div>
              )}

              <div className="mt-6 border-t border-white/[0.06] pt-4">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: "#f5c842" }}>
                  The human always holds the stop.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
