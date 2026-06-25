import { ArrowUpRight, Crosshair, Layers3, ShieldCheck } from "lucide-react";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

const pillars = [
  {
    icon: Crosshair,
    title: "Precision",
    text: "Tolerances are designed, controlled and verified—never assumed.",
  },
  {
    icon: Layers3,
    title: "Innovation",
    text: "Materials and processes evolve around real performance demands.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    text: "Every critical characteristic is protected by disciplined quality control.",
  },
];

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <SectionHeading
          index="01"
          eyebrow="The company"
          title="Built for the standards"
          accent="the road demands."
          description="BEROYA is a premium automotive components manufacturer focused on the details that define long-term performance: material integrity, dimensional accuracy and process consistency."
        />

        <div className="about__layout">
          <Reveal className="about__manifesto">
            <span className="micro-label">Our belief</span>
            <blockquote>
              “True quality is rarely seen. It is felt in every controlled stop,
              every precise response and every kilometer of dependable operation.”
            </blockquote>
            <div className="about__signature">
              <span />
              <p>
                BEROYA
                <small>Precision in motion</small>
              </p>
            </div>
          </Reveal>

          <div className="about__pillars">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Reveal className="pillar-card" delay={index * 0.08} key={pillar.title}>
                  <span className="pillar-card__index">0{index + 1}</span>
                  <Icon aria-hidden="true" />
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                  <ArrowUpRight aria-hidden="true" className="pillar-card__arrow" />
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
