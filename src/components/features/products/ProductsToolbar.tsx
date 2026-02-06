import { useTranslation } from "react-i18next";
import { SortOption } from "./ProductsPageClient";

interface ProductsToolbarProps {
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  productCount: number;
  currentPage: number;
  totalPages: number;
  productsPerPage: number;
}

const sortOptions: readonly SortOption[] = [
  "newest",
  "oldest",
  "price-low",
  "price-high",
  "name-az",
  "name-za",
];

export default function ProductsToolbar({
  sortBy,
  setSortBy,
  productCount,
  currentPage,
  totalPages,
  productsPerPage,
}: Readonly<ProductsToolbarProps>) {
  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = Math.min(currentPage * productsPerPage, productCount);

  const { t } = useTranslation();

  return (
    <div className="bg-card rounded-lg p-4 mb-6 shadow-sm border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Product count & pagination info */}
        <div className="text-sm text-muted-foreground">
          {t("products.page.toolbar_1")}{" "}
          <span className="font-semibold">
            {startProduct}-{endProduct}
          </span>{" "}
          {t("products.page.toolbar_2")}{" "}
          <span className="font-semibold">{productCount}</span>{" "}
          {t("products.page.toolbar_3")}
          {totalPages > 1 && (
            <span className="ml-2">
              ({t("products.page.toolbar_5")} {currentPage}/{totalPages})
            </span>
          )}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-3">
          <label
            className="text-sm font-medium text-foreground whitespace-nowrap"
            htmlFor="sortBy"
          >
            {t("products.page.toolbar_4")}
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm min-w-[160px]"
          >
            {sortOptions.map((value) => (
              <option key={value} value={value}>
                {t(`sort.${value}`)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
