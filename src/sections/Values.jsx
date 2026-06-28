import { motion as Motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";
import { values } from "../data/siteData";
import logo from "../assets/beroya-logo-2026.png";

export default function Values() {
  const { content } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section className="values" id="principles" aria-label={content.accessibility.principles}>
      <img className="values__brand-ghost" src={logo} alt="" aria-hidden="true" />
      <div className="container values__grid">
        {values.map((value, index) => {
          const Icon = value.icon;
          const [title, text] = content.values[index];
          return (
            <Motion.article
              className="value"
              key={value.title}
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{
                duration: 0.55,
                delay: index * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="value__icon">
                <Icon aria-hidden="true" />
              </span>
              <div>
                <span className="value__index">{String(index + 1).padStart(2, "0")}</span>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            </Motion.article>
          );
        })}
      </div>
    </section>
  );
}
