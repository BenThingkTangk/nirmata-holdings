"use client";
import { useEffect, useRef } from "react";

const ACCENTS = [
  [0, 240, 223],
  [192, 132, 252],
  [255, 123, 107],
  [245, 200, 66],
  [116, 192, 252],
];

/**
 * 2D canvas orbital-particle field (no WebGL). Particles orbit the center on
 * y-squashed elliptical paths for pseudo-3D depth. DPR capped at 2, count
 * reduced on narrow screens, paused offscreen and under reduced motion.
 */
export function OrbitalCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = {
      a: number;
      rx: number;
      ry: number;
      sp: number;
      col: number[];
      sz: number;
    };
    let parts: P[] = [];

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = w < 700 ? 34 : 68;
      const base = Math.min(w, h) * 0.46;
      parts = Array.from({ length: n }, () => {
        const r = base * (0.35 + Math.random() * 0.9);
        return {
          a: Math.random() * Math.PI * 2,
          rx: r,
          ry: r * (0.34 + Math.random() * 0.22),
          sp: (0.0007 + Math.random() * 0.0016) * (Math.random() > 0.5 ? 1 : -1),
          col: ACCENTS[(Math.random() * ACCENTS.length) | 0],
          sz: 0.8 + Math.random() * 1.8,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      // faint orbital rings
      ctx.lineWidth = 1;
      for (let i = 1; i <= 3; i++) {
        const r = Math.min(w, h) * 0.16 * i;
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.4, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,240,223,${0.05 / i})`;
        ctx.stroke();
      }
      for (const p of parts) {
        p.a += p.sp;
        const x = cx + Math.cos(p.a) * p.rx;
        const y = cy + Math.sin(p.a) * p.ry;
        const [r, g, b] = p.col;
        ctx.beginPath();
        ctx.arc(x, y, p.sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},0.9)`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${r},${g},${b},0.8)`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      if (running && !reduce) raf = requestAnimationFrame(draw);
    };

    build();
    if (reduce) {
      draw(); // one static frame
    } else {
      raf = requestAnimationFrame(draw);
    }

    const onResize = () => {
      build();
      if (reduce) draw();
    };
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(
      ([e]) => {
        running = e.isIntersecting;
        if (running && !reduce) raf = requestAnimationFrame(draw);
        else cancelAnimationFrame(raf);
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
