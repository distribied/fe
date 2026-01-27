import { ChevronRight, Gift } from "lucide-react";
import ProductCard from "./ProductCard";
import product1 from "@/assets/product-1.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const products = [
  { image: product1, title: "Giỏ Tre Chùm Gói Quà Tết", price: 15000 },
  { image: product3, title: "Giỏ Chữ Nhật Quai Trúc", price: 75000 },
  { image: product4, title: "Hộp Tre Gói Quà Màu", price: 140000, oldPrice: 150000 },
  { image: product1, title: "Hộp Tre Úp Gói Quà", price: 25000 },
];

const HopVaGioQuaTet = () => {
  return (
    <section className="mb-8">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Gift className="h-5 w-5 text-primary-foreground" />
          </div>
          <h2 className="section-title">HỘP VÀ GIỎ QUÀ TẾT</h2>
        </div>
        <a
          href="#"
          className="flex items-center gap-1 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Xem Tất Cả
          <ChevronRight className="h-4 w-4" />
        </a>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
};

export default HopVaGioQuaTet;
