import { site } from "@/content/site";
import SectionHeading from "./SectionHeading";
import TechnicalArsenalSwiper from "./TechnicalArsenalSwiper";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-20">
      <Reveal>
        <SectionHeading
          eyebrow="What I use"
          title={site.skills.heading}
          subtitle={site.skills.subheading}
        />
      </Reveal>
      <Reveal delay={75}>
        <TechnicalArsenalSwiper />
      </Reveal>
    </section>
  );
}
