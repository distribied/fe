import { Phone, Search, Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const categoryRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: "Trang Chủ", href: "/" },
    { name: "Giới Thiệu", href: "#gioi-thieu" },
    { name: "Album Hoạt Động", href: "#album" },
    { name: "Tin Tức & Video", href: "#tin-tuc" },
    { name: "Liên Hệ", href: "#lien-he" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar with address */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm">
        <span>Địa chỉ: 42 Hồ Bá Phấn - P.Phước Long A - Quận 9 - TPHCM</span>
      </div>

      {/* Main header */}
      <div className="bg-background border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Kiều Sâm" className="h-16 w-16 object-contain" />
              <div>
                <h1 className="text-xl md:text-2xl font-serif text-primary italic font-bold">
                  Cơ Sở Mây Tre Lá Kiều Sâm
                </h1>
                <p className="text-sm text-muted-foreground italic">
                  Chuyên sỉ & lẻ sản phẩm mây tre lá các loại
                </p>
              </div>
            </Link>

            {/* Search and Contact */}
            <div className="flex items-center gap-4 flex-wrap">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Bạn cần tìm gì?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-input rounded-full py-2 px-4 pr-10 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                  <Search className="h-4 w-4" />
                </button>
              </div>

              {/* Hotline */}
              <div className="flex items-center gap-2 text-foreground">
                <Phone className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <span className="text-muted-foreground">Hotline: </span>
                  <span className="font-bold">0905.584.119</span>
                  <span className="mx-1">|</span>
                  <span className="font-bold">0984.702.701</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Category dropdown button */}
            <div className="relative" ref={categoryRef}>
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="bg-primary text-primary-foreground py-3 px-4 flex items-center gap-2 font-semibold border-r border-primary-foreground/20 hover:bg-primary-foreground/10 transition-colors"
              >
                <Menu className="h-5 w-5" />
                <span className="hidden md:inline">DANH MỤC SẢN PHẨM</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Category dropdown menu */}
              {isCategoryOpen && (
                <div className="absolute top-full left-0 w-64 bg-card border border-border rounded-b-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                  <ul className="py-2">
                    {categories.map((category, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-foreground hover:bg-sidebar-accent transition-colors"
                          onClick={() => setIsCategoryOpen(false)}
                        >
                          {category}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="text-primary-foreground py-3 px-6 font-medium hover:bg-primary-foreground/10 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-primary-foreground p-3"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile nav */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-primary-foreground/20">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="block text-primary-foreground py-3 px-4 hover:bg-primary-foreground/10 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
