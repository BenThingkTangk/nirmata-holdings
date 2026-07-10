import { Nav } from "@/components/Nav";
import { Boot } from "@/components/Boot";
import { Chapters } from "@/components/Chapters";
import { Hero } from "@/components/Hero";
import { ScrollFilm } from "@/components/ScrollFilm";
import { Manifesto } from "@/components/Manifesto";
import { FailureModes } from "@/components/FailureModes";
import { Portfolio } from "@/components/Portfolio";
import { Marquee } from "@/components/Marquee";
import { Substrate } from "@/components/Substrate";
import { Atom } from "@/components/Atom";
import { WorkerSim } from "@/components/WorkerSim";
import { DecisionChamber } from "@/components/DecisionChamber";
import { Incubator } from "@/components/Incubator";
import { Covenant } from "@/components/Covenant";
import { Founders } from "@/components/Founders";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SoundToggle } from "@/components/SoundToggle";

export default function Home() {
  return (
    <>
      <Boot />
      <Nav />
      <Chapters />
      <main id="main" className="relative [overflow:clip]">
        <Hero />
        <ScrollFilm />
        <Manifesto />
        <FailureModes />
        <Portfolio />
        <Marquee />
        <Substrate />
        <Atom />
        <WorkerSim />
        <DecisionChamber />
        <Incubator />
        <Covenant />
        <Founders />
        <Contact />
      </main>
      <Footer />
      <SoundToggle />
    </>
  );
}
