"use client";

import { Category } from "@/schemas";
import { useTranslation } from "react-i18next";
import Reveal from "@/components/ui/Reveal";

interface ProductsSidebarProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function ProductsSidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Readonly<ProductsSidebarProps>) {
  const { t } = useTranslation();

  return (
    <Reveal delay={0.1}>
      <div className="bg-card rounded-lg p-6 shadow-sm border sticky top-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {t("header.category_menu")}
        </h3>

        <div className="space-y-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            {t("header.categories.all")}
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id.toString())}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id.toString()
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
