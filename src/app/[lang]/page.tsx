"use client";

import HeroCarousel from "@/components/features/home/HeroCarousel";
import SideBanners from "@/components/features/home/SideBanners";
import FeaturedProducts from "@/components/features/home/FeaturedProducts";
import { mockCategoriesData, mockCategoriesInfo } from "@/data/mock-data";
import ProductSection from "@/components/features/home/ProductSection";
import { useParams } from "next/navigation";

export default function HomePage() {
  const { lang } = useParams();
  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Hero section with sidebar */}
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

          {/* Featured Products */}
          <FeaturedProducts />

          {/* Dynamic Category sections */}
          {mockCategoriesData.map((category) => {
            // Find matching category info for slug
            const categoryInfo = mockCategoriesInfo.find(
              (cat) =>
                cat.name.vi.includes(category.title.split(" ")[0]) ||
                cat.name.en
                  .toLowerCase()
                  .includes(category.title.toLowerCase()),
            );

            return (
              <ProductSection
                key={category.id}
                title={category.title}
                products={category.products}
                totalCount={category.totalCount}
                categorySlug={categoryInfo?.slug.vi}
                href={`/${lang}/category/${categoryInfo?.slug.vi || category.slug}`}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
