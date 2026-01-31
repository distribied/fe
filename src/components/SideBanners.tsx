import Product3DPreview from "./Product3DPreview";
import previewImage from "@/assets/preview-image.png";
import product3d1 from "@/assets/product-3d-1.png";
import product3d2 from "@/assets/product-3d-2.png";

const SideBanners = () => {
  return (
    <div className="flex flex-col gap-2 h-full">
      {/* 3D Product Preview 1 - 33% */}
      <div className="flex-1 min-h-[120px]">
        <Product3DPreview textureUrl={previewImage} />
      </div>

      {/* 3D Product Preview 2 - 33% */}
      <div className="flex-1 min-h-[120px]">
        <Product3DPreview textureUrl={product3d1} />
      </div>

      {/* 3D Product Preview 3 - 33% */}
      <div className="flex-1 min-h-[120px]">
        <Product3DPreview textureUrl={product3d2} />
      </div>
    </div>
  );
};

export default SideBanners;
