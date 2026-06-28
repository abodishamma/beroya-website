import { motion as Motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import aboutImage from "../assets/reference-redesign/about-caliper-branded.webp";
import { useLanguage } from "../hooks/useLanguage";

export default function About() {
  const { content } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section className="about" id="about">
      <div className="about__image">
        <img
          src={aboutImage}
          alt={content.accessibility.aboutImage}
          width="1536"
          height="1024"
          loading="lazy"
        />
        <div className="about__image-meta">
          <span>{content.about.meta[0]}</span>
          <strong>{content.about.meta[1]}</strong>
        </div>
      </div>

      <Motion.div
        className="about__content"
        initial={reduceMotion ? false : { opacity: 0, x: 28 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="section-kicker">{content.about.kicker}</span>
        <h2>
          {content.about.title[0]}
          <br />
          {content.about.title[1]}
        </h2>
        <div className="gold-rule" />
        <p>{content.about.text}</p>
        <div className="about__principles" aria-label={content.accessibility.manufacturingPrinciples}>
          {content.about.principles.map((principle) => (
            <span key={principle}>{principle}</span>
          ))}
        </div>
        <a className="button button--outline" href="#technology">
          {content.about.cta}
          <ArrowRight aria-hidden="true" size={17} />
        </a>
      </Motion.div>
    </section>
  );
}
