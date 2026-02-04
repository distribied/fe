import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import ProductPageClient from "./ProductPageClient";

// Sample product data - in a real app, this would come from an API
const allProducts = [
  {
    id: "1",
    image: "/product-1.jpg",
    title: "Giỏ Tre Gói Quà Tết Cao Cấp",
    price: 350000,
    oldPrice: 450000,
    category: "Hộp Và Giỏ Quà Tết",
  },
  {
    id: "2",
    image: "/product-2.jpg",
    title: "Hộp Quà Tết Lục Bình Thêu",
    price: 280000,
    oldPrice: 350000,
    category: "Hộp Và Giỏ Quà Tết",
  },
  {
    id: "3",
    image: "/product-3.jpg",
    title: "Túi Cỏ Bàng Vẽ Hoa Sen",
    price: 180000,
    category: "Túi Cỏ Bàng Vẽ",
  },
  {
    id: "4",
    image: "/product-4.jpg",
    title: "Túi Cỏ Bàng Thêu Hoa Đào",
    price: 220000,
    oldPrice: 280000,
    category: "Túi Cỏ Bàng Vẽ",
  },
  {
    id: "5",
    image: "/product-5.jpg",
    title: "Túi Lục Bình Vẽ Phong Cảnh",
    price: 250000,
    category: "Túi Lục Bình Vẽ",
  },
  {
    id: "6",
    image: "/product-6.jpg",
    title: "Túi Lục Bình Thêu Hoa Mai",
    price: 290000,
    oldPrice: 350000,
    category: "Túi Lục Bình Vẽ",
  },
  {
    id: "7",
    image: "/product-7.jpg",
    title: "Giỏ Lục Bình Đựng Hoa",
    price: 150000,
    category: "Giỏ Lục Bình",
  },
  {
    id: "8",
    image: "/product-8.jpg",
    title: "Thảm Cói Tự Nhiên",
    price: 120000,
    category: "Thảm Cói, Thảm Lục Bình",
  },
];

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <Header />
      <FloatingContact />

      <main className="flex-1">
        <ProductPageClient product={product} />
      </main>

      <Footer />
    </div>
  );
}
