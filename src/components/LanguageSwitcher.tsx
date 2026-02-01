"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { SupportedLanguage } from "@/context/LanguageContext";
import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { currentLanguage, setLanguage, supportedLanguages } = useLanguage();
  const { i18n } = useTranslation();

  const handleLanguageChange = (langCode: SupportedLanguage) => {
    setLanguage(langCode);
    i18n.changeLanguage(langCode);
  };

  return (
    <div className="flex items-center gap-2">
      {supportedLanguages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code as SupportedLanguage)}
          className={`text-2xl hover:scale-110 transition-transform ${
            lang.code === currentLanguage
              ? "opacity-100 scale-110"
              : "opacity-60 hover:opacity-100"
          }`}
          aria-label={`Change language to ${lang.name}`}
          title={lang.name}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  );
}
