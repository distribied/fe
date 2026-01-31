import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Account } from "@/types/account.types";

interface AuthState {
  user: Account | null;
  isAuthenticated: boolean;
  login: (user: Account) => void;
  logout: () => void;
  updateUser: (updates: Partial<Account>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: "auth-storage",
    },
  ),
);
