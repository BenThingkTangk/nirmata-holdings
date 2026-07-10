"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";

/**
 * Nirmata Core Scroll Film — a scroll-directed narrative rendered on a single
 * <canvas>. Progress is tied deterministically to scroll position over a tall
 * section (no frame preload, no scroll hijack). Particles seeded once assemble
 * from a quantum field into the winged Nirmata mark, extend into the NirmataOS
 * spine, branch to the ventures, illuminate as human outcomes, then resolve on
 * the thesis. The narrative text is real SSR DOM; under reduced-motion or
 * save-data the canvas is skipped and a static poster + text carry the message.
 */

const STAGES = [
  {
    k: "field",
    kicker: "01 — Quantum field",
    line: "Before a system, there is only possibility.",
  },
  {
    k: "mark",
    kicker: "02 — The mark forms",
    line: "Intelligence gathers into intention.",
  },
  {
    k: "spine",
    kicker: "03 — NirmataOS",
    line: "One substrate — Brain, Spine, Worker — carries the signal.",
  },
  {
    k: "branch",
    kicker: "04 — The portfolio",
    line: "Signal branches into ventures across human domains.",
  },
  {
    k: "outcome",
    kicker: "05 — Human outcomes",
    line: "Every branch ends at a person it was meant to help.",
  },
  {
    k: "thesis",
    kicker: "06 — The thesis",
    line: "Intelligence is only meaningful when it improves life.",
  },
] as const;

const ACCENTS = ["#00f0df", "#c084fc", "#ff7b6b", "#f5c842", "#74c0fc"];

type P = {
  // home = winged-mark target; sx/sy = scattered field seed; accent index
  hx: number;
  hy: number;
  sx: number;
  sy: number;
  a: number;
  branch: number; // which venture lane (0..4)
};

function useEnvGuards() {
  const [skip, setSkip] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Respect Save-Data where the browser exposes it.
    const conn = (navigator as any).connection;
    const saveData = Boolean(conn && conn.saveData);
    setSkip(reduce || saveData);
  }, []);
  return skip;
}

