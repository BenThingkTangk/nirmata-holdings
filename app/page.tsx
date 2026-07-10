import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Philosophy } from "@/components/Philosophy";
import { Atom } from "@/components/Atom";
import { Marquee } from "@/components/Marquee";
import { Portfolio } from "@/components/Portfolio";
import { Covenant } from "@/components/Covenant";
import { Founders } from "@/components/Founders";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative bg-ink-950 text-white overflow-hidden">
      <Nav />
      <Hero />
      <Philosophy />
      <Atom />
      <Marquee />
      <Portfolio />
      <Covenant />
      <Founders />
      <Contact />
    </main>
  );
}
