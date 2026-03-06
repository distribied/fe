import {
  collection,
  getDocs,
  query,
  where,
  limit,
  or,
  QueryConstraint,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { normalizeText } from "@/utils/search.utils";
import { Product } from "@/schemas";
import { getProductImages } from "./product.service";

interface SearchOptions {
  categoryId?: string;
  limit?: number;
}

export async function searchProducts(
  searchTerm: string,
  options?: SearchOptions,
): Promise<Product[]> {
  if (!searchTerm.trim()) return [];

  const normalized = normalizeText(searchTerm);

  // First, try to find products that match searchKeywords
  const constraints: QueryConstraint[] = [
    where("isActive", "==", true),
    limit(options?.limit ?? 20),
  ];

  if (options?.categoryId) {
    constraints.unshift(where("categoryId", "==", options.categoryId));
  }

  // Try searchKeywords first
  const keywordQuery = query(
    collection(db, "products"),
    where("isActive", "==", true),
    where("searchKeywords", "array-contains", normalized),
    ...(options?.categoryId ? [where("categoryId", "==", options.categoryId)] : []),
    limit(options?.limit ?? 20),
  );

  const keywordSnapshot = await getDocs(keywordQuery);

  let products = await Promise.all(
    keywordSnapshot.docs.map(async (d) => {
      const product = {
        id: d.id,
        ...d.data(),
        createdAt: d.data().createdAt?.toDate?.(),
        updatedAt: d.data().updatedAt?.toDate?.(),
      };
      const images = await getProductImages(d.id);
      return { ...product, images };
    }),
  ) as Product[];

  // If no results from searchKeywords, try to search by name
  if (products.length === 0) {
    // Search by name using startAt/endAt for prefix matching
    const nameQuery = query(
      collection(db, "products"),
      where("isActive", "==", true),
      orderBy("name"),
      startAt(searchTerm.toLowerCase()),
      endAt(searchTerm.toLowerCase() + '\uf8ff'),
      limit(options?.limit ?? 20),
    );

    try {
      const nameSnapshot = await getDocs(nameQuery);

      products = await Promise.all(
        nameSnapshot.docs.map(async (d) => {
          const product = {
            id: d.id,
            ...d.data(),
            createdAt: d.data().createdAt?.toDate?.(),
            updatedAt: d.data().updatedAt?.toDate?.(),
          };
          const images = await getProductImages(d.id);
          return { ...product, images };
        }),
      ) as Product[];
    } catch (error) {
      // If orderBy fails (e.g., no index), try without it
      console.log("Name search failed, trying fallback...");
      const fallbackQuery = query(
        collection(db, "products"),
        where("isActive", "==", true),
        limit(options?.limit ?? 100),
      );

      const fallbackSnapshot = await getDocs(fallbackQuery);

      // Filter by name manually
      const searchLower = searchTerm.toLowerCase();
      products = await Promise.all(
        fallbackSnapshot.docs
          .filter(d => d.data().name?.toString().toLowerCase().includes(searchLower))
          .slice(0, options?.limit ?? 20)
          .map(async (d) => {
            const product = {
              id: d.id,
              ...d.data(),
              createdAt: d.data().createdAt?.toDate?.(),
              updatedAt: d.data().updatedAt?.toDate?.(),
            };
            const images = await getProductImages(d.id);
            return { ...product, images };
          }),
      ) as Product[];
    }
  }

  // Filter by category if specified and we got results from name search
  if (products.length > 0 && options?.categoryId) {
    products = products.filter(p => p.categoryId?.toString() === options.categoryId);
  }

  return products;
}

/**
 * Get search suggestions for autocomplete
 * Returns a limited number of products that match the search term
 */
export async function recommendProducts(
  searchTerm: string,
  limitCount: number = 5,
): Promise<Product[]> {
  if (!searchTerm.trim() || searchTerm.trim().length < 2) return [];

  const normalized = normalizeText(searchTerm);

  // Use array-contains-any to match any keyword that contains the search term
  const q = query(
    collection(db, "products"),
    where("isActive", "==", true),
    where("searchKeywords", "array-contains", normalized),
    limit(limitCount),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.(),
    updatedAt: doc.data().updatedAt?.toDate?.(),
  })) as Product[];
}
