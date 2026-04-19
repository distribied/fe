"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { useCart } from "@/hooks/useCart";

const FloatingContact = () => {
  const { href } = useLocale();
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  const handleZaloClick = () => {
    const phoneNumber = "0907882878";
    const message = "Xin chào Kiều Sâm! Tôi muốn được tư vấn về sản phẩm.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://zalo.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  const handleFacebookClick = () => {
    const facebookPageId = "100083182335829";
    const message = "Xin chào Kiều Sâm! Tôi muốn được tư vấn về sản phẩm.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://m.me/${facebookPageId}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Facebook */}
      <button
        onClick={handleFacebookClick}
        className="group relative"
        title="Chat on Facebook"
      >
        <div className="w-14 h-14 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center">
          <img
            src="/social-media/facebook.png"
            alt="Facebook"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </button>

      {/* Zalo */}
      <button
        onClick={handleZaloClick}
        className="group relative"
        title="Chat on Zalo"
      >
        <div className="w-14 h-14 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center">
          <img
            src="/social-media/zalo.png"
            alt="Zalo"
            className="w-full h-full rounded-full"
          />
        </div>
      </button>

      {/* TikTok */}
      <a
        href="https://www.tiktok.com/@kieuthisam_84"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
        title="TikTok"
      >
        <div className="w-14 h-14 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center bg-white">
          <img
            src="/social-media/tiktok.png"
            alt="TikTok"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </a>

      {/* Cart Button */}
      <Link href={href("/cart")} className="group relative" title="Giỏ hàng">
        <div className="w-14 h-14 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center bg-yellow-500">
          <ShoppingCart className="w-7 h-7 text-white" />
        </div>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </Link>
    </div>
  );
};

export default FloatingContact;
