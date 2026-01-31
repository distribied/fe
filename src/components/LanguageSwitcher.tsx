"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { SupportedLanguage } from "@/context/LanguageContext";
import { ChevronDown, Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { currentLanguage, setLanguage, supportedLanguages } = useLanguage();
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = supportedLanguages.find(
    (lang) => lang.code === currentLanguage,
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: SupportedLanguage) => {
    setLanguage(langCode);
    i18n.changeLanguage(langCode); // This triggers the actual translation change
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm font-medium"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLang?.flag}</span>
        <span className="hidden md:inline">{currentLang?.name}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden animate-in fade-in-0 zoom-in-95">
          {supportedLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() =>
                handleLanguageChange(lang.code as SupportedLanguage)
              }
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted ${
                lang.code === currentLanguage
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground"
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span>{lang.name}</span>
              {lang.code === currentLanguage && (
                <span className="ml-auto text-primary">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
