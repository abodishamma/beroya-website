import { motion as Motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import aboutImage from "../assets/reference-redesign/about-caliper-branded.webp";

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="about" id="about">
      <div className="about__image">
        <img
          src={aboutImage}
          alt="Close-up of a premium black performance brake caliper and disc"
          width="1536"
          height="1024"
          loading="lazy"
        />
        <div className="about__image-meta">
          <span>BEROYA / Braking Systems</span>
          <strong>Engineered identity. Applied at source.</strong>
        </div>
      </div>

      <Motion.div
        className="about__content"
        initial={reduceMotion ? false : { opacity: 0, x: 28 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="section-kicker">About BEROYA</span>
        <h2>
          Innovation in Every Detail.
          <br />
          Excellence in Every Part.
        </h2>
        <div className="gold-rule" />
        <p>
          BEROYA Auto Parts was founded with a clear mission: to manufacture
          automotive parts that combine advanced engineering, durability, and
          perfect fit.
        </p>
        <p>
          From concept to production, every step is carried out with precision,
          passion, and a commitment to delivering the best to our customers.
        </p>
        <div className="about__principles" aria-label="BEROYA manufacturing principles">
          <span>Material discipline</span>
          <span>Precision fit</span>
          <span>Validated durability</span>
        </div>
        <a className="button button--outline" href="#technology">
          Explore Our Engineering
          <ArrowRight aria-hidden="true" size={17} />
        </a>
      </Motion.div>
    </section>
  );
}
