"use client";

import { useCartStore, type CartItem } from "@/store/use-cart.store";

export const useCart = () => {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
  };
};

// Get product IDs from cart items
export const useCartProductIds = () => {
  const items = useCartStore((state) => state.items);
  return items.map((item) => item.productId);
};

// Check if a product is in cart
export const useIsInCart = (productId: string) => {
  const items = useCartStore((state) => state.items);
  return items.some((item) => item.productId === productId);
};

// Get quantity of a specific product in cart
export const useCartItemQuantity = (productId: string) => {
  const items = useCartStore((state) => state.items);
  const item = items.find((item) => item.productId === productId);
  return item?.quantity || 0;
};
