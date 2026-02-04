import { z } from "zod";
import { ProductImageSchema } from "./product-image.schema";

export const ProductSchema = z.object({
  id: z.number().or(z.string()),
  categoryId: z.number().or(z.string()).optional().nullable(),
  name: z.string().max(255),
  slug: z.string().max(300).optional(),
  description: z.string().optional().nullable(),
  metadata: z.record(z.any()).optional().nullable(),
  price: z.number().nonnegative(),
  isActive: z.boolean().default(true),
  ratingAverage: z.number().min(0).max(5).default(0),
  images: z.array(ProductImageSchema).optional(), // Product images
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
});

// Schema for creating a new product
export const CreateProductSchema = ProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Schema for updating a product
export const UpdateProductSchema = ProductSchema.partial().omit({ id: true });

// Export types
export type Product = z.infer<typeof ProductSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
export type UpdateProduct = z.infer<typeof UpdateProductSchema>;
