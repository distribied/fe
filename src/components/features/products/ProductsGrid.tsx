"use client";

import Link from "next/link";
import ProductCard from "@/components/shared/ProductCard";
import { MockProductCard } from "@/data/mock-data";
import Reveal from "@/components/ui/Reveal";

interface ProductsGridProps {
  products: (MockProductCard & { category: string })[];
}

export default function ProductsGrid({
  products,
}: Readonly<ProductsGridProps>) {
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
          <ProductCard {...product} />
        </Reveal>
      ))}
    </div>
  );
}
