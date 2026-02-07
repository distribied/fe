"use client";

import {
  Phone,
  Search,
  Menu,
  ChevronDown,
  Home,
  Info,
  Image,
  Newspaper,
  Mail,
  Sparkles,
  Package,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "../features/languages/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import {
  getCategoryName,
  MockCategoryInfo,
  mockFetchCategoriesInfo,
} from "@/data/mock-data";
import { useParams } from "next/navigation";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState<MockCategoryInfo[]>([]);
  const params = useParams();
  const lang = params.lang as "vi" | "en";

  // Fetch categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await mockFetchCategoriesInfo();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };

    loadCategories();
  }, []);

  const navItems = [
    { name: t("header.nav.home"), href: `/${lang}`, icon: Home },
    {
      name: t("header.nav.products"),
      href: `/${lang}/products`,
      icon: Package,
    },
    { name: t("header.nav.about"), href: `/${lang}/about`, icon: Info },
    { name: t("header.nav.news"), href: `/${lang}/news`, icon: Newspaper },
    { name: t("header.nav.contact"), href: `/${lang}/contact`, icon: Mail },
    { name: t("header.nav.album"), href: `/${lang}/gallery`, icon: Image },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerContentHeight, setHeaderContentHeight] = useState(0);
  const categoryRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerContentRef = useRef<HTMLDivElement>(null);

  // Measure header content height dynamically
  useEffect(() => {
    const measureHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.getBoundingClientRect().height;

        document.documentElement.style.setProperty(
          "--header-height",
          `${height}px`,
        );

        setHeaderContentHeight(height);
      }
    };

    measureHeight();
    window.addEventListener("resize", measureHeight);
    return () => window.removeEventListener("resize", measureHeight);
  }, []);

  // Scroll handler using requestAnimationFrame to avoid layout thrashing
  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only update if scroll position actually changed
      if (currentScrollY === lastScrollY) return;

      if (!ticking) {
        globalThis.requestAnimationFrame(() => {
          // Simple threshold - hide header after scrolling past 80px
          setIsScrolled(currentScrollY > 80);
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <>
      {/* Fixed header wrapper - slides up when scrolled */}
      <div
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50"
        style={
          {
            transform: isScrolled
              ? `translateY(-${headerContentHeight}px)`
              : "translateY(0)",
            transition: "transform 450ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            willChange: "transform",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          } as React.CSSProperties
        }
      >
        {/* Scrollable header content */}
        <div
          ref={headerContentRef}
          style={
            {
              opacity: isScrolled ? 0 : 1,
              transition: "opacity 350ms cubic-bezier(0.4, 0, 0.2, 1)",
              pointerEvents: isScrolled ? "none" : "auto",
            } as React.CSSProperties
          }
        >
          {/* Top bar */}
          <div className="bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 text-white text-center text-xs">
            <div className="py-1.5 md:py-2 relative">
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{
                  animation: "shimmer 2s ease-in-out infinite",
                }}
              />

              <div className="relative font-semibold tracking-wide drop-shadow-md flex items-center justify-center gap-1.5">
                <Sparkles className="h-3 w-3" />
                <span>{t("header.address")}</span>
                <Sparkles className="h-3 w-3" />
              </div>
            </div>
          </div>

          {/* Main header */}
          <div className="bg-white">
            <div className="container mx-auto px-4 py-3 md:py-4 relative">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                {/* Logo */}
                <Link
                  href="/"
                  className="flex items-center gap-2 md:gap-3 group"
                >
                  <div className="transform group-hover:scale-105 transition-transform duration-200">
                    <img
                      src="/ui/logo.png"
                      alt="Kiều Sâm"
                      className="h-14 w-14 md:h-20 md:w-20 object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="font-serif text-primary italic font-bold text-lg md:text-xl lg:text-2xl ml-2 md:ml-4">
                      <span className="group-hover:text-emerald-600 transition-colors duration-300">
                        Cơ Sở Mây Tre Lá Kiều Sâm
                      </span>
                    </h1>
                    <p className="text-muted-foreground italic text-xs md:text-sm ml-2 md:ml-4 group-hover:text-primary transition-colors duration-200">
                      Chuyên sỉ & lẻ sản phẩm mây tre lá các loại
                    </p>
                  </div>
                </Link>

                {/* Search and Contact - Desktop */}
                <div className="hidden md:flex items-center gap-4 flex-wrap">
                  {/* Search */}
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder={t("header.search_placeholder")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border-2 border-primary/20 rounded-full py-2.5 px-4 pr-10 w-64 text-sm focus:outline-none bg-white transition-all duration-200 hover:border-primary/40 focus:border-primary/60"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/60 hover:text-primary transition-colors duration-200">
                      <Search className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Hotline */}
                  <div className="flex items-center gap-2 text-foreground bg-primary/5 rounded-full px-4 py-2.5 border-2 border-primary/30 hover:border-primary/50 transition-all duration-200">
                    <Phone className="h-5 w-5 text-primary" />
                    <div className="text-sm">
                      <span className="text-muted-foreground font-medium">
                        {t("header.hotline")}:{" "}
                      </span>
                      <span className="font-bold text-primary">
                        0907.882.878
                      </span>
                    </div>
                  </div>

                  {/* Language Switcher */}
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation - Always visible, part of the fixed header */}
        <nav className="bg-gradient-to-r from-primary via-emerald-600 to-primary shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Category dropdown */}
              <div className="relative" ref={categoryRef}>
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="bg-black/10 text-white py-3.5 px-4 md:px-6 flex items-center gap-2 font-bold border-r-2 border-white/20 hover:bg-white/20 transition-all duration-200"
                >
                  <Menu className="h-5 w-5" />
                  <span className="hidden md:inline tracking-wide">
                    {t("header.category_menu")}
                  </span>
                </button>

                {/* Category dropdown */}
                <div
                  className={`absolute top-full left-0 w-72 bg-white border-2 border-primary/30 rounded-b-2xl shadow-2xl z-50 max-h-96 overflow-y-auto transition-all duration-200 ${
                    isCategoryOpen
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-2 invisible"
                  }`}
                >
                  <ul className="py-2">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          href={`/${lang}/products?category=${category.slug.vi}`}
                          className="block px-5 py-3 text-sm font-semibold text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-150 border-l-4 border-transparent hover:border-primary"
                          onClick={() => setIsCategoryOpen(false)}
                        >
                          {getCategoryName(category, i18n.language)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white py-3.5 px-6 font-semibold hover:bg-white/15 transition-all duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden text-white p-3 transition-all duration-200 active:scale-90 hover:bg-white/10 rounded-lg"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <ChevronDown
                  className={`h-6 w-6 transition-transform duration-200 ${
                    isMenuOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            </div>

            {/* Mobile nav */}
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
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 text-white py-3 px-4 hover:bg-white/10 transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
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
      </div>

      {/* Spacer - maintains layout space for the entire header */}
      <div className="h-[var(--header-height)]" />
    </>
  );
};

export default Header;
