"use client";
import { useCallback, useEffect, useState } from "react";

/**
 * Fast, skippable intro. Locks scroll only while visible; auto-dismisses in
 * ~2.4s (near-instant under reduced motion); skippable via click/Enter/Escape.
 */
export function Boot() {
  const [done, setDone] = useState(false);
  const [reduce, setReduce] = useState(false);

  const dismiss = useCallback(() => setDone(true), []);

  useEffect(() => {
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduce(r);
    document.body.style.overflow = "hidden";
    const t = setTimeout(dismiss, r ? 260 : 2400);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape" || e.key === " ") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [dismiss]);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <div
      role="dialog"
      aria-label="Intro"
      onClick={dismiss}
      className={`fixed inset-0 z-[120] flex flex-col items-center justify-center bg-bg transition-opacity duration-500 ease-atom ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      data-testid="boot-overlay"
    >
      <div className="absolute inset-0 glow-teal" aria-hidden />
      <div className="relative flex items-center justify-center" aria-hidden>
        {!reduce && (
          <>
            <span
              className="orbit-ring"
              style={{ width: 260, height: 260 }}
            />
            <span
              className="orbit-ring orbit-ring--iris"
              style={{ width: 190, height: 190 }}
            />
          </>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/nirmata-mark.png"
          alt=""
          width={110}
          height={110}
          className={reduce ? "" : "floaty"}
          style={{ height: 110, width: "auto" }}
        />
      </div>
      <div className="relative mt-8 text-center">
        <div className="font-display text-xl font-extrabold tracking-tight text-ink-text">
          Nirmata Holdings
        </div>
        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
          Initialising the maker&apos;s field
        </div>
      </div>
      <button
        type="button"
        onClick={dismiss}
        className="absolute bottom-8 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted underline-offset-4 hover:text-ink-text hover:underline"
      >
        Skip intro
      </button>
    </div>
  );
}
