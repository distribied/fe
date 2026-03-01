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

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.(),
    updatedAt: doc.data().updatedAt?.toDate?.(),
  })) as Product[];
}
