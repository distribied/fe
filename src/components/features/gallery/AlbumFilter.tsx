"use client";
import { useTranslation } from "react-i18next";

interface AlbumFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const AlbumFilter = ({ categories, activeCategory, onCategoryChange }: AlbumFilterProps) => {
  const { t } = useTranslation();

  return (
    <div className="mb-12">
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
              activeCategory === category
                ? "bg-primary text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg"
            }`}
          >
            {t(`album.categories.${category}`)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlbumFilter;
