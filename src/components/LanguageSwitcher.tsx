"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { SupportedLanguage } from "@/context/LanguageContext";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const flagIcons: Record<string, string> = {
  vi: "https://flagcdn.com/w80/vn.png",
  en: "https://flagcdn.com/w80/gb.png",
};

export function LanguageSwitcher() {
  const { currentLanguage, setLanguage, supportedLanguages } = useLanguage();
  const { i18n } = useTranslation();

  const handleLanguageChange = (langCode: SupportedLanguage) => {
    setLanguage(langCode);
    i18n.changeLanguage(langCode);
  };

  return (
    <div className="flex items-center gap-3">
      {supportedLanguages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code as SupportedLanguage)}
          className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-200 ${
            lang.code === currentLanguage
              ? "scale-110 opacity-100 border-white shadow-lg"
              : "scale-100 opacity-70 border-transparent hover:opacity-100 hover:scale-105 hover:border-white/30"
          }`}
          style={{
            background: 'transparent',
            padding: 0,
            cursor: 'pointer',
            outline: 'none'
          }}
          aria-label={`Change language to ${lang.name}`}
          title={lang.name}
        >
          <img
            src={flagIcons[lang.code]}
            alt={lang.name}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  );
}
