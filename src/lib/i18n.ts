"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations
import viTranslation from "../../public/locales/vi/translation.json";
import enTranslation from "../../public/locales/en/translation.json";

const resources = {
  vi: { translation: viTranslation },
  en: { translation: enTranslation },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  fallbackLng: "vi",
  interpolation: { escapeValue: false },
});

export default i18n;
