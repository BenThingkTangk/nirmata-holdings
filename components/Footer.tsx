import { NirmataLockup } from "./marks";

const NAV = [
  { href: "#manifesto", label: "Why Nirmata" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#substrate", label: "NirmataOS" },
  { href: "#atom", label: "ATOM" },
  { href: "#covenant", label: "Covenant" },
  { href: "#founders", label: "Founders" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.06]" data-testid="site-footer">
      <div className="container py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <a href="#top" aria-label="Nirmata Holdings — home">
            <NirmataLockup markSize={32} />
          </a>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[13px] text-ink-muted transition-colors hover:text-ink-text"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.06] pt-8 text-[11px] text-ink-faint md:flex-row md:items-center md:justify-between">
          <p className="font-mono uppercase tracking-[0.16em]">
            © {year} Nirmata Holdings · A maker&apos;s holding company
          </p>
          <p className="max-w-md leading-relaxed">
            Nirmata Holdings is an ethics-first innovation house. Not affiliated with the Kubernetes
            governance company of a similar name.
          </p>
        </div>
      </div>
    </footer>
  );
}
