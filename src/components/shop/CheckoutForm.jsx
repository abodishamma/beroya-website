import { useMemo, useState } from "react";
import { CreditCard, ExternalLink, LockKeyhole, MessageCircle, Send, ShieldCheck } from "lucide-react";
import { formatPrice } from "../../utils/formatters";
import { createCardPaymentUrl, isCardPaymentReady } from "../../utils/payment";
import { createOrderWhatsAppUrl, createPaymentLinkWhatsAppUrl } from "../../utils/whatsapp";
import { navigateToRoute } from "../../utils/routes";
import { useCart } from "../../hooks/useCart";
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
  const { enrichedItems, subtotal } = useCart();
  const [fields, setFields] = useState(initialFields);

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
    fields,
    items: summaryItems,
    language,
    total,
  });
  const whatsappUrl = createOrderWhatsAppUrl({
    content,
    fields,
    items: summaryItems,
    total,
  });
  const paymentLinkUrl = createPaymentLinkWhatsAppUrl({
    content,
    fields,
    items: summaryItems,
    total,
  });

  const emailUrl = `mailto:info@beroyaauto.com?subject=${encodeURIComponent(
    content.checkout.emailSubject,
  )}&body=${encodeURIComponent(
    [
      content.checkout.customerInfo,
      `${content.checkout.fields.fullName}: ${fields.fullName}`,
      `${content.checkout.fields.phone}: ${fields.phone}`,
      `${content.checkout.fields.email}: ${fields.email}`,
      `${content.checkout.fields.city}: ${fields.city}`,
      `${content.checkout.fields.carBrand}: ${fields.carBrand}`,
      `${content.checkout.fields.carModel}: ${fields.carModel}`,
      `${content.checkout.fields.year}: ${fields.year}`,
      `${content.checkout.fields.vin}: ${fields.vin || "-"}`,
      `${content.checkout.fields.notes}: ${fields.notes || "-"}`,
      "",
      content.checkout.orderSummary,
      ...summaryItems.map(
        ({ product, copy, quantity, lineTotal }) =>
          `${copy.name} x ${quantity} — ${product.sku} — ${lineTotal}`,
      ),
      `${content.cart.subtotal}: ${total}`,
    ].join("\n"),
  )}`;

  const updateField = (field, value) => {
    setFields((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const target = event.nativeEvent?.submitter?.dataset?.target || "card";

    if (!summaryItems.length) {
      navigateToRoute("cart");
      return;
    }

    if (target === "email") {
      window.location.href = emailUrl;
      return;
    }

    if (target === "whatsapp") {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      return;
    }

    if (cardGatewayReady && cardPaymentUrl) {
      window.location.href = cardPaymentUrl;
      return;
    }

    window.open(paymentLinkUrl, "_blank", "noopener,noreferrer");
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
            data-target="card"
            disabled={!summaryItems.length}
          >
            <CreditCard aria-hidden="true" size={17} />
            {cardGatewayReady ? content.checkout.payment.payCard : content.checkout.payment.requestLink}
            {cardGatewayReady && <ExternalLink aria-hidden="true" size={14} />}
          </button>

          <button
            className="button button--outline"
            type="submit"
            form="checkout-form"
            data-target="whatsapp"
            disabled={!summaryItems.length}
          >
            <MessageCircle aria-hidden="true" size={17} />
            {content.checkout.sendWhatsApp}
          </button>

          <button
            className="button button--outline checkout-summary__email"
            type="submit"
            form="checkout-form"
            data-target="email"
            disabled={!summaryItems.length}
          >
            <Send aria-hidden="true" size={15} />
            {content.checkout.saveInquiry}
          </button>
        </aside>
      </div>
    </section>
  );
}
