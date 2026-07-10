"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Optional ambient sound — OFF by default, no autoplay. Sound is generated with
 * the Web Audio API (soft sine blips on interaction), never streamed media. The
 * AudioContext is created only on the user's explicit enable gesture. Hidden
 * entirely under prefers-reduced-motion.
 */
export function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const [reduce, setReduce] = useState(true);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const blip = useCallback((freq: number) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("button, a")) blip(520);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [enabled, blip]);

  const toggle = () => {
    if (!enabled) {
      if (!ctxRef.current) {
        const AC = window.AudioContext || (window as any).webkitAudioContext;
        if (AC) ctxRef.current = new AC();
      }
      ctxRef.current?.resume?.();
      setEnabled(true);
      blip(660);
    } else {
      setEnabled(false);
    }
  };

  if (reduce) return null;

  return (
    <button
      type="button"
      className="sound-toggle"
      aria-pressed={enabled}
      onClick={toggle}
      data-testid="sound-toggle"
      title={enabled ? "Turn ambient sound off" : "Turn ambient sound on"}
    >
      <span aria-hidden>{enabled ? "♪" : "▷"}</span>
      Sound {enabled ? "on" : "off"}
    </button>
  );
}
