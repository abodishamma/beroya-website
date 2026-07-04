export function formatPrice(value, language = "en") {
  const locale = language === "ar" ? "ar-AE" : "en-AE";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatWarranty(months, content) {
  return content.shop.warrantyMonths.replace("{months}", months);
}
