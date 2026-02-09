"use client";
import { useParams } from "next/navigation";

export function useLocale() {
  const params = useParams();
  const lang = params.lang as "vi" | "en";

  const href = (path: string) => {
    // Handle empty path for homepage
    if (!path || path === "/") {
      return `/${lang}`;
    }
    // Remove leading slash if exists to avoid double slash
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `/${lang}/${cleanPath}`;
  };

  return { lang, href };
}
