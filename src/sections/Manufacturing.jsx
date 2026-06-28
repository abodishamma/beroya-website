import { motion as Motion, useReducedMotion } from "framer-motion";
import { Factory, Microscope, ScanLine } from "lucide-react";
import technologyImage from "../assets/technology-cnc-branded.webp";
import qualityImage from "../assets/quality-metrology.webp";
import brakingImage from "../assets/reference-redesign/braking-system.webp";
import Reveal from "../components/Reveal";
import { useLanguage } from "../hooks/useLanguage";

const images = [technologyImage, qualityImage, brakingImage];
const icons = [Factory, ScanLine, Microscope];

export default function Manufacturing() {
  const { content } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section className="manufacturing" id="manufacturing">
      <div className="container manufacturing__heading">
        <Reveal>
          <span className="section-kicker">{content.manufacturing.kicker}</span>
          <h2>
            {content.manufacturing.title[0]}
            <em>{content.manufacturing.title[1]}</em>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p>{content.manufacturing.text}</p>
        </Reveal>
      </div>

      <div className="container manufacturing__grid">
        {content.manufacturing.cards.map(([title, text], index) => {
          const Icon = icons[index];
          return (
            <Motion.article
              className="manufacturing-card"
              key={title}
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.76, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={images[index]}
                alt={content.manufacturing.imageAlts[index]}
                loading="lazy"
                decoding="async"
              />
              <div>
                <span>
                  <Icon aria-hidden="true" />
                  0{index + 1}
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </Motion.article>
          );
        })}
      </div>

      <div className="container manufacturing__badge">
        <span>{content.manufacturing.badge}</span>
      </div>
    </section>
  );
}
