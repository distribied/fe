"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, MessageCircle } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useProduct } from "@/hooks/useProducts";
import { useLocale } from "@/hooks/useLocale";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/schemas";
import { getProductById } from "@/service/product.service";

// Individual cart item component
function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: { productId: string; quantity: number };
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}) {
  const { t } = useTranslation();
  const { href } = useLocale();

  const { data: product, isLoading } = useProduct(item.productId);

  if (isLoading) {
    return (
      <div className="flex gap-4 p-4 border rounded-lg">
        <Skeleton className="w-24 h-24 rounded-md" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-8 w-32" />
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0].url 
    : "/placeholder.jpg";

  return (
    <div className="flex gap-4 p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
      {/* Product Image */}
      <Link href={href(`/products/${item.productId}`)} className="flex-shrink-0">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={product.name || "Product"}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <Link href={href(`/products/${item.productId}`)}>
          <h3 className="font-medium text-sm sm:text-base truncate hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-primary font-bold mt-1 uppercase">
          {t("products.contact")}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => {
                if (item.quantity > 1) {
                  onUpdateQuantity(item.productId, item.quantity - 1);
                }
              }}
              disabled={item.quantity <= 1}
              className="p-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center text-sm">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
              className="p-2 hover:bg-muted"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.productId)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
            title={t("cart.remove")}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Item Total */}
      <div className="hidden sm:block text-right">
        <p className="text-sm text-muted-foreground">
          {t("cart.contact_for_quote")}
        </p>
        <p className="font-bold text-primary uppercase">
          {t("products.contact")}
        </p>
      </div>
    </div>
  );
}

export default function CartClient() {
  const { t, i18n } = useTranslation();
  const { href } = useLocale();
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const [cartProducts, setCartProducts] = useState<{product: Product | null; quantity: number}[]>([]);

  // Fetch all products in cart
  useEffect(() => {
    const fetchProducts = async () => {
      const productPromises = items.map(async (item) => {
        try {
          const product = await getProductById(item.productId);
          return { product, quantity: item.quantity };
        } catch (error) {
          console.error("Error fetching product:", error);
          return { product: null, quantity: item.quantity };
        }
      });

      const results = await Promise.all(productPromises);
      setCartProducts(results);
    };

    if (items.length > 0) {
      fetchProducts();
    } else {
      setCartProducts([]);
    }
  }, [items]);

  const buildInquiryMessage = () => {
    const isEnglish = i18n.language === "en";
    let message = isEnglish
      ? "Hello Kieu Sam! I would like to ask about these products:\n\n"
      : "Xin chào Kiều Sâm! Tôi muốn liên hệ về các sản phẩm sau:\n\n";

    cartProducts.forEach(({ product, quantity }) => {
      if (product) {
        message += isEnglish
          ? `• ${product.name}\n  Quantity: ${quantity}\n  Please share pricing and consultation details.\n\n`
          : `• ${product.name}\n  Số lượng: ${quantity}\n  Vui lòng tư vấn và báo giá giúp tôi.\n\n`;
      }
    });

    message += isEnglish
      ? "Please confirm and contact me. Thank you!"
      : "Vui lòng xác nhận và liên hệ lại giúp tôi. Cảm ơn!";

    return message;
  };

  // Generate an inquiry message without pricing details
  const handleCheckout = () => {
    const phoneNumber = "0907882878"; // Zalo phone number
    const encodedMessage = encodeURIComponent(buildInquiryMessage());

    // Open Zalo chat
    window.open(`https://zalo.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  // Handle Facebook Messenger checkout
  const handleFacebookCheckout = () => {
    const facebookPageId = "100083182335829"; // Facebook Page ID
    const encodedMessage = encodeURIComponent(buildInquiryMessage());
    window.open(`https://m.me/${facebookPageId}?text=${encodedMessage}`, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="text-center py-16">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted mb-4" />
          <h2 className="text-2xl font-bold mb-2">{t("cart.empty")}</h2>
          <p className="text-muted-foreground mb-6">{t("cart.empty_description")}</p>
          <Button asChild>
            <Link href={href("/products")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("cart.continue_shopping")}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t("cart.title")}</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItemCard
              key={item.productId}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-4 bg-card">
            <h2 className="text-lg font-bold mb-4">{t("cart.summary")}</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {t("cart.items")} ({items.reduce((sum, item) => sum + item.quantity, 0)})
                </span>
                <span className="font-medium uppercase text-primary">
                  {t("products.contact")}
                </span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <p className="text-sm text-muted-foreground">
                {t("cart.contact_note")}
              </p>
            </div>

            {/* Checkout Button - Zalo */}
            <Button
              className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
              size="lg"
              onClick={handleCheckout}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {t("common.contact")} (Zalo)
            </Button>

            {/* Checkout Button - Facebook */}
            <Button
              className="w-full h-12 text-lg bg-blue-700 hover:bg-blue-800 mt-2"
              size="lg"
              onClick={handleFacebookCheckout}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              {t("common.contact")} (Facebook)
            </Button>

            {/* Continue Shopping */}
            <Button variant="outline" className="w-full mt-3" asChild>
              <Link href={href("/products")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("cart.continue_shopping")}
              </Link>
            </Button>

            {/* Clear Cart */}
            <button
              onClick={clearCart}
              className="w-full mt-4 text-sm text-muted-foreground hover:text-red-500 transition-colors"
            >
              {t("cart.clear_cart")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
