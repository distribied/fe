"use client";

import Link from "next/link";
import ProductCard from "@/components/shared/ProductCard";
import { MockProductCard } from "@/data/mock-data";
import { Product } from "@/schemas";
import Reveal from "@/components/ui/Reveal";

interface ProductsGridProps {
  products: (Product | (MockProductCard & { category: string }))[];
  isLoading?: boolean;
}

// Helper to transform Product to ProductCardProps
const transformToProductCard = (product: any) => {
  // If it's a Product from Firestore
  if ("name" in product && "images" in product) {
    const thumbnail = product.images?.[0]?.url || "/placeholder.png";
    return {
      id: product.id?.toString() || "",
      image: thumbnail,
      title: product.name || "",
      price: product.price || 0,
      showContactLabel: true,
    };
  }
  // If it's MockProductCard
  return {
    id: product.id?.toString() || product.id || "",
    image: product.image || product.images?.[0]?.url || "/placeholder.png",
    title: product.title || product.name || "",
    price: product.price || 0,
    showContactLabel: true,
  };
};

export default function ProductsGrid({
  products,
  isLoading,
}: Readonly<ProductsGridProps>) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`skeleton-${i}`}
            className="bg-card rounded-lg animate-pulse"
          >
            <div className="aspect-square bg-muted" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <Reveal>
        <div className="text-center py-16">
          <div className="bg-card rounded-lg p-8 max-w-md mx-auto">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Không tìm thấy sản phẩm
            </h3>
            <p className="text-muted-foreground mb-4">
              Không có sản phẩm nào phù hợp với bộ lọc của bạn.
            </p>
            <Link
              href="/products"
              className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        </div>
      </Reveal>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
      {products.map((product, index) => (
        <Reveal key={product.id} delay={index * 0.05}>
          <ProductCard {...transformToProductCard(product)} />
        </Reveal>
      ))}
    </div>
  );
}
