import CategorySectionHeader from "./CategorySectionHeader";
import ProductCard from "./ProductCard";
import product1 from "@/assets/product-1.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const products = [
  { id: "9", image: product1, title: "Giỏ Tre Chùm Gói Quà Tết", price: 15000 },
  { id: "10", image: product3, title: "Giỏ Chữ Nhật Quai Trúc", price: 75000 },
  { id: "11", image: product4, title: "Hộp Tre Gói Quà Màu", price: 140000, oldPrice: 150000 },
  { id: "12", image: product1, title: "Hộp Tre Úp Gói Quà", price: 25000 },
];

const HopVaGioQuaTet = () => {
  return (
    <section className="mb-8">
      <CategorySectionHeader title="HỘP VÀ GIỎ QUÀ TẾT" />

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
