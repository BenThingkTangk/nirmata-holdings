"use client";
import { useMemo } from "react";
import { ACCENT_HEX } from "./marks";
import type { Venture } from "@/lib/portfolio";

type Node = Venture & { x: number; y: number; ring: number };

/**
 * Portfolio universe: subsidiaries positioned around a shared Nirmata core.
 * Static, labelled, keyboard-operable nodes (no dizzying carousel). Connector
 * lines + ambient float convey the "orbit"; heavy motion is CSS-only and
 * disabled under reduced motion. Hidden on small screens for a touch-clean UI.
 */
export function Constellation({
  ventures,
  activeId,
  onSelect,
  filter = "all",
}: {
  ventures: Venture[];
  activeId: string | null;
  onSelect: (id: string) => void;
  filter?: string;
}) {
  const nodes = useMemo<Node[]>(() => {
    const inner = ventures.slice(0, 4);
    const outer = ventures.slice(4);
    const place = (list: Venture[], radius: number, ring: number, offset: number) =>
      list.map((v, i) => {
        const a = offset + (i / list.length) * Math.PI * 2;
        return {
          ...v,
          ring,
          x: 50 + Math.cos(a) * radius,
          y: 50 + Math.sin(a) * radius * 0.82,
        };
      });
    return [
      ...place(inner, 26, 1, -Math.PI / 2),
      ...place(outer, 42, 2, -Math.PI / 2 + 0.4),
    ];
  }, [ventures]);

  return (
    <div
      className="relative mx-auto hidden aspect-[1/0.9] w-full max-w-[560px] select-none md:block"
      data-testid="constellation"
    >
      {/* orbit ellipses + connectors */}
      <svg viewBox="0 0 100 90" className="absolute inset-0 h-full w-full" aria-hidden>
        <ellipse cx="50" cy="45" rx="26" ry="21" fill="none" stroke="rgba(0,240,223,0.12)" strokeWidth="0.2" />
        <ellipse cx="50" cy="45" rx="42" ry="34" fill="none" stroke="rgba(192,132,252,0.1)" strokeWidth="0.2" />
        {nodes.map((n) => {
          const dim = filter !== "all" && n.domain !== filter;
          return (
            <line
              key={n.id}
              x1="50"
              y1="45"
              x2={n.x}
              y2={n.y * 0.9}
              stroke={activeId === n.id ? ACCENT_HEX[n.accent] : "rgba(255,255,255,0.08)"}
              strokeWidth={activeId === n.id ? 0.35 : 0.2}
              opacity={dim ? 0.25 : 1}
              style={{ transition: "opacity 200ms var(--ease)" }}
            />
          );
        })}
      </svg>

      {/* core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="relative flex items-center justify-center">
          <span className="orbit-ring" style={{ width: 92, height: 92 }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/nirmata-mark.png"
            alt=""
            width={64}
            height={67}
            className="floaty relative h-16 w-auto drop-shadow-[0_0_30px_rgba(0,240,223,0.4)]"
          />
        </div>
        <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint">
          Nirmata core
        </div>
      </div>

      {/* nodes */}
      {nodes.map((n) => {
        const active = activeId === n.id;
        const dim = filter !== "all" && n.domain !== filter;
        const hex = ACCENT_HEX[n.accent];
        return (
          <button
            key={n.id}
            type="button"
            onClick={() => onSelect(n.id)}
            aria-label={`${n.name} — view details`}
            aria-pressed={active}
            className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-none"
            style={{ left: `${n.x}%`, top: `${n.y}%`, opacity: dim ? 0.35 : 1, transition: "opacity 200ms var(--ease)" }}
            data-testid={`constellation-node-${n.id}`}
          >
            <span className="flex flex-col items-center gap-1.5">
              <span
                className="block h-3 w-3 rounded-full transition-transform duration-200 ease-atom group-hover:scale-150 group-focus-visible:scale-150"
                style={{
                  background: hex,
                  boxShadow: `0 0 ${active ? 16 : 8}px ${hex}`,
                  transform: active ? "scale(1.5)" : undefined,
                }}
              />
              <span
                className="whitespace-nowrap rounded-full border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.08em] transition-colors duration-200"
                style={{
                  color: active ? hex : "#9aa8ad",
                  borderColor: active ? hex : "rgba(255,255,255,0.08)",
                  background: active ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.35)",
                }}
              >
                {n.name}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
