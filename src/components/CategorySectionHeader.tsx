import { ChevronRight } from "lucide-react";

interface CategorySectionHeaderProps {
  title: string;
  href?: string;
}

const CategorySectionHeader = ({
  title,
  href = "#",
}: CategorySectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      {/* Left side with icon and title */}
      <div className="flex items-center">
        {/* Circular basket icon */}
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary flex-shrink-0 bg-background">
          <img
            src="/basket-icon.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title with woven texture background */}
        <div
          className="relative -ml-3 pl-6 pr-8 py-2 rounded-r-full overflow-hidden"
          style={{
            backgroundImage: `url(/woven-texture.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay for text visibility */}
          <div className="absolute inset-0 bg-foreground/5" />
          <h2 className="relative font-bold text-lg md:text-xl uppercase tracking-wide text-primary-foreground">
            {title}
          </h2>
        </div>
      </div>

      {/* View all button */}
      <a
        href={href}
        className="flex items-center gap-1 bg-primary text-primary-foreground px-4 py-2 rounded text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Xem Tất Cả
        <ChevronRight className="h-4 w-4" />
      </a>
    </div>
  );
};

export default CategorySectionHeader;
