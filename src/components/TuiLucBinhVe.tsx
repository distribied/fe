import { ChevronRight, Leaf } from "lucide-react";
import ProductCard from "./ProductCard";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";

const products = [
  { image: product6, title: "Túi Lục Bình Vẽ 03", price: 0, showContact: true },
  { image: product7, title: "Túi Lục Bình Vẽ 02", price: 0, showContact: true },
];

const TuiLucBinhVe = () => {
  return (
    <section className="mb-8">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <h2 className="section-title">TÚI LỤC BÌNH VẼ</h2>
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

export default TuiLucBinhVe;
