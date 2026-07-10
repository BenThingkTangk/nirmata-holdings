"use client";
import { useEffect, useState } from "react";
import { NirmataLockup } from "./marks";

const links = [
  { href: "#manifesto", label: "Why Nirmata" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#substrate", label: "NirmataOS" },
  { href: "#atom", label: "ATOM" },
  { href: "#covenant", label: "Covenant" },
  { href: "#founders", label: "Founders" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-atom ${
        scrolled
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
          <a href="#contact" className="hidden btn btn--ghost lg:inline-flex" data-testid="nav-cta">
            <span className="dot dot--pulse text-primary" /> Request a briefing
          </a>
          <button
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

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        className={`lg:hidden fixed inset-0 top-16 z-40 transition-all duration-300 ease-atom ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-bg/95 backdrop-blur-xl" onClick={() => setOpen(false)} />
        <nav
          className="relative flex flex-col gap-1 px-6 py-6"
          aria-label="Mobile"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-lg font-display text-ink-text"
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
            className="btn btn--primary mt-4 w-full"
          >
            Request a briefing
          </a>
        </nav>
      </div>
    </header>
  );
}
