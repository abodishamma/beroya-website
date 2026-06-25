import { motion as Motion, useReducedMotion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import { advantages } from "../data/siteData";

export default function WhyBeroya() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section why">
      <div className="container">
        <SectionHeading
          index="06"
          eyebrow="The BEROYA advantage"
          title="Confidence,"
          accent="engineered in."
          description="A partner mindset shaped around performance, repeatability and the realities of global automotive supply."
          align="center"
        />

        <div className="advantage-grid">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <Motion.article
                className="advantage-card"
                key={advantage.title}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.6,
                  delay: (index % 3) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Icon aria-hidden="true" />
                </div>
                <h3>{advantage.title}</h3>
                <p>{advantage.text}</p>
              </Motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
