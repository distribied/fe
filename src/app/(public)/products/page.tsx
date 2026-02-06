import { Suspense } from "react";
import ProductsPageClient from "@/components/features/products/ProductsPageClient";

function ProductsLoading() {
  return (
    <div className="min-h-screen bg-muted animate-pulse">
      <div className="h-64 bg-gradient-to-r from-primary via-emerald-600 to-primary"></div>
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className="w-64 bg-card rounded-lg h-96"></div>
          <div className="flex-1">
            <div className="bg-card rounded-lg h-16 mb-6"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="bg-card rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsPageClient />
    </Suspense>
  );
}
