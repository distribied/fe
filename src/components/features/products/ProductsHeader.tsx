import { useTranslation } from "react-i18next";

export default function ProductsHeader() {
  const { t } = useTranslation();
  return (
    <div className="bg-gradient-to-r from-primary via-emerald-600 to-primary text-white rounded-lg p-8 mb-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {t("products.page.header_1")}
        </h1>
        <p className="text-xl opacity-90">
          {t("products.page.header_2")}
        </p>
      </div>
    </div>
  );
}
