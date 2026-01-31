import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kiều Sâm - Sản Phẩm Thủ Công Mỹ Nghệ Việt Nam",
  description:
    "Chuyên cung cấp các sản phẩm thủ công mỹ nghệ truyền thống Việt Nam - Giỏ tre, túi cói, lục bình và nhiều sản phẩm trang trí độc đáo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
