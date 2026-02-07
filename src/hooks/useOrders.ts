import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type Order, type CreateOrder, type UpdateOrder, type OrderStatus } from "@/schemas";

const API_BASE_URL = "/api";

// Fetch all orders
const fetchOrders = async (filters?: { status?: OrderStatus }): Promise<Order[]> => {
  const params = new URLSearchParams();
  if (filters?.status) {
    params.append("status", filters.status);
  }

  const response = await fetch(`${API_BASE_URL}/orders?${params}`);
  if (!response.ok) throw new Error("Failed to fetch orders");
  return response.json();
};

// Fetch specific order with details
const fetchOrderById = async (id: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`);
  if (!response.ok) throw new Error("Failed to fetch order");
  return response.json();
};

// Create new order
const createOrderApi = async (data: CreateOrder): Promise<Order> => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create order");
  return response.json();
};

// Update order
const updateOrderApi = async ({ id, updates }: { id: string; updates: UpdateOrder }): Promise<Order> => {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error("Failed to update order");
  return response.json();
};

// Delete order
const deleteOrderApi = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete order");
};

export const useOrders = (filters?: { status?: OrderStatus }) => {
  return useQuery({
    queryKey: ["orders", filters],
    queryFn: () => fetchOrders(filters),
  });
};

export const useOrder = (id?: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => fetchOrderById(id!),
    enabled: !!id,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrderApi,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", id] });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
