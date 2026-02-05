import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import FloatingContact from "@/components/features/home/FloatingContact";
import HeroCarousel from "@/components/features/home/HeroCarousel";
import SideBanners from "@/components/features/home/SideBanners";
import FeaturedProducts from "@/components/features/home/FeaturedProducts";
import { mockCategoriesData } from "@/data/mock-data";
import ProductSection from "@/components/features/home/ProductSection";

export default function HomePage() {
  // TODO: fetch data from firebase later
  // const categoriesData = await fetchCategoriesWithProducts();

  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <Header />
      <FloatingContact />

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
          {mockCategoriesData.map((category, index) => (
            <ProductSection
              key={index}
              title={category.title}
              products={category.products}
              totalCount={category.totalCount}
              href={category.href}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
