import { Search, SlidersHorizontal } from "lucide-react";
import { shopCategories } from "../../data/shopProducts";

export default function ProductFilters({
  content,
  selectedCategory,
  onCategoryChange,
  query,
  onQueryChange,
  sort,
  onSortChange,
}) {
  return (
    <div className="shop-filters" id="search">
      <div className="shop-search">
        <Search aria-hidden="true" size={18} />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={content.shop.searchPlaceholder}
          aria-label={content.shop.searchLabel}
        />
      </div>

      <label className="shop-sort">
        <SlidersHorizontal aria-hidden="true" size={16} />
        <span>{content.shop.sort.label}</span>
        <select value={sort} onChange={(event) => onSortChange(event.target.value)}>
          <option value="featured">{content.shop.sort.featured}</option>
          <option value="priceAsc">{content.shop.sort.priceAsc}</option>
          <option value="priceDesc">{content.shop.sort.priceDesc}</option>
          <option value="name">{content.shop.sort.name}</option>
        </select>
      </label>

      <div className="shop-categories" id="categories" aria-label={content.shop.categoriesLabel}>
        <button
          className={selectedCategory === "all" ? "is-active" : ""}
          type="button"
          onClick={() => onCategoryChange("all")}
        >
          {content.shop.allCategories}
        </button>
        {shopCategories.map((category) => (
          <button
            className={selectedCategory === category ? "is-active" : ""}
            type="button"
            key={category}
            onClick={() => onCategoryChange(category)}
          >
            {content.shop.categories[category]}
          </button>
        ))}
      </div>
    </div>
  );
}
