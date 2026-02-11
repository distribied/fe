"use client";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactInfo = () => {
  const { t } = useTranslation();

  const contactItems = [
    {
      icon: <MapPin className="h-5 w-5" />,
      label: t("contact.address"),
      value: t("contact.address_value"),
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: t("contact.phone"),
      value: t("contact.phone_value"),
      link: "tel:0907882878",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: t("contact.email"),
      value: t("contact.email_value"),
      link: "mailto:contact@kieusam.vn",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: t("contact.hours"),
      value: t("contact.hours_value"),
    },
  ];

  const socialLinks = [
    {
      image: "/social-media/facebook.png",
      label: "Facebook",
      link: "https://www.facebook.com/maytrelakieusam",
      alt: "Facebook",
    },
    {
      image: "/social-media/tiktok.png",
      label: "TikTok",
      link: "https://www.tiktok.com/@kieuthisam_84",
      alt: "TikTok",
    },
    {
      image: "/social-media/zalo.png",
      label: "Zalo",
      link: "https://zalo.me/0907882878",
      alt: "Zalo",
    },
    {
      image: "/social-media/google-maps.png",
      label: "Google Maps",
      link: "https://maps.app.goo.gl/fGfUCVynvYnrahfn6",
      alt: "Google Maps",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-2xl font-semibold text-text-heading">
          {t("contact.info_title")}
        </h3>
        <div className="space-y-4">
          {contactItems.map((item, index) => (
            <div key={index} className="flex items-start gap-4 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-white">
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">
                  {item.label}
                </p>
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-base font-medium text-text-body hover:text-primary transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-base font-medium text-text-body">
                    {item.value}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-lg font-semibold text-text-heading uppercase">
          {t("contact.social")}
        </h4>
        <div className="flex gap-4 mb-4 flex-wrap">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-transform duration-200 hover:scale-110"
              title={social.label}
            >
              <img
                src={social.image}
                alt={social.alt}
                className="w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-shadow"
              />
            </a>
          ))}
        </div>
        <p className="text-sm opacity-90">{t("footer.follow_us")}</p>
      </div>

      <div className="rounded-lg bg-amber-50 p-4 border-l-4 border-amber-500">
        <h4 className="mb-2 font-semibold text-amber-900">
          {t("contact.note_title")}
        </h4>
        <p className="text-sm text-amber-800">{t("contact.note_content")}</p>
      </div>
    </div>
  );
};

export default ContactInfo;
