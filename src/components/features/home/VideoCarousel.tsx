"use client";

import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";

const videos = [
  {
    id: "N3WY97SNKhs",
    thumbnail: "/youtube/video-1.png",
    title: "Mây Tre Lá Kiều Sâm — Câu chuyện làng nghề",
  },
  {
    id: "JsG9BZjtyDU",
    thumbnail: "/youtube/video-2.png",
    title: "Khám phá xưởng thủ công Kiều Sâm",
  },
];

const VideoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [playing, setPlaying] = useState<Record<number, boolean>>({});
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const endX = useRef(0);

  useEffect(() => {
    const hasPlaying = Object.values(playing).some(Boolean);
    if (hasPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % videos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [playing]);

  const goToSlide = (index: number) => setCurrentSlide(index);

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    startX.current = clientX;
    endX.current = clientX;
  };

  const handleMove = (clientX: number) => {
    if (isDragging) endX.current = clientX;
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = startX.current - endX.current;
    const threshold = 50;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        setCurrentSlide((prev) => (prev + 1) % videos.length);
      } else {
        setCurrentSlide((prev) => (prev - 1 + videos.length) % videos.length);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) =>
    handleStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) =>
    handleMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleEnd();

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleMouseUp = () => handleEnd();
  const handleMouseLeave = () => {
    if (isDragging) handleEnd();
  };

  const playVideo = (index: number) =>
    setPlaying((prev) => ({ ...prev, [index]: true }));

  return (
    <div
      className="relative overflow-hidden rounded-lg cursor-grab active:cursor-grabbing select-none bg-black"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="w-full flex-shrink-0 relative aspect-video"
          >
            {playing[index] ? (
              <iframe
                src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => playVideo(index)}
                className="group relative block w-full h-full"
                aria-label={`Phát video: ${video.title}`}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600 group-hover:bg-red-700 transition-all duration-300 group-hover:scale-110 flex items-center justify-center shadow-xl">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] text-left">
                    {video.title}
                  </h3>
                </div>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {videos.map((video, index) => (
          <button
            key={video.id}
            onClick={() => goToSlide(index)}
            aria-label={`Đến video ${index + 1}`}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              index === currentSlide ? "bg-primary" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
