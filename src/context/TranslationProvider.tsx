"use client";

import { ReactNode, useEffect, useState } from "react";
import { LanguageProvider, SupportedLanguage } from "@/context/LanguageContext";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";

interface TranslationProviderProps {
  children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [defaultLanguage, setDefaultLanguage] =
    useState<SupportedLanguage>("vi");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Load persisted language preference
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem(
        "i18nextLng",
      ) as SupportedLanguage | null;
      if (savedLang && ["vi", "en", "zh", "ja", "ko"].includes(savedLang)) {
        setDefaultLanguage(savedLang);
      }
      setIsInitialized(true);
    }
  }, []);

  if (!isInitialized) {
    return null; // Prevent flash of wrong language
  }

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider defaultLanguage={defaultLanguage}>
        {children}
      </LanguageProvider>
    </I18nextProvider>
  );
}
