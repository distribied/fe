"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("vi-VN").format(value) + "Đ";
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow group">
      {/* Image */}
      <Link
        href={`/product/${id}`}
        className="block relative overflow-hidden aspect-square"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/product/${id}`}>
          <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-2 min-h-[2.5rem] hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>

        {/* Price */}
        <div className="mb-3">
          {showContact ? (
            <span className="text-destructive font-bold uppercase">
              Liên Hệ
            </span>
          ) : (
            <div className="flex items-center gap-2">
              {oldPrice && (
                <span className="price-old">{formatPrice(oldPrice)}</span>
              )}
              <span className="price-current">{formatPrice(price)}</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <Link href={`/product/${id}`}>Xem chi tiết</Link>
          </Button>
          <Button
            size="sm"
            className="flex-1 text-xs bg-accent text-accent-foreground hover:opacity-90"
          >
            Mua ngay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
