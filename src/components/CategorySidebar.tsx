import { ChevronRight, Menu } from "lucide-react";
import Link from "next/link";

const categories = [
  "Hộp Và Giỏ Quà Tết",
  "Ví Cỏ Bàng",
  "Túi Lá Buông Vẽ",
  "Túi Cỏ Bàng Vẽ",
  "Túi Lục Bình Vẽ",
  "Sản Phẩm Tổng Hợp",
  "Khay Mây Có Vải",
  "Túi Cỏ Bàng",
  "Sản Phẩm Tre",
  "Giỏ Lục Bình",
  "Giỏ Cói",
  "Giỏ Lá Buông",
  "Nhà Mèo Bằng Rơm, Cói",
  "Sọt Mây, Tre, Sọt Đựng Áo Quần",
  "Thảm Cói, Thảm Lục Bình",
];

const CategorySidebar = () => {
  return (
    <aside className="w-full h-full">
      {/* Header */}
      <div className="bg-primary py-3 px-4 rounded-t-lg flex items-center gap-2 shadow-sm">
        <Menu className="h-5 w-5 text-primary-foreground" />
        <h2 className="font-bold text-primary-foreground uppercase text-sm md:text-base tracking-wide flex-1">
          Danh Mục Sản Phẩm
        </h2>
      </div>

      {/* List */}
      <div className="bg-card rounded-b-lg shadow-sm border border-border border-t-0 overflow-hidden">
        <ul className="flex flex-col">
          {categories.map((category, index) => (
            <li key={index}>
              <Link
                href="#"
                className="relative flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-200 group border-b border-border/50 last:border-0"
              >
                {/* Hover indicator line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-center" />

                <span className="group-hover:translate-x-1.5 transition-transform duration-200">
                  {category}
                </span>

                <ChevronRight className="h-4 w-4 text-primary/50 group-hover:text-primary transition-all duration-200 transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default CategorySidebar;
