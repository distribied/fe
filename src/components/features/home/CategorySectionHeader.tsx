"use client";

import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CategorySectionHeaderProps {
  title: string;
  href?: string;
}

const CategorySectionHeader = ({
  title,
  href = "#",
}: CategorySectionHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between mb-4 md:mb-6 gap-2">
      {/* Left side with icon and title */}
      <div className="flex items-center min-w-0">
        {/* Circular basket icon - thêm shadow và border đậm hơn */}
        <div className="relative z-10 w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-primary/80 flex-shrink-0 bg-background shadow-lg shadow-primary/20">
          <img
            src="/ui/basket-icon.png"
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Subtle overlay để tạo liên kết với woven section */}
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
        </div>

        {/* Title với woven texture - tăng độ tương phản */}
        <div
          className="relative -ml-2 md:-ml-3 pl-4 md:pl-6 pr-4 md:pr-8 py-1.5 md:py-2 rounded-r-full overflow-hidden"
          style={{
            backgroundImage: `url(/ui/woven-texture.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Gradient overlay mạnh hơn để chữ nổi bật */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />

          {/* Optional: thêm subtle pattern overlay để liên kết với basket */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

          {/* Text với shadow để đảm bảo độ đọc */}
          <h2 className="relative font-bold text-sm md:text-lg lg:text-xl uppercase tracking-wide text-white truncate drop-shadow-md">
            {title}
          </h2>
        </div>
      </div>

      {/* View all button - điều chỉnh để match với header */}
      <a
        href={href}
        className="flex items-center gap-0.5 md:gap-1 bg-primary text-primary-foreground px-2 md:px-4 py-1.5 md:py-2 rounded text-xs md:text-sm font-medium hover:opacity-90 transition-all hover:shadow-md flex-shrink-0 border border-primary/20"
      >
        <span className="hidden sm:inline">{t("products.view_all")}</span>
        <span className="sm:hidden">
          {t("products.view_all").split(" ")[0]}
        </span>
        <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
      </a>
    </div>
  );
};

export default CategorySectionHeader;
