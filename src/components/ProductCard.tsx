import { Button } from "@/components/ui/button";

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
  showContact?: boolean;
}

const ProductCard = ({ image, title, price, oldPrice, showContact = false }: ProductCardProps) => {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("vi-VN").format(value) + "Đ";
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow group">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-2 min-h-[2.5rem]">
          {title}
        </h3>

        {/* Price */}
        <div className="mb-3">
          {showContact ? (
            <span className="text-destructive font-bold uppercase">Liên Hệ</span>
          ) : (
            <div className="flex items-center gap-2">
              {oldPrice && <span className="price-old">{formatPrice(oldPrice)}</span>}
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
          >
            Xem chi tiết
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
