"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Phone, ArrowLeft, Heart, Tag, Check, Share2, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useMemo } from "react";
import ProductCard from "@/components/shared/ProductCard";
import ImageZoom from "@/components/shared/ImageZoom";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategory";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/schemas";

interface ProductPageClientProps {
  product: Product;
}

export default function ProductPageClient({
  product,
}: Readonly<ProductPageClientProps>) {
  const { t, i18n } = useTranslation();
  const { addItem } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageKey, setImageKey] = useState(0); // For triggering slide animation

  // Handle add to cart
  const handleAddToCart = () => {
    addItem(String(product.id), 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Handle thumbnail click with animation
  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
    setImageKey(prev => prev + 1);
  };

  // Copy product URL to clipboard
  const handleCopyUrl = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Fetch all products for recommendations
  const { data: allProducts = [] } = useProducts({ isActive: true });

  // Fetch categories for category name
  const { data: categories = [] } = useCategories();

  // Calculate fake original price (10-35% higher) and discount percentage
  // Use deterministic value based on product ID to avoid hydration mismatch
  const priceData = useMemo(() => {
    const currentPrice = product.price || 0;
    if (currentPrice === 0) return { originalPrice: 0, salePrice: 0, discountPercent: 0 };

    // Generate deterministic random value from product ID
    const productIdStr = String(product.id || '');
    const productIdNum = productIdStr.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    const randomPercent = 10 + (productIdNum % 26); // 10-35% range

    const originalPrice = Math.round(currentPrice * (1 + randomPercent / 100));

    return {
      originalPrice,
      salePrice: currentPrice,
      discountPercent: randomPercent
    };
  }, [product.price, product.id]);

  // Get category name from categoryId
  const categoryName = useMemo(() => {
    if (!product.categoryId) return "";
    const category = categories.find(
      (cat) => cat.id.toString() === product.categoryId?.toString()
    );
    return category?.name || "";
  }, [product.categoryId, categories]);

  // Get product image based on selected index
  const productImage = useMemo(() => {
    if (!product.images || product.images.length === 0) {
      return "/placeholder.jpg";
    }
    return product.images[currentImageIndex]?.url || product.images[0]?.url || "/placeholder.jpg";
  }, [product.images, currentImageIndex]);

  const formatPrice = (value: number) => {
    if (i18n.language === "en") {
      return new Intl.NumberFormat("en-US").format(value) + " VND";
    }
    return new Intl.NumberFormat("vi-VN").format(value) + "Đ";
  };

  // Get recommended products from the same category and other categories
  const recommendedProducts = useMemo(() => {
    // Get products from same category (excluding current product)
    const sameCategoryProducts = allProducts.filter(
      (p) =>
        p.categoryId?.toString() === product.categoryId?.toString() &&
        p.id.toString() !== product.id.toString()
    );

    // If same category has enough products, use them, otherwise add from other categories
    let recommendations = sameCategoryProducts.slice(0, 4);

    if (recommendations.length < 4) {
      const otherCategoryProducts = allProducts.filter(
        (p) =>
          p.categoryId?.toString() !== product.categoryId?.toString() &&
          p.id.toString() !== product.id.toString()
      );
      recommendations = [
        ...recommendations,
        ...otherCategoryProducts.slice(0, 4 - recommendations.length),
      ];
    }

    return recommendations;
  }, [allProducts, product]);

  const showContact = product.price === 0;

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

      {/* Product Detail */}
      <div className="bg-card rounded-lg shadow-lg border border-border p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 overflow-hidden relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-tr from-accent/5 to-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 relative z-10">
          {/* Product Image - Responsive */}
          <div className="flex flex-col gap-4 lg:max-w-md lg:mx-auto">
            {/* Sale Badge */}
            {!showContact && priceData.discountPercent > 0 && (
              <div className="absolute top-4 left-4 z-20">
                <div className="bg-destructive text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-sm sm:text-base shadow-lg animate-pulse">
                  <Tag className="inline-block w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  -{priceData.discountPercent}%
                </div>
              </div>
            )}

            <ImageZoom
              key={imageKey}
              src={productImage}
              alt={product.name || ""}
              zoomScale={1.8}
              lensSize={150}
              className="animate-slide-image"
            />

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
                {product.images.slice(0, 5).map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => handleImageChange(idx)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                      currentImageIndex === idx
                        ? "border-primary shadow-md ring-2 ring-primary/30"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={`${product.name} - ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info - Responsive Layout */}
          <div className="flex flex-col">
            <div className="mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
                {product.name}
              </h1>
              {/* Category Badge - Rectangle Style */}
              {categoryName && (
                <span className="inline-block bg-primary/10 text-primary px-4 sm:px-5 lg:px-4 py-2 sm:py-2.5 lg:py-2 rounded text-xs sm:text-sm lg:text-xs font-semibold uppercase tracking-wider">
                  {categoryName}
                </span>
              )}
            </div>

            {/* Price Section - Better Mobile Layout */}
            <div className="mb-6 sm:mb-8 lg:mb-6 pb-6 sm:pb-8 lg:pb-6 border-b border-border/50">
              {showContact ? (
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 sm:p-6 lg:p-4 rounded-lg border border-primary/20">
                  <p className="text-lg sm:text-xl lg:text-lg font-bold text-primary mb-2 sm:mb-3 lg:mb-2">
                    {t("products.contact")}
                  </p>
                  <p className="text-sm sm:text-base lg:text-sm text-muted-foreground">
                    Vui lòng liên hệ để biết giá và tư vấn chi tiết
                  </p>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {/* Original Price (fake) */}
                  <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                    <span className="text-base sm:text-lg lg:text-base text-muted-foreground line-through">
                      {formatPrice(priceData.originalPrice)}
                    </span>
                    {priceData.discountPercent > 0 && (
                      <span className="bg-destructive/10 text-destructive px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-semibold">
                        Tiết kiệm {priceData.discountPercent}%
                      </span>
                    )}
                  </div>

                  {/* Sale Price */}
                  <div className="flex items-baseline gap-3 sm:gap-4 lg:gap-3 flex-wrap">
                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold text-destructive">
                      {formatPrice(priceData.salePrice)}
                    </span>
                  </div>

                  {/* Stock status */}
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <Check className="w-4 h-4" />
                    <span className="font-medium">{t("products.in_stock")}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-6 sm:mb-8 lg:mb-5">
              <h3 className="font-bold text-foreground mb-3 lg:mb-2 text-base sm:text-lg lg:text-base">
                {t("products.description")}
              </h3>
              <p className="text-sm sm:text-base lg:text-sm text-muted-foreground leading-relaxed">
                {product.description || (i18n.language === "en"
                  ? "Traditional handmade product made from natural materials, environmentally friendly. Meticulously crafted by skilled artisans, deeply imbued with Vietnamese cultural identity. Perfect for gifts or home decor."
                  : "Sản phẩm thủ công truyền thống được làm từ nguyên liệu tự nhiên, thân thiện với môi trường. Được chế tác tỉ mỉ bởi các nghệ nhân lành nghề, mang đậm bản sắc văn hóa Việt Nam. Phù hợp làm quà tặng hoặc trang trí nhà cửa.")}
              </p>
            </div>

            {/* Product Features */}
            <div className="mb-6 sm:mb-8 lg:mb-5 pb-6 sm:pb-8 lg:pb-5 border-b border-border/50">
              <h3 className="font-bold text-foreground mb-4 lg:mb-3 text-base sm:text-lg lg:text-base">
                {t("products.highlights")}
              </h3>
              <ul className="space-y-3 lg:space-y-2 text-sm sm:text-base lg:text-sm text-muted-foreground">
                <li className="flex items-start gap-3 lg:gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 lg:mt-1.5 flex-shrink-0"></span>
                  <span>{t("products.highlight_1")}</span>
                </li>
                <li className="flex items-start gap-3 lg:gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 lg:mt-1.5 flex-shrink-0"></span>
                  <span>{t("products.highlight_2")}</span>
                </li>
                <li className="flex items-start gap-3 lg:gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 lg:mt-1.5 flex-shrink-0"></span>
                  <span>{t("products.highlight_3")}</span>
                </li>
                <li className="flex items-start gap-3 lg:gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 lg:mt-1.5 flex-shrink-0"></span>
                  <span>Bền đẹp, dễ sử dụng và bảo quản</span>
                </li>
              </ul>
            </div>

            {/* Actions - Full width mobile with enhanced sizing */}
            <div className="flex flex-col gap-3 sm:gap-4 lg:gap-3 mb-6 sm:mb-8 lg:mb-5">
              {showContact ? (
                <Button
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] h-14 sm:h-16 lg:h-12 text-base sm:text-lg lg:text-base font-bold shadow-md hover:shadow-xl transition-all duration-200"
                >
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 lg:h-5 lg:w-5 mr-3 lg:mr-2" />
                  {t("products.consult")}
                </Button>
              ) : (
                <>
                  <Button
                    size="lg"
                    className={`w-full hover:scale-[1.02] active:scale-[0.98] h-14 sm:h-16 lg:h-12 text-base sm:text-lg lg:text-base font-bold shadow-md hover:shadow-xl transition-all duration-200 ${
                      addedToCart
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-accent text-accent-foreground hover:bg-accent/90"
                    }`}
                    onClick={handleAddToCart}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="h-5 w-5 sm:h-6 sm:w-6 lg:h-5 lg:w-5 mr-3 lg:mr-2" />
                        {t("cart.added_to_cart")}
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 lg:h-5 lg:w-5 mr-3 lg:mr-2" />
                        {t("products.buy_now")}
                      </>
                    )}
                  </Button>
                  <Button
                    size="lg"
                    className="w-full border-2 border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-primary hover:scale-[1.02] active:scale-[0.98] h-14 sm:h-16 lg:h-12 text-base sm:text-lg lg:text-base font-bold transition-all duration-200"
                  >
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 lg:h-5 lg:w-5 mr-3 lg:mr-2" />
                    {t("products.consult")}
                  </Button>
                </>
              )}
            </div>

            {/* Favorite Button */}
            <div className="mt-4">
              <Button
                size="lg"
                variant="ghost"
                className="w-full h-12 sm:h-14 lg:h-11 text-base sm:text-lg lg:text-base font-semibold border border-border hover:border-primary hover:bg-primary/5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  className={`h-5 w-5 sm:h-6 sm:w-6 lg:h-5 lg:w-5 mr-2 transition-all duration-200 ${
                    isFavorite
                      ? "fill-destructive text-destructive scale-110"
                      : "text-muted-foreground hover:scale-110"
                  }`}
                />
                {isFavorite ? t("products.liked") : t("products.like_product")}
              </Button>
            </div>

            {/* Share / Copy URL Button */}
            <div className="mt-4">
              <Button
                size="lg"
                variant="ghost"
                className="w-full h-12 sm:h-14 lg:h-11 text-base sm:text-lg lg:text-base font-semibold border border-border hover:border-primary hover:bg-primary/5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                onClick={handleCopyUrl}
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 lg:h-5 lg:w-5 mr-2 text-green-600" />
                    <span className="text-green-600">{t("products.copied")}</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-5 w-5 sm:h-6 sm:w-6 lg:h-5 lg:w-5 mr-2" />
                    {t("products.share_product")}
                  </>
                )}
              </Button>
            </div>

            {/* Contact Info - Enhanced Card Style */}
            <div className="mt-6 sm:mt-8 lg:mt-5 p-4 sm:p-6 lg:p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border-2 border-primary/10 shadow-sm">
              <div className="space-y-4 sm:space-y-3 lg:space-y-3">
                <div>
                  <strong className="block mb-2 lg:mb-1.5 text-base sm:text-lg lg:text-base text-foreground">
                    📞 {t("products.hotline_label")}
                  </strong>
                  <a
                    href="tel:0907882878"
                    className="text-primary hover:text-primary/80 font-semibold text-lg sm:text-xl lg:text-lg transition-colors"
                  >
                    0907.882.878
                  </a>
                </div>
                <div className="border-t border-border/30 pt-4 lg:pt-3">
                  <strong className="block mb-2 lg:mb-1.5 text-base sm:text-lg lg:text-base text-foreground">
                    📍 {t("products.address_label")}
                  </strong>
                  <span className="break-words text-sm sm:text-base lg:text-sm text-muted-foreground">
                    500/3 Đường Đoàn Văn Bơ, P.15, Q.4
                  </span>
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
            {recommendedProducts.map((recProduct, idx) => {
              const thumbnail = recProduct.images?.find((img) => img.isThumbnail)?.url || "/placeholder.jpg";
              return (
                <div
                  key={recProduct.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <ProductCard
                    id={recProduct.id.toString()}
                    image={thumbnail}
                    title={recProduct.name || ""}
                    price={recProduct.price || 0}
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
