"use client";
import MapEmbed from "@/components/features/about/MapEmbed";
import ConsultationForm from "@/components/features/contact/ConsultationForm";
import ConsultationServices from "@/components/features/contact/ConsultationServices";
import ContactInfo from "@/components/features/contact/ContactInfo";
import { useTranslation } from "react-i18next";

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent py-16">
        <div className="absolute inset-0 bg-[url('/patterns/handcraft-pattern.svg')] opacity-5" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold text-text-heading md:text-5xl">
              {t("contact_page.hero_title")}
            </h1>
            <p className="text-lg text-gray-600">
              {t("contact_page.hero_subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4">
        <ConsultationServices />
      </section>

      {/* Contact Form & Info Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Contact Form */}
          <div>
            <ConsultationForm />
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-8">
            <ContactInfo />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="overflow-hidden rounded-2xl shadow-xl">
          <div className="h-[500px]">
            <MapEmbed  />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-text-heading">
              {t("faq.title")}
            </h2>
            <div className="space-y-4">
              <details className="group rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-text-heading">
                  <span>{t("faq.q1_question")}</span>
                  <span className="text-primary transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {t("faq.q1_answer")}
                </p>
              </details>

              <details className="group rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-text-heading">
                  <span>{t("faq.q2_question")}</span>
                  <span className="text-primary transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {t("faq.q2_answer")}
                </p>
              </details>

              <details className="group rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-text-heading">
                  <span>{t("faq.q3_question")}</span>
                  <span className="text-primary transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {t("faq.q3_answer")}
                </p>
              </details>

              <details className="group rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-text-heading">
                  <span>{t("faq.q4_question")}</span>
                  <span className="text-primary transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {t("faq.q4_answer")}
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
