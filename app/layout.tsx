import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nirmata Holdings — Systems that build systems for humankind.",
  description:
    "Nirmata Holdings is the parent company behind ΔTOM, HumanOS, PhysioPS, ALC Bio Innovations, Adventures in Mousington and a portfolio of category-defining ventures. Built on the Ethical AI Covenant.",
  metadataBase: new URL("https://www.nirmataholdings.com"),
  openGraph: {
    title: "Nirmata Holdings",
    description:
      "The maker's holding company. ΔTOM, HumanOS, PhysioPS, ALC Bio, Mousington — built on the Ethical AI Covenant.",
    url: "https://www.nirmataholdings.com",
    siteName: "Nirmata Holdings",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirmata Holdings",
    description: "Systems that build systems for humankind.",
  },
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
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700,500&f[]=satoshi@400,500,700&f[]=cabinet-grotesk@500,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
