import { Phone, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    { name: "Trang Chủ", href: "#" },
    { name: "Giới Thiệu", href: "#gioi-thieu" },
    { name: "Album Hoạt Động", href: "#album" },
    { name: "Tin Tức & Video", href: "#tin-tuc" },
    { name: "Liên Hệ", href: "#lien-he" },
  ];

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
            <div className="flex items-center gap-3">
              <img src={logo} alt="Dạ Lý Hương" className="h-16 w-16 object-contain" />
              <div>
                <h1 className="text-xl md:text-2xl font-serif text-primary italic font-bold">
                  Cơ Sở Mây Tre Lá Dạ Lý Hương
                </h1>
                <p className="text-sm text-muted-foreground italic">
                  Chuyên sỉ & lẻ sản phẩm mây tre lá các loại
                </p>
              </div>
            </div>

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
            <button className="bg-primary text-primary-foreground py-3 px-4 flex items-center gap-2 font-semibold border-r border-primary-foreground/20">
              <Menu className="h-5 w-5" />
              <span className="hidden md:inline">DANH MỤC SẢN PHẨM</span>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-primary-foreground py-3 px-6 font-medium hover:bg-primary-foreground/10 transition-colors"
                >
                  {item.name}
                </a>
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
                <a
                  key={index}
                  href={item.href}
                  className="block text-primary-foreground py-3 px-4 hover:bg-primary-foreground/10 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
