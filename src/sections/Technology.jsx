import { motion as Motion, useReducedMotion } from "framer-motion";
import technologyImage from "../assets/technology-cnc.webp";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { useLanguage } from "../hooks/useLanguage";
import { technologySteps } from "../data/siteData";

export default function Technology() {
  const { content, isArabic } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section className="section technology" id="technology">
      <div className="container">
        <SectionHeading
          index={content.technology.index}
          eyebrow={content.technology.eyebrow}
          title={content.technology.title}
          accent={content.technology.accent}
          description={content.technology.description}
        />

        <div className="technology__stage">
          <Reveal className="technology__visual">
            <img
              src={technologyImage}
              alt={content.accessibility.technologyImage}
              width="1536"
              height="1024"
              loading="lazy"
              decoding="async"
            />
            <div className="technology__caption">
              <span>{content.technology.caption[0]}</span>
              <small>{content.technology.caption[1]}</small>
            </div>
            <div className="technology__signal" aria-hidden="true">
              <span>{content.technology.signal[0]}</span>
              <i />
              <b>{content.technology.signal[1]}</b>
            </div>
            <div className="technology__reticle" aria-hidden="true">
              <i />
              <i />
            </div>
          </Reveal>

          <div className="process-list">
            {technologySteps.map((step, index) => {
              const Icon = step.icon;
              const [title, text] = content.steps[index];
              return (
                <Motion.article
                  className="process-step"
                  key={step.number}
                  initial={reduceMotion ? false : { opacity: 0, x: isArabic ? -24 : 24 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.72,
                    delay: index * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span className="process-step__number">{step.number}</span>
                  <Icon aria-hidden="true" />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </Motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
