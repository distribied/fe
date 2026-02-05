"use client";

const FloatingContact = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Facebook */}
      <a
        href="https://www.facebook.com/maytrelakieusam"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
        title="Chat on Facebook"
      >
        <div className="w-14 h-14 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 animate-flicker flex items-center justify-center">
          <img
            src="/social-media/facebook.png"
            alt="Facebook"
            className="w-11 h-11 rounded-full object-cover"
          />
        </div>
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-20 animate-ping pointer-events-none" />
      </a>

      {/* Zalo */}
      <a
        href="https://zalo.me/0907882878"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
        title="Chat on Zalo"
      >
        <div className="w-14 h-14 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 animate-flicker" style={{ animationDelay: '0.5s' }}>
          <img
            src="/social-media/zalo.png"
            alt="Zalo"
            className="w-full h-full rounded-full"
          />
        </div>
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full bg-blue-600 opacity-0 group-hover:opacity-20 animate-ping pointer-events-none" />
      </a>
    </div>
  );
};

export default FloatingContact;
