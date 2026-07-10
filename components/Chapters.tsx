"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Scroll spine: a top progress bar (scaleX, transform-only) plus a right-hand
 * chapter rail (desktop) that tracks the active section via IntersectionObserver.
 * Rail links are real anchors, so navigation works without JS; the bar and
 * active-state are pure enhancement and disappear under reduced motion.
 */
const CHAPTERS = [
  { id: "top", label: "Overture" },
  { id: "manifesto", label: "Why" },
  { id: "failure-modes", label: "Failures" },
  { id: "portfolio", label: "Portfolio" },
  { id: "substrate", label: "NirmataOS" },
  { id: "atom", label: "ATOM" },
  { id: "incubator", label: "Passport" },
  { id: "covenant", label: "Covenant" },
  { id: "founders", label: "Founders" },
  { id: "contact", label: "Contact" },
];

export function Chapters() {
  const [active, setActive] = useState("top");
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    const onScroll = () => {
      if (!bar) return;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!targets.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden ref={barRef} style={{ transform: "scaleX(0)" }} />
      <nav className="chapter-rail flex-col gap-1" aria-label="Chapters" data-testid="chapter-rail">
        {CHAPTERS.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="chapter-dot"
            aria-current={active === c.id}
            aria-label={c.label}
            data-testid={`chapter-${c.id}`}
          >
            <span className="cd-label">{c.label}</span>
            <span className="cd-mark" aria-hidden />
          </a>
        ))}
      </nav>
    </>
  );
}
