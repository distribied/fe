"use client";
import { useTranslation } from "react-i18next";
import { Gift, Palette, ShieldCheck, Sparkles } from "lucide-react";

const ConsultationServices = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Gift className="h-6 w-6" />,
      title: t("services.gift_title"),
      description: t("services.gift_description"),
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: t("services.custom_title"),
      description: t("services.custom_description"),
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: t("services.care_title"),
      description: t("services.care_description"),
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: t("services.consulting_title"),
      description: t("services.consulting_description"),
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-50",
      textColor: "text-violet-600",
    },
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-10">
        {/* <h2 className="text-3xl font-bold text-text-heading mb-3">
          {t("services.main_title")}
        </h2> */}
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t("services.subtitle")}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Gradient background on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
            />

            <div className="relative">
              <div
                className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${service.bgColor} ${service.textColor} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
              >
                {service.icon}
              </div>

              <h3 className="mb-3 text-lg font-semibold text-text-heading">
                {service.title}
              </h3>

              <p className="text-sm leading-relaxed text-gray-600">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 p-8 border border-primary/20">
        <div className="flex flex-col items-center text-center gap-4 md:flex-row md:text-left">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white">
            <Sparkles className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <h3 className="mb-2 text-xl font-semibold text-text-heading">
              {t("services.cta_title")}
            </h3>
            <p className="text-gray-600">{t("services.cta_description")}</p>
          </div>
          <a
            href="tel:0123456789"
            className="flex-shrink-0 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:scale-105"
          >
            {t("services.cta_button")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConsultationServices;
