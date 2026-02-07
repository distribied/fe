import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type Account, type CreateAccount, type UpdateAccount, type Role } from "@/schemas";

const API_BASE_URL = "/api";

// Fetch all accounts
const fetchAccounts = async (): Promise<Account[]> => {
  const response = await fetch(`${API_BASE_URL}/accounts`);
  if (!response.ok) throw new Error("Failed to fetch accounts");
  return response.json();
};

// Fetch account profile
const fetchAccount = async (id: string): Promise<Account> => {
  const response = await fetch(`${API_BASE_URL}/accounts/${id}`);
  if (!response.ok) throw new Error("Failed to fetch account");
  return response.json();
};

// Create account
const createAccount = async (data: CreateAccount): Promise<Account> => {
  const response = await fetch(`${API_BASE_URL}/accounts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create account");
  return response.json();
};

// Update account
const updateAccount = async ({ id, updates }: { id: string; updates: UpdateAccount }): Promise<Account> => {
  const response = await fetch(`${API_BASE_URL}/accounts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error("Failed to update account");
  return response.json();
};

// Delete account
const deleteAccount = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/accounts/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete account");
};

// Fetch account profile (for current user)
const fetchMe = async (): Promise<Account> => {
  const response = await fetch(`${API_BASE_URL}/account/me`);
  if (!response.ok) throw new Error("Failed to fetch account");
  return response.json();
};

// Update account profile (for current user)
const updateMe = async (updates: Partial<Account>): Promise<Account> => {
  const response = await fetch(`${API_BASE_URL}/account/me`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error("Failed to update account");
  return response.json();
};

export const useAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
  });
};

export const useAccount = (id?: string) => {
  return useQuery({
    queryKey: ["account", id],
    queryFn: () => fetchAccount(id!),
    enabled: !!id,
  });
};

export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["account"] });
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};

// For current user account
export const useMe = () => {
  return useQuery({
    queryKey: ["account", "me"],
    queryFn: fetchMe,
  });
};

export const useUpdateMe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account", "me"] });
    },
  });
};
