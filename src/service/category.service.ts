import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  query,
  where,
  limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { type Category, CategorySchema, CreateCategorySchema } from "@/schemas";
import {
  CATEGORIES_COLLECTION,
  PRODUCTS_COLLECTION,  
} from "@/const/firebase-collections";
import { CategoryHasProductsError } from "@/errors/category.errors";

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
  const categoryRef = doc(db, CATEGORIES_COLLECTION, id);
  await updateDoc(categoryRef, updates);

  const productSnap = await getDocs(
    query(collection(db, PRODUCTS_COLLECTION), where("categoryId", "==", id)),
  );
  if (productSnap.empty) return;
  const batch = writeBatch(db);
  productSnap.forEach((p) => {
    const payload: any = {};

    if (updates.name) payload.categoryName = updates.name;
    if (updates.slug) payload.categorySlug = updates.slug;

    batch.update(p.ref, payload);
  });

  await batch.commit();
};

export const deleteCategory = async (id: string): Promise<void> => {
  const productQuery = query(
    collection(db, PRODUCTS_COLLECTION),
    where("categoryId", "==", id),
    limit(1),
  );
  const snapshot = await getDocs(productQuery);
  if (!snapshot.empty) {
    throw new CategoryHasProductsError();
  }
  await deleteDoc(doc(db, CATEGORIES_COLLECTION, id));
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
