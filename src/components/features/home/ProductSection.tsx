"use client";

import CategorySectionHeader from "./CategorySectionHeader";
import ProductCard from "../../shared/ProductCard";
import { Product } from "@/schemas";
import { useLocale } from "@/hooks/useLocale";

// UI-specific interface for ProductCard props
interface ProductCardData {
  id: string;
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
  showContactLabel?: boolean;
}

interface ProductSectionProps {
  title: string;
  icon?: string;
  products: Product[];
  href?: string;
  categorySlug?: string;
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
    showContactLabel: true,
  };
};

const ProductSection = ({
  title,
  icon,
  products,
  categorySlug,
  totalCount,
}: ProductSectionProps) => {
  const { href } = useLocale();

  // Always use /products with category param
  const viewAllHref = categorySlug
    ? href(`/products?category=${categorySlug}`)
    : href(`products`);

  // Show max 8 products
  const displayProducts = products.slice(0, 8);

  // Only show CategorySectionHeader with "View All" if there are more than 8 products total
  const shouldShowViewAll = totalCount ? totalCount > 8 : products.length > 8;

  return (
    <section className="mb-8">
      <CategorySectionHeader
        title={title}
        icon={icon}
        href={shouldShowViewAll ? viewAllHref : undefined}
      />

      {/* Products grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} {...transformProductToCardData(product)} />
        ))}
      </div>
    </section>
  );
};

// Export helper function for use in parent components
export { transformProductToCardData };
export default ProductSection;
