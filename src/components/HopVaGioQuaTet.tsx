import CategorySectionHeader from "./CategorySectionHeader";
import ProductCard from "./ProductCard";

const products = [
  {
    id: "9",
    image: "/product-1.jpg",
    title: "Giỏ Tre Chùm Gói Quà Tết",
    price: 15000,
  },
  {
    id: "10",
    image: "/product-3.jpg",
    title: "Giỏ Chữ Nhật Quai Trúc",
    price: 75000,
  },
  {
    id: "11",
    image: "/product-4.jpg",
    title: "Hộp Tre Gói Quà Màu",
    price: 140000,
    oldPrice: 150000,
  },
  {
    id: "12",
    image: "/product-1.jpg",
    title: "Hộp Tre Úp Gói Quà",
    price: 25000,
  },
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
