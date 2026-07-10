import type { Accent } from "@/lib/portfolio";

export const ACCENT_HEX: Record<Accent, string> = {
  teal: "#00f0df",
  iris: "#c084fc",
  coral: "#ff7b6b",
  gold: "#f5c842",
  azure: "#74c0fc",
};

/**
 * Canonical ATOM orbital logomark — reproduced from the audited source
 * (atom-v1-atom-only-preview.vercel.app /assets/atom-logo.svg). "One mark,
 * five accents": geometry is fixed, only the accent token changes.
 */
export function AtomMark({
  size = 40,
  accent = "teal",
  title = "ATOM",
}: {
  size?: number;
  accent?: Accent;
  title?: string;
}) {
  const c = ACCENT_HEX[accent];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      role="img"
      aria-label={title}
    >
      <g transform="translate(28 28)">
        <circle r="25" stroke={c} strokeWidth="0.8" opacity="0.18" />
        <ellipse rx="14" ry="24" stroke={c} strokeWidth="2" fill="none" />
        <ellipse rx="24" ry="14" stroke={c} strokeWidth="2" fill="none" opacity="0.55" />
        <circle r="4.4" fill={c} />
        <circle cx="0" cy="-24" r="2.6" fill={c} opacity="0.85" />
        <circle cx="24" cy="0" r="2.6" fill={c} opacity="0.6" />
      </g>
    </svg>
  );
}

/**
 * NirmataOS systems-layer motif — the geometric infinity-orbit inside a
 * meridian sphere with crossed axes (from the supplied NirmataOS brand art).
 * Used as the secondary substrate motif, never as the parent logo.
 */
export function NirmataOsMark({
  size = 120,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      role="img"
      aria-label="NirmataOS"
      className={className}
    >
      <defs>
        <linearGradient id="nos-g" x1="18" y1="30" x2="102" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#00f0df" />
          <stop offset="1" stopColor="#c084fc" />
        </linearGradient>
      </defs>
      {/* meridian sphere */}
      <circle cx="60" cy="60" r="34" stroke="url(#nos-g)" strokeWidth="1.1" opacity="0.55" />
      <ellipse cx="60" cy="60" rx="14" ry="34" stroke="url(#nos-g)" strokeWidth="0.9" opacity="0.35" />
      <ellipse cx="60" cy="60" rx="34" ry="14" stroke="url(#nos-g)" strokeWidth="0.9" opacity="0.35" />
      {/* crossed axes */}
      <line x1="60" y1="14" x2="60" y2="106" stroke="url(#nos-g)" strokeWidth="0.7" opacity="0.3" />
      <line x1="26" y1="34" x2="94" y2="86" stroke="url(#nos-g)" strokeWidth="0.7" opacity="0.3" />
      <line x1="94" y1="34" x2="26" y2="86" stroke="url(#nos-g)" strokeWidth="0.7" opacity="0.3" />
      {/* infinity loop */}
      <path
        d="M40 60 C40 47 53 47 60 60 C67 73 80 73 80 60 C80 47 67 47 60 60 C53 73 40 73 40 60 Z"
        stroke="url(#nos-g)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Nirmata Holdings masterbrand lockup — sculptural winged-N art + wordmark. */
export function NirmataLockup({
  markSize = 34,
  stacked = false,
  className = "",
}: {
  markSize?: number;
  stacked?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-3 ${className}`}
      aria-label="Nirmata Holdings"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/nirmata-mark.png"
        alt=""
        aria-hidden="true"
        width={markSize}
        height={markSize}
        style={{ height: markSize, width: "auto" }}
        className="select-none"
      />
      <span className={stacked ? "leading-none" : "leading-none"}>
        <span className="block font-display text-[15px] tracking-tight text-ink-text">
          Nirmata
        </span>
        <span className="block font-mono text-[9.5px] font-bold uppercase tracking-[0.24em] text-primary">
          Holdings
        </span>
      </span>
    </span>
  );
}
