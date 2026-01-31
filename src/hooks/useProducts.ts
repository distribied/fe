import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, Category, ProductImage } from "@/types/product.types";
import {
  getProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getCategoryById,
  getProductImages,
  addProductImage,
  deleteProductImage,
  ProductFilters,
} from "@/service/product.service";

// ==================== PRODUCTS ====================

export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};

export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["product", "slug", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: Omit<Product, "id">) => createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Product> }) =>
      updateProduct(id, updates),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// ==================== CATEGORIES ====================

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });
};

// ==================== PRODUCT IMAGES ====================

export const useProductImages = (productId: string) => {
  return useQuery({
    queryKey: ["productImages", productId],
    queryFn: () => getProductImages(productId),
    enabled: !!productId,
  });
};

export const useAddProductImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (image: Omit<ProductImage, "id">) => addProductImage(image),
    onSuccess: (_, image) => {
      queryClient.invalidateQueries({
        queryKey: ["productImages", image.productId],
      });
    },
  });
};

export const useDeleteProductImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, productId }: { id: string; productId: string }) =>
      deleteProductImage(id),
    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({ queryKey: ["productImages", productId] });
    },
  });
};
