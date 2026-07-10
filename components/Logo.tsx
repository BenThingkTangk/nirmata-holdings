export function Logo({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3" aria-label="Nirmata Holdings">
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="nirmata-g" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#00e6d3" />
            <stop offset="100%" stopColor="#b987ff" />
          </linearGradient>
        </defs>
        {/* Outer ring */}
        <circle cx="20" cy="20" r="18" stroke="url(#nirmata-g)" strokeWidth="1.2" opacity="0.6" />
        {/* Inner delta (Δ) — the ΔTOM mark */}
        <path
          d="M20 8 L31 30 L9 30 Z"
          stroke="url(#nirmata-g)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* Nucleus */}
        <circle cx="20" cy="22" r="2.2" fill="#00e6d3" />
      </svg>
      <div className="leading-none">
        <div className="font-display text-[15px] tracking-tight text-white">
          Nirmata
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-teal-500">
          Holdings
        </div>
      </div>
    </div>
  );
}
