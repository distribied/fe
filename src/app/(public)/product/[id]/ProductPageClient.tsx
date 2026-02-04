"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Product {
  id: string;
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
  category: string;
}

interface ProductPageClientProps {
  product: Product;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const { t } = useTranslation();

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("vi-VN").format(value) + "Đ";
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="mb-4 sm:mb-6">
        <ol className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              {t("header.nav.home")}
            </Link>
          </li>
          <li className="px-1">/</li>
          <li className="hidden sm:inline">
            <span className="hover:text-primary transition-colors cursor-pointer">
              {product.category}
            </span>
          </li>
          <li className="hidden sm:inline px-1">/</li>
          <li className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">{product.title}</li>
        </ol>
      </nav>

      {/* Product Detail */}
      <div className="bg-card rounded-lg shadow-sm border border-border p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {product.title}
            </h1>

            {/* Category */}
            <div className="mb-4">
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {product.category}
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                {product.oldPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                <span className="text-3xl font-bold text-destructive">
                  {formatPrice(product.price)}
                </span>
              </div>
              {product.oldPrice && (
                <span className="text-sm text-primary font-medium">
                  {t("products.save")} {formatPrice(product.oldPrice - product.price)}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-semibold text-foreground mb-2">
                {t("products.description")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Sản phẩm thủ công truyền thống được làm từ nguyên liệu tự
                nhiên, thân thiện với môi trường. Được chế tác tỉ mỉ bởi các
                nghệ nhân lành nghề, mang đậm bản sắc văn hóa Việt Nam. Phù
                hợp làm quà tặng hoặc trang trí nhà cửa.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <Button
                size="lg"
                className="flex-1 bg-accent text-accent-foreground hover:opacity-90 h-12 sm:h-14 text-base sm:text-lg font-semibold py-4 px-6"
              >
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                {t("products.buy_now")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground h-12 sm:h-14 text-base sm:text-lg font-semibold py-4 px-6"
              >
                <Phone className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                {t("products.consult")}
              </Button>
            </div>

            {/* Contact Info */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>{t("products.hotline_label")}:</strong> 0907.882.878
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>{t("products.address_label")}:</strong> 500/3 Đường Đoàn Văn Bơ, Phường
                15, Quận 4, TP.HCM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