export function ScrollFilm() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stage, setStage] = useState(0);
  const skip = useEnvGuards();
  const progressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      progressRef.current = v;
      const idx = Math.min(STAGES.length - 1, Math.floor(v * STAGES.length));
      setStage(idx);
    });
    return () => unsub();
  }, [scrollYProgress]);

  // Canvas particle system — only when not skipping.
  useEffect(() => {
    if (skip) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let parts: P[] = [];
    let running = true;

    // Deterministic PRNG so the field is identical every load.
    let seed = 20260710;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    const buildMarkTargets = (count: number): { x: number; y: number }[] => {
      // Winged-N glyph approximated with two rising strokes + wing sweep,
      // scaled to canvas. Deterministic sampling.
      const cx = w / 2;
      const cy = h / 2;
      const s = Math.min(w, h) * 0.26;
      const pts: { x: number; y: number }[] = [];
      const strokes: [number, number, number, number][] = [
        // left upright
        [-0.7, 0.9, -0.7, -0.9],
        // diagonal
        [-0.7, -0.9, 0.7, 0.9],
        // right upright
        [0.7, 0.9, 0.7, -0.9],
        // wing sweep (upper right)
        [0.7, -0.9, 1.35, -1.25],
        [0.4, -0.7, 1.05, -1.0],
      ];
      for (let i = 0; i < count; i++) {
        const st = strokes[i % strokes.length];
        const t = rnd();
        const jx = (rnd() - 0.5) * 0.06;
        const jy = (rnd() - 0.5) * 0.06;
        pts.push({
          x: cx + (st[0] + (st[2] - st[0]) * t + jx) * s,
          y: cy + (st[1] + (st[3] - st[1]) * t + jy) * s,
        });
      }
      return pts;
    };

    const seedParts = () => {
      const count = w < 640 ? 320 : 620;
      const targets = buildMarkTargets(count);
      parts = targets.map((tg, i) => ({
        hx: tg.x,
        hy: tg.y,
        sx: rnd() * w,
        sy: rnd() * h,
        a: i % ACCENTS.length,
        branch: i % 5,
      }));
    };

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParts();
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const draw = () => {
      if (!running) return;
      const p = progressRef.current;
      ctx.clearRect(0, 0, w, h);

      // p phases mapped to STAGES: 0 field → 1 thesis
      const cx = w / 2;
      const cy = h / 2;

      // assembly factor: 0 scattered .. 1 formed (completes by 0.35)
      const assemble = easeOut(Math.min(1, p / 0.33));
      // spine factor 0.33..0.5
      const spine = Math.max(0, Math.min(1, (p - 0.33) / 0.17));
      // branch factor 0.5..0.7
      const branch = Math.max(0, Math.min(1, (p - 0.5) / 0.2));
      // outcome glow 0.7..0.85
      const outcome = Math.max(0, Math.min(1, (p - 0.7) / 0.15));
      // thesis converge 0.85..1
      const converge = Math.max(0, Math.min(1, (p - 0.85) / 0.15));

      for (let i = 0; i < parts.length; i++) {
        const pt = parts[i];
        // base position: seed → home
        let x = lerp(pt.sx, pt.hx, assemble);
        let y = lerp(pt.sy, pt.hy, assemble);

        // spine: pull a subset toward a central vertical column
        if (spine > 0 && pt.branch === 0) {
          const spineY = lerp(cy - h * 0.22, cy + h * 0.22, (i % 40) / 40);
          x = lerp(x, cx, spine * 0.6);
          y = lerp(y, spineY, spine * 0.6);
        }

        // branch: fan outward into 5 venture lanes
        if (branch > 0) {
          const lane = pt.branch;
          const angle = (-0.6 + lane * 0.3) * Math.PI;
          const reach = Math.min(w, h) * 0.42 * branch;
          x = lerp(x, cx + Math.cos(angle) * reach, branch * 0.5);
          y = lerp(y, cy + Math.sin(angle) * reach * 0.5, branch * 0.5);
        }

        // converge: pull everything back to the mark home for the thesis
        if (converge > 0) {
          x = lerp(x, pt.hx, converge);
          y = lerp(y, pt.hy, converge);
        }

        const baseAlpha = 0.18 + assemble * 0.5;
        const glow = outcome > 0 ? outcome * 0.6 : 0;
        const alpha = Math.min(1, baseAlpha + glow);
        const size = 1.1 + assemble * 1.1 + glow * 1.4;

        ctx.beginPath();
        ctx.fillStyle = ACCENTS[pt.a];
        ctx.globalAlpha = alpha;
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);

    // Pause when the section is off-screen.
    const io = new IntersectionObserver(
      (entries) => {
        running = entries[0].isIntersecting;
        if (running) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, [skip]);

  return (
    <section
      id="scroll-film"
      ref={sectionRef}
      className="relative"
      style={{ height: skip ? "auto" : "440vh" }}
      data-testid="scroll-film"
      aria-label="Nirmata core narrative"
    >
      <div
        className={
          skip
            ? "container py-24"
            : "sticky top-0 flex h-screen items-center overflow-hidden"
        }
      >
        {/* Canvas layer (enhancement only) */}
        {!skip && (
          <canvas
            ref={canvasRef}
            className="film-canvas absolute inset-0 h-full w-full"
            aria-hidden
          />
        )}

        {/* Static poster when the canvas is skipped */}
        {skip && (
          <div className="pointer-events-none mb-10 flex justify-center" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/nirmata-mark.png"
              alt=""
              width={120}
              height={120}
              style={{ height: 120, width: "auto", opacity: 0.9 }}
            />
          </div>
        )}

        {/* Narrative captions — always in the DOM (SSR-visible) */}
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <ol className="space-y-6" data-testid="film-script">
              {STAGES.map((s, i) => {
                const activeNow = !skip && i === stage;
                return (
                  <li
                    key={s.k}
                    className="film-caption"
                    data-testid={`film-stage-${s.k}`}
                    style={
                      skip
                        ? undefined
                        : {
                            opacity: activeNow ? 1 : 0.28,
                            transform: activeNow ? "none" : "translateY(4px)",
                          }
                    }
                  >
                    <div className="mlabel" style={{ color: ACCENTS[i % 5] }}>
                      {s.kicker}
                    </div>
                    <p
                      className={
                        s.k === "thesis"
                          ? "mt-2 font-display text-2xl leading-tight text-ink-text md:text-4xl"
                          : "mt-2 font-display text-xl leading-tight text-ink-text md:text-2xl"
                      }
                    >
                      {s.line}
                    </p>
                  </li>
                );
              })}
            </ol>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
              {skip
                ? "Motion reduced — the full sequence plays with animation enabled."
                : "Scroll to run the sequence."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
