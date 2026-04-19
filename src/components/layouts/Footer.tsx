"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-primary-foreground mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/ui/logo.png"
                alt="Kiều Sâm"
                className="h-36 w-36 object-contain bg-background rounded-full p-1"
              />
              <h3 className="font-bold text-lg">Kiều Sâm</h3>
            </div>
            <p className="text-sm opacity-90 mb-4">
              {t("footer.about_description")}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 uppercase">
              {t("footer.contact_info")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>500/3 Đường Đoàn Văn Bơ, Phường 15, Quận 4, TP.HCM</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>0907.882.878</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>kieusam@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span>{t("footer.hours")}</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 uppercase">
              {t("footer.product_categories")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  {t("categories.gift_boxes")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  {t("categories.grass_bags_painted")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  {t("categories.palm_bags_painted")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  {t("categories.hyacinth_bags_painted")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  {t("categories.bamboo_products")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  {t("categories.hyacinth_baskets")}
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Support */}
          <div>
            <h3 className="font-bold text-lg mb-4 uppercase">
              {t("footer.connect")}
            </h3>
            <div className="flex gap-4 mb-4 flex-wrap">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/maytrelakieusam"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform duration-200 hover:scale-110"
                title="Facebook"
              >
                <img
                  src="/social-media/facebook.png"
                  alt="Facebook"
                  className="w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                />
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@kieuthisam_84"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform duration-200 hover:scale-110"
                title="TikTok"
              >
                <img
                  src="/social-media/tiktok.png"
                  alt="TikTok"
                  className="w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                />
              </a>

              {/* Zalo */}
              <a
                href="https://zalo.me/0907882878"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform duration-200 hover:scale-110"
                title="Zalo"
              >
                <img
                  src="/social-media/zalo.png"
                  alt="Zalo"
                  className="w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                />
              </a>

              {/* Google Maps */}
              <a
                href="https://maps.app.goo.gl/fGfUCVynvYnrahfn6"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform duration-200 hover:scale-110"
                title="Google Maps"
              >
                <img
                  src="/social-media/google-maps.png"
                  alt="Google Maps"
                  className="w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                />
              </a>
            </div>
            <p className="text-sm opacity-90 mb-4">{t("footer.follow_us")}</p>
          </div>
        </div>
        {/* Embedded Google Maps */}
        <div className="mt-10 pt-8 border-t border-primary-foreground/20">
          <h3 className="font-bold text-lg mb-4 uppercase flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {t("footer.find_us") || "Tìm Chúng Tôi"}
          </h3>
          <div className="rounded-xl overflow-hidden shadow-lg ring-1 ring-primary-foreground/20">
            <iframe
              src="https://www.google.com/maps?q=500%2F3+%C4%90o%C3%A0n+V%C4%83n+B%C6%A1%2C+Ph%C6%B0%E1%BB%9Dng+15%2C+Qu%E1%BA%ADn+4%2C+TP.HCM&output=embed"
              width="100%"
              height="320"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Kiều Sâm - 500/3 Đoàn Văn Bơ, Phường 15, Quận 4, TP.HCM"
              className="block w-full"
            />
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="border-t border-primary-foreground/20 py-4">
        <div className="container mx-auto px-4 text-center text-sm opacity-80 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
          <span>{t("footer.copyright")}</span>
          <span className="hidden sm:inline opacity-50">·</span>
          <span>
            Designed by{" "}
            <a
              href="https://github.com/winnguyen1905"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              winnguyen1905
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
