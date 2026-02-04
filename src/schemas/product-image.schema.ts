import { z } from "zod";

export const ProductImageSchema = z.object({
  id: z.number().or(z.string()),
  productId: z.number().or(z.string()),
  url: z.string().url(),
  isThumbnail: z.boolean().default(false),
  isDeleted: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
});

// Schema for creating a new product image
export const CreateProductImageSchema = ProductImageSchema.omit({
  id: true,
  updatedAt: true,
});

// Schema for updating a product image
export const UpdateProductImageSchema = ProductImageSchema.partial().omit({
  id: true,
});

// Export types
export type ProductImage = z.infer<typeof ProductImageSchema>;
export type CreateProductImage = z.infer<typeof CreateProductImageSchema>;
export type UpdateProductImage = z.infer<typeof UpdateProductImageSchema>;
