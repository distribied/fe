import {
  collection,
  getDocs,
  query,
  where,
  limit,
  QueryConstraint,
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

  const constraints: QueryConstraint[] = [
    where("isActive", "==", true),
    where("searchKeywords", "array-contains", normalized),
    limit(options?.limit ?? 20),
  ];

  if (options?.categoryId) {
    constraints.unshift(where("categoryId", "==", options.categoryId));
  }

  const q = query(collection(db, "products"), ...constraints);
  const snapshot = await getDocs(q);

  // Fetch products with their images
  const products = await Promise.all(
    snapshot.docs.map(async (d) => {
      const product = {
        id: d.id,
        ...d.data(),
        createdAt: d.data().createdAt?.toDate?.(),
        updatedAt: d.data().updatedAt?.toDate?.(),
      };
      // Fetch images for this product
      const images = await getProductImages(d.id);
      return { ...product, images };
    }),
  );

  return products as Product[];
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
