import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { type Category, CategorySchema, CreateCategorySchema } from "@/schemas";

export const CATEGORIES_COLLECTION = "categories";

// Helper to remove undefined values from object
const removeUndefined = <T extends Record<string, any>>(obj: T): Partial<T> => {
  const cleaned: any = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined) {
      cleaned[key] = obj[key];
    }
  });
  return cleaned;
};

export const getCategories = async (): Promise<Category[]> => {
  const snapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
  return snapshot.docs.map((d) => {
    const data = d.data();
    return CategorySchema.parse({
      id: d.id,
      name: data.name,
      slug: data.slug,
      order: data.order,
    });
  });
};

export const getCategoryById = async (id: string): Promise<Category | null> => {
  const docRef = doc(db, CATEGORIES_COLLECTION, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;

  const data = snapshot.data();
  return CategorySchema.parse({
    id: snapshot.id,
    name: data.name,
    slug: data.slug,
    order: data.order,
  });
};

export const createCategory = async (
  category: Omit<Category, "id">,
): Promise<Category> => {
  const validatedCategory = CreateCategorySchema.parse(category);
  const docRef = await addDoc(
    collection(db, CATEGORIES_COLLECTION),
    validatedCategory,
  );

  return CategorySchema.parse({
    id: docRef.id,
    ...validatedCategory,
  });
};

export const updateCategory = async (
  id: string,
  updates: Partial<Category>,
): Promise<void> => {
  const docRef = doc(db, CATEGORIES_COLLECTION, id);
  await updateDoc(docRef, removeUndefined(updates));
};

export const deleteCategory = async (id: string): Promise<void> => {
  const docRef = doc(db, CATEGORIES_COLLECTION, id);
  await deleteDoc(docRef);
};

// Mock data for seeding
const MOCK_CATEGORIES: Omit<Category, "id">[] = [
  { name: "Hộp quà Tết", slug: "hop-qua-tet", order: 1 },
  { name: "Bánh kẹo", slug: "banh-keo", order: 2 },
  { name: "Trái cây sấy", slug: "trai-cay-say", order: 3 },
  { name: "Hạt dinh dưỡng", slug: "hat-dinh-duong", order: 4 },
];

export const seedCategories = async (): Promise<number> => {
  const batch = writeBatch(db);
  let categoryCount = 0;

  for (const category of MOCK_CATEGORIES) {
    const categoryRef = doc(collection(db, CATEGORIES_COLLECTION));
    batch.set(categoryRef, category);
    categoryCount++;
  }

  await batch.commit();
  return categoryCount;
};
