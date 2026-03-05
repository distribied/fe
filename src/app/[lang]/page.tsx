"use client";

import HeroCarousel from "@/components/features/home/HeroCarousel";
import SideBanners from "@/components/features/home/SideBanners";
import FeaturedProducts from "@/components/features/home/FeaturedProducts";
import ProductSection from "@/components/features/home/ProductSection";
import Reveal from "@/components/ui/Reveal";

import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategory";
import { useLocale } from "@/hooks/useLocale";

export default function HomePage() {
  const { href } = useLocale();

  // Fetch products from Firestore
  const { data: allProducts = [] } = useProducts({ isActive: true });

  // Fetch categories from Firestore
  const { data: categories = [] } = useCategories();

  // Group products by categoryId
  const productsByCategory = allProducts.reduce((acc, product) => {
    const categoryId = product.categoryId?.toString();
    if (!categoryId || !acc[categoryId]) {
      if (categoryId) {
        acc[categoryId] = [];
      }
      return acc;
    }
    acc[categoryId].push(product);
    return acc;
  }, {} as Record<string, typeof allProducts>);

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

          {/* Featured Products */}
          <Reveal>
            <FeaturedProducts />
          </Reveal>

          {/* Dynamic Category sections - using real data from Firestore */}
          {categories.map((category, index) => {
            const categoryProducts = productsByCategory[category.id.toString()] || [];

            if (categoryProducts.length === 0) return null;

            return (
              <Reveal key={category.id} delay={index * 0.05}>
                <ProductSection
                  title={category.name}
                  icon={category.icon}
                  products={categoryProducts}
                  totalCount={categoryProducts.length}
                  categorySlug={category.id.toString()}
                  href={href(`/products?category=${category.id}`)}
                />
              </Reveal>
            );
          })}
        </div>
      </main>
    </div>
  );
}
