import { z } from "zod";
import { OrderStatusEnum } from "./enums";

export const OrderSchema = z.object({
  id: z.number().or(z.string()),
  name: z.string().max(100),
  phone: z.string().max(15),
  email: z.string().email().optional().nullable(),
  address: z.string().max(500),
  note: z.string().optional().nullable(),
  totalAmount: z.number().nonnegative(),
  status: OrderStatusEnum.optional().default("PENDING"),
  createdAt: z.coerce.date().optional(),
});

// Schema for creating a new order
export const CreateOrderSchema = OrderSchema.omit({
  id: true,
  createdAt: true,
});

// Schema for updating an order
export const UpdateOrderSchema = OrderSchema.partial().omit({ id: true });

// Export types
export type Order = z.infer<typeof OrderSchema>;
export type CreateOrder = z.infer<typeof CreateOrderSchema>;
export type UpdateOrder = z.infer<typeof UpdateOrderSchema>;
