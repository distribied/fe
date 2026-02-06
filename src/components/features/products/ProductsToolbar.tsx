import { SortOption } from "./ProductsPageClient";

interface ProductsToolbarProps {
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  productCount: number;
  currentPage: number;
  totalPages: number;
  productsPerPage: number;
}

const sortOptions = [
  { value: "newest", label: "Mới nhất" },
  { value: "oldest", label: "Cũ nhất" },
  { value: "price-low", label: "Giá thấp → cao" },
  { value: "price-high", label: "Giá cao → thấp" },
  { value: "name-az", label: "Tên A → Z" },
  { value: "name-za", label: "Tên Z → A" },
] as const;

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

  return (
    <div className="bg-card rounded-lg p-4 mb-6 shadow-sm border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Product count & pagination info */}
        <div className="text-sm text-muted-foreground">
          Hiển thị{" "}
          <span className="font-semibold">
            {startProduct}-{endProduct}
          </span>{" "}
          trong tổng số <span className="font-semibold">{productCount}</span>{" "}
          sản phẩm
          {totalPages > 1 && (
            <span className="ml-2">
              (Trang {currentPage}/{totalPages})
            </span>
          )}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-3">
          <label
            className="text-sm font-medium text-foreground whitespace-nowrap"
            htmlFor="sortBy"
          >
            Sắp xếp theo:
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm min-w-[160px]"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
