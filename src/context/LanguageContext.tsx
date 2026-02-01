"use client";

import { createContext, useState, useCallback, ReactNode } from "react";
import { supportedLanguages } from "../common/languages";

export type SupportedLanguage = "vi" | "en";

export interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  supportedLanguages: { code: SupportedLanguage; name: string; flag: string }[];
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: SupportedLanguage;
}

export function LanguageProvider({
  children,
  defaultLanguage = "vi",
}: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] =
    useState<SupportedLanguage>(defaultLanguage);

  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setCurrentLanguage(lang);
    // Persist to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-language", lang);
    }
  }, []);

  return (
    <LanguageContext.Provider
      value={{ currentLanguage, setLanguage, supportedLanguages }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
