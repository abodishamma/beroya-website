import { useMemo, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { formatPrice } from "../../utils/formatters";
import { createOrderWhatsAppUrl } from "../../utils/whatsapp";
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
  const [submitTarget, setSubmitTarget] = useState("whatsapp");

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
  const whatsappUrl = createOrderWhatsAppUrl({
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
          `${copy.name} × ${quantity} — ${product.sku} — ${lineTotal}`,
      ),
      `${content.cart.subtotal}: ${total}`,
    ].join("\n"),
  )}`;

  const updateField = (field, value) => {
    setFields((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!summaryItems.length) {
      navigateToRoute("cart");
      return;
    }

    if (submitTarget === "email") {
      window.location.href = emailUrl;
      return;
    }

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
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
          <button
            className={`button button--gold ${!summaryItems.length ? "is-disabled" : ""}`}
            type="submit"
            form="checkout-form"
            disabled={!summaryItems.length}
            onClick={() => setSubmitTarget("whatsapp")}
          >
            <MessageCircle aria-hidden="true" size={17} />
            {content.checkout.sendWhatsApp}
          </button>
          <button
            className="button button--outline"
            type="submit"
            form="checkout-form"
            disabled={!summaryItems.length}
            onClick={() => setSubmitTarget("email")}
          >
            <Send aria-hidden="true" size={15} />
            {content.checkout.saveInquiry}
          </button>
        </aside>
      </div>
    </section>
  );
}
