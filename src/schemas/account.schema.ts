import { z } from "zod";
import { RoleEnum } from "./enums";

export const AccountSchema = z.object({
  id: z.number().or(z.string()),
  role: RoleEnum,
  email: z.string().email(),
  password: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

// Schema for creating a new account (password required)
export const CreateAccountSchema = AccountSchema.omit({
  id: true,
  createdAt: true,
}).extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Schema for updating an account
export const UpdateAccountSchema = AccountSchema.partial().omit({ id: true });

// Export types
export type Account = z.infer<typeof AccountSchema>;
export type CreateAccount = z.infer<typeof CreateAccountSchema>;
export type UpdateAccount = z.infer<typeof UpdateAccountSchema>;
