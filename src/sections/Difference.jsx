import { motion as Motion, useReducedMotion } from "framer-motion";
import { CircleGauge, ShieldCheck, Target } from "lucide-react";
import differenceImage from "../assets/reference-redesign/about-caliper-branded.webp";
import brandMark from "../assets/beroya-mark-2026.png";
import Reveal from "../components/Reveal";
import { useLanguage } from "../hooks/useLanguage";

const icons = [Target, ShieldCheck, CircleGauge];

export default function Difference() {
  const { content } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section className="difference" id="difference">
      <img className="difference__mark" src={brandMark} alt="" aria-hidden="true" />
      <div className="container difference__layout">
        <Reveal className="difference__visual">
          <img
            src={differenceImage}
            alt={content.accessibility.differenceImage}
            width="1536"
            height="1024"
            loading="lazy"
            decoding="async"
          />
          <span>{content.difference.kicker}</span>
        </Reveal>

        <div className="difference__content">
          <Reveal>
            <span className="section-kicker">{content.difference.kicker}</span>
            <h2>
              {content.difference.title[0]}
              <em>{content.difference.title[1]}</em>
            </h2>
            <p>{content.difference.text}</p>
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
