"use client";

import {
  Phone,
  Search,
  Menu,
  X,
  ChevronDown,
  Home,
  Info,
  Image,
  Newspaper,
  Mail,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: "Trang Chủ", href: "/", icon: Home },
    { name: "Giới Thiệu", href: "#gioi-thieu", icon: Info },
    { name: "Album Hoạt Động", href: "#album", icon: Image },
    { name: "Tin Tức & Video", href: "#tin-tuc", icon: Newspaper },
    { name: "Liên Hệ", href: "#lien-he", icon: Mail },
  ];

  // Scroll handler with hysteresis to prevent jittering
  useEffect(() => {
    let ticking = false;

    // Hysteresis thresholds to prevent rapid toggling
    const SCROLL_DOWN_THRESHOLD = 50; // Trigger scrolled state when scrolling down past this
    const SCROLL_UP_THRESHOLD = 20; // Only un-trigger when scrolling up past this

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Use hysteresis: different thresholds for scrolling up vs down
        if (!isScrolled && scrollY > SCROLL_DOWN_THRESHOLD) {
          setIsScrolled(true);
        } else if (isScrolled && scrollY < SCROLL_UP_THRESHOLD) {
          setIsScrolled(false);
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar with address - hide on scroll */}
      <div
        className={`bg-primary text-primary-foreground text-center text-xs md:text-sm overflow-hidden ${
          isScrolled ? "h-0" : "h-8 md:h-10"
        }`}
        style={{ transition: "height 150ms ease-out" }}
      >
        <span className="whitespace-nowrap leading-8 md:leading-10 block">
          Địa chỉ: 42 Hồ Bá Phấn - P.Phước Long A - Quận 9 - TPHCM
        </span>
      </div>

      {/* Main header */}
      <div
        className={`bg-background border-b border-border ${
          isScrolled ? "py-1 md:py-2 shadow-md" : "py-2 md:py-4"
        }`}
        style={{
          transition: "padding 150ms ease-out, box-shadow 150ms ease-out",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 md:gap-3 group">
              <img
                src="/logo.png"
                alt="Kiều Sâm"
                className={`object-contain ${
                  isScrolled
                    ? "h-10 w-10 md:h-12 md:w-12"
                    : "h-14 w-14 md:h-20 md:w-20"
                }`}
                style={{
                  transition: "width 150ms ease-out, height 150ms ease-out",
                }}
              />
              <div>
                <h1
                  className={`font-serif text-primary italic font-bold ${
                    isScrolled
                      ? "text-base md:text-lg"
                      : "text-lg md:text-xl lg:text-2xl"
                  }`}
                  style={{ transition: "font-size 150ms ease-out" }}
                >
                  Cơ Sở Mây Tre Lá Kiều Sâm
                </h1>
                <p
                  className={`text-muted-foreground italic ${
                    isScrolled ? "text-xs" : "text-xs md:text-sm"
                  }`}
                  style={{ transition: "font-size 150ms ease-out" }}
                >
                  Chuyên sỉ & lẻ sản phẩm mây tre lá các loại
                </p>
              </div>
            </Link>

            {/* Search and Contact - Desktop Only */}
            <div className="hidden md:flex items-center gap-4 flex-wrap">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Bạn cần tìm gì?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-input rounded-full py-2 px-4 pr-10 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background transition-shadow duration-150"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors duration-150">
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
                className="bg-primary text-primary-foreground py-3 px-4 flex items-center gap-2 font-semibold border-r border-primary-foreground/20 hover:bg-primary-foreground/10 transition-colors duration-150"
              >
                <Menu className="h-5 w-5" />
                <span className="hidden md:inline">DANH MỤC SẢN PHẨM</span>
                <ChevronDown
                  className="h-4 w-4 transition-transform duration-200 ease-out"
                  style={{
                    transform: isCategoryOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                />
              </button>

              {/* Category dropdown menu */}
              <div
                className="absolute top-full left-0 w-64 bg-card border border-border rounded-b-lg shadow-lg z-50 max-h-96 overflow-y-auto"
                style={{
                  opacity: isCategoryOpen ? 1 : 0,
                  transform: isCategoryOpen ? "scaleY(1)" : "scaleY(0.95)",
                  transformOrigin: "top",
                  visibility: isCategoryOpen ? "visible" : "hidden",
                  transition:
                    "opacity 200ms ease-out, transform 200ms ease-out, visibility 200ms",
                  willChange: isCategoryOpen ? "auto" : "opacity, transform",
                }}
              >
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
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-primary-foreground py-3 px-6 font-medium hover:bg-primary-foreground/10 transition-colors duration-150"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-primary-foreground p-3 transition-transform duration-150 active:scale-95"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile nav and search */}
          <div
            className="md:hidden overflow-hidden"
            style={{
              maxHeight: isMenuOpen ? "500px" : "0",
              opacity: isMenuOpen ? 1 : 0,
              transition: "max-height 250ms ease-out, opacity 250ms ease-out",
              willChange: isMenuOpen ? "auto" : "max-height, opacity",
            }}
          >
            <div className="border-t border-primary-foreground/20 pt-3 pb-3">
              {/* Mobile Search Bar */}
              <div className="px-4 pb-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Bạn cần tìm gì?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-input rounded-full py-2 px-4 pr-10 w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background transition-shadow duration-150"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors duration-150">
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Mobile Nav Links */}
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 text-primary-foreground py-3 px-4 hover:bg-primary-foreground/10 transition-colors duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
