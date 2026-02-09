"use client";

import HeroCarousel from "@/components/features/home/HeroCarousel";
import SideBanners from "@/components/features/home/SideBanners";
import FeaturedProducts from "@/components/features/home/FeaturedProducts";
import ProductSection from "@/components/features/home/ProductSection";
import Reveal from "@/components/ui/Reveal";

import { mockCategoriesData, mockCategoriesInfo } from "@/data/mock-data";
import { useLocale } from "@/hooks/useLocale";

export default function HomePage() {
  const { href } = useLocale();

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

          {/* Dynamic Category sections */}
          {mockCategoriesData.map((category, index) => {
            const categoryInfo = mockCategoriesInfo.find(
              (cat) =>
                cat.name.vi.includes(category.title.split(" ")[0]) ||
                cat.name.en
                  .toLowerCase()
                  .includes(category.title.toLowerCase()),
            );

            return (
              <Reveal key={category.id} delay={index * 0.05}>
                <ProductSection
                  title={category.title}
                  products={category.products}
                  totalCount={category.totalCount}
                  categorySlug={categoryInfo?.slug.vi}
                  href={href(
                    `category/${categoryInfo?.slug.vi || category.slug}`,
                  )}
                />
              </Reveal>
            );
          })}
        </div>
      </main>
    </div>
  );
}
