"use client";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface AlbumImage {
  src: string;
  alt: string;
}

interface AlbumCardProps {
  title: string;
  description: string;
  date: string;
  images: AlbumImage[];
  category: string;
}

const AlbumCard = ({
  title,
  description,
  date,
  images,
  category,
}: AlbumCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = () => {
    setCurrentIndex(0);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleThumbnailClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  const thumbnailImage = images[0]?.src || "/placeholder.jpg";

  return (
    <>
      {/* Card - click anywhere to open lightbox */}
      <div
        onClick={openLightbox}
        className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-lg">
          {category}
        </div>

        {/* Image Count Badge */}
        <div className="absolute top-4 right-4 z-10 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {images.length} ảnh
        </div>

        {/* Thumbnail */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={thumbnailImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Hover overlay with eye icon */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {date}
            </span>
          </div>

          <h3 className="mb-2 text-xl font-bold text-text-heading transition-colors group-hover:text-primary">
            {title}
          </h3>

          <p className="line-clamp-2 text-sm text-gray-600">{description}</p>
        </div>
      </div>

      {/* Lightbox - click on backdrop to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-4 z-50 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Image - stopPropagation so clicking image doesn't close lightbox */}
          <div
            className="relative max-h-[80vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              width={1200}
              height={800}
              className="h-auto max-h-[80vh] w-auto max-w-full rounded-lg object-contain"
              priority
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 z-50 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Thumbnails - stopPropagation so clicking doesn't close lightbox */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto rounded-lg bg-black/50 p-2 backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((image, index) => (
              <button
                key={index}
                onClick={(e) => handleThumbnailClick(e, index)}
                className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg transition-all ${
                  currentIndex === index
                    ? "ring-2 ring-white"
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AlbumCard;
