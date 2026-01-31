import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ShoppingCart, Phone } from "lucide-react";

// Sample product data - in a real app, this would come from an API
const allProducts = [
  {
    id: "1",
    image: "/product-1.jpg",
    title: "Giỏ Tre Gói Quà Tết Cao Cấp",
    price: 350000,
    oldPrice: 450000,
    category: "Hộp Và Giỏ Quà Tết",
  },
  {
    id: "2",
    image: "/product-2.jpg",
    title: "Hộp Quà Tết Lục Bình Thêu",
    price: 280000,
    oldPrice: 350000,
    category: "Hộp Và Giỏ Quà Tết",
  },
  {
    id: "3",
    image: "/product-3.jpg",
    title: "Túi Cỏ Bàng Vẽ Hoa Sen",
    price: 180000,
    category: "Túi Cỏ Bàng Vẽ",
  },
  {
    id: "4",
    image: "/product-4.jpg",
    title: "Túi Cỏ Bàng Thêu Hoa Đào",
    price: 220000,
    oldPrice: 280000,
    category: "Túi Cỏ Bàng Vẽ",
  },
  {
    id: "5",
    image: "/product-5.jpg",
    title: "Túi Lục Bình Vẽ Phong Cảnh",
    price: 250000,
    category: "Túi Lục Bình Vẽ",
  },
  {
    id: "6",
    image: "/product-6.jpg",
    title: "Túi Lục Bình Thêu Hoa Mai",
    price: 290000,
    oldPrice: 350000,
    category: "Túi Lục Bình Vẽ",
  },
  {
    id: "7",
    image: "/product-7.jpg",
    title: "Giỏ Lục Bình Đựng Hoa",
    price: 150000,
    category: "Giỏ Lục Bình",
  },
  {
    id: "8",
    image: "/product-8.jpg",
    title: "Thảm Cói Tự Nhiên",
    price: 120000,
    category: "Thảm Cói, Thảm Lục Bình",
  },
];

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = allProducts.find((p) => p.id === id);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("vi-VN").format(value) + "Đ";
  };

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>/</li>
              <li>
                <span className="hover:text-primary transition-colors cursor-pointer">
                  {product.category}
                </span>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium">{product.title}</li>
            </ol>
          </nav>

          {/* Product Detail */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {product.title}
                </h1>

                {/* Category */}
                <div className="mb-4">
                  <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    {product.oldPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(product.oldPrice)}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-destructive">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  {product.oldPrice && (
                    <span className="text-sm text-primary font-medium">
                      Tiết kiệm {formatPrice(product.oldPrice - product.price)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="font-semibold text-foreground mb-2">
                    Mô tả sản phẩm
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Sản phẩm thủ công truyền thống được làm từ nguyên liệu tự
                    nhiên, thân thiện với môi trường. Được chế tác tỉ mỉ bởi các
                    nghệ nhân lành nghề, mang đậm bản sắc văn hóa Việt Nam. Phù
                    hợp làm quà tặng hoặc trang trí nhà cửa.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <Button
                    size="lg"
                    className="flex-1 bg-accent text-accent-foreground hover:opacity-90"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Mua ngay
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Liên hệ tư vấn
                  </Button>
                </div>

                {/* Contact Info */}
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Hotline:</strong> 0907.882.878
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    <strong>Địa chỉ:</strong> 500/3 Đường Đoàn Văn Bơ, Phường
                    15, Quận 4, TP.HCM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Back button */}
          <div className="mt-6">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Quay lại trang chủ
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
