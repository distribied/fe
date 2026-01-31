import Product3DPreview from "./Product3DPreview";
import { Truck, Flame, Sparkles, Star } from "lucide-react";

const SideBanners = () => {
  return (
    <div className="flex flex-col gap-2 h-full">
      {/* 3D Product Preview - 50% */}
      <div className="h-[50%] min-h-[200px]">
        <Product3DPreview />
      </div>

      {/* Promotional Banners - 4 x 12.5% each = 50% */}
      <div className="h-[50%] grid grid-cols-2 gap-2">
        {/* GIAO HÀNG TOÀN QUỐC */}
        <div className="bg-primary rounded-lg flex flex-col items-center justify-center p-3 text-center">
          <Truck className="w-6 h-6 text-primary-foreground mb-1" />
          <p className="text-primary-foreground font-bold text-xs leading-tight">
            GIAO HÀNG<br />TOÀN QUỐC
          </p>
        </div>

        {/* Sản phẩm bán chạy */}
        <div className="bg-destructive rounded-lg flex flex-col items-center justify-center p-3 text-center">
          <Flame className="w-6 h-6 text-destructive-foreground mb-1" />
          <p className="text-destructive-foreground font-bold text-xs leading-tight">
            SẢN PHẨM<br />BÁN CHẠY
          </p>
        </div>

        {/* Hàng mới về */}
        <div className="bg-accent rounded-lg flex flex-col items-center justify-center p-3 text-center">
          <Sparkles className="w-6 h-6 text-accent-foreground mb-1" />
          <p className="text-accent-foreground font-bold text-xs leading-tight">
            HÀNG MỚI<br />VỀ
          </p>
        </div>

        {/* Sản phẩm giới hạn */}
        <div className="bg-secondary border-2 border-primary rounded-lg flex flex-col items-center justify-center p-3 text-center">
          <Star className="w-6 h-6 text-primary mb-1" />
          <p className="text-secondary-foreground font-bold text-xs leading-tight">
            SẢN PHẨM<br />GIỚI HẠN
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBanners;
