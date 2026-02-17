"use client";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import AlbumFilter from "@/components/features/gallery/AlbumFilter";
import AlbumCard from "@/components/features/gallery/AlbumCard";

export default function AlbumPage() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");

  // Categories
  const categories = [
    "all",
    "production",
    "events",
    "customers",
    "showroom",
  ];

  // Sample Albums Data - Replace images with your real ones
  const albums = [
    {
      id: 1,
      title: t("album.albums.production_process.title"),
      description: t("album.albums.production_process.description"),
      date: "15/01/2026",
      category: "production",
      images: [
        { src: "/albums/production/prod-1.jpg", alt: "Quy trình sản xuất 1" },
        { src: "/albums/production/prod-2.jpg", alt: "Quy trình sản xuất 2" },
        { src: "/albums/production/prod-3.jpg", alt: "Quy trình sản xuất 3" },
        { src: "/albums/production/prod-4.jpg", alt: "Quy trình sản xuất 4" },
        { src: "/albums/production/prod-5.jpg", alt: "Quy trình sản xuất 5" },
      ],
    },
    {
      id: 2,
      title: t("album.albums.artisan_work.title"),
      description: t("album.albums.artisan_work.description"),
      date: "10/01/2026",
      category: "production",
      images: [
        { src: "/albums/artisan/artisan-1.jpg", alt: "Nghệ nhân làm việc 1" },
        { src: "/albums/artisan/artisan-2.jpg", alt: "Nghệ nhân làm việc 2" },
        { src: "/albums/artisan/artisan-3.jpg", alt: "Nghệ nhân làm việc 3" },
        { src: "/albums/artisan/artisan-4.jpg", alt: "Nghệ nhân làm việc 4" },
      ],
    },
    {
      id: 3,
      title: t("album.albums.craft_fair_2025.title"),
      description: t("album.albums.craft_fair_2025.description"),
      date: "05/01/2026",
      category: "events",
      images: [
        { src: "/albums/events/fair-1.jpg", alt: "Hội chợ thủ công 1" },
        { src: "/albums/events/fair-2.jpg", alt: "Hội chợ thủ công 2" },
        { src: "/albums/events/fair-3.jpg", alt: "Hội chợ thủ công 3" },
        { src: "/albums/events/fair-4.jpg", alt: "Hội chợ thủ công 4" },
        { src: "/albums/events/fair-5.jpg", alt: "Hội chợ thủ công 5" },
        { src: "/albums/events/fair-6.jpg", alt: "Hội chợ thủ công 6" },
      ],
    },
    {
      id: 4,
      title: t("album.albums.exhibition_opening.title"),
      description: t("album.albums.exhibition_opening.description"),
      date: "28/12/2025",
      category: "events",
      images: [
        {
          src: "/albums/exhibition/exhibit-1.jpg",
          alt: "Khai trương triển lãm 1",
        },
        {
          src: "/albums/exhibition/exhibit-2.jpg",
          alt: "Khai trương triển lãm 2",
        },
        {
          src: "/albums/exhibition/exhibit-3.jpg",
          alt: "Khai trương triển lãm 3",
        },
        {
          src: "/albums/exhibition/exhibit-4.jpg",
          alt: "Khai trương triển lãm 4",
        },
      ],
    },
    {
      id: 5,
      title: t("album.albums.customer_testimonials.title"),
      description: t("album.albums.customer_testimonials.description"),
      date: "20/12/2025",
      category: "customers",
      images: [
        {
          src: "/albums/customers/customer-1.jpg",
          alt: "Khách hàng hài lòng 1",
        },
        {
          src: "/albums/customers/customer-2.jpg",
          alt: "Khách hàng hài lòng 2",
        },
        {
          src: "/albums/customers/customer-3.jpg",
          alt: "Khách hàng hài lòng 3",
        },
        {
          src: "/albums/customers/customer-4.jpg",
          alt: "Khách hàng hài lòng 4",
        },
        {
          src: "/albums/customers/customer-5.jpg",
          alt: "Khách hàng hài lòng 5",
        },
      ],
    },
    {
      id: 6,
      title: t("album.albums.corporate_orders.title"),
      description: t("album.albums.corporate_orders.description"),
      date: "15/12/2025",
      category: "customers",
      images: [
        { src: "/albums/corporate/corp-1.jpg", alt: "Đơn hàng doanh nghiệp 1" },
        { src: "/albums/corporate/corp-2.jpg", alt: "Đơn hàng doanh nghiệp 2" },
        { src: "/albums/corporate/corp-3.jpg", alt: "Đơn hàng doanh nghiệp 3" },
        { src: "/albums/corporate/corp-4.jpg", alt: "Đơn hàng doanh nghiệp 4" },
      ],
    },
    {
      id: 7,
      title: t("album.albums.showroom_space.title"),
      description: t("album.albums.showroom_space.description"),
      date: "10/12/2025",
      category: "showroom",
      images: [
        {
          src: "/albums/showroom/showroom-1.jpg",
          alt: "Không gian showroom 1",
        },
        {
          src: "/albums/showroom/showroom-2.jpg",
          alt: "Không gian showroom 2",
        },
        {
          src: "/albums/showroom/showroom-3.jpg",
          alt: "Không gian showroom 3",
        },
        {
          src: "/albums/showroom/showroom-4.jpg",
          alt: "Không gian showroom 4",
        },
        {
          src: "/albums/showroom/showroom-5.jpg",
          alt: "Không gian showroom 5",
        },
      ],
    },
    {
      id: 8,
      title: t("album.albums.product_display.title"),
      description: t("album.albums.product_display.description"),
      date: "05/12/2025",
      category: "showroom",
      images: [
        { src: "/albums/display/display-1.jpg", alt: "Trưng bày sản phẩm 1" },
        { src: "/albums/display/display-2.jpg", alt: "Trưng bày sản phẩm 2" },
        { src: "/albums/display/display-3.jpg", alt: "Trưng bày sản phẩm 3" },
        { src: "/albums/display/display-4.jpg", alt: "Trưng bày sản phẩm 4" },
      ],
    },
    {
      id: 9,
      title: t("album.albums.craft_workshop.title"),
      description: t("album.albums.craft_workshop.description"),
      date: "01/12/2025",
      category: "community",
      images: [
        { src: "/albums/workshop/workshop-1.jpg", alt: "Workshop dạy nghề 1" },
        { src: "/albums/workshop/workshop-2.jpg", alt: "Workshop dạy nghề 2" },
        { src: "/albums/workshop/workshop-3.jpg", alt: "Workshop dạy nghề 3" },
        { src: "/albums/workshop/workshop-4.jpg", alt: "Workshop dạy nghề 4" },
        { src: "/albums/workshop/workshop-5.jpg", alt: "Workshop dạy nghề 5" },
      ],
    },
  ];

  // Filter albums by category
  const filteredAlbums =
    activeCategory === "all"
      ? albums
      : albums.filter((album) => album.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent py-16">
        <div className="absolute inset-0 bg-[url('/patterns/handcraft-pattern.svg')] opacity-5" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold text-text-heading md:text-5xl">
              {t("album.hero_title")}
            </h1>
            <p className="text-lg text-gray-600">{t("album.hero_subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="container mx-auto px-4 py-12">
        <AlbumFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Albums Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAlbums.map((album) => (
            <AlbumCard
              key={album.id}
              title={album.title}
              description={album.description}
              date={album.date}
              images={album.images}
              category={t(`album.categories.${album.category}`)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredAlbums.length === 0 && (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
              <svg
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              {t("album.no_albums")}
            </h3>
            <p className="text-gray-600">{t("album.no_albums_description")}</p>
          </div>
        )}
      </section>
    </div>
  );
}
