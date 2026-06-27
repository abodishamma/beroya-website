import { motion as Motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { products } from "../data/siteData";
import brandMark from "../assets/beroya-mark-2026.png";

export default function Products() {
  const { content } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section className="products" id="products">
      <img className="products__brand-ghost" src={brandMark} alt="" aria-hidden="true" />
      <div className="container">
        <div className="products__heading">
          <div>
            <span className="section-kicker">{content.products.kicker}</span>
            <h2>
              {content.products.title[0]}
              <br />
              {content.products.title[1]}
            </h2>
          </div>
          <p>{content.products.text}</p>
        </div>

        <div className="products__grid">
          {products.map((product, index) => {
            const [title, text] = content.products.items[index];
            return (
              <Motion.a
                className="product-card"
                href="#contact"
                aria-label={`${content.products.action}: ${title}`}
                key={product.id}
                initial={reduceMotion ? false : { opacity: 0, y: 34 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.78,
                  delay: (index % 3) * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={reduceMotion ? undefined : { y: -7 }}
              >
                <span className="product-card__glow" aria-hidden="true" />
                <div className="product-card__image">
                  <img
                    src={product.image}
                    alt=""
                    width="496"
                    height="496"
                    loading="lazy"
                  />
                  <span className="product-card__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="product-card__body">
                  <div>
                    <span>{content.products.system}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                  <span className="product-card__action">
                    {content.products.action}
                    <ArrowUpRight aria-hidden="true" size={18} />
                  </span>
                </div>
              </Motion.a>
            );
          })}
        </div>

        <a
          className="products__all"
          href="mailto:info@beroyaauto.com?subject=BEROYA%20Product%20Portfolio%20Request"
        >
          {content.products.cta}
          <ArrowUpRight aria-hidden="true" size={16} />
        </a>
      </div>
    </section>
  );
}
