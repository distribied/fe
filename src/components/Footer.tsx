"use client";

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  MessageCircle,
} from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
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
                src="/logo.png"
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
            <div className="flex gap-3 mb-4">
              <a
                href="#"
                className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm opacity-90 mb-4">{t("footer.follow_us")}</p>

            {/* Language Switcher */}
            <div className="mt-4">
              <h4 className="font-medium text-sm mb-2 opacity-80">
                {t("common.language")}
              </h4>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary-foreground/20 py-4">
        <div className="container mx-auto px-4 text-center text-sm opacity-80">
          {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
