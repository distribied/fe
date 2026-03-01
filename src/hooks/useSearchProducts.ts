import { searchProducts } from "@/service/search.service";
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
