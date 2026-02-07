import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number().or(z.string()),
  name: z.string().max(100),
  slug: z.string().max(150).optional(),
  order: z.number().int().positive().min(1).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

// Schema for creating a new category
export const CreateCategorySchema = CategorySchema.omit({ id: true });

// Schema for updating a category
export const UpdateCategorySchema = CategorySchema.partial().omit({ id: true });

// Export types
export type Category = z.infer<typeof CategorySchema>;
export type CreateCategory = z.infer<typeof CreateCategorySchema>;
export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;
