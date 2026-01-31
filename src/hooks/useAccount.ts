import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Account } from "@/types/account.types";

const API_BASE_URL = "/api";

// Fetch account profile
const fetchAccount = async (): Promise<Account> => {
  const response = await fetch(`${API_BASE_URL}/account/me`);
  if (!response.ok) throw new Error("Failed to fetch account");
  return response.json();
};

// Update account
const updateAccount = async (updates: Partial<Account>): Promise<Account> => {
  const response = await fetch(`${API_BASE_URL}/account/me`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error("Failed to update account");
  return response.json();
};

export const useAccount = () => {
  return useQuery({
    queryKey: ["account", "me"],
    queryFn: fetchAccount,
  });
};

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account", "me"] });
    },
  });
};
