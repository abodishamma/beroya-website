import { useEffect } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { useLanguage } from "../../hooks/useLanguage";
import { getRouteHref } from "../../utils/routes";

export default function CartToast() {
  const { content } = useLanguage();
  const { lastAddedItem, dismissAddedItem } = useCart();
  const product = lastAddedItem?.product;
  const copy = product ? content.shop.products[product.id] : null;

  useEffect(() => {
    if (!lastAddedItem) return undefined;

    const timer = window.setTimeout(dismissAddedItem, 3600);
    return () => window.clearTimeout(timer);
  }, [dismissAddedItem, lastAddedItem]);

  return (
    <AnimatePresence>
      {product && copy && (
        <Motion.aside
          className="cart-toast"
          key={lastAddedItem.nonce}
          initial={{ opacity: 0, y: 24, scale: 0.96, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 18, scale: 0.97, filter: "blur(6px)" }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
        >
          <div className="cart-toast__media">
            <img src={product.image} alt={copy.name} width="72" height="72" />
            <span aria-hidden="true">
              <CheckCircle2 size={16} />
            </span>
          </div>

          <div className="cart-toast__content">
            <small>{content.cart.addedLabel}</small>
            <strong>{copy.name}</strong>
            <a href={getRouteHref("cart")}>
              {content.shop.viewCart}
              <ArrowRight aria-hidden="true" size={14} />
            </a>
          </div>

          <button type="button" aria-label={content.cart.dismissAdded} onClick={dismissAddedItem}>
            <X aria-hidden="true" size={15} />
          </button>
        </Motion.aside>
      )}
    </AnimatePresence>
  );
}
