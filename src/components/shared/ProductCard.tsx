"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ShoppingCart, Check } from "lucide-react";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
  showContact?: boolean;
  showContactLabel?: boolean;
}

const ProductCard = ({
  id,
  image,
  title,
  price,
  oldPrice,
  showContact = false,
  showContactLabel = false,
}: ProductCardProps) => {
  const { t, i18n } = useTranslation();
  const { href } = useLocale();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const shouldShowContactLabel = showContact || showContactLabel;

  const formatPrice = (value: number) => {
    return (
      new Intl.NumberFormat(i18n.language === "en" ? "en-US" : "vi-VN").format(
        value,
      ) + (i18n.language === "en" ? " VND" : "Đ")
    );
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow group flex flex-col h-full">
      {/* Image */}
      <Link
        href={href(`/products/${id}`)}
        className="block relative overflow-hidden aspect-square"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Content */}
      <div className="p-2 sm:p-3 md:p-4 flex flex-col flex-grow">
        <Link href={href(`/products/${id}`)}>
          <h3 className="text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>

        {/* Price - Fixed height */}
        <div className="mb-2 sm:mb-3 min-h-[2.5rem] sm:min-h-[3rem] flex items-start">
          {shouldShowContactLabel ? (
            <span className="text-destructive font-bold uppercase text-xs sm:text-sm">
              {t("products.contact")}
            </span>
          ) : (
            <div className="flex flex-col gap-1">
              {oldPrice && (
                <span className="price-old text-xs">
                  {formatPrice(oldPrice)}
                </span>
              )}
              <span className="price-current text-xs sm:text-sm">
                {formatPrice(price)}
              </span>
            </div>
          )}
        </div>

        {/* Buttons - Push to bottom */}
        <div className="flex gap-2 mt-auto">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs sm:text-sm font-medium h-8 sm:h-9 px-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <Link
              href={href(`/products/${id}`)}
              className="flex items-center justify-center whitespace-nowrap"
            >
              {t("products.view_details")}
            </Link>
          </Button>
          <Button
            size="sm"
            className={`flex-1 inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-xs sm:text-sm font-medium h-8 sm:h-9 px-2 ${
              added
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-accent text-accent-foreground hover:opacity-90"
            }`}
            onClick={handleAddToCart}
          >
            {added ? (
              <Check className="w-4 h-4 shrink-0" />
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 shrink-0" />
                <span>{t("products.buy_now")}</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
