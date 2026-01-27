import CategorySectionHeader from "./CategorySectionHeader";
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
      <CategorySectionHeader title="TÚI LỤC BÌNH VẼ" />

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
