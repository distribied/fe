"use client";

import { useEffect } from "react";
import i18n from "@/lib/i18n";
import { I18nextProvider } from "react-i18next";

export default function ClientI18nProvider({
  lang,
  children,
}: Readonly<{
  lang: "vi" | "en";
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
