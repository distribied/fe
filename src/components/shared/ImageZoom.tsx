"use client";

import { useState, useRef, MouseEvent } from "react";

interface ImageZoomProps {
  src: string;
  alt: string;
  zoomScale?: number;
  lensSize?: number;
}

export default function ImageZoom({
  src,
  alt,
  zoomScale = 1.8,
  lensSize = 150,
}: Readonly<ImageZoomProps>) {
  const [showZoom, setShowZoom] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const imageRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    const halfLens = lensSize / 2;

    x = Math.max(halfLens, Math.min(x, rect.width - halfLens));
    y = Math.max(halfLens, Math.min(y, rect.height - halfLens));

    const lensX = x - halfLens;
    const lensY = y - halfLens;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setLensPosition({ x: lensX, y: lensY });
    setZoomPosition({ x: xPercent, y: yPercent });
  };

  return (
    <>
      {/* Image + Lens */}
      <button
        ref={imageRef}
        type="button"
        aria-label="Zoom image"
        className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted text-left focus:outline-none"
        style={{ cursor: "zoom-in" }}
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Lens */}
        {showZoom && (
          <div
            className="absolute hidden lg:block pointer-events-none border-2 border-primary"
            style={{
              left: `${lensPosition.x}px`,
              top: `${lensPosition.y}px`,
              width: `${lensSize}px`,
              height: `${lensSize}px`,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            }}
          />
        )}
      </button>

      {/* Zoom popup */}
      {showZoom && imageRef.current && (
        <div
          className="fixed z-50 hidden lg:block pointer-events-none"
          style={{
            left: `${imageRef.current.getBoundingClientRect().right + 16}px`,
            top: `${imageRef.current.getBoundingClientRect().top}px`,
            width: `${imageRef.current.offsetWidth}px`,
            height: `${imageRef.current.offsetHeight}px`,
          }}
        >
          <div className="w-full h-full overflow-hidden rounded-lg border-2 border-primary shadow-xl bg-white">
            <div
              className="w-full h-full select-none"
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: `${zoomScale * 100}%`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
