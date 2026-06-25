import { motion as Motion, useReducedMotion } from "framer-motion";
import technologyImage from "../assets/technology-cnc.webp";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { technologySteps } from "../data/siteData";

export default function Technology() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section technology" id="technology">
      <div className="container">
        <SectionHeading
          index="02"
          eyebrow="Our technology"
          title="From engineering intent"
          accent="to measured reality."
          description="A closed-loop manufacturing philosophy connects design, material selection, precision production and validation—so quality is built into the process, not inspected in at the end."
        />

        <div className="technology__stage">
          <Reveal className="technology__visual">
            <img
              src={technologyImage}
              alt="Precision CNC machining of an automotive suspension component"
              width="1536"
              height="1024"
              loading="lazy"
              decoding="async"
            />
            <div className="technology__caption">
              <span>Advanced manufacturing</span>
              <small>Controlled precision environment</small>
            </div>
            <div className="technology__signal" aria-hidden="true">
              <span>Live process</span>
              <i />
              <b>± 0.01</b>
            </div>
            <div className="technology__reticle" aria-hidden="true">
              <i />
              <i />
            </div>
          </Reveal>

          <div className="process-list">
            {technologySteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Motion.article
                  className="process-step"
                  key={step.number}
                  initial={reduceMotion ? false : { opacity: 0, x: 24 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span className="process-step__number">{step.number}</span>
                  <Icon aria-hidden="true" />
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
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
