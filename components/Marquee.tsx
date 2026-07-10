const items = [
  "ΔTOM",
  "HumanOS",
  "PhysioPS",
  "ATOM Console",
  "ALC Bio",
  "Mousington",
  "ATOM Sales OS",
  "ATOM Red Team",
  "EvidenceOS",
  "Aletheia",
  "Researcher",
  "War Room",
  "Compliance Vault",
  "314 ATOM",
];

export function Marquee() {
  return (
    <section className="relative py-16 overflow-hidden border-y border-white/[0.06] bg-ink-900/40">
      <div className="text-center mb-6 font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">
        Built inside the house
      </div>
      <div className="relative">
        <div className="marquee-track flex whitespace-nowrap gap-14 will-change-transform">
          {[...items, ...items].map((it, i) => (
            <div
              key={i}
              className="font-display text-2xl md:text-3xl text-white/25 hover:text-teal-500 transition-colors"
            >
              {it}
              <span className="ml-14 text-teal-500/30">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
