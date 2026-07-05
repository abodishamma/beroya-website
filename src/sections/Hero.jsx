import { useEffect, useRef } from "react";
import {
  motion as Motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import heroImage from "../assets/reference-redesign/hero-components.webp";
import brandMark from "../assets/beroya-mark-2026-transparent.png";
import { useLanguage } from "../hooks/useLanguage";
import { getRouteHref } from "../utils/routes";

const lineVariants = {
  hidden: { opacity: 0, y: 34, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Hero() {
  const { content, language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const pointerFrame = useRef(0);
  const latestPointer = useRef({ x: 0, y: 0 });
  const imageX = useSpring(useTransform(pointerX, [-1, 1], [-12, 12]), {
    stiffness: 90,
    damping: 24,
  });
  const imageY = useSpring(useTransform(pointerY, [-1, 1], [-7, 7]), {
    stiffness: 90,
    damping: 24,
  });
  const markX = useSpring(useTransform(pointerX, [-1, 1], [8, -8]), {
    stiffness: 70,
    damping: 28,
  });
  const markOpacity = language === "ar" ? [0.024, 0.044, 0.024] : [0.038, 0.066, 0.038];

  useEffect(() => {
    return () => {
      if (pointerFrame.current) window.cancelAnimationFrame(pointerFrame.current);
    };
  }, []);

  const handlePointerMove = (event) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    latestPointer.current = {
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
    };

    if (pointerFrame.current) return;

    pointerFrame.current = window.requestAnimationFrame(() => {
      pointerFrame.current = 0;
      pointerX.set(latestPointer.current.x);
      pointerY.set(latestPointer.current.y);
    });
  };

  const resetPointer = () => {
    if (pointerFrame.current) {
      window.cancelAnimationFrame(pointerFrame.current);
      pointerFrame.current = 0;
    }
    latestPointer.current = { x: 0, y: 0 };
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      className="hero"
      id="top"
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <Motion.div
        className="hero__glow"
        aria-hidden="true"
        style={reduceMotion ? undefined : { x: imageX, y: imageY }}
      />

      <Motion.div
        className="hero__beam"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { x: ["-18%", "118%"] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
      />

      <Motion.div
        className="hero__monogram"
        aria-hidden="true"
        style={reduceMotion ? undefined : { x: markX }}
        animate={
          reduceMotion
            ? undefined
            : { y: [0, -11, 0], opacity: markOpacity }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={brandMark} alt="" aria-hidden="true" width="219" height="420" />
      </Motion.div>

      <Motion.div
        className="hero__image"
        initial={reduceMotion ? false : { opacity: 0, x: 55, scale: 1.035 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.35, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        style={reduceMotion ? undefined : { translateX: imageX, translateY: imageY }}
      >
        <img
          src={heroImage}
          alt={content.accessibility.heroImage}
          width="1672"
          height="941"
          fetchPriority="high"
        />
        <span className="hero__smoke" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="hero__scan" aria-hidden="true" />
        <span className="hero__hotspot hero__hotspot--brake" aria-hidden="true">
          <i />
          {content.hero.hotspots[0]}
        </span>
        <span className="hero__hotspot hero__hotspot--suspension" aria-hidden="true">
          <i />
          {content.hero.hotspots[1]}
        </span>
      </Motion.div>

      <div className="hero__meta" aria-hidden="true">
        <span>{content.hero.meta[0]}</span>
        <span>{content.hero.meta[1]}</span>
      </div>

      <div className="container hero__inner">
        <Motion.div
          className="hero__copy"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.11, delayChildren: 0.13 }}
        >
          <Motion.span className="hero__eyebrow" variants={reduceMotion ? {} : lineVariants}>
            {content.hero.eyebrow}
          </Motion.span>

          <h1 id="hero-title">
            {content.hero.lines.map((line) => (
              <span className="hero__line" key={line}>
                <Motion.span variants={reduceMotion ? {} : lineVariants}>
                  {line}
                </Motion.span>
              </span>
            ))}
          </h1>

          <Motion.div className="gold-rule" variants={reduceMotion ? {} : lineVariants} />

          <Motion.p variants={reduceMotion ? {} : lineVariants}>
            {content.hero.text}
          </Motion.p>

          <Motion.div className="hero__actions" variants={reduceMotion ? {} : lineVariants}>
            <a className="button button--gold" href={getRouteHref("shop")}>
              {content.hero.primary}
              <ArrowRight aria-hidden="true" size={17} />
            </a>
            <a className="button button--outline" href={getRouteHref("technology")}>
              {content.hero.secondary}
            </a>
          </Motion.div>

          <Motion.div className="hero__proof" variants={reduceMotion ? {} : lineVariants}>
            {content.hero.proof.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </Motion.div>
        </Motion.div>
      </div>

      <a className="hero__scroll" href={getRouteHref("about")}>
        <span>{content.hero.scroll}</span>
        <i aria-hidden="true" />
        <ArrowDown aria-hidden="true" size={14} />
      </a>
    </section>
  );
}
