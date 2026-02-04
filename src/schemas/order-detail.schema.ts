import { z } from "zod";

export const OrderDetailSchema = z.object({
  id: z.number().or(z.string()),
  orderId: z.number().or(z.string()),
  productId: z.number().or(z.string()).optional().nullable(),
  unitPrice: z.number().nonnegative(),
  quantity: z.number().int().positive(),
});

// Schema for creating a new order detail
export const CreateOrderDetailSchema = OrderDetailSchema.omit({ id: true });

// Schema for updating an order detail
export const UpdateOrderDetailSchema = OrderDetailSchema.partial().omit({
  id: true,
});

// Export types
export type OrderDetail = z.infer<typeof OrderDetailSchema>;
export type CreateOrderDetail = z.infer<typeof CreateOrderDetailSchema>;
export type UpdateOrderDetail = z.infer<typeof UpdateOrderDetailSchema>;
