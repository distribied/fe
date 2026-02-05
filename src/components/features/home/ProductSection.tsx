"use client";

import CategorySectionHeader from "./CategorySectionHeader";
import ProductCard from "../../shared/ProductCard";
import { Product } from "@/types/product.types";

// UI-specific interface for ProductCard props
interface ProductCardData {
  id: string;
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
  showContact?: boolean;
}

interface ProductSectionProps {
  title: string;
  products: ProductCardData[];
  href?: string;
  totalCount?: number;
}

// Helper function to transform Product to ProductCardData
const transformProductToCardData = (product: Product): ProductCardData => {
  return {
    id: product.id.toString(),
    image:
      product.images?.find((img) => img.isThumbnail)?.url || "/placeholder.jpg",
    title: product.name || "",
    price: product.price || 0,
    showContact: product.price === 0,
  };
};

const ProductSection = ({
  title,
  products,
  href = "#",
  totalCount,
}: ProductSectionProps) => {
  // Show max 8 products
  const displayProducts = products.slice(0, 8);

  // Only show CategorySectionHeader with "View All" if there are more than 8 products total
  const shouldShowViewAll = totalCount ? totalCount > 8 : products.length > 8;

  return (
    <section className="mb-8">
      {/* Use CategorySectionHeader component */}
      <CategorySectionHeader
        title={title}
        href={shouldShowViewAll ? href : undefined}
      />

      {/* Products grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

// Export helper function for use in parent components
export { transformProductToCardData };
export default ProductSection;
