const cardPaymentGatewayUrl = import.meta.env.VITE_CARD_PAYMENT_URL?.trim() || "";

export function isCardPaymentReady() {
  return Boolean(cardPaymentGatewayUrl);
}

function safeAppend(url, key, value) {
  if (value !== undefined && value !== null && String(value).trim()) {
    url.searchParams.set(key, String(value).trim());
  }
}

export function createCardPaymentUrl({ fields, items, total, language }) {
  if (!cardPaymentGatewayUrl) return "";

  try {
    const url = new URL(cardPaymentGatewayUrl);
    const orderLines = items.map(({ product, copy, quantity, lineTotal }) =>
      `${copy.name} x ${quantity} - ${product.sku} - ${lineTotal}`,
    );

    safeAppend(url, "source", "beroya-website");
    safeAppend(url, "lang", language);
    safeAppend(url, "name", fields.fullName);
    safeAppend(url, "email", fields.email);
    safeAppend(url, "phone", fields.phone);
    safeAppend(url, "city", fields.city);
    safeAppend(url, "car_brand", fields.carBrand);
    safeAppend(url, "car_model", fields.carModel);
    safeAppend(url, "car_year", fields.year);
    safeAppend(url, "vin", fields.vin);
    safeAppend(url, "notes", fields.notes);
    safeAppend(url, "items", orderLines.join(" | "));
    safeAppend(url, "total", total);

    return url.toString();
  } catch {
    return "";
  }
}
