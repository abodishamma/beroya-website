import { motion as Motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { products } from "../data/siteData";
import brandMark from "../assets/beroya-mark-2026.png";

export default function Products() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="products" id="products">
      <img className="products__brand-ghost" src={brandMark} alt="" aria-hidden="true" />
      <div className="container">
        <div className="products__heading">
          <div>
            <span className="section-kicker">Our Products</span>
            <h2>
              Engineered to <u>Fit</u>.
              <br />
              Built to Last.
            </h2>
          </div>
          <p>
            A focused portfolio of safety-critical and performance components,
            developed for consistent fit, confident function and long service life.
          </p>
        </div>

        <div className="products__grid">
          {products.map((product, index) => (
            <Motion.a
              className="product-card"
              href="#contact"
              aria-label={`Discuss ${product.title} with BEROYA`}
              key={product.title}
              initial={reduceMotion ? false : { opacity: 0, y: 34 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: (index % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={reduceMotion ? undefined : { y: -7 }}
            >
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
                  <span>BEROYA System</span>
                  <h3>{product.title}</h3>
                  <p>{product.text}</p>
                </div>
                <span className="product-card__action">
                  Discuss this system
                  <ArrowUpRight aria-hidden="true" size={18} />
                </span>
              </div>
            </Motion.a>
          ))}
        </div>

        <a
          className="products__all"
          href="mailto:info@beroyaauto.com?subject=BEROYA%20Product%20Portfolio%20Request"
        >
          Request Product Portfolio
          <ArrowUpRight aria-hidden="true" size={16} />
        </a>
      </div>
    </section>
  );
}
