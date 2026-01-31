import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Order, OrderStatus } from "@/types/order.types";
import {
  getOrders,
  getOrderById,
  getOrderWithDetails,
  createOrder,
  updateOrder,
  updateOrderStatus,
  OrderFilters,
  CreateOrderInput,
} from "@/service/order.service";

// ==================== ORDERS ====================

export const useOrders = (filters?: OrderFilters) => {
  return useQuery({
    queryKey: ["orders", filters],
    queryFn: () => getOrders(filters),
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id),
    enabled: !!id,
  });
};

export const useOrderWithDetails = (id: string) => {
  return useQuery({
    queryKey: ["order", id, "details"],
    queryFn: () => getOrderWithDetails(id),
    enabled: !!id,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderInput: CreateOrderInput) => createOrder(orderInput),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Order> }) =>
      updateOrder(id, updates),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", id] });
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      updateOrderStatus(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", id] });
    },
  });
};
