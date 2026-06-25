import { motion as Motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { products } from "../data/siteData";

export default function Products() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section products" id="products">
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="Product systems"
          title="One standard."
          accent="Every critical system."
          description="A focused portfolio of automotive component families, developed around consistent engineering principles and scalable manufacturing control."
        />

        <div className="product-grid">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <Motion.article
                className="product-card"
                key={product.title}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.65,
                  delay: (index % 4) * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={reduceMotion ? undefined : { y: -7 }}
              >
                <div className="product-card__visual" aria-hidden="true">
                  <span>{product.code}</span>
                  <Icon />
                  <i />
                </div>
                <div className="product-card__body">
                  <span className="product-card__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{product.title}</h3>
                  <p>{product.text}</p>
                  <a href="#contact" aria-label={`Enquire about ${product.title}`}>
                    Product capability
                    <ArrowUpRight aria-hidden="true" size={16} />
                  </a>
                </div>
              </Motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
