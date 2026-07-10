"use client";
import { useEffect, useRef, useState } from "react";
import { NirmataLockup } from "./marks";

const links = [
  { href: "#manifesto", label: "Why Nirmata" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#substrate", label: "NirmataOS" },
  { href: "#worker-sim", label: "Simulation" },
  { href: "#chamber", label: "Ethics" },
  { href: "#founders", label: "Founders" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    firstLinkRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-atom ${
        open
          ? "bg-bg border-b border-white/[0.07]"
          : scrolled
          ? "backdrop-blur-xl bg-bg/75 border-b border-white/[0.07]"
          : "bg-transparent border-b border-transparent"
      }`}
      data-testid="site-nav"
    >
      <div className="container-wide container flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center" aria-label="Nirmata Holdings — home">
          <NirmataLockup markSize={30} />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium text-ink-muted transition-colors duration-150 hover:text-ink-text"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <a href="#contact" className="btn btn--ghost" data-testid="nav-cta">
              <span className="dot dot--pulse text-primary" /> Request a briefing
            </a>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.03] text-ink-text"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((v) => !v)}
            data-testid="nav-toggle"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ease-atom ${
                  open ? "top-1.5 rotate-45" : "top-0.5"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-all duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ease-atom ${
                  open ? "top-1.5 -rotate-45" : "top-[10px]"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer — opaque full-height sheet below the header */}
      <div
        id="mobile-drawer"
        className={`lg:hidden fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col transition-all duration-300 ease-atom ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        style={{
          background: "var(--bg)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderTop: "1px solid var(--border)",
        }}
        aria-hidden={!open}
      >
        <nav
          className="flex flex-1 flex-col gap-2 overflow-y-auto px-6 py-8"
          aria-label="Mobile"
        >
          {links.map((l, i) => (
            <a
              key={l.href}
              ref={i === 0 ? firstLinkRef : undefined}
              href={l.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="flex min-h-[56px] items-center justify-between rounded-xl border border-white/[0.08] bg-surface px-5 py-4 font-display text-lg text-ink-text transition-colors duration-150 hover:border-primary/40 hover:bg-surface-2"
            >
              {l.label}
              <span className="text-ink-faint" aria-hidden>
                →
              </span>
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            className="btn btn--primary mt-4 w-full"
          >
            Request a briefing
          </a>
        </nav>
      </div>
    </header>
  );
}
