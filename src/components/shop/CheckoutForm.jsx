import { useEffect, useMemo, useState } from "react";
import { CreditCard, ExternalLink, LockKeyhole, ShieldCheck } from "lucide-react";
import { formatPrice } from "../../utils/formatters";
import { createCardPaymentUrl, isCardPaymentReady } from "../../utils/payment";
import { navigateToRoute } from "../../utils/routes";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { useCommerce } from "../../hooks/useCommerce";
import { useLanguage } from "../../hooks/useLanguage";

const initialFields = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  carBrand: "",
  carModel: "",
  year: "",
  vin: "",
  notes: "",
};

export default function CheckoutForm({ productCopies }) {
  const { content, language } = useLanguage();
  const { currentCustomer } = useAuth();
  const { createOrder } = useCommerce();
  const { clearCart, enrichedItems, subtotal } = useCart();
  const [fields, setFields] = useState(initialFields);
  const [submittedOrderId, setSubmittedOrderId] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");

  useEffect(() => {
    if (!currentCustomer) return;

    setFields((current) => ({
      ...current,
      fullName: current.fullName || currentCustomer.fullName || "",
      phone: current.phone || currentCustomer.phone || "",
      email: current.email || currentCustomer.email || "",
      city: current.city || currentCustomer.city || "",
      carBrand: current.carBrand || currentCustomer.carBrand || "",
      carModel: current.carModel || currentCustomer.carModel || "",
      year: current.year || currentCustomer.year || "",
      vin: current.vin || currentCustomer.vin || "",
    }));
  }, [currentCustomer]);

  const summaryItems = useMemo(
    () =>
      enrichedItems.map(({ product, quantity }) => ({
        product,
        copy: productCopies[product.id],
        quantity,
        lineTotal: formatPrice(product.price * quantity, language),
      })),
    [enrichedItems, language, productCopies],
  );

  const total = formatPrice(subtotal, language);
  const cardGatewayReady = isCardPaymentReady();
  const cardPaymentUrl = createCardPaymentUrl({
    amount: subtotal,
    fields,
    items: summaryItems,
    language,
    total,
  });

  const updateField = (field, value) => {
    setFields((current) => ({ ...current, [field]: value }));
    if (paymentMessage) setPaymentMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPaymentMessage("");

    if (!summaryItems.length) {
      navigateToRoute("cart");
      return;
    }

    if (!cardGatewayReady || !cardPaymentUrl) {
      setPaymentMessage(content.checkout.payment.connectGateway);
      return;
    }

    if (!submittedOrderId) {
      const order = createOrder({
        fields,
        items: summaryItems,
        paymentMethod: "card",
        customerId: currentCustomer?.id || "",
      });

      if (order?.id) {
        setSubmittedOrderId(order.id);
        clearCart();
      }
    }

    window.location.href = cardPaymentUrl;
  };

  return (
    <section className="checkout" id="checkout" aria-labelledby="checkout-title">
      <div className="checkout__heading">
        <span className="section-kicker">{content.checkout.kicker}</span>
        <h2 id="checkout-title">{content.checkout.title}</h2>
        <p>{content.checkout.description}</p>
      </div>

      <div className="checkout__layout">
        <form className="checkout-form" id="checkout-form" onSubmit={handleSubmit}>
          {Object.entries(content.checkout.fields).map(([field, label]) => (
            <label className={field === "notes" ? "is-wide" : ""} key={field}>
              <span>{label}</span>
              {field === "notes" ? (
                <textarea
                  value={fields[field]}
                  rows="4"
                  onChange={(event) => updateField(field, event.target.value)}
                  placeholder={content.checkout.placeholders[field]}
                />
              ) : (
                <input
                  value={fields[field]}
                  type={field === "email" ? "email" : "text"}
                  required={field !== "vin" && field !== "notes"}
                  onChange={(event) => updateField(field, event.target.value)}
                  placeholder={content.checkout.placeholders[field]}
                />
              )}
            </label>
          ))}

          <div className="payment-panel is-wide">
            <div className="payment-panel__top">
              <span className="section-kicker">{content.checkout.payment.kicker}</span>
              <strong>{content.checkout.payment.title}</strong>
              <small className={cardGatewayReady ? "is-ready" : ""}>
                {cardGatewayReady
                  ? content.checkout.payment.gatewayReady
                  : content.checkout.payment.gatewayPending}
              </small>
            </div>

            <div className="payment-card-preview" aria-hidden="true">
              <div>
                <CreditCard size={20} />
                <span>{content.checkout.payment.cardMethod}</span>
              </div>
              <strong>•••• •••• •••• 4242</strong>
              <small>{content.checkout.payment.acceptedCards}</small>
            </div>

            <p>
              <LockKeyhole aria-hidden="true" size={15} />
              {content.checkout.payment.note}
            </p>

            {!cardGatewayReady && (
              <div className="payment-gateway-alert" role="status">
                <strong>{content.checkout.payment.gatewayRequired}</strong>
                <span>{content.checkout.payment.connectGateway}</span>
              </div>
            )}
          </div>
        </form>

        <aside className="checkout-summary">
          <h3>{content.checkout.orderSummary}</h3>
          {!summaryItems.length && <p>{content.cart.empty}</p>}
          {summaryItems.map(({ product, copy, quantity, lineTotal }) => (
            <div className="checkout-summary__item" key={product.id}>
              <span>{copy.name}</span>
              <strong>
                × {quantity} / {lineTotal}
              </strong>
            </div>
          ))}
          <div className="checkout-summary__total">
            <span>{content.cart.subtotal}</span>
            <strong>{total}</strong>
          </div>

          <div className="checkout-secure">
            <ShieldCheck aria-hidden="true" size={17} />
            <span>{content.checkout.payment.secure}</span>
          </div>

          <button
            className={`button button--gold ${!summaryItems.length ? "is-disabled" : ""}`}
            type="submit"
            form="checkout-form"
            disabled={!summaryItems.length}
          >
            <CreditCard aria-hidden="true" size={17} />
            {content.checkout.payment.payCard}
            {cardGatewayReady && <ExternalLink aria-hidden="true" size={14} />}
          </button>

          {paymentMessage && <p className="checkout-payment-message">{paymentMessage}</p>}
        </aside>
      </div>
    </section>
  );
}
