"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Phone, ArrowLeft, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { MockProductCard, mockCategoriesData } from "@/data/mock-data";
import { useState, useMemo } from "react";
import ProductCard from "@/components/shared/ProductCard";

interface ProductPageClientProps {
  product: MockProductCard & { category: string };
}

export default function ProductPageClient({
  product,
}: Readonly<ProductPageClientProps>) {
  const { t, i18n } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (value: number) => {
    if (i18n.language === "en") {
      return new Intl.NumberFormat("en-US").format(value) + " VND";
    }
    return new Intl.NumberFormat("vi-VN").format(value) + "Đ";
  };

  // Get recommended products from the same category and other categories
  const recommendedProducts = useMemo(() => {
    const allProducts: (MockProductCard & { category: string })[] = [];

    mockCategoriesData.forEach((category) => {
      category.products.forEach((prod) => {
        allProducts.push({
          ...prod,
          category: category.title,
        });
      });
    });

    // Get products from same category (excluding current product)
    const sameCategoryProducts = allProducts.filter(
      (p) => p.category === product.category && p.id !== product.id,
    );

    // If same category has enough products, use them, otherwise add from other categories
    let recommendations = sameCategoryProducts.slice(0, 4);

    if (recommendations.length < 4) {
      const otherCategoryProducts = allProducts.filter(
        (p) => p.category !== product.category && p.id !== product.id,
      );
      recommendations = [
        ...recommendations,
        ...otherCategoryProducts.slice(0, 4 - recommendations.length),
      ];
    }

    return recommendations;
  }, [product]);

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Back button */}
      <div className="mb-3 sm:mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-xs sm:text-sm font-medium">
            {t("common.back_home")}
          </span>
        </Link>
      </div>

      {/* Breadcrumb */}
      <nav className="mb-3 sm:mb-6">
        <ol className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground flex-wrap">
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
          <li className="text-foreground font-medium truncate max-w-[180px] sm:max-w-none">
            {product.title}
          </li>
        </ol>
      </nav>

      {/* Product Detail */}
      <div className="bg-card rounded-lg shadow-sm border border-border p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Product Image - Responsive */}
          <div className="flex flex-col gap-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted w-full">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Product Info - Responsive Layout */}
          <div className="flex flex-col">
            <div className="mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
                {product.title}
              </h1>
              {/* Category Badge - Rectangle Style */}
              <span className="inline-block bg-primary/10 text-primary px-4 sm:px-5 py-2 sm:py-2.5 rounded text-xs sm:text-sm font-semibold uppercase tracking-wider">
                {product.category}
              </span>
            </div>

            {/* Price Section - Better Mobile Layout */}
            <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-border/50">
              {product.showContact ? (
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 sm:p-6 rounded-lg border border-primary/20">
                  <p className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">
                    {t("products.contact")}
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Vui lòng liên hệ để biết giá và tư vấn chi tiết
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-baseline gap-3 sm:gap-4 flex-wrap mb-3">
                    {product.oldPrice && (
                      <span className="text-base sm:text-lg text-muted-foreground line-through opacity-70">
                        {formatPrice(product.oldPrice)}
                      </span>
                    )}
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-destructive">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  {product.oldPrice && (
                    <span className="text-sm sm:text-base text-primary font-semibold">
                      💰 {t("products.save")}{" "}
                      {formatPrice(product.oldPrice - product.price)}
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Description */}
            <div className="mb-6 sm:mb-8">
              <h3 className="font-bold text-foreground mb-3 text-base sm:text-lg">
                {t("products.description")}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Sản phẩm thủ công truyền thống được làm từ nguyên liệu tự nhiên,
                thân thiện với môi trường. Được chế tác tỉ mỉ bởi các nghệ nhân
                lành nghề, mang đậm bản sắc văn hóa Việt Nam. Phù hợp làm quà
                tặng hoặc trang trí nhà cửa.
              </p>
            </div>

            {/* Product Features */}
            <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-border/50">
              <h3 className="font-bold text-foreground mb-4 text-base sm:text-lg">
                Đặc điểm nổi bật
              </h3>
              <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>100% thủ công từ nguyên liệu tự nhiên</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>Thân thiện với môi trường</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>Thiết kế độc đáo, mang đậm bản sắc Việt Nam</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>Bền đẹp, dễ sử dụng và bảo quản</span>
                </li>
              </ul>
            </div>

            {/* Actions - Full width mobile with enhanced sizing */}
            <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
              {product.showContact ? (
                <Button
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 sm:h-16 text-base sm:text-lg font-bold shadow-md hover:shadow-lg transition-all"
                >
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 mr-3" />
                  {t("products.consult")}
                </Button>
              ) : (
                <>
                  <Button
                    size="lg"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-14 sm:h-16 text-base sm:text-lg font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 mr-3" />
                    {t("products.buy_now")}
                  </Button>
                  <Button
                    size="lg"
                    className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground h-14 sm:h-16 text-base sm:text-lg font-bold transition-all"
                  >
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 mr-3" />
                    {t("products.consult")}
                  </Button>
                </>
              )}
            </div>

            {/* Favorite Button */}
            <Button
              size="lg"
              variant="ghost"
              className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold border border-border hover:border-primary hover:bg-primary/5"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                className={`h-5 w-5 sm:h-6 sm:w-6 mr-2 transition-all ${isFavorite ? "fill-destructive text-destructive" : "text-muted-foreground"}`}
              />
              {isFavorite ? "Đã thích" : "Thích sản phẩm"}
            </Button>

            {/* Contact Info - Enhanced Card Style */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border-2 border-primary/10 shadow-sm">
              <div className="space-y-4 sm:space-y-3">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                    <strong className="block mb-2 text-base sm:text-lg text-foreground">
                      📞 {t("products.hotline_label")}
                    </strong>
                    <a
                      href="tel:0907882878"
                      className="text-primary hover:text-primary/80 font-semibold text-lg sm:text-xl transition-colors"
                    >
                      0907.882.878
                    </a>
                  </p>
                </div>
                <div className="border-t border-border/30 pt-4">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    <strong className="block mb-2 text-base sm:text-lg text-foreground">
                      📍 {t("products.address_label")}
                    </strong>
                    <span className="break-words text-sm sm:text-base">
                      500/3 Đường Đoàn Văn Bơ, P.15, Q.4
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products Section */}
      {recommendedProducts.length > 0 && (
        <section className="mt-8 sm:mt-12">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
              Sản phẩm khác có thể bạn sẽ thích
            </h2>
            <p className="text-sm text-muted-foreground">
              Khám phá thêm các sản phẩm chất lượng từ kho hàng của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {recommendedProducts.map((recProduct) => (
              <ProductCard key={recProduct.id} {...recProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
