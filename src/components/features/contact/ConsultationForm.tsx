"use client";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

const ConsultationForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    productType: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const productTypes = [
    { value: "", label: t("form.select_product") },
    { value: "pottery", label: t("form.product_pottery") },
    { value: "wood", label: t("form.product_wood") },
    { value: "bamboo", label: t("form.product_bamboo") },
    { value: "textile", label: t("form.product_textile") },
    { value: "lacquer", label: t("form.product_lacquer") },
    { value: "custom", label: t("form.product_custom") },
    { value: "other", label: t("form.product_other") },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t("form.error_name");
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("form.error_phone");
    } else if (!/^[0-9]{10}$/.test(formData.phone.replaceAll(/\s/g, ""))) {
      newErrors.phone = t("form.error_phone_invalid");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("form.error_email");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("form.error_email_invalid");
    }

    if (!formData.productType) {
      newErrors.productType = t("form.error_product_type");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("form.error_message");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form data:", formData);
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        productType: "",
        message: "",
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
      <h3 className="mb-6 text-2xl font-semibold text-text-heading">
        {t("form.title")}
      </h3>

      {isSuccess && (
        <div className="mb-6 flex items-center gap-3 rounded-lg bg-green-50 p-4 border border-green-200">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <p className="text-sm font-medium text-green-800">
            {t("form.success_message")}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {t("form.name")} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full rounded-lg border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } px-4 py-3 text-gray-900 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20`}
            placeholder={t("form.name_placeholder")}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              {t("form.phone")} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full rounded-lg border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } px-4 py-3 text-gray-900 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20`}
              placeholder={t("form.phone_placeholder")}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              {t("form.email")} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } px-4 py-3 text-gray-900 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20`}
              placeholder={t("form.email_placeholder")}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="productType"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {t("form.product_type")} <span className="text-red-500">*</span>
          </label>
          <select
            id="productType"
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            className={`w-full rounded-lg border ${
              errors.productType ? "border-red-500" : "border-gray-300"
            } px-4 py-3 text-gray-900 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20`}
          >
            {productTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.productType && (
            <p className="mt-1 text-xs text-red-500">{errors.productType}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {t("form.message")} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className={`w-full rounded-lg border ${
              errors.message ? "border-red-500" : "border-gray-300"
            } px-4 py-3 text-gray-900 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none`}
            placeholder={t("form.message_placeholder")}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-500">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white transition-all hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        >
          {isSubmitting ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>{t("form.submitting")}</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>{t("form.submit")}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ConsultationForm;
