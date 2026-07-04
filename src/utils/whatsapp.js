const WHATSAPP_PHONE = "971501234567";

function encodeWhatsAppMessage(message) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function createProductWhatsAppUrl({ product, copy, content, price }) {
  return encodeWhatsAppMessage(
    [
      content.shop.whatsapp.productIntro,
      `${content.shop.labels.product}: ${copy.name}`,
      `${content.shop.labels.sku}: ${product.sku}`,
      `${content.shop.labels.price}: ${price}`,
      `${content.shop.labels.compatibility}: ${copy.compatibility}`,
    ].join("\n"),
  );
}

export function createOrderWhatsAppUrl({ content, fields, items, total }) {
  const customerLines = [
    `${content.checkout.fields.fullName}: ${fields.fullName}`,
    `${content.checkout.fields.phone}: ${fields.phone}`,
    `${content.checkout.fields.email}: ${fields.email}`,
    `${content.checkout.fields.city}: ${fields.city}`,
    `${content.checkout.fields.carBrand}: ${fields.carBrand}`,
    `${content.checkout.fields.carModel}: ${fields.carModel}`,
    `${content.checkout.fields.year}: ${fields.year}`,
    `${content.checkout.fields.vin}: ${fields.vin || "-"}`,
    `${content.checkout.fields.notes}: ${fields.notes || "-"}`,
  ];

  const itemLines = items.map(
    ({ product, copy, quantity, lineTotal }) =>
      `• ${copy.name} × ${quantity} — ${product.sku} — ${lineTotal}`,
  );

  return encodeWhatsAppMessage(
    [
      content.checkout.whatsappIntro,
      "",
      content.checkout.customerInfo,
      ...customerLines,
      "",
      content.checkout.orderSummary,
      ...itemLines,
      `${content.cart.subtotal}: ${total}`,
    ].join("\n"),
  );
}
