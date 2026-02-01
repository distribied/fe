import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import HeroCarousel from "@/components/HeroCarousel";
import SideBanners from "@/components/SideBanners";
import FeaturedProducts from "@/components/FeaturedProducts";
import HopVaGioQuaTet from "@/components/HopVaGioQuaTet";
import TuiCoBangVe from "@/components/TuiCoBangVe";
import TuiLucBinhVe from "@/components/TuiLucBinhVe";

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
