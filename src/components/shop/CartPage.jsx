import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { formatPrice } from "../../utils/formatters";
import { useCart } from "../../hooks/useCart";
import { useLanguage } from "../../hooks/useLanguage";

export default function CartPage({ productCopies }) {
  const { content, language } = useLanguage();
  const { enrichedItems, removeItem, setQuantity, subtotal, totalQuantity } = useCart();

  return (
    <section className="cart-page" id="cart" aria-labelledby="cart-title">
      <div className="cart-page__heading">
        <span className="section-kicker">{content.cart.kicker}</span>
        <h2 id="cart-title">{content.cart.title}</h2>
        <p>{content.cart.description}</p>
      </div>

      <div className="cart-page__layout">
        <div className="cart-items">
          {!enrichedItems.length && <p className="shop-empty">{content.cart.empty}</p>}

          {enrichedItems.map(({ product, quantity }) => {
            const copy = productCopies[product.id];
            return (
              <article className="cart-item" key={product.id}>
                <img src={product.image} alt={copy.name} width="120" height="120" loading="lazy" />
                <div>
                  <span>{product.sku}</span>
                  <h3>{copy.name}</h3>
                  <p>{formatPrice(product.price, language)}</p>
                </div>
                <div className="cart-item__qty" aria-label={content.cart.quantity}>
                  <button type="button" onClick={() => setQuantity(product.id, quantity - 1)}>
                    <Minus aria-hidden="true" size={14} />
                  </button>
                  <strong>{quantity}</strong>
                  <button type="button" onClick={() => setQuantity(product.id, quantity + 1)}>
                    <Plus aria-hidden="true" size={14} />
                  </button>
                </div>
                <button
                  className="cart-item__remove"
                  type="button"
                  aria-label={`${content.cart.remove} ${copy.name}`}
                  onClick={() => removeItem(product.id)}
                >
                  <Trash2 aria-hidden="true" size={16} />
                </button>
              </article>
            );
          })}
        </div>

        <aside className="cart-summary">
          <ShoppingCart aria-hidden="true" size={24} />
          <h3>{content.cart.summary}</h3>
          <div>
            <span>{content.cart.items}</span>
            <strong>{totalQuantity}</strong>
          </div>
          <div>
            <span>{content.cart.subtotal}</span>
            <strong>{formatPrice(subtotal, language)}</strong>
          </div>
          <a className="button button--gold" href="#checkout">
            {content.cart.checkout}
          </a>
        </aside>
      </div>
    </section>
  );
}
