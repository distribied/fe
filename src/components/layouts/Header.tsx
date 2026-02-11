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
import { useLocale } from "@/hooks/useLocale";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState<MockCategoryInfo[]>([]);
  const { href } = useLocale();

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
    { name: t("header.nav.home"), href: href(""), icon: Home },
    {
      name: t("header.nav.products"),
      href: href("products"),
      icon: Package,
    },
    { name: t("header.nav.about"), href: href("about"), icon: Info },
    { name: t("header.nav.news"), href: href("news"), icon: Newspaper },
    { name: t("header.nav.contact"), href: href("contact"), icon: Mail },
    { name: t("header.nav.album"), href: href("gallery"), icon: Image },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const [topHeaderHeight, setTopHeaderHeight] = useState(0);
  const topHeaderRef = useRef<HTMLDivElement>(null);

  // Measure header content height dynamically
  useEffect(() => {
    if (!topHeaderRef.current) return;

    const el = topHeaderRef.current;

    const updateHeight = () => {
      const height = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty(
        "--top-header-height",
        `${height}px`,
      );
      setTopHeaderHeight(height);
    };

    updateHeight();

    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
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
      {/* ===== TOP HEADER (ẨN KHI SCROLL) ===== */}
      <div
        ref={topHeaderRef}
        className="fixed top-0 left-0 right-0 z-50 bg-white"
        style={{
          transform: isScrolled
            ? `translateY(-${topHeaderHeight}px)`
            : "translateY(0)",
          transition: "transform 400ms ease",
          willChange: "transform",
        }}
      >
        {/* Top bar */}
        <div className="bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 text-white text-center text-xs">
          <div className="py-1.5 md:py-2 relative">
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              style={{ animation: "shimmer 2s ease-in-out infinite" }}
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
          <div className="container mx-auto px-4 py-3 md:py-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              {/* Logo */}
              <Link
                href={href("")}
                className="flex items-center gap-2 md:gap-3 group"
              >
                <img
                  src="/ui/logo.png"
                  alt="Kiều Sâm"
                  className="h-14 w-14 md:h-20 md:w-20 object-contain group-hover:scale-105 transition-transform"
                />
                <div>
                  <h1 className="font-serif text-primary italic font-bold text-lg md:text-xl lg:text-2xl ml-2 md:ml-4">
                    <span className="group-hover:text-emerald-600 transition-colors">
                      Cơ Sở Mây Tre Lá Kiều Sâm
                    </span>
                  </h1>
                  <p className="text-muted-foreground italic text-xs md:text-sm ml-2 md:ml-4 group-hover:text-primary transition-colors">
                    Chuyên sỉ & lẻ sản phẩm mây tre lá các loại
                  </p>
                </div>
              </Link>

              {/* Desktop search + hotline */}
              <div className="hidden md:flex items-center gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t("header.search_placeholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-2 border-primary/20 rounded-full py-2.5 px-4 pr-10 w-64 text-sm focus:outline-none bg-white"
                  />
                  <Search className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-primary/60" />
                </div>

                <div className="flex items-center gap-2 bg-primary/5 rounded-full px-4 py-2.5 border-2 border-primary/30">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-sm font-bold text-primary">
                    0907.882.878
                  </span>
                </div>

                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== NAVBAR (LUÔN HIỂN THỊ) ===== */}
      <nav
        className="fixed left-0 right-0 z-40 bg-gradient-to-r from-primary via-emerald-600 to-primary shadow-lg"
        style={{
          top: isScrolled ? 0 : "var(--top-header-height)",
          transition: "top 400ms ease",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Category */}
            <div className="relative" ref={categoryRef}>
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="bg-black/10 text-white py-3.5 px-4 md:px-6 flex items-center gap-2 font-bold border-r border-white/20"
              >
                <Menu className="h-5 w-5" />
                <span className="hidden md:inline">
                  {t("header.category_menu")}
                </span>
              </button>

              <div
                className={`absolute top-full left-0 w-72 bg-white border-2 border-primary/30 rounded-b-2xl shadow-2xl transition-all ${
                  isCategoryOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={href(`products?category=${c.slug.vi}`)}
                    className="block px-5 py-3 text-sm font-semibold hover:bg-primary/10"
                    onClick={() => setIsCategoryOpen(false)}
                  >
                    {getCategoryName(c, i18n.language)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white py-3.5 px-6 font-semibold hover:bg-white/15"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-white p-3"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <ChevronDown
                className={`h-6 w-6 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-white/20 mt-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-white py-3 px-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 py-3">
                <LanguageSwitcher />
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ===== SPACER ===== */}
      <div
        style={{
          height: `calc(var(--top-header-height) + 56px)`,
        }}
      />
    </>
  );
};

export default Header;
