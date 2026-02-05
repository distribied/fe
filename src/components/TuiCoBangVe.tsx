import CategorySectionHeader from "./features/home/CategorySectionHeader";
import ProductCard from "./shared/ProductCard";

const products = [
  {
    id: "13",
    image: "/product-2.jpg",
    title: "Túi Sờ Bàng Thêu Hoa 02",
    price: 0,
    showContact: true,
  },
  {
    id: "14",
    image: "/product-5.jpg",
    title: "Túi Sờ Bàng Thêu Hoa 01",
    price: 0,
    showContact: true,
  },
  {
    id: "15",
    image: "/product-8.jpg",
    title: "Túi Cỏ Bàng Vẽ 07",
    price: 0,
    showContact: true,
  },
  {
    id: "16",
    image: "/product-7.jpg",
    title: "Túi Cỏ Bàng Vẽ 06",
    price: 0,
    showContact: true,
  },
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
