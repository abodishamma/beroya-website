import { useMemo } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import { ArrowRight, PackageSearch, ShoppingBag } from "lucide-react";
import ProductFilters from "../components/shop/ProductFilters";
import ProductGrid from "../components/shop/ProductGrid";
import ProductDetails from "../components/shop/ProductDetails";
import CartPage from "../components/shop/CartPage";
import CheckoutForm from "../components/shop/CheckoutForm";
import { productCatalog } from "../data/shopProducts";
import { useCart } from "../hooks/useCart";
import { useLanguage } from "../hooks/useLanguage";
import { getRouteHref, navigateToRoute } from "../utils/routes";
import { useState } from "react";

function normalize(value) {
  return value.toLocaleLowerCase().trim();
}

export default function Shop({ mode = "catalog", productId }) {
  const { content } = useLanguage();
  const { totalQuantity } = useCart();
  const reduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");

  const productCopies = content.shop.products;

  const filteredProducts = useMemo(() => {
    const search = normalize(query);

    return productCatalog
      .filter((product) => selectedCategory === "all" || product.category === selectedCategory)
      .filter((product) => {
        if (!search) return true;
        const copy = productCopies[product.id];
        return normalize(
          [
            copy.name,
            copy.shortDescription,
            copy.compatibility,
            product.sku,
            content.shop.categories[product.category],
          ].join(" "),
        ).includes(search);
      })
      .sort((a, b) => {
        if (sort === "priceAsc") return a.price - b.price;
        if (sort === "priceDesc") return b.price - a.price;
        if (sort === "name") return productCopies[a.id].name.localeCompare(productCopies[b.id].name);
        return a.featured - b.featured;
      });
  }, [content.shop.categories, productCopies, query, selectedCategory, sort]);

  const selectedProduct =
    productCatalog.find((product) => product.id === productId) ?? filteredProducts[0] ?? productCatalog[0];

  const viewProduct = (productId) => {
    navigateToRoute("product", { productId });
  };

  return (
    <section className={`shop shop--${mode}`} id="shop" aria-labelledby="shop-title">
      <div className="container shop__inner">
        {mode === "catalog" && (
          <>
            <Motion.div
              className="shop__hero"
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <span className="section-kicker">{content.shop.kicker}</span>
                <h2 id="shop-title">
                  {content.shop.title[0]}
                  <em>{content.shop.title[1]}</em>
                </h2>
                <p>{content.shop.description}</p>
              </div>

              <div className="shop__stats" aria-label={content.shop.storeStatsLabel}>
                <span>
                  <PackageSearch aria-hidden="true" size={18} />
                  {productCatalog.length} {content.shop.storeStats.products}
                </span>
                <span>
                  <ShoppingBag aria-hidden="true" size={18} />
                  {totalQuantity} {content.shop.storeStats.cart}
                </span>
              </div>
            </Motion.div>

            <ProductFilters
              content={content}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              query={query}
              onQueryChange={setQuery}
              sort={sort}
              onSortChange={setSort}
            />

            <div className="shop__bar" id="products">
              <span>{content.shop.showing.replace("{count}", filteredProducts.length)}</span>
              <a href={getRouteHref("cart")}>
                {content.shop.viewCart}
                <ArrowRight aria-hidden="true" size={15} />
              </a>
            </div>

            <ProductGrid
              products={filteredProducts}
              productCopies={productCopies}
              onView={viewProduct}
              emptyLabel={content.shop.empty}
            />
          </>
        )}

        {mode === "detail" && (
          <ProductDetails
            product={selectedProduct}
            productCopies={productCopies}
            onView={viewProduct}
          />
        )}

        {mode === "cart" && <CartPage productCopies={productCopies} />}

        {mode === "checkout" && <CheckoutForm productCopies={productCopies} />}
      </div>
    </section>
  );
}
