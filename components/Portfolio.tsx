"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  DOMAINS,
  STATUS_LABEL,
  VENTURES,
  type Accent,
  type DomainId,
  type Venture,
} from "@/lib/portfolio";
import { ACCENT_HEX } from "./marks";
import { Constellation } from "./Constellation";
import { Reveal } from "./Reveal";

type Filter = "all" | DomainId;

const statusClass: Record<Venture["status"], string> = {
  live: "status--live",
  active: "status--active",
  dev: "status--dev",
};

export function Portfolio() {
  const [filter, setFilter] = useState<Filter>("all");
  const [activeId, setActiveId] = useState<string>(VENTURES[0].id);

  const filtered = useMemo(
    () => (filter === "all" ? VENTURES : VENTURES.filter((v) => v.domain === filter)),
    [filter]
  );

  const active = useMemo(
    () => VENTURES.find((v) => v.id === activeId) ?? VENTURES[0],
    [activeId]
  );

  const select = (id: string) => {
    setActiveId(id);
    const v = VENTURES.find((x) => x.id === id);
    if (v && filter !== "all" && v.domain !== filter) setFilter("all");
  };

  const applyFilter = (f: Filter) => {
    setFilter(f);
    const set = f === "all" ? VENTURES : VENTURES.filter((v) => v.domain === f);
    if (!set.some((v) => v.id === activeId) && set[0]) setActiveId(set[0].id);
  };

  return (
    <section id="portfolio" className="section" data-testid="portfolio">
      <div className="container container-wide">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <span className="eyebrow eyebrow--teal">
              <span className="dot dot--pulse" /> The portfolio universe
            </span>
            <h2 className="h-section mt-7">
              Many ventures.
              <br />
              One <span className="grad-tealiris">shared core</span>.
            </h2>
            <p className="lead mt-6">
              Every subsidiary orbits the same center: a shared operating substrate, a single
              ethical covenant, and a refusal to ship things that don&apos;t help people. Explore
              the universe, or filter by the human domain each venture serves.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
              Tap a node or a card to open its dossier.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <Constellation ventures={VENTURES} activeId={activeId} onSelect={select} filter={filter} />
          </Reveal>
        </div>

        {/* Filters */}
        <Reveal className="mt-16">
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter ventures by domain"
            data-testid="portfolio-filters"
          >
            <FilterChip label="All ventures" active={filter === "all"} onClick={() => applyFilter("all")} />
            {DOMAINS.map((d) => (
              <FilterChip
                key={d.id}
                label={d.label}
                accent={d.accent}
                active={filter === d.id}
                onClick={() => applyFilter(d.id)}
              />
            ))}
          </div>
        </Reveal>

        {/* Grid + detail */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-4 sm:grid-cols-2" data-testid="portfolio-grid">
            {filtered.map((v, i) => (
              <Reveal key={v.id} delay={(i % 4) * 50}>
                <VentureCard
                  v={v}
                  active={activeId === v.id}
                  onClick={() => setActiveId(v.id)}
                />
              </Reveal>
            ))}
          </div>

          {/* Detail dossier */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <DetailPanel v={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterChip({
  label,
  active,
  accent = "teal",
  onClick,
}: {
  label: string;
  active: boolean;
  accent?: Accent;
  onClick: () => void;
}) {
  const hex = ACCENT_HEX[accent];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="rounded-full border px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] transition-all duration-200 ease-atom"
      style={{
        color: active ? "#041012" : "#9aa8ad",
        background: active ? hex : "rgba(255,255,255,0.02)",
        borderColor: active ? hex : "rgba(255,255,255,0.1)",
      }}
    >
      {label}
    </button>
  );
}

function VentureCard({
  v,
  active,
  onClick,
}: {
  v: Venture;
  active: boolean;
  onClick: () => void;
}) {
  const hex = ACCENT_HEX[v.accent];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-controls="venture-dossier"
      className={`card card--glow-${v.accent} h-full w-full p-6 text-left`}
      style={active ? { borderColor: hex, boxShadow: `0 0 30px ${hex}22` } : undefined}
      data-testid={`venture-card-${v.id}`}
    >
      <div className="flex items-center justify-between">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: hex, boxShadow: `0 0 10px ${hex}` }}
          aria-hidden
        />
        <span className={`status ${statusClass[v.status]}`}>
          <span className="dot" /> {STATUS_LABEL[v.status]}
        </span>
      </div>
      <h3 className="mt-4 font-display text-lg leading-tight text-ink-text">{v.name}</h3>
      {v.parent && (
        <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
          {v.parent}
        </div>
      )}
      <p className="mt-2 text-[13.5px] leading-snug" style={{ color: hex }}>
        {v.tagline}
      </p>
    </button>
  );
}

function DetailPanel({ v }: { v: Venture }) {
  const hex = ACCENT_HEX[v.accent];
  const domain = DOMAINS.find((d) => d.id === v.domain);
  return (
    <div
      id="venture-dossier"
      role="region"
      aria-live="polite"
      aria-label={`${v.name} dossier`}
      className="card overflow-hidden"
      data-testid="venture-dossier"
    >
      <div className="h-1 w-full" style={{ background: hex }} aria-hidden />
      <AnimatePresence mode="wait">
        <motion.div
          key={v.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="p-7 md:p-8"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className={`tag tag--${v.accent}`}>{domain?.label}</span>
            <span className={`status ${statusClass[v.status]}`}>
              <span className="dot" /> {STATUS_LABEL[v.status]}
            </span>
          </div>

          <h3 className="mt-5 font-display text-3xl text-ink-text">{v.name}</h3>
          {v.parent && (
            <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: hex }}>
              with {v.parent}
            </div>
          )}
          <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{v.what}</p>

          <Block label="The problem">{v.problem}</Block>

          <div className="mt-6">
            <div className="mlabel">What makes it category-defining</div>
            <ul className="mt-3 space-y-2.5">
              {v.edge.map((e) => (
                <li key={e} className="flex items-start gap-3 text-[14px] text-ink-text/85">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: hex }}
                    aria-hidden
                  />
                  {e}
                </li>
              ))}
            </ul>
          </div>

          <Block label="How we talk about it (honestly)">{v.proof}</Block>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 border-t border-white/[0.06] pt-5">
      <div className="mlabel">{label}</div>
      <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{children}</p>
    </div>
  );
}
