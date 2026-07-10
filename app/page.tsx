import { Nav } from "@/components/Nav";
import { Boot } from "@/components/Boot";
import { Chapters } from "@/components/Chapters";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { FailureModes } from "@/components/FailureModes";
import { Portfolio } from "@/components/Portfolio";
import { Marquee } from "@/components/Marquee";
import { Substrate } from "@/components/Substrate";
import { Atom } from "@/components/Atom";
import { Incubator } from "@/components/Incubator";
import { Covenant } from "@/components/Covenant";
import { Founders } from "@/components/Founders";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Boot />
      <Nav />
      <Chapters />
      <main id="main" className="relative overflow-hidden">
        <Hero />
        <Manifesto />
        <FailureModes />
        <Portfolio />
        <Marquee />
        <Substrate />
        <Atom />
        <Incubator />
        <Covenant />
        <Founders />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
