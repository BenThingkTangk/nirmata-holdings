"use client";
import { useMemo } from "react";

export function StarField({ count = 90 }: { count?: number }) {
  const stars = useMemo(() => {
    // Deterministic pseudo-random for SSR/CSR match
    const arr: { top: string; left: string; size: number; delay: number; dur: number }[] = [];
    let seed = 42;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < count; i++) {
      arr.push({
        top: `${rand() * 100}%`,
        left: `${rand() * 100}%`,
        size: rand() < 0.85 ? 1.5 : 2.5,
        delay: rand() * 4,
        dur: 3 + rand() * 4,
      });
    }
    return arr;
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {stars.map((s, i) => (
        <div
          key={i}
          className="star"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
