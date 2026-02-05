"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

const sideProducts = [
  {
    id: "1",
    image: "/product-1.jpg",
    title: "Giỏ Tre Gói Quà Tết",
    price: 350000,
    oldPrice: 450000,
  },
  {
    id: "5",
    image: "/product-5.jpg",
    title: "Túi Bàng Quai Gỗ Vẽ",
    price: 299000,
  },
  {
    id: "6",
    image: "/product-6.jpg",
    title: "Ví Bàng Đeo Vai",
    price: 270000,
    oldPrice: 299000,
  },
];

const formatPrice = (value: number) => {
  return new Intl.NumberFormat("vi-VN").format(value) + "Đ";
};

const SideBanners = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Section Title */}
      <div className="bg-primary rounded-lg px-4 py-2">
        <h3 className="text-primary-foreground font-bold text-sm text-center uppercase tracking-wide">
          {t("products.best_sellers")}
        </h3>
      </div>

      {/* Product Cards */}
      {sideProducts.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          className="group bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition-all overflow-hidden flex-1"
        >
          <div className="flex gap-3 p-3 h-full">
            {/* Product Image */}
            <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center min-w-0">
              <h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {product.title}
              </h4>
              <div className="mt-1 flex items-center gap-2">
                {product.oldPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                <span className="text-sm font-bold text-destructive">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}

      {/* View All Button */}
      <Link
        href="#"
        className="text-center text-sm font-medium text-primary hover:text-white py-3 px-6 rounded-lg shadow-md hover:bg-primary transition-all transform origin-bottom bg-secondary hover:bg-primary hover:scale-105 animate-wiggle"
      >
        Xem tất cả →
      </Link>
    </div>
  );
};

export default SideBanners;
