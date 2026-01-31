"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-muted/50 to-background p-4 text-center">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-lg">
        {/* Logo with floating animation */}
        <div className="mb-6 animate-bounce-slow">
          <div className="relative w-50 h-50 md:w-50 md:h-50 bg-white shadow-xl rounded-full flex items-center justify-center p-4 ring-4 ring-primary/10">
            <Image
              src="/logo.png"
              alt="Mây Tre Lá Kiều Sâm"
              width={200}
              height={200}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-8xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary/80 to-primary/50 mb-2 font-serif">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Không tìm thấy trang
        </h2>
        <p className="text-muted-foreground mb-8 text-lg max-w-sm mx-auto">
          Có vẻ như trang bạn đang tìm kiếm không tồn tại hoặc đã được chuyển
          đi.
        </p>

        {/* Action Button */}
        <Link
          href="/"
          className="group relative inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-lg font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <span className="mr-2">Về trang chủ</span>
         
        </Link>
      </div>

      {/* Custom Animation for "bounce-slow" if not exists, we can add inline style or just rely on generic animation */}
      <style jsx global>{`
        @keyframes custom-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: custom-float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
