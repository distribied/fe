"use client";
import { useLocale } from "@/hooks/useLocale";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function Breadcrumb() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { href: baseHref } = useLocale();

  const segments = pathname.split("/").filter(Boolean);
  // Bỏ qua phần lang (segment đầu tiên)
  const pathSegments = segments.slice(1);

  return (
    <nav className="bg-emerald-900/5 border-b border-emerald-900/10">
      <div className="container mx-auto px-3 py-3">
        <ol className="flex items-center gap-1.5 flex-wrap text-sm">
          {/* Home */}
          <li>
            <Link
              href={baseHref("")}
              className="text-emerald-700 hover:text-emerald-600 transition-colors"
            >
              {t("header.nav.home")}
            </Link>
          </li>

          {pathSegments.map((segment, index) => {
            // Tạo path không bao gồm lang
            const pathWithoutLang = pathSegments.slice(0, index + 1).join("/");
            const isLast = index === pathSegments.length - 1;

            return (
              <li key={pathWithoutLang} className="flex items-center gap-1.5">
                {/* Separator */}
                <span className="text-emerald-700/40 select-none">/</span>

                {isLast ? (
                  /* Current page */
                  <span className="font-semibold text-emerald-900">
                    {segment}
                  </span>
                ) : (
                  <Link
                    href={baseHref(pathWithoutLang)}
                    className="text-emerald-700 hover:text-emerald-900 transition-colors"
                  >
                    {segment}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
