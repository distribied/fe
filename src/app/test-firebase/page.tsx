"use client";

import { useState } from "react";
import {
  useProducts,
  useCategories,
  useCreateProduct,
} from "@/hooks/useProducts";
import { useOrders, useCreateOrder } from "@/hooks/useOrders";
import { seedMockData, clearAllData } from "@/service/product.service";
import { seedMockOrders, clearOrderData } from "@/service/order.service";
import { OrderStatus } from "@/types/order.types";

export default function TestFirebasePage() {
  const [status, setStatus] = useState<string>("Ready to test");
  const [seedResult, setSeedResult] = useState<any>(null);

  // TanStack Query hooks
  const {
    data: products,
    isLoading: productsLoading,
    refetch: refetchProducts,
  } = useProducts();
  const {
    data: categories,
    isLoading: categoriesLoading,
    refetch: refetchCategories,
  } = useCategories();
  const {
    data: orders,
    isLoading: ordersLoading,
    refetch: refetchOrders,
  } = useOrders();

  // Mutations
  const createProduct = useCreateProduct();
  const createOrder = useCreateOrder();

  const seedData = async () => {
    setStatus("Seeding mock data...");
    try {
      const productResult = await seedMockData();
      const orderCount = await seedMockOrders();
      setStatus("Mock data seeded successfully!");
      setSeedResult({ ...productResult, orders: orderCount });
      // Refetch all data
      refetchProducts();
      refetchCategories();
      refetchOrders();
    } catch (error: any) {
      setStatus(`Seeding failed: ${error.message}`);
    }
  };

  const clearData = async () => {
    setStatus("Clearing all data...");
    try {
      await clearAllData();
      await clearOrderData();
      setStatus("All data cleared!");
      setSeedResult(null);
      // Refetch all data
      refetchProducts();
      refetchCategories();
      refetchOrders();
    } catch (error: any) {
      setStatus(`Clearing failed: ${error.message}`);
    }
  };

  const testCreateProduct = async () => {
    setStatus("Creating test product...");
    try {
      await createProduct.mutateAsync({
        name: `Test Product ${Date.now()}`,
        slug: `test-product-${Date.now()}`,
        price: 99000,
        isActive: true,
        ratingAverage: 4.5,
        createdAt: new Date().toISOString(),
      });
      setStatus("Product created successfully!");
    } catch (error: any) {
      setStatus(`Create product failed: ${error.message}`);
    }
  };

  const testCreateOrder = async () => {
    setStatus("Creating test order...");
    try {
      await createOrder.mutateAsync({
        name: "Test Customer",
        phone: "0901234567",
        email: "test@example.com",
        address: "123 Test Street",
        totalAmount: 250000,
        status: OrderStatus.PENDING,
      });
      setStatus("Order created successfully!");
    } catch (error: any) {
      setStatus(`Create order failed: ${error.message}`);
    }
  };

  const isLoading = productsLoading || categoriesLoading || ordersLoading;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">🔥 Firebase Test Page</h1>

      <div className="mb-6">
        <p className="text-lg">
          Status: <span className="text-yellow-400">{status}</span>
        </p>
        {isLoading && <p className="text-blue-400">Loading data...</p>}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <button
          onClick={seedData}
          disabled={isLoading}
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
        >
          🌱 Seed Mock Data
        </button>
        <button
          onClick={testCreateProduct}
          disabled={isLoading || createProduct.isPending}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          ➕ Create Product
        </button>
        <button
          onClick={testCreateOrder}
          disabled={isLoading || createOrder.isPending}
          className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 disabled:opacity-50"
        >
          🛒 Create Order
        </button>
        <button
          onClick={() => {
            refetchProducts();
            refetchCategories();
            refetchOrders();
          }}
          disabled={isLoading}
          className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 disabled:opacity-50"
        >
          🔄 Refresh Data
        </button>
        <button
          onClick={clearData}
          disabled={isLoading}
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 disabled:opacity-50"
        >
          🗑️ Clear All Data
        </button>
      </div>

      {/* Seed Result */}
      {seedResult && (
        <div className="bg-green-800/30 p-4 rounded mb-6">
          <h2 className="text-xl font-semibold mb-2">Seed Result:</h2>
          <pre className="text-sm">{JSON.stringify(seedResult, null, 2)}</pre>
        </div>
      )}

      {/* Data Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Products */}
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">
            📦 Products ({products?.length || 0})
          </h2>
          {products && products.length > 0 ? (
            <ul className="space-y-2 max-h-80 overflow-auto">
              {products.map((p) => (
                <li key={p.id} className="text-sm bg-gray-700 p-2 rounded">
                  <strong>{p.name}</strong>
                  <br />
                  <span className="text-gray-400">
                    {p.price?.toLocaleString()} VND | ⭐ {p.ratingAverage}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No products found</p>
          )}
        </div>

        {/* Categories */}
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">
            📁 Categories ({categories?.length || 0})
          </h2>
          {categories && categories.length > 0 ? (
            <ul className="space-y-2 max-h-80 overflow-auto">
              {categories.map((c) => (
                <li key={c.id} className="text-sm bg-gray-700 p-2 rounded">
                  <strong>{c.name}</strong>
                  <br />
                  <span className="text-gray-400">/{c.slug}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No categories found</p>
          )}
        </div>

        {/* Orders */}
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">
            🛒 Orders ({orders?.length || 0})
          </h2>
          {orders && orders.length > 0 ? (
            <ul className="space-y-2 max-h-80 overflow-auto">
              {orders.map((o) => (
                <li key={o.id} className="text-sm bg-gray-700 p-2 rounded">
                  <strong>{o.name}</strong>
                  <br />
                  <span className="text-gray-400">
                    {o.totalAmount?.toLocaleString()} VND | {o.phone}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No orders found</p>
          )}
        </div>
      </div>
    </div>
  );
}
