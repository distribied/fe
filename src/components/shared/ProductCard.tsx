"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
  showContact?: boolean;
}

const ProductCard = ({
  id,
  image,
  title,
  price,
  oldPrice,
  showContact = false,
}: ProductCardProps) => {
  const { t, i18n } = useTranslation();
  const { href } = useLocale();

  const formatPrice = (value: number) => {
    return (
      new Intl.NumberFormat(i18n.language === "en" ? "en-US" : "vi-VN").format(
        value,
      ) + (i18n.language === "en" ? " VND" : "Đ")
    );
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
          {showContact ? (
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
        <div className="flex gap-1 sm:gap-2 mt-auto">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-[10px] sm:text-xs px-1 sm:px-2 h-7 sm:h-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <Link href={href(`/products/${id}`)}>
              {t("products.view_details")}
            </Link>
          </Button>
          <Button
            size="sm"
            className="flex-1 text-[10px] sm:text-xs px-1 sm:px-2 h-7 sm:h-8 bg-accent text-accent-foreground hover:opacity-90"
          >
            {t("products.buy_now")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
