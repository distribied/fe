"use client";

import { useTranslation } from "react-i18next";

const MapEmbed = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-muted py-8">
      <div className="container mx-auto px-4">
        <h3 className="font-bold text-2xl mb-4 text-center text-primary">
          {t("footer.find_us")}
        </h3>
        <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.8264876234356!2d106.69380731533344!3d10.747970762706448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f8e8b3e5c3d%3A0x3e8b8e8b3e5c3d!2s500%2F3%20%C4%90o%C3%A0n%20V%C4%83n%20B%C6%A1%2C%20Ph%C6%B0%E1%BB%9Dng%2015%2C%20Qu%E1%BA%ADn%204%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Kiều Sâm Location"
          />
        </div>
      </div>
    </div>
  );
};

export default MapEmbed;
