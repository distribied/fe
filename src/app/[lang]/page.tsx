"use client";

import HeroCarousel from "@/components/features/home/HeroCarousel";
import SideBanners from "@/components/features/home/SideBanners";
import CategorySectionHeader from "@/components/features/home/CategorySectionHeader";
import ProductCard from "@/components/shared/ProductCard";
import Reveal from "@/components/ui/Reveal";

import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategory";
import { useLocale } from "@/hooks/useLocale";
import { Product } from "@/schemas";

// Helper function to transform Product to ProductCard data
const transformProductToCardData = (product: Product) => {
  return {
    id: product.id.toString(),
    image:
      product.images?.find((img) => img.isThumbnail)?.url || "/placeholder.jpg",
    title: product.name || "",
    price: product.price || 0,
  };
};

export default function HomePage() {
  const { href } = useLocale();

  // Fetch products from Firestore
  const { data: allProducts = [], isLoading: isLoadingProducts } = useProducts({ isActive: true });

  // Fetch categories from Firestore
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();

  // Sort categories by order
  const sortedCategories = [...categories].sort((a, b) => (a.order || 0) - (b.order || 0));

  // Group products by categoryId
  const productsByCategory = allProducts.reduce((acc, product) => {
    const categoryId = product.categoryId?.toString();
    if (!categoryId) return acc;
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  // Show loading skeleton
  if (isLoadingProducts || isLoadingCategories) {
    return (
      <div className="min-h-screen flex flex-col bg-muted">
        <main className="flex-1">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
              <div className="lg:col-span-9">
                <div className="aspect-[16/7] bg-muted animate-pulse rounded-lg" />
              </div>
              <div className="lg:col-span-3 hidden lg:block">
                <div className="aspect-square bg-muted animate-pulse rounded-lg" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-card rounded-lg animate-pulse">
                  <div className="aspect-square bg-muted" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Hero section with sidebar */}
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
              {/* Main carousel */}
              <div className="lg:col-span-9">
                <HeroCarousel />
              </div>

              {/* Side products - bestsellers */}
              <div className="lg:col-span-3 hidden lg:block">
                <SideBanners />
              </div>
            </div>
          </Reveal>

          {/* Dynamic Category sections - partition products by category */}
          {sortedCategories.map((category, index) => {
            const categoryProducts = productsByCategory[category.id.toString()] || [];

            if (categoryProducts.length === 0) return null;

            return (
              <Reveal key={category.id} delay={index * 0.05}>
                <section className="mb-8">
                  {/* Category Section Header with icon and title */}
                  <CategorySectionHeader
                    title={category.name}
                    icon={category.icon}
                    href={href(`/products?category=${category.id}`)}
                  />

                  {/* Products grid - show max 8 products per category */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categoryProducts.slice(0, 8).map((product) => (
                      <ProductCard key={product.id} {...transformProductToCardData(product)} />
                    ))}
                  </div>
                </section>
              </Reveal>
            );
          })}
        </div>
      </main>
    </div>
  );
}
