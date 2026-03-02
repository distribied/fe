import { searchProducts, recommendProducts } from "@/service/search.service";
import { useQuery } from "@tanstack/react-query";

interface UseSearchParams {
  searchTerm: string;
  categoryId?: string;
}

export function useSearchProducts({ searchTerm, categoryId }: UseSearchParams) {
  return useQuery({
    queryKey: ["search-products", searchTerm, categoryId],
    queryFn: () => searchProducts(searchTerm, { categoryId }),
    enabled: !!searchTerm,
    staleTime: 1000 * 60 * 2,
  });
}

interface UseRecommendParams {
  searchTerm: string;
  limit?: number;
}

export function useRecommendProducts({ searchTerm, limit: limitCount = 5 }: UseRecommendParams) {
  return useQuery({
    queryKey: ["recommend-products", searchTerm, limitCount],
    queryFn: () => recommendProducts(searchTerm, limitCount),
    enabled: !!searchTerm && searchTerm.trim().length >= 2,
    staleTime: 1000 * 60,
  });
}
