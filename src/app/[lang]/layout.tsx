import FloatingContact from "@/components/features/home/FloatingContact";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import ClientI18nProvider from "@/context/ClientI18nProvider";

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: "vi" | "en" };
}) {
  return (
    <ClientI18nProvider lang={params.lang}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingContact />
      </div>
    </ClientI18nProvider>
  );
}
