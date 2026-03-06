"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProductsHeader from "./ProductsHeader";
import ProductsSidebar from "./ProductsSidebar";
import ProductsGrid from "./ProductsGrid";
import ProductsToolbar from "./ProductsToolbar";
import ProductsPagination from "./ProductPagination";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategory";
import { useSearchProducts } from "@/hooks/useSearchProducts";
import type { Category } from "@/schemas";

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

  // Get search query from URL
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";

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
  const { data: categoriesFromFirestore = [], isLoading: isLoadingCategories } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

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
            setSelectedCategory={setSelectedCategory}
          />
        </aside>

        {/* Main */}
        <section className="flex-1">
          <ProductsToolbar
            sortBy={sortBy}
            setSortBy={setSortBy}
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
              onPageChange={setCurrentPage}
            />
          )}
        </section>
      </div>
    </div>
  );
}
