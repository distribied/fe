"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/slide-1.png",
    title: "Mây Tre Lá Kiều Sâm",
    subtitle: "Sản phẩm thủ công truyền thống Việt Nam",
  },
  {
    image: "/slide-2.png",
    title: "Túi Lục Bình Thêu Hoa",
    subtitle: "Thiết kế độc đáo, thân thiện môi trường",
  },
  {
    image: "/slide-3.png",
    title: "Túi Cỏ Bàng Đeo Chéo",
    subtitle: "Sản phẩm thủ công cao cấp",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 relative aspect-[16/9]"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
              <div className="text-center text-primary-foreground">
                <h2 className="text-2xl md:text-4xl font-bold mb-2">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full shadow-lg transition-colors"
      >
        <ChevronLeft className="h-6 w-6 text-foreground" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full shadow-lg transition-colors"
      >
        <ChevronRight className="h-6 w-6 text-foreground" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-primary" : "bg-background/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
