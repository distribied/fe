import { notFound } from "next/navigation";
import ProductPageClient from "@/components/features/home/ProductPageClient";
import { getProductById, getProducts } from "@/service/product.service";

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;

  // Fetch product from Firestore
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}

// Generate static params for all products (for build optimization)
export async function generateStaticParams() {
  const products = await getProducts({ isActive: true });

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}
