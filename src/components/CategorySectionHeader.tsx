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
        {/* Circular basket icon */}
        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-primary flex-shrink-0 bg-background">
          <img
            src="/basket-icon.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title with woven texture background */}
        <div
          className="relative -ml-2 md:-ml-3 pl-4 md:pl-6 pr-4 md:pr-8 py-1.5 md:py-2 rounded-r-full overflow-hidden"
          style={{
            backgroundImage: `url(/woven-texture.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay for text visibility */}
          <div className="absolute inset-0 bg-foreground/5" />
          <h2 className="relative font-bold text-sm md:text-lg lg:text-xl uppercase tracking-wide text-primary-foreground truncate">
            {title}
          </h2>
        </div>
      </div>

      {/* View all button */}
      <a
        href={href}
        className="flex items-center gap-0.5 md:gap-1 bg-primary text-primary-foreground px-2 md:px-4 py-1.5 md:py-2 rounded text-xs md:text-sm font-medium hover:opacity-90 transition-opacity flex-shrink-0"
      >
        <span className="hidden sm:inline">{t("products.view_all")}</span>
        <span className="sm:hidden">{t("products.view_all").split(" ")[0]}</span>
        <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
      </a>
    </div>
  );
};

export default CategorySectionHeader;
