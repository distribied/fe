import { ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

interface Product {
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
  showContact?: boolean;
}

interface ProductSectionProps {
  title: string;
  products: Product[];
  icon?: React.ReactNode;
}

const ProductSection = ({ title, products, icon }: ProductSectionProps) => {
  return (
    <section className="mb-8">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              {icon}
            </div>
          )}
          <h2 className="section-title">{title}</h2>
        </div>
        <a
          href="#"
          className="flex items-center gap-1 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Xem Tất Cả
          <ChevronRight className="h-4 w-4" />
        </a>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
