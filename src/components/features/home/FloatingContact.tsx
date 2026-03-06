"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, MessageCircle, X, Menu } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { useCart } from "@/hooks/useCart";

const FloatingContact = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { href } = useLocale();
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  const handleZaloClick = () => {
    const phoneNumber = "0907882878";
    const message = "Xin chào Kiều Sâm! Tôi muốn được tư vấn về sản phẩm.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://zalo.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
    setIsExpanded(false);
  };

  const handleFacebookClick = () => {
    const facebookPageId = "100083182335829";
    const message = "Xin chào Kiều Sâm! Tôi muốn được tư vấn về sản phẩm.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://m.me/${facebookPageId}?text=${encodedMessage}`, "_blank");
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Menu */}
      <div
        className={`flex flex-col gap-3 mb-3 transition-all duration-300 ${
          isExpanded
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Cart Button */}
        <Link
          href={href("/cart")}
          onClick={() => setIsExpanded(false)}
          className="group relative"
          title="Giỏ hàng"
        >
          <div className="w-14 h-14 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center bg-yellow-500">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </Link>

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
              className="w-11 h-11 rounded-full object-cover"
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
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center bg-primary"
      >
        {isExpanded ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <Menu className="w-7 h-7 text-white" />
        )}
      </button>
    </div>
  );
};

export default FloatingContact;
