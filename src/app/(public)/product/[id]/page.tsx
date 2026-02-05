import { notFound } from "next/navigation";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import FloatingContact from "@/components/features/home/FloatingContact";
import ProductPageClient from "../../../../components/features/home/ProductPageClient";
import { mockCategoriesData, MockProductCard } from "@/data/mock-data";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// Helper function to get all products from categories
const getAllProducts = (): (MockProductCard & { category: string })[] => {
  const allProducts: (MockProductCard & { category: string })[] = [];

  mockCategoriesData.forEach((category) => {
    category.products.forEach((product) => {
      allProducts.push({
        ...product,
        category: category.title,
      });
    });
  });

  return allProducts;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const allProducts = getAllProducts();
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

// Generate static params for all products (for build optimization)
export function generateStaticParams() {
  const allProducts = getAllProducts();

  return allProducts.map((product) => ({
    id: product.id,
  }));
}
