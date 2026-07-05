import { motion as Motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Eye, MessageCircle, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { formatPrice, formatWarranty } from "../../utils/formatters";
import { createProductWhatsAppUrl } from "../../utils/whatsapp";
import { useCart } from "../../hooks/useCart";
import { useLanguage } from "../../hooks/useLanguage";

export default function ProductCard({ product, copy, onView }) {
  const { content, language } = useLanguage();
  const { addItem } = useCart();
  const reduceMotion = useReducedMotion();
  const [justAdded, setJustAdded] = useState(false);
  const addedTimer = useRef(0);
  const price = formatPrice(product.price, language);

  useEffect(
    () => () => {
      window.clearTimeout(addedTimer.current);
    },
    [],
  );

  const handleAddToCart = () => {
    addItem(product.id);
    setJustAdded(true);
    window.clearTimeout(addedTimer.current);
    addedTimer.current = window.setTimeout(() => setJustAdded(false), 1300);
  };

  return (
    <Motion.article
      className="shop-card"
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -7 }}
    >
      <button className="shop-card__quick" type="button" onClick={() => onView(product.id)}>
        <Eye aria-hidden="true" size={16} />
        {content.shop.quickView}
      </button>

      <div className="shop-card__image">
        <img src={product.image} alt={copy.name} width="496" height="496" loading="lazy" />
      </div>

      <div className="shop-card__body">
        <div className="shop-card__meta">
          <span>{content.shop.categories[product.category]}</span>
          <strong>{price}</strong>
        </div>

        <h3>{copy.name}</h3>
        <p>{copy.shortDescription}</p>

        <dl>
          <div>
            <dt>{content.shop.labels.sku}</dt>
            <dd>{product.sku}</dd>
          </div>
          <div>
            <dt>{content.shop.labels.warranty}</dt>
            <dd>{formatWarranty(product.warrantyMonths, content)}</dd>
          </div>
        </dl>

        <div className="shop-card__actions">
          <button
            className={`button button--gold ${justAdded ? "is-success" : ""}`}
            type="button"
            onClick={handleAddToCart}
          >
            <ShoppingBag aria-hidden="true" size={16} />
            {justAdded ? content.shop.addedToCart : content.shop.addToCart}
          </button>
          <button className="button button--outline" type="button" onClick={() => onView(product.id)}>
            {content.shop.details}
            <ArrowUpRight aria-hidden="true" size={15} />
          </button>
        </div>

        <a
          className="shop-card__enquire"
          href={createProductWhatsAppUrl({ product, copy, content, price })}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle aria-hidden="true" size={15} />
          {content.shop.enquire}
        </a>
      </div>
    </Motion.article>
  );
}
