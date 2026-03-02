"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, FolderTree, TrendingUp, AlertCircle } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategory";

export default function AdminDashboard() {
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    inactiveProducts: 0,
    totalCategories: 0,
  });

  useEffect(() => {
    if (products) {
      setStats((prev) => ({
        ...prev,
        totalProducts: products.length,
        activeProducts: products.filter((p) => p.isActive).length,
        inactiveProducts: products.filter((p) => !p.isActive).length,
      }));
    }

    if (categories) {
      setStats((prev) => ({
        ...prev,
        totalCategories: categories.length,
      }));
    }
  }, [products, categories]);

  const quickStats = [
    {
      title: "Tổng sản phẩm",
      value: stats.totalProducts,
      icon: Package,
      bgColor: "bg-blue-50",
      color: "text-blue-600",
      link: "/admin/products",
    },
    {
      title: "Đang hoạt động",
      value: stats.activeProducts,
      icon: TrendingUp,
      bgColor: "bg-green-50",
      color: "text-green-600",
      link: "/admin/products?filter=active",
    },
    {
      title: "Không hoạt động",
      value: stats.inactiveProducts,
      icon: AlertCircle,
      bgColor: "bg-red-50",
      color: "text-red-600",
      link: "/admin/products?filter=inactive",
    },
    {
      title: "Danh mục",
      value: stats.totalCategories,
      icon: FolderTree,
      bgColor: "bg-purple-50",
      color: "text-purple-600",
      link: "/admin/categories",
    },
  ];

  const inactiveProducts =
    products?.filter((p) => !p.isActive).slice(0, 4) || [];

  const lowPriceProducts =
    products?.filter((p) => (p.price || 0) < 100000).slice(0, 4) || [];

  const isLoading = productsLoading || categoriesLoading;

  /* =========================
     Render Helpers (Clean)
  ========================== */

  const renderLoading = () => (
    <div className="flex justify-center items-center h-32">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
    </div>
  );

  const renderEmptyState = (icon: any, message: string) => (
    <div className="text-center py-6 text-muted-foreground">
      {icon}
      <p className="text-sm mt-2">{message}</p>
    </div>
  );

  const renderInactiveProducts = () => {
    if (isLoading) return renderLoading();

    if (inactiveProducts.length === 0) {
      return renderEmptyState(
        <Package className="h-8 w-8 mx-auto opacity-50" />,
        "Tất cả sản phẩm đang hoạt động",
      );
    }

    return (
      <div className="space-y-2">
        {inactiveProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-2.5 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{product.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price || 0)}
                </p>
              </div>
            </div>
            <Link href="/admin/products">
              <Badge variant="secondary" className="text-xs">
                Xem
              </Badge>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  const renderLowPriceProducts = () => {
    if (isLoading) return renderLoading();

    if (lowPriceProducts.length === 0) {
      return renderEmptyState(
        <TrendingUp className="h-8 w-8 mx-auto opacity-50" />,
        "Không có sản phẩm giá thấp",
      );
    }

    return (
      <div className="space-y-2">
        {lowPriceProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-2.5 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{product.name}</p>
                <p className="text-xs text-green-600 font-medium">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price || 0)}
                </p>
              </div>
            </div>
            <Link href="/admin/products">
              <Badge variant="secondary" className="text-xs">
                Xem
              </Badge>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  /* ========================= */

  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <Link key={stat.title} href={stat.link}>
            <Card className="hover:shadow-md transition-all border-l-4 hover:-translate-y-0.5 cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 pt-4">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3 bg-muted/30">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              Sản phẩm không hoạt động
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3">{renderInactiveProducts()}</CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 bg-muted/30">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-orange-500" />
              Sản phẩm giá thấp
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3">{renderLowPriceProducts()}</CardContent>
        </Card>
      </div>
    </div>
  );
}
