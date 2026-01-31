"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translations
import viTranslation from "../../public/locales/vi/translation.json";
import enTranslation from "../../public/locales/en/translation.json";
import zhTranslation from "../../public/locales/zh/translation.json";
import jaTranslation from "../../public/locales/ja/translation.json";
import koTranslation from "../../public/locales/ko/translation.json";

const resources = {
  vi: { translation: viTranslation },
  en: { translation: enTranslation },
  zh: { translation: zhTranslation },
  ja: { translation: jaTranslation },
  ko: { translation: koTranslation },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "vi",
    defaultNS: "translation",
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
