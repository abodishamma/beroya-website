import {
  motion as Motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import heroImage from "../assets/reference-redesign/hero-components.webp";
import brandMark from "../assets/beroya-mark-2026.png";

const lineVariants = {
  hidden: { opacity: 0, y: 34, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
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

  const handlePointerMove = (event) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  };

  const resetPointer = () => {
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
            : { y: [0, -11, 0], opacity: [0.06, 0.1, 0.06] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={brandMark} alt="" width="219" height="420" />
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
          alt="Premium BEROYA braking, suspension and drivetrain components"
          width="1672"
          height="941"
          fetchPriority="high"
        />
        <span className="hero__scan" aria-hidden="true" />
        <span className="hero__hotspot hero__hotspot--brake" aria-hidden="true">
          <i />
          Braking
        </span>
        <span className="hero__hotspot hero__hotspot--suspension" aria-hidden="true">
          <i />
          Suspension
        </span>
      </Motion.div>

      <div className="hero__meta" aria-hidden="true">
        <span>BEROYA / 01</span>
        <span>Precision automotive systems</span>
      </div>

      <div className="container hero__inner">
        <Motion.div
          className="hero__copy"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.11, delayChildren: 0.13 }}
        >
          <Motion.span className="hero__eyebrow" variants={reduceMotion ? {} : lineVariants}>
            Engineered for Performance
          </Motion.span>

          <h1 id="hero-title">
            {["We don't just", "make parts,", "we build", "performance."].map((line) => (
              <span className="hero__line" key={line}>
                <Motion.span variants={reduceMotion ? {} : lineVariants}>
                  {line}
                </Motion.span>
              </span>
            ))}
          </h1>

          <Motion.div className="gold-rule" variants={reduceMotion ? {} : lineVariants} />

          <Motion.p variants={reduceMotion ? {} : lineVariants}>
            Premium automotive components engineered for precision, durability
            and confident performance.
          </Motion.p>

          <Motion.div className="hero__actions" variants={reduceMotion ? {} : lineVariants}>
            <a className="button button--gold" href="#products">
              View Products
              <ArrowRight aria-hidden="true" size={17} />
            </a>
            <a className="button button--outline" href="#technology">
              Technology
            </a>
          </Motion.div>

          <Motion.div className="hero__proof" variants={reduceMotion ? {} : lineVariants}>
            <span>Precision fit</span>
            <span>Durability tested</span>
            <span>Global supply</span>
          </Motion.div>
        </Motion.div>
      </div>

      <a className="hero__scroll" href="#principles">
        <span>Scroll to discover</span>
        <i aria-hidden="true" />
        <ArrowDown aria-hidden="true" size={14} />
      </a>
    </section>
  );
}
