import type { Venture, WorldScene } from "@/lib/portfolio";
import { ACCENT_HEX } from "./marks";

/**
 * Portfolio "world" — a deterministic SVG mini-scene that gives each venture a
 * distinct environment and motion signature. Pure SSR SVG (no canvas, no
 * randomness); animation lives in CSS classes gated by prefers-reduced-motion.
 * `currentColor` is set to the venture accent so one component recolors cleanly.
 */
export function World({ venture }: { venture: Venture }) {
  const hex = ACCENT_HEX[venture.accent];
  const { scene, environment, label } = venture.world;
  return (
    <div
      className="world card p-6"
      data-accent={venture.accent}
      data-testid={`world-${venture.id}`}
      style={{ color: hex, ["--accent" as any]: hex }}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className="font-mono text-[10px] font-bold uppercase tracking-[0.14em]"
          style={{ color: hex }}
        >
          {venture.name} · world
        </span>
        <span className="tag" data-testid={`world-label-${venture.id}`}>
          {label}
        </span>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-white/[0.06] bg-black/30">
        <Scene scene={scene} hex={hex} />
      </div>

      <p className="mt-4 text-[13.5px] leading-relaxed text-ink-muted">
        {environment}
      </p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
        {venture.world.motion}
      </p>
    </div>
  );
}

function Scene({ scene, hex }: { scene: WorldScene; hex: string }) {
  const common = {
    viewBox: "0 0 320 150",
    width: "100%",
    height: "auto",
    role: "img" as const,
    "aria-hidden": true,
    style: { display: "block", color: hex },
  };
  switch (scene) {
    case "lattice":
      return (
        <svg {...common}>
          <g className="wm-lattice" stroke={hex} fill={hex}>
            {latticeNodes().map((n, i) => (
              <circle key={i} cx={n.x} cy={n.y} r={2.4} opacity={0.6} />
            ))}
            {latticeEdges().map((e, i) => (
              <line
                key={i}
                x1={e.x1}
                y1={e.y1}
                x2={e.x2}
                y2={e.y2}
                strokeWidth={0.6}
                opacity={0.3}
              />
            ))}
          </g>
          <circle cx={160} cy={75} r={5} fill={hex} className="wm-pulse" />
        </svg>
      );
    case "workflow":
      return (
        <svg {...common}>
          <g className="wm-flow" stroke={hex} fill="none">
            <path d="M20 75 H150" strokeWidth={2} />
            <path d="M170 75 H300" strokeWidth={2} />
          </g>
          {[20, 95, 170, 245, 300].map((x, i) => (
            <circle key={i} cx={x} cy={75} r={6} fill={i === 2 ? "#f5c842" : hex} />
          ))}
          <text
            x={170}
            y={58}
            fontSize={9}
            fill="#f5c842"
            fontFamily="var(--font-mono)"
            textAnchor="middle"
          >
            HUMAN GATE
          </text>
        </svg>
      );
    case "signal":
      return (
        <svg {...common}>
          <path
            d={wave(0)}
            stroke={hex}
            fill="none"
            strokeWidth={2}
            className="wm-drift"
          />
          <path
            d={wave(18)}
            stroke={hex}
            fill="none"
            strokeWidth={1.4}
            opacity={0.5}
            className="wm-drift"
          />
          <circle cx={210} cy={60} r={4} fill={hex} className="wm-pulse" />
        </svg>
      );
    case "compute":
      return (
        <svg {...common}>
          <g fill="none" stroke={hex}>
            {[18, 34, 52, 70].map((r, i) => (
              <circle
                key={i}
                cx={160}
                cy={75}
                r={r}
                strokeWidth={1}
                opacity={0.5 - i * 0.08}
                className="wm-pulse"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
            ))}
            <circle cx={160} cy={75} r={6} fill={hex} />
          </g>
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path
            d="M160 20 L230 45 V85 C230 115 198 130 160 138 C122 130 90 115 90 85 V45 Z"
            fill="none"
            stroke={hex}
            strokeWidth={2}
            className="wm-shield"
          />
          <path
            d="M160 40 L205 58 V85 C205 105 184 116 160 122 C136 116 115 105 115 85 V58 Z"
            fill="none"
            stroke={hex}
            strokeWidth={0.8}
            opacity={0.4}
          />
        </svg>
      );
    case "soil":
      return (
        <svg {...common}>
          <g className="wm-grow" stroke={hex} fill="none" strokeWidth={1.2}>
            {soilRoots().map((d, i) => (
              <line key={i} x1={d.x1} y1={d.y1} x2={d.x2} y2={d.y2} />
            ))}
          </g>
          <line x1={0} y1={60} x2={320} y2={60} stroke={hex} strokeWidth={0.6} opacity={0.3} />
        </svg>
      );
    case "story":
      return (
        <svg {...common}>
          <g className="wm-drift" fill={hex}>
            {storyMotes().map((m, i) => (
              <circle key={i} cx={m.x} cy={m.y} r={m.r} opacity={m.o} />
            ))}
          </g>
          <path
            d="M120 120 Q160 90 200 120"
            fill="none"
            stroke={hex}
            strokeWidth={1.4}
            opacity={0.6}
          />
        </svg>
      );
  }
}

/* ---- deterministic geometry helpers (no randomness) ---- */
function latticeNodes() {
  const out: { x: number; y: number }[] = [];
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 6; c++)
      out.push({ x: 40 + c * 48, y: 35 + r * 40 });
  return out;
}
function latticeEdges() {
  const n = latticeNodes();
  const out: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < n.length; i++) {
    if ((i + 1) % 6 !== 0) out.push({ x1: n[i].x, y1: n[i].y, x2: n[i + 1].x, y2: n[i + 1].y });
    if (i + 6 < n.length) out.push({ x1: n[i].x, y1: n[i].y, x2: n[i + 6].x, y2: n[i + 6].y });
  }
  return out;
}
function wave(offset: number) {
  let d = `M0 ${75 + offset}`;
  for (let x = 0; x <= 320; x += 20) {
    const y = 75 + offset + Math.sin(x / 24) * 22;
    d += ` L${x} ${y.toFixed(1)}`;
  }
  return d;
}
function soilRoots() {
  const out: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < 7; i++) {
    const x = 30 + i * 42;
    out.push({ x1: x, y1: 60, x2: x - 10, y2: 120 });
    out.push({ x1: x, y1: 60, x2: x + 14, y2: 110 });
  }
  return out;
}
function storyMotes() {
  const out: { x: number; y: number; r: number; o: number }[] = [];
  for (let i = 0; i < 14; i++) {
    out.push({
      x: 24 + ((i * 47) % 280),
      y: 20 + ((i * 31) % 100),
      r: 1.5 + (i % 3),
      o: 0.3 + (i % 4) * 0.15,
    });
  }
  return out;
}
