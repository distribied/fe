"use client";

import { useState, useEffect, useRef } from "react";

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
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const endX = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    startX.current = clientX;
    endX.current = clientX;
  };

  const handleMove = (clientX: number) => {
    if (isDragging) {
      endX.current = clientX;
    }
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const diff = startX.current - endX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) =>
    handleStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) =>
    handleMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleEnd();

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleMouseUp = () => handleEnd();
  const handleMouseLeave = () => {
    if (isDragging) handleEnd();
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg cursor-grab active:cursor-grabbing select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
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
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent" />

            {/* Content Container */}
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
              <div className="text-center z-10">
                {/* Decorative Top Border */}
                <div
                  className={`flex items-center justify-center mb-4 md:mb-6 transition-all duration-1000 ease-out delay-100 ${
                    index === currentSlide
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform -translate-y-4"
                  }`}
                >
                  <div
                    className={`h-px bg-gradient-to-r from-transparent to-primary transition-all duration-1500 ease-out ${
                      index === currentSlide
                        ? "w-8 md:w-12 opacity-100"
                        : "w-0 opacity-0"
                    }`}
                  ></div>
                  <div className="mx-3 md:mx-4">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  </div>
                  <div
                    className={`h-px bg-gradient-to-l from-transparent to-primary transition-all duration-1500 ease-out ${
                      index === currentSlide
                        ? "w-8 md:w-12 opacity-100"
                        : "w-0 opacity-0"
                    }`}
                  ></div>
                </div>

                {/* Title - Shrink & Flow Effect */}
                <h2
                  className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-white transition-all duration-1000 ease-out ${
                    index === currentSlide
                      ? "opacity-100 transform translate-y-0 scale-100"
                      : "opacity-0 transform translate-y-12 scale-110"
                  }`}
                >
                  <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-foreground to-primary drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                    {slide.title}
                  </span>
                </h2>

                {/* Subtitle - Flow Effect with Delay */}
                <div
                  className={`relative inline-block transition-all duration-1000 ease-out delay-300 ${
                    index === currentSlide
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform translate-y-8"
                  }`}
                >
                  <i className="text-sm sm:text-base md:text-lg font-light text-white tracking-wide">
                    <span className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      ''{slide.subtitle}''
                    </span>
                  </i>
                </div>

                {/* Decorative Bottom Border */}
                <div
                  className={`flex items-center justify-center mt-4 md:mt-6 transition-all duration-1000 ease-out delay-500 ${
                    index === currentSlide
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform translate-y-4"
                  }`}
                >
                  <div
                    className={`h-px bg-gradient-to-r from-transparent to-primary transition-all duration-1500 ease-out ${
                      index === currentSlide
                        ? "w-8 md:w-12 opacity-100"
                        : "w-0 opacity-0"
                    }`}
                  ></div>
                  <div className="mx-3 md:mx-4">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  </div>
                  <div
                    className={`h-px bg-gradient-to-l from-transparent to-primary transition-all duration-1500 ease-out ${
                      index === currentSlide
                        ? "w-8 md:w-12 opacity-100"
                        : "w-0 opacity-0"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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
