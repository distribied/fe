"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  ShoppingCart,
  Users,
  FolderTree,
  TrendingUp,
  BarChart3,
  Plus,
  Eye,
} from "lucide-react";
import { useProducts, useCategories } from "@/hooks/useProducts";
import { useOrders } from "@/hooks/useOrders";
import { useAccounts } from "@/hooks/useAccount";

export default function AdminDashboard() {
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: orders, isLoading: ordersLoading } = useOrders();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: accounts, isLoading: accountsLoading } = useAccounts();

  // Calculate statistics
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalCategories: 0,
    totalAccounts: 0,
  });

  useEffect(() => {
    if (products) {
      setStats((prev) => ({
        ...prev,
        totalProducts: products.length,
        activeProducts: products.filter((p) => p.isActive).length,
      }));
    }

    if (orders) {
      setStats((prev) => ({
        ...prev,
        totalOrders: orders.length,
        pendingOrders: orders.filter((o) => o.status === "PENDING").length,
      }));
    }

    if (categories) {
      setStats((prev) => ({
        ...prev,
        totalCategories: categories.length,
      }));
    }

    if (accounts) {
      setStats((prev) => ({
        ...prev,
        totalAccounts: accounts.length,
      }));
    }
  }, [products, orders, categories, accounts]);

  const quickStats = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      change: "+5%",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      link: "/admin/product",
    },
    {
      title: "Active Products",
      value: stats.activeProducts,
      change: "+12%",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      link: "/admin/product?filter=active",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      change: "+8%",
      icon: ShoppingCart,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      link: "/admin/order",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      change: "-2%",
      icon: Eye,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      link: "/admin/order?filter=pending",
    },
  ];

  const recentOrders = orders?.slice(0, 5) || [];
  const lowStockProducts =
    products?.filter((p) => (p.price || 0) < 100000).slice(0, 5) || [];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your admin panel. Overview of your store's performance.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat) => (
          <Card
            key={stat.title}
            className="hover:shadow-lg transition-shadow cursor-pointer"
          >
            <Link href={stat.link}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from
                  last month
                </p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Orders
              <Link href="/admin/order">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            {ordersLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.name} - {order.phone}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(order.totalAmount || 0)}
                      </p>
                      <Badge
                        variant={
                          order.status === "PENDING"
                            ? "secondary"
                            : order.status === "SHIPPING"
                              ? "default"
                              : order.status === "DELIVERED"
                                ? "default"
                                : "destructive"
                        }
                        className="text-xs"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No recent orders found
              </div>
            )}
          </CardContent>
        </Card>

        {/* Low Stock Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Products Need Attention
              <Link href="/admin/product">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardTitle>
            <CardDescription>
              Products with low price or inactive
            </CardDescription>
          </CardHeader>
          <CardContent>
            {productsLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : lowStockProducts.length > 0 ? (
              <div className="space-y-4">
                {lowStockProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                        <Package className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium line-clamp-1">
                          {product.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(product.price || 0)}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={!product.isActive ? "destructive" : "secondary"}
                    >
                      {!product.isActive ? "Inactive" : "Low Price"}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                All products are well managed
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
