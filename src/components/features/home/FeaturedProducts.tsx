"use client";

import ProductCard from "@/components/shared/ProductCard";
import { mockFeaturedProducts } from "@/data/mock-data";
import { useTranslation } from "react-i18next";

const FeaturedProducts = () => {
  const { t } = useTranslation();

  return (
    <section className="mb-8">
      {/* Section header with decorative background */}
      <div className="relative mb-8">
        {/* Main header with gradient */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary to-primary py-4 md:py-5 px-6 rounded-lg shadow-lg">
          {/* Shimmer effect overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]"
            style={{
              animation: "shimmer 3s infinite",
            }}
          />

          {/* Decorative pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='45' height='45' viewBox='0 0 45 45' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <h3 className="relative text-xl sm:text-2xl md:text-3xl font-bold text-primary-foreground text-center uppercase tracking-wider">
            ✨ {t("products.featured")} ✨
          </h3>
        </div>

        {/* Animated decorative waves */}
        <div className="absolute bottom-0 left-0 w-full h-6 -mb-3 overflow-hidden">
          {/* Wave 1 - Background */}
          <svg
            className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-slow"
            viewBox="0 0 1200 30"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 C150,10 350,25 600,15 C850,5 1050,20 1200,30 L1200,30 L0,30 Z"
              fill="hsl(140 50% 28% / 0.3)"
            />
          </svg>
          {/* Wave 2 - Middle */}
          <svg
            className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-medium"
            viewBox="0 0 1200 30"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 C200,20 400,10 600,18 C800,26 1000,12 1200,30 L1200,30 L0,30 Z"
              fill="hsl(140 50% 28% / 0.5)"
            />
          </svg>
          {/* Wave 3 - Foreground */}
          <svg
            className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-fast"
            viewBox="0 0 1200 30"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 C100,22 300,15 500,20 C700,25 900,18 1200,30 L1200,30 L0,30 Z"
              fill="hsl(140 50% 28%)"
            />
          </svg>
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockFeaturedProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
