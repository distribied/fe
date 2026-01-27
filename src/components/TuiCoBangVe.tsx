import CategorySectionHeader from "./CategorySectionHeader";
import ProductCard from "./ProductCard";
import product2 from "@/assets/product-2.jpg";
import product5 from "@/assets/product-5.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

const products = [
  { image: product2, title: "Túi Sờ Bàng Thêu Hoa 02", price: 0, showContact: true },
  { image: product5, title: "Túi Sờ Bàng Thêu Hoa 01", price: 0, showContact: true },
  { image: product8, title: "Túi Cỏ Bàng Vẽ 07", price: 0, showContact: true },
  { image: product7, title: "Túi Cỏ Bàng Vẽ 06", price: 0, showContact: true },
];

const TuiCoBangVe = () => {
  return (
    <section className="mb-8">
      <CategorySectionHeader title="TÚI CỎ BÀNG VẼ" />

      {/* Products grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
};

export default TuiCoBangVe;
