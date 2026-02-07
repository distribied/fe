import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Product } from "@/schemas";

interface ProductState {
  products: Product[];
  lastFetched: number | null;

  // Actions
  setProducts: (products: Product[]) => void;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string | number) => void;
  getProductById: (productId: string | number) => Product | undefined;
  clearProducts: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      lastFetched: null,

      setProducts: (products) =>
        set({
          products,
          lastFetched: Date.now(),
        }),

      updateProduct: (updatedProduct) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id.toString() === updatedProduct.id.toString()
              ? updatedProduct
              : p,
          ),
        })),

      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
        })),

      removeProduct: (productId) =>
        set((state) => ({
          products: state.products.filter(
            (p) => p.id.toString() !== productId.toString(),
          ),
        })),

      getProductById: (productId) =>
        get().products.find((p) => p.id.toString() === productId.toString()),

      clearProducts: () => set({ products: [], lastFetched: null }),
    }),
    {
      name: "product-storage",
    },
  ),
);
