import { MockCategoryInfo } from "@/data/mock-data";

interface ProductsSidebarProps {
  categories: MockCategoryInfo[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function ProductsSidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Readonly<ProductsSidebarProps>) {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border sticky top-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Danh Mục Sản Phẩm
      </h3>

      <div className="space-y-2">
        {/* All categories option */}
        <button
          onClick={() => setSelectedCategory("all")}
          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
            selectedCategory === "all"
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
        >
          Tất cả danh mục
        </button>

        {/* Individual categories */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.slug.vi)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              selectedCategory === category.slug.vi
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            {category.name.vi}
          </button>
        ))}
      </div>
    </div>
  );
}
