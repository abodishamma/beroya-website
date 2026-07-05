export const routePaths = {
  home: "/",
  shop: "/shop",
  product: "/product",
  cart: "/cart",
  checkout: "/checkout",
  account: "/account",
  admin: "/admin",
  about: "/about",
  technology: "/technology",
  manufacturing: "/manufacturing",
  quality: "/quality",
  contact: "/contact",
};

const legacyHashMap = {
  top: "home",
  shop: "shop",
  products: "shop",
  categories: "shop",
  search: "shop",
  cart: "cart",
  checkout: "checkout",
  account: "account",
  admin: "admin",
  about: "about",
  principles: "about",
  technology: "technology",
  manufacturing: "manufacturing",
  quality: "quality",
  contact: "contact",
};

function cleanHash(hash = "") {
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export function getRoutePath(page = "home", params = {}) {
  if (page === "product" && params.productId) {
    return `${routePaths.product}/${encodeURIComponent(params.productId)}`;
  }

  return routePaths[page] ?? routePaths.home;
}

export function getRouteHref(page = "home", params = {}) {
  return `#${getRoutePath(page, params)}`;
}

export function parseRouteHash(hash) {
  const cleaned = cleanHash(hash).replace(/^\/+/, "");

  if (!cleaned || cleaned === "#") {
    return { page: "home", path: routePaths.home, key: "home" };
  }

  if (legacyHashMap[cleaned]) {
    const page = legacyHashMap[cleaned];
    return { page, path: getRoutePath(page), key: page };
  }

  const [pageSegment, secondSegment] = cleaned.split("/");

  if (pageSegment === "product" && secondSegment) {
    return {
      page: "product",
      productId: secondSegment,
      path: getRoutePath("product", { productId: secondSegment }),
      key: `product:${secondSegment}`,
    };
  }

  const page = routePaths[pageSegment] ? pageSegment : "home";
  return { page, path: getRoutePath(page), key: page };
}

export function navigateToRoute(page, params = {}) {
  window.location.hash = getRoutePath(page, params);
}
