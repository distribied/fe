import { z } from "zod";

// Enum schemas
export const OrderStatusEnum = z.enum([
  "PENDING",
  "SHIPPING",
  "DELIVERED",
  "CANCELLED",
]);

export const RoleEnum = z.enum(["CLIENT", "ADMIN"]);

// Export types
export type OrderStatus = z.infer<typeof OrderStatusEnum>;
export type Role = z.infer<typeof RoleEnum>;
