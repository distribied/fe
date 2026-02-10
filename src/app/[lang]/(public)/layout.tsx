import Breadcrumb from "@/components/layouts/Breadcrumb";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Breadcrumb />
      {children}
    </>
  );
}
