import { SupportedLanguage } from "../context/LanguageContext";

export const supportedLanguages: {
  code: SupportedLanguage;
  name: string;
  flag: string;
}[] = [
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "en", name: "English", flag: "🇬🇧" },
];
