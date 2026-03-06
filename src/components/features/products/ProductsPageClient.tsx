"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductsHeader from "./ProductsHeader";
import ProductsSidebar from "./ProductsSidebar";
import ProductsGrid from "./ProductsGrid";
import ProductsToolbar from "./ProductsToolbar";
import ProductsPagination from "./ProductPagination";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategory";
import { useSearchProducts } from "@/hooks/useSearchProducts";
import { Search, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/useLocale";

export type SortOption =
  | "newest"
  | "oldest"
  | "price-low"
  | "price-high"
  | "name-az"
  | "name-za";

const PRODUCTS_PER_PAGE = 20;

export default function ProductsPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { href } = useLocale();
  const { t } = useTranslation();

  // Get search query from URL
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";

  // Local search state (for input on this page)
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Fetch products based on search/category - only use Firestore, no mock data
  const { data: searchResults = [], isLoading: isLoadingSearchResults } = useSearchProducts({
    searchTerm: searchQuery,
    categoryId: categoryQuery && categoryQuery !== "featured" ? categoryQuery : undefined,
  });

  const { data: allProductsFromFirestore = [], isLoading: isLoadingAllProducts } = useProducts(
    !searchQuery && (!categoryQuery || categoryQuery === "featured")
      ? { isActive: true }
      : undefined
  );

  // Use search results if searching, otherwise use all products
  const products = searchQuery ? searchResults : allProductsFromFirestore;
  const isLoading = searchQuery ? isLoadingSearchResults : isLoadingAllProducts;

  // Fetch categories from Firestore
  const { data: categoriesFromFirestore = [] } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Get page and sort from URL
  const pageQuery = searchParams.get("page");
  const sortQuery = searchParams.get("sort") as SortOption | null;

  // Use real categories from Firestore
  const categories = categoriesFromFirestore;

  // Sync URL category query to selected category
  useEffect(() => {
    if (categoryQuery && categoryQuery !== "featured") {
      setSelectedCategory(categoryQuery);
    } else {
      setSelectedCategory("all");
    }
  }, [categoryQuery]);

  // Sync page from URL
  useEffect(() => {
    if (pageQuery) {
      const pageNum = parseInt(pageQuery, 10);
      if (!isNaN(pageNum) && pageNum > 0) {
        setCurrentPage(pageNum);
      }
    } else {
      setCurrentPage(1);
    }
  }, [pageQuery]);

  // Sync sort from URL
  useEffect(() => {
    if (sortQuery && ["newest", "oldest", "price-low", "price-high", "name-az", "name-za"].includes(sortQuery)) {
      setSortBy(sortQuery);
    }
  }, [sortQuery]);

  // Sync local search with URL search
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (localSearchQuery.trim()) {
      params.set("search", localSearchQuery.trim());
    } else {
      params.delete("search");
    }
    router.push(href(`products?${params.toString()}`));
  };

  // Handle clear search
  const handleClearSearch = () => {
    setLocalSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.push(href(`products?${params.toString()}`));
  };

  // Handle category change from sidebar - update URL
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const params = new URLSearchParams(searchParams.toString());
    if (categoryId === "all") {
      params.delete("category");
    } else {
      params.set("category", categoryId);
    }
    router.push(href(`products?${params.toString()}`));
  };

  // Filter + sort products
  const filteredProducts = useMemo(() => {
    // Apply sidebar category filter on top of search/category results
    let filtered = [...products];

    // Apply category filter from sidebar (additional filter)
    if (selectedCategory !== "all" && selectedCategory !== categoryQuery) {
      // Filter by categoryId from Firestore
      filtered = filtered.filter(
        (product) => product.categoryId?.toString() === selectedCategory
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        case "oldest":
          return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name-az":
          return a.name.localeCompare(b.name);
        case "name-za":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, selectedCategory, categoryQuery, sortBy, categories]);

  // Reset page when filters change (but not when just changing page)
  useEffect(() => {
    // Only reset to page 1 if page is not explicitly in URL params
    // This handles initial load and filter changes
    const isPageInParams = searchParams.get("page");
    if (!isPageInParams) {
      setCurrentPage(1);
    }
  }, [searchQuery, selectedCategory, sortBy, searchParams]);

  // Handle page change - update URL
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const params = new URLSearchParams(searchParams.toString());
    if (newPage > 1) {
      params.set("page", newPage.toString());
    } else {
      params.delete("page");
    }
    router.push(href(`products?${params.toString()}`));
  };

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <ProductsHeader />

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 hidden lg:block">
          <ProductsSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
          />
        </aside>

        {/* Main */}
        <section className="flex-1">
          {/* Search Input */}
          <div className="bg-card rounded-lg p-4 mb-6 shadow-sm border">
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t("header.search_placeholder") || "Tìm kiếm sản phẩm..."}
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                {localSearchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                {t("common.search") || "Tìm kiếm"}
              </button>
            </form>
          </div>

          <ProductsToolbar
            sortBy={sortBy}
            setSortBy={(newSort) => {
              setSortBy(newSort);
              const params = new URLSearchParams(searchParams.toString());
              if (newSort && newSort !== "newest") {
                params.set("sort", newSort);
              } else {
                params.delete("sort");
              }
              router.push(href(`products?${params.toString()}`));
            }}
            productCount={filteredProducts.length}
            currentPage={currentPage}
            totalPages={totalPages}
            productsPerPage={PRODUCTS_PER_PAGE}
          />

          <ProductsGrid products={currentProducts} isLoading={isLoading} />

          {totalPages > 1 && (
            <ProductsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </section>
      </div>
    </div>
  );
}
