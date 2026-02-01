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
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  
  const categories = [
    t("header.categories.gift_boxes"),
    t("header.categories.grass_wallet"),
    t("header.categories.palm_bags_painted"),
    t("header.categories.grass_bags_painted"),
    t("header.categories.hyacinth_bags_painted"),
    t("header.categories.mixed_products"),
    t("header.categories.wicker_trays"),
    t("header.categories.grass_bags"),
    t("header.categories.bamboo_products"),
    t("header.categories.hyacinth_baskets"),
    t("header.categories.straw_baskets"),
    t("header.categories.palm_baskets"),
    t("header.categories.cat_houses"),
    t("header.categories.storage_baskets"),
    t("header.categories.mats"),
  ];

  const navItems = [
    { name: t("header.nav.home"), href: "/", icon: Home },
    { name: t("header.nav.about"), href: "#gioi-thieu", icon: Info },
    { name: t("header.nav.news"), href: "#tin-tuc", icon: Newspaper },
    { name: t("header.nav.contact"), href: "#lien-he", icon: Mail },
    { name: t("header.nav.album"), href: "#album", icon: Image },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const categoryRef = useRef<HTMLDivElement>(null);

  // Smooth progressive scroll handler - NO JERKS!
  useEffect(() => {
    let ticking = false;
    const MAX_SCROLL = 150; // Distance to fully hide header

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        // Calculate smooth progress from 0 to 1
        const progress = Math.min(scrollY / MAX_SCROLL, 1);
        setScrollProgress(progress);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate smooth values based on scroll progress
  const bannerHeight = Math.max(0, 1 - scrollProgress);
  const headerHeight = Math.max(0, 1 - scrollProgress);

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
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top bar - SMOOTH PROGRESSIVE SHRINK */}
      <div
        className="relative overflow-hidden transition-all duration-200 ease-out"
        style={{
          maxHeight: `${bannerHeight * 40}px`,
          display: scrollProgress >= 0.99 ? 'none' : 'block',
        }}
      >
        <div className="bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 animate-gradient-shift text-white text-center text-xs py-1.5 md:py-2 relative shadow-lg">
          {/* Lightning-fast shimmer effects */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
            style={{
              animation: "shimmer 1.5s ease-in-out infinite",
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent translate-x-full"
            style={{
              animation: "shimmer 2s ease-in-out infinite reverse",
            }}
          />
          
          {/* Dynamic sparkle decorations */}
          <div className="absolute left-[5%] top-1/2 -translate-y-1/2">
            <Star className="h-2.5 w-2.5 md:h-3 md:w-3 text-yellow-300 animate-sparkle fill-yellow-300" />
          </div>
          <div className="absolute right-[5%] top-1/2 -translate-y-1/2">
            <Star className="h-2.5 w-2.5 md:h-3 md:w-3 text-yellow-300 animate-sparkle fill-yellow-300" style={{ animationDelay: "0.5s" }} />
          </div>
          
          <div className="relative font-semibold tracking-wide drop-shadow-md flex items-center justify-center gap-1.5">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent animate-text-shimmer">
              {t("header.address")}
            </span>
            <Sparkles className="h-3 w-3 animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>
      </div>

      {/* Main header - SMOOTH PROGRESSIVE SHRINK */}
      <div
        className="relative overflow-hidden bg-white border-b-2 border-primary/10 transition-all duration-200 ease-out"
        style={{
          maxHeight: `${headerHeight * 120}px`,
          display: scrollProgress >= 0.99 ? 'none' : 'block',
        }}
      >
        {/* Subtle animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-green-500/20 animate-gradient-shift" />
        </div>
        
        <div className="container mx-auto px-4 py-3 md:py-4 relative">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Logo - NO GLOW, clean and crisp */}
            <Link href="/" className="flex items-center gap-2 md:gap-3 group animate-slide-in-left">
              <div className="relative transform group-hover:scale-105 transition-transform duration-200">
                <img
                  src="/logo.png"
                  alt="Kiều Sâm"
                  className="h-14 w-14 md:h-20 md:w-20 object-contain"
                />
                {/* Decorative corner accent */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-pop-in" />
              </div>
              <div>
                <h1 className="font-serif text-primary italic font-bold text-lg md:text-xl lg:text-2xl ml-2 md:ml-4 relative">
                  <span className="bg-gradient-to-r from-primary via-emerald-600 to-primary bg-clip-text text-transparent group-hover:from-emerald-600 group-hover:via-green-500 group-hover:to-emerald-600 transition-all duration-300">
                    Cơ Sở Mây Tre Lá Kiều Sâm
                  </span>
                  {/* Underline animation */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-emerald-600 group-hover:w-full transition-all duration-300" />
                </h1>
                <p className="text-muted-foreground italic text-xs md:text-sm ml-2 md:ml-4 group-hover:text-primary transition-colors duration-200">
                  Chuyên sỉ & lẻ sản phẩm mây tre lá các loại
                </p>
              </div>
            </Link>

            {/* Search and Contact - Desktop with snappy animations */}
            <div className="hidden md:flex items-center gap-4 flex-wrap animate-slide-in-right">
              {/* Search with instant feedback */}
              <div className="relative group">
                <input
                  type="text"
                  placeholder={t("header.search_placeholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="relative border-2 border-primary/20 rounded-full py-2.5 px-4 pr-10 w-64 text-sm focus:outline-none bg-white transition-all duration-200 hover:border-primary/40 hover:shadow-md"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/60 hover:text-primary transition-all duration-200 hover:scale-110 active:scale-95">
                  <Search className="h-4 w-4" />
                </button>
              </div>

              {/* Hotline with eye-catching pulse */}
              <div className="flex items-center gap-2 text-foreground bg-gradient-to-r from-primary/5 to-emerald-500/5 rounded-full px-4 py-2.5 border-2 border-primary/30 hover:border-primary/50 hover:shadow-lg transition-all duration-200 group cursor-pointer">
                <div className="relative">
                  <Phone className="h-5 w-5 text-primary group-hover:rotate-12 transition-transform duration-200" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground font-medium">{t("header.hotline")}: </span>
                  <span className="font-bold text-primary group-hover:text-emerald-600 transition-colors duration-200">0907.882.878</span>
                </div>
              </div>

              {/* Language Switcher */}
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - ALWAYS VISIBLE with premium effects */}
      <nav className="bg-gradient-to-r from-primary via-emerald-600 to-primary shadow-xl relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Category dropdown - SUPER FLASHY */}
            <div className="relative" ref={categoryRef}>
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="bg-black/10 backdrop-blur-sm text-white py-3.5 px-4 md:px-6 flex items-center gap-2 font-bold border-r-2 border-white/20 hover:bg-white/20 transition-all duration-200 group relative overflow-hidden"
              >
                {/* Ultra-fast hover shine */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                
                <Menu className="h-5 w-5 group-hover:rotate-90 transition-transform duration-200" />
                <span className="hidden md:inline relative z-10 tracking-wide">
                  {t("header.category_menu")}
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-all duration-200 ${
                    isCategoryOpen ? "rotate-180 text-yellow-300" : "rotate-0"
                  }`}
                />
                
                {/* Decorative accent */}
                <span
                  className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400 transition-all duration-200"
                  style={{
                    opacity: isCategoryOpen ? 1 : 0,
                    transform: isCategoryOpen ? 'scaleX(1)' : 'scaleX(0)',
                  }}
                />
              </button>

              {/* Category dropdown - FAST & SNAPPY with solid background */}
              <div
                className={`absolute top-full left-0 w-72 bg-white border-2 border-primary/30 rounded-b-2xl shadow-2xl z-50 max-h-96 overflow-y-auto transition-all duration-200 ${
                  isCategoryOpen
                    ? "opacity-100 translate-y-0 visible scale-100"
                    : "opacity-0 -translate-y-4 invisible scale-95"
                }`}
              >
                <ul className="py-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="block px-5 py-3 text-sm font-semibold text-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:to-emerald-500/10 hover:text-primary transition-all duration-150 border-l-4 border-transparent hover:border-primary hover:shadow-md group"
                        onClick={() => setIsCategoryOpen(false)}
                      >
                        <span className="group-hover:translate-x-2 inline-block transition-transform duration-150 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                          {category}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Desktop nav - DYNAMIC HOVER */}
            <div className="hidden md:flex items-center">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="relative text-white py-3.5 px-6 font-semibold hover:bg-white/15 transition-all duration-200 group overflow-hidden"
                >
                  {/* Fast slide effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-200" />
                  <span className="relative z-10 group-hover:text-yellow-200 transition-colors duration-200 flex items-center gap-1.5">
                    {item.name}
                    <span className="w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-200 absolute -bottom-1 left-0" />
                  </span>
                </Link>
              ))}
            </div>

            {/* Mobile menu toggle - SMOOTH MORPH */}
            <button
              className="md:hidden text-white p-3 transition-all duration-200 active:scale-90 hover:bg-white/10 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative w-6 h-6">
                <X 
                  className={`absolute inset-0 transition-all duration-200 ${
                    isMenuOpen ? "rotate-0 opacity-100 scale-100" : "rotate-90 opacity-0 scale-50"
                  }`} 
                />
                <Menu 
                  className={`absolute inset-0 transition-all duration-200 ${
                    isMenuOpen ? "-rotate-90 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"
                  }`} 
                />
              </div>
            </button>
          </div>

          {/* Mobile nav - FAST DROPDOWN */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
              isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-t border-white/20 pt-3 pb-3">
              {/* Mobile Search */}
              <div className="px-4 pb-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t("header.search_placeholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-2 border-white/30 rounded-full py-2.5 px-4 pr-10 w-full text-sm focus:outline-none bg-white transition-all duration-200 hover:border-white/50"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-emerald-600 transition-colors duration-150">
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
                    className="flex items-center gap-3 text-white py-3 px-4 hover:bg-white/10 transition-all duration-200 group border-l-4 border-transparent hover:border-yellow-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5 group-hover:scale-110 group-hover:text-yellow-300 transition-all duration-200" />
                    <span className="group-hover:translate-x-1 group-hover:text-yellow-100 transition-all duration-200">{item.name}</span>
                  </Link>
                );
              })}

              {/* Mobile Language Switcher */}
              <div className="px-4 py-3 border-t border-white/20 mt-2">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
