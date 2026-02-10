import { notFound } from "next/navigation";
import ProductPageClient from "@/components/features/home/ProductPageClient";
import { mockCategoriesData, MockProductCard } from "@/data/mock-data";

interface ProductPageProps {
  params: { id: string };
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
  const { id } = params;

  const allProducts = getAllProducts();
  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}

// Generate static params for all products (for build optimization)
export function generateStaticParams() {
  const allProducts = getAllProducts();

  return allProducts.map((product) => ({
    id: product.id,
  }));
}
