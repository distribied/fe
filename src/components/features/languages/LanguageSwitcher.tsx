"use client";

import { usePathname, useRouter } from "next/navigation";

const languages = [
  { code: "vi", name: "Tiếng Việt", flag: "https://flagcdn.com/w80/vn.png" },
  { code: "en", name: "English", flag: "https://flagcdn.com/w80/gb.png" },
] as const;

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLang = pathname.split("/")[1] as "vi" | "en";

  const handleChange = (lang: "vi" | "en") => {
    if (lang === currentLang) return;

    const segments = pathname.split("/");
    segments[1] = lang;
    router.push(segments.join("/"));
  };

  return (
    <div className="flex items-center gap-3">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleChange(lang.code)}
          className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${
            lang.code === currentLang
              ? "scale-110 opacity-100 border-white shadow-lg"
              : "opacity-70 hover:opacity-100 hover:scale-105 border-transparent"
          }`}
          aria-label={`Change language to ${lang.name}`}
          title={lang.name}
        >
          <img
            src={lang.flag}
            alt={lang.name}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  );
}
