import type { Metadata, Viewport } from "next";
import "./globals.css";

const DESCRIPTION =
  "Nirmata Holdings is an ethics-first innovation house and incubator — a growing portfolio of category-defining ventures across revenue, security, health, agriculture and learning, built on a shared operating substrate (NirmataOS / ΔTOM) and the Ethical AI Covenant. Not affiliated with the Kubernetes governance company of a similar name.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nirmataholdings.com"),
  title: {
    default: "Nirmata Holdings — A holding company for ideas too important to stay theoretical",
    template: "%s · Nirmata Holdings",
  },
  description: DESCRIPTION,
  applicationName: "Nirmata Holdings",
  keywords: [
    "Nirmata Holdings",
    "innovation house",
    "holding company",
    "ethics-first AI",
    "NirmataOS",
    "ATOM",
    "ΔTOM",
    "Thingk Tangk",
    "PhysioPS",
    "ALC Bio Innovations",
    "Ethical AI Covenant",
    "deep tech ventures",
  ],
  authors: [{ name: "Nirmata Holdings" }],
  creator: "Nirmata Holdings",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Nirmata Holdings",
    description:
      "An ethics-first innovation house building a portfolio of category-defining ventures. Brilliance has no passport. Judge us by what ships.",
    url: "https://www.nirmataholdings.com",
    siteName: "Nirmata Holdings",
    type: "website",
    images: [
      {
        url: "/brand/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nirmata Holdings — the sculptural winged-N masterbrand on near-black",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirmata Holdings",
    description:
      "An ethics-first innovation house building a portfolio of category-defining ventures.",
    images: ["/brand/og-image.jpg"],
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#050607",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* If JS never loads, guarantee all reveal content is visible. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
