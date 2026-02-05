import CategorySectionHeader from "./features/home/CategorySectionHeader";
import ProductCard from "./shared/ProductCard";

const products = [
  {
    id: "17",
    image: "/product-6.jpg",
    title: "Túi Lục Bình Vẽ 03",
    price: 0,
    showContact: true,
  },
  {
    id: "18",
    image: "/product-7.jpg",
    title: "Túi Lục Bình Vẽ 02",
    price: 0,
    showContact: true,
  },
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
