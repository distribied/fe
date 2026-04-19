"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Phone,
  ChevronRight,
  Heart,
  Check,
  Share2,
  CheckCircle,
  Leaf,
  Sparkles,
  ShieldCheck,
  Home,
  MapPin,
  PhoneCall,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useMemo } from "react";
import ProductCard from "@/components/shared/ProductCard";
import ImageZoom from "@/components/shared/ImageZoom";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategory";
import { useCart } from "@/hooks/useCart";
import { useLocale } from "@/hooks/useLocale";
import { Product } from "@/schemas";

interface ProductPageClientProps {
  product: Product;
}

export default function ProductPageClient({
  product,
}: Readonly<ProductPageClientProps>) {
  const { t, i18n } = useTranslation();
  const { href } = useLocale();
  const { addItem } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageKey, setImageKey] = useState(0);

  const handleAddToCart = () => {
    addItem(String(product.id), 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
    setImageKey((prev) => prev + 1);
  };

  const handleZaloClick = () => {
    const phoneNumber = "0907882878";
    const message = "Xin chào Kiều Sâm! Tôi muốn được tư vấn về sản phẩm.";
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://zalo.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank",
    );
  };

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

  const { data: allProducts = [] } = useProducts({ isActive: true });
  const { data: categories = [] } = useCategories();

  const categoryName = useMemo(() => {
    if (!product.categoryId) return "";
    const category = categories.find(
      (cat) => cat.id.toString() === product.categoryId?.toString(),
    );
    return category?.name || "";
  }, [product.categoryId, categories]);

  const productImage = useMemo(() => {
    if (!product.images || product.images.length === 0) {
      return "/placeholder.jpg";
    }
    return (
      product.images[currentImageIndex]?.url ||
      product.images[0]?.url ||
      "/placeholder.jpg"
    );
  }, [product.images, currentImageIndex]);

  const recommendedProducts = useMemo(() => {
    const sameCategoryProducts = allProducts.filter(
      (p) =>
        p.categoryId?.toString() === product.categoryId?.toString() &&
        p.id.toString() !== product.id.toString(),
    );

    let recommendations = sameCategoryProducts.slice(0, 4);

    if (recommendations.length < 4) {
      const otherCategoryProducts = allProducts.filter(
        (p) =>
          p.categoryId?.toString() !== product.categoryId?.toString() &&
          p.id.toString() !== product.id.toString(),
      );
      recommendations = [
        ...recommendations,
        ...otherCategoryProducts.slice(0, 4 - recommendations.length),
      ];
    }

    return recommendations;
  }, [allProducts, product]);

  const description =
    product.description ||
    (i18n.language === "en"
      ? "Traditional handmade product made from natural materials, environmentally friendly. Meticulously crafted by skilled artisans, deeply imbued with Vietnamese cultural identity. Perfect for gifts or home decor."
      : "Sản phẩm thủ công truyền thống được làm từ nguyên liệu tự nhiên, thân thiện với môi trường. Được chế tác tỉ mỉ bởi các nghệ nhân lành nghề, mang đậm bản sắc văn hóa Việt Nam. Phù hợp làm quà tặng hoặc trang trí nhà cửa.");

  return (
    <div className="bg-gradient-to-b from-muted/40 via-background to-background min-h-screen">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Breadcrumb */}
        <nav
          aria-label="breadcrumb"
          className="mb-4 sm:mb-6 flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground"
        >
          <Link
            href={href("/")}
            className="inline-flex items-center gap-1 hover:text-primary transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span>{t("common.home") || "Trang chủ"}</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-50" />
          <Link
            href={href("/products")}
            className="hover:text-primary transition-colors"
          >
            {t("common.products") || "Sản phẩm"}
          </Link>
          {categoryName && (
            <>
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
              <span className="hover:text-primary transition-colors">
                {categoryName}
              </span>
            </>
          )}
          <ChevronRight className="h-3.5 w-3.5 opacity-50" />
          <span className="text-foreground font-medium truncate max-w-[160px] sm:max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-10 sm:mb-14">
          {/* Image column — sticky on desktop */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="lg:sticky lg:top-24 flex flex-col gap-4">
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-border/60">
                <ImageZoom
                  key={imageKey}
                  src={productImage}
                  alt={product.name || ""}
                  zoomScale={1.8}
                  lensSize={150}
                  className="animate-slide-image"
                />
                {/* Handmade ribbon */}
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-primary px-3 py-1.5 rounded-full shadow-sm text-xs font-semibold">
                  <Sparkles className="h-3.5 w-3.5" />
                  {i18n.language === "en" ? "Handmade" : "Thủ công"}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-thin">
                  {product.images.map((img, idx) => (
                    <button
                      key={img.id || idx}
                      onClick={() => handleImageChange(idx)}
                      className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden transition-all duration-200 ${
                        currentImageIndex === idx
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                          : "ring-1 ring-border/60 opacity-70 hover:opacity-100 hover:ring-primary/40"
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
          </div>

          {/* Info column */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col">
            {/* Header row: category + icon actions */}
            <div className="flex items-start justify-between gap-3 mb-3">
              {categoryName && (
                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  {categoryName}
                </span>
              )}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  aria-label={
                    isFavorite
                      ? t("products.liked")
                      : t("products.like_product")
                  }
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-border/60 bg-background hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <Heart
                    className={`h-4 w-4 transition-all ${
                      isFavorite
                        ? "fill-destructive text-destructive"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
                <button
                  onClick={handleCopyUrl}
                  aria-label={t("products.share_product")}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-border/60 bg-background hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Share2 className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-foreground leading-tight tracking-tight mb-4">
              {product.name}
            </h1>

            {/* Price / Contact card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground p-5 sm:p-6 mb-6 shadow-md">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-white/5 rounded-full blur-2xl" />
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.2em] opacity-80 mb-1.5">
                  {t("products.price")}
                </p>
                <p className="text-3xl sm:text-4xl font-extrabold mb-2">
                  {t("products.contact")}
                </p>
                <p className="text-sm opacity-90 max-w-md">
                  {t("products.contact_description")}
                </p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
              {[
                {
                  icon: Leaf,
                  label:
                    i18n.language === "en"
                      ? "Natural materials"
                      : "Nguyên liệu tự nhiên",
                },
                {
                  icon: Sparkles,
                  label:
                    i18n.language === "en" ? "Handcrafted" : "Làm thủ công",
                },
                {
                  icon: ShieldCheck,
                  label:
                    i18n.language === "en"
                      ? "Free consultation"
                      : "Tư vấn miễn phí",
                },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-card border border-border/60 text-center"
                >
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-[10px] sm:text-xs font-medium text-muted-foreground leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Primary actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <Button
                size="lg"
                className={`h-12 sm:h-13 text-base font-bold shadow-sm hover:shadow-md transition-all duration-200 ${
                  addedToCart
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-accent text-accent-foreground hover:bg-accent/90"
                }`}
                onClick={handleAddToCart}
              >
                {addedToCart ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    {t("cart.added_to_cart")}
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {t("products.buy_now")}
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleZaloClick}
                className="h-12 sm:h-13 text-base font-bold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                <Phone className="h-5 w-5 mr-2" />
                {t("products.consult")}
              </Button>
            </div>

            {/* Description */}
            <section className="mb-6 pb-6 border-b border-border/60">
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="inline-block w-1 h-5 rounded-full bg-primary" />
                {t("products.description")}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {description}
              </p>
            </section>

            {/* Highlights */}
            <section className="mb-6 pb-6 border-b border-border/60">
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="inline-block w-1 h-5 rounded-full bg-primary" />
                {t("products.highlights")}
              </h3>
              <ul className="space-y-2.5">
                {[
                  t("products.highlight_1"),
                  t("products.highlight_2"),
                  t("products.highlight_3"),
                  i18n.language === "en"
                    ? "Durable, easy to use and maintain"
                    : "Bền đẹp, dễ sử dụng và bảo quản",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground"
                  >
                    <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Contact card */}
            <section className="rounded-2xl bg-card border border-border/60 p-5 sm:p-6 shadow-sm">
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-4">
                {i18n.language === "en"
                  ? "Contact information"
                  : "Thông tin liên hệ"}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href="tel:0907882878"
                  className="group flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <PhoneCall className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">
                      {t("products.hotline_label")}
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-foreground truncate">
                      0907.882.878
                    </p>
                  </div>
                </a>
                <div className="flex items-center gap-3 p-3 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">
                      {t("products.address_label")}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      500/3 Đường Đoàn Văn Bơ, P.15, Q.4
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <section className="mt-12 sm:mt-16">
            <div className="flex items-end justify-between mb-6 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
                  <span className="w-6 h-px bg-primary" />
                  {i18n.language === "en" ? "Discover" : "Khám phá"}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                  {i18n.language === "en"
                    ? "You may also like"
                    : "Sản phẩm khác có thể bạn sẽ thích"}
                </h2>
              </div>
              <Link
                href={href("/products")}
                className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
              >
                {t("products.view_all")}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {recommendedProducts.map((recProduct, idx) => {
                const thumbnail =
                  recProduct.images?.find((img) => img.isThumbnail)?.url ||
                  "/placeholder.jpg";
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
                      showContactLabel
                    />
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
