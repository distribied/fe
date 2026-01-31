import ProductCard from "./ProductCard";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

const featuredProducts = [
  { id: "1", image: product1, title: "Giỏ Tre Chùm Gói Quà Tết", price: 15000 },
  { id: "2", image: product3, title: "Giỏ Chữ Nhật Quai Trúc", price: 75000 },
  { id: "3", image: product4, title: "Hộp Tre Gói Quà Màu", price: 140000, oldPrice: 150000 },
  { id: "4", image: product2, title: "Túi Cỏ Bàng Hoa", price: 265000 },
  { id: "5", image: product5, title: "Túi Bàng Quai Gỗ Vẽ", price: 299000, oldPrice: 330000 },
  { id: "6", image: product6, title: "Ví Bàng Vầng Trăng Đeo Vai", price: 270000, oldPrice: 299000 },
  { id: "7", image: product7, title: "Ví Bàng Cầm Tay Thêu Hoa", price: 265000, oldPrice: 285000 },
  { id: "8", image: product8, title: "Túi Cỏ Bàng Vẽ Biển", price: 285000 },
];

const FeaturedProducts = () => {
  return (
    <section className="mb-8">
      {/* Section header with decorative background */}
      <div className="relative mb-6">
        <div className="bg-primary py-4 px-6 rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground text-center uppercase tracking-wide">
            Sản Phẩm Nổi Bật
          </h2>
        </div>
        {/* Decorative wave */}
        <svg
          className="absolute bottom-0 left-0 w-full -mb-1"
          viewBox="0 0 1200 20"
          preserveAspectRatio="none"
        >
          <path
            d="M0,20 Q300,0 600,10 T1200,20"
            fill="hsl(var(--primary))"
          />
        </svg>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {featuredProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
