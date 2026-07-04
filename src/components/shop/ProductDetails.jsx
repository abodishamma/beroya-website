import { ArrowUpRight, MessageCircle, ShoppingBag, ShieldCheck } from "lucide-react";
import { getRelatedProducts } from "../../data/shopProducts";
import { formatPrice, formatWarranty } from "../../utils/formatters";
import { createProductWhatsAppUrl } from "../../utils/whatsapp";
import { useCart } from "../../hooks/useCart";
import { useLanguage } from "../../hooks/useLanguage";

export default function ProductDetails({ product, productCopies, onView }) {
  const { content, language } = useLanguage();
  const { addItem } = useCart();

  if (!product) return null;

  const copy = productCopies[product.id];
  const price = formatPrice(product.price, language);
  const related = getRelatedProducts(product, 3);

  return (
    <section className="product-detail" id="product-details" aria-labelledby="product-detail-title">
      <div className="product-detail__media">
        <img src={product.image} alt={copy.name} width="800" height="800" loading="lazy" />
      </div>

      <div className="product-detail__content">
        <span className="section-kicker">{content.shop.detailsKicker}</span>
        <h2 id="product-detail-title">{copy.name}</h2>
        <p>{copy.description}</p>

        <div className="product-detail__price">{price}</div>

        <dl className="product-detail__facts">
          <div>
            <dt>{content.shop.labels.sku}</dt>
            <dd>{product.sku}</dd>
          </div>
          <div>
            <dt>{content.shop.labels.availability}</dt>
            <dd>{content.shop.availability[product.availability]}</dd>
          </div>
          <div>
            <dt>{content.shop.labels.compatibility}</dt>
            <dd>{copy.compatibility}</dd>
          </div>
          <div>
            <dt>{content.shop.labels.warranty}</dt>
            <dd>{formatWarranty(product.warrantyMonths, content)}</dd>
          </div>
        </dl>

        <div className="product-detail__actions">
          <button className="button button--gold" type="button" onClick={() => addItem(product.id)}>
            <ShoppingBag aria-hidden="true" size={17} />
            {content.shop.addToCart}
          </button>
          <a
            className="button button--outline"
            href={createProductWhatsAppUrl({ product, copy, content, price })}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle aria-hidden="true" size={17} />
            {content.shop.whatsappButton}
          </a>
        </div>

        <div className="product-detail__specs">
          <h3>
            <ShieldCheck aria-hidden="true" size={18} />
            {content.shop.specifications}
          </h3>
          {copy.specifications.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        <div className="product-detail__related">
          <h3>{content.shop.relatedProducts}</h3>
          <div>
            {related.map((item) => (
              <button type="button" key={item.id} onClick={() => onView(item.id)}>
                {productCopies[item.id].name}
                <ArrowUpRight aria-hidden="true" size={14} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
