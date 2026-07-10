"use client";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "#atom", label: "ΔTOM" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#covenant", label: "Covenant" },
  { href: "#founders", label: "Founders" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-ink-950/70 border-b border-white/[0.06]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center">
          <Logo />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-white/70 hover:text-white transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="hidden md:inline-flex chip">
          <span className="chip-dot" /> Request Brief
        </a>
      </div>
    </header>
  );
}
