import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import FloatingContact from "@/components/features/home/FloatingContact";
import HeroCarousel from "@/components/features/home/HeroCarousel";
import SideBanners from "@/components/features/home/SideBanners";
import HopVaGioQuaTet from "@/components/HopVaGioQuaTet";
import TuiCoBangVe from "@/components/TuiCoBangVe";
import TuiLucBinhVe from "@/components/TuiLucBinhVe";
import FeaturedProducts from "@/components/features/home/FeaturedProducts";

export default function HomePage() {
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

          {/* Category sections */}
          <HopVaGioQuaTet />
          <TuiCoBangVe />
          <TuiLucBinhVe />
        </div>
      </main>

      <Footer />
    </div>
  );
}
