import product1 from "@/assets/product-1.jpg";
import product4 from "@/assets/product-4.jpg";

const SideBanners = () => {
  return (
    <div className="space-y-4">
      {/* Banner 1 */}
      <div className="relative rounded-lg overflow-hidden shadow-sm border border-border">
        <img
          src={product1}
          alt="Giỏ Tre Gói Quà"
          className="w-full aspect-[4/3] object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-4">
          <p className="text-primary-foreground font-bold text-sm">
            GIAO HÀNG TOÀN QUỐC
          </p>
        </div>
      </div>

      {/* Banner 2 - Hot Sale */}
      <div className="relative rounded-lg overflow-hidden shadow-sm border-2 border-destructive">
        <div className="bg-destructive text-primary-foreground py-2 px-4 text-center">
          <span className="font-bold">Hot Sale</span>
        </div>
        <img
          src={product4}
          alt="Nhà Mèo"
          className="w-full aspect-square object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-4">
          <p className="text-primary-foreground font-bold text-lg text-center">
            NHÀ MÈO
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBanners;
