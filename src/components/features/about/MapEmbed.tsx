"use client";

import { useTranslation } from "react-i18next";

const MapEmbed = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full">
      <h3 className="font-bold text-2xl mb-4 text-center text-primary">
        {t("footer.find_us")}
      </h3>

      {/* Map wrapper */}
      <div className="flex-1 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.8264876234356!2d106.69380731533344!3d10.747970762706448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f8e8b3e5c3d%3A0x3e8b8e8b3e5c3d!2s500%2F3%20%C4%90o%C3%A0n%20V%C4%83n%20B%C6%A1!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Kiều Sâm Location"
        />
      </div>
    </div>
  );
};

export default MapEmbed;
