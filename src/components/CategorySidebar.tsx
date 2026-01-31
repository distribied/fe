import { ChevronRight } from "lucide-react";
const categories = ["Hộp Và Giỏ Quà Tết", "Ví Cỏ Bàng", "Túi Lá Buông Vẽ", "Túi Cỏ Bàng Vẽ", "Túi Lục Bình Vẽ", "Sản Phẩm Tổng Hợp", "Khay Mây Có Vải", "Túi Cỏ Bàng", "Sản Phẩm Tre", "Giỏ Lục Bình", "Giỏ Cói", "Giỏ Lá Buông", "Nhà Mèo Bằng Rơm, Cói", "Sọt Mây, Tre, Sọt Đựng Áo Quần", "Thảm Cói, Thảm Lục Bình"];
const CategorySidebar = () => {
  return <aside className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
      <ul className="divide-y divide-border">
        {categories.map((category, index) => <li key={index}>
            
          </li>)}
      </ul>
    </aside>;
};
export default CategorySidebar;