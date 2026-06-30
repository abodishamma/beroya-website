import { motion as Motion, useReducedMotion } from "framer-motion";
import { CircleGauge, ShieldCheck, Target } from "lucide-react";
import differenceImage from "../assets/reference-redesign/hero-components.webp";
import brandMark from "../assets/beroya-mark-2026-transparent.png";
import Reveal from "../components/Reveal";
import { useLanguage } from "../hooks/useLanguage";

const icons = [Target, ShieldCheck, CircleGauge];

export default function Difference() {
  const { content } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section className="difference" id="difference">
      <img className="difference__mark" src={brandMark} alt="" aria-hidden="true" />
      <div className="container difference__inner">
        <div className="difference__topline">
          <Reveal className="difference__headline">
            <span className="section-kicker">{content.difference.kicker}</span>
            <h2>
              {content.difference.title[0]}
              <em>{content.difference.title[1]}</em>
            </h2>
          </Reveal>

          <Reveal className="difference__summary" delay={0.08}>
            <p>{content.difference.text}</p>
            <div className="difference__proof" aria-label={content.difference.kicker}>
              <span>01 / {content.difference.pillars[0][0]}</span>
              <span>02 / {content.difference.pillars[1][0]}</span>
              <span>03 / {content.difference.pillars[2][0]}</span>
            </div>
          </Reveal>
        </div>

        <div className="difference__showcase">
          <Reveal className="difference__media">
            <div className="difference__visual">
              <img
                src={differenceImage}
                alt={content.accessibility.differenceImage}
                width="1536"
                height="1024"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="difference__caption">
              <span>BEROYA / VALIDATED COMPONENT</span>
              <strong>{content.difference.kicker}</strong>
            </div>
          </Reveal>

          <div className="difference__pillars">
            {content.difference.pillars.map(([title, text], index) => {
              const Icon = icons[index];
              return (
                <Motion.article
                  key={title}
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.72, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span>
                    <Icon aria-hidden="true" />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
