import ProductCard from "./ProductCard";

export default function ProductGrid({ products, productCopies, onView, emptyLabel }) {
  if (!products.length) {
    return <p className="shop-empty">{emptyLabel}</p>;
  }

  return (
    <div className="shop-grid">
      {products.map((product) => (
        <ProductCard
          product={product}
          copy={productCopies[product.id]}
          onView={onView}
          key={product.id}
        />
      ))}
    </div>
  );
}
