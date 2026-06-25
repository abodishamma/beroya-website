import { motion as Motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import heroImage from "../assets/hero-braking.webp";
import Reveal from "../components/Reveal";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : 80]);
  const copyY = useTransform(scrollY, [0, 800], [0, reduceMotion ? 0 : 35]);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <Motion.div className="hero__media" style={{ y: imageY }} aria-hidden="true">
        <img
          src={heroImage}
          alt=""
          width="1672"
          height="941"
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero__scrim" />
      </Motion.div>

      <div className="hero__grid" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <Motion.div className="hero__content container" style={{ y: copyY }}>
        <Reveal className="hero__eyebrow" y={18}>
          <span className="status-dot" />
          Precision automotive components
        </Reveal>

        <h1 id="hero-title">
          <Motion.span
            initial={reduceMotion ? false : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.95, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            We don’t just
          </Motion.span>
          <Motion.span
            initial={reduceMotion ? false : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.95, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            make parts.
          </Motion.span>
          <Motion.span
            className="hero__accent"
            initial={reduceMotion ? false : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.95, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            We build performance.
          </Motion.span>
        </h1>

        <Reveal className="hero__bottom" delay={0.48}>
          <p>
            Premium automotive components engineered with precision, manufactured
            with discipline, and built to perform long after the road gets demanding.
          </p>
          <div className="hero__actions">
            <a className="button button--solid" href="#products">
              Discover our products
              <ArrowRight aria-hidden="true" size={18} />
            </a>
            <a className="button button--ghost" href="#technology">
              Our technology
            </a>
          </div>
        </Reveal>
      </Motion.div>

      <div className="hero__spec" aria-hidden="true">
        <span>System focus</span>
        <strong>BRK / 01</strong>
        <small>Thermal stability · precision control</small>
      </div>

      <a className="hero__scroll" href="#about" aria-label="Scroll to company overview">
        <span>Explore</span>
        <ArrowDown aria-hidden="true" size={16} />
      </a>
    </section>
  );
}
