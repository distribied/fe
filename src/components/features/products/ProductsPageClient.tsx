"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductsHeader from "./ProductsHeader";
import ProductsSidebar from "./ProductsSidebar";
import ProductsGrid from "./ProductsGrid";
import {
  getAllProducts,
  mockCategoriesInfo,
  MockProductCard,
  MockCategoryInfo,
} from "@/data/mock-data";
import ProductsToolbar from "./ProductsToolbar";
import ProductsPagination from "./ProductPagination";

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

  const [allProducts, setAllProducts] = useState<
    (MockProductCard & { category: string })[]
  >([]);
  const [filteredProducts, setFilteredProducts] = useState<
    (MockProductCard & { category: string })[]
  >([]);
  const [categories, setCategories] = useState<MockCategoryInfo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Load data on mount
  useEffect(() => {
    const products = getAllProducts();
    setAllProducts(products);
    setCategories(mockCategoriesInfo);

    const categoryParam = searchParams.get("category");
    if (categoryParam && categoryParam !== "featured") {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Filter + sort
  useEffect(() => {
    let filtered = [...allProducts];

    if (selectedCategory !== "all") {
      const categoryInfo = categories.find(
        (cat) =>
          cat.slug.vi === selectedCategory || cat.slug.en === selectedCategory,
      );

      if (categoryInfo) {
        const keyword = categoryInfo.name.vi.split(" ")[0].toLowerCase();

        filtered = filtered.filter((product) =>
          product.category.toLowerCase().includes(keyword),
        );
      }
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.id.localeCompare(a.id);
        case "oldest":
          return a.id.localeCompare(b.id);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name-az":
          return a.title.localeCompare(b.title);
        case "name-za":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [allProducts, selectedCategory, sortBy, categories]);

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

          <ProductsGrid products={currentProducts} />

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
