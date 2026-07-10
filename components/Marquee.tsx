const items = [
  "NirmataOS",
  "ΔTOM",
  "HumanOS",
  "Thingk Tangk",
  "ATOM Workers",
  "ATOM SalesOS",
  "ATOM Console",
  "ATOM Red Team",
  "EvidenceOS",
  "PhysioPS",
  "ALC Bio Innovations",
  "Adventures in Mousington",
];

export function Marquee() {
  return (
    <section
      className="relative overflow-hidden border-y border-white/[0.06] bg-surface/40 py-14"
      aria-label="Ventures and systems built inside Nirmata"
      data-testid="marquee"
    >
      <div className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
        Built inside the house
      </div>
      <div className="relative">
        <div className="marquee-track flex gap-14 whitespace-nowrap will-change-transform">
          {[...items, ...items].map((it, i) => (
            <div
              key={i}
              className="font-display text-2xl text-ink-text/25 md:text-3xl"
              aria-hidden={i >= items.length}
            >
              {it}
              <span className="ml-14 text-primary/30">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
