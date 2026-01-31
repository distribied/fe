import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
  QueryConstraint,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product, Category, ProductImage } from "@/types/product.types";

const PRODUCTS_COLLECTION = "products";
const CATEGORIES_COLLECTION = "categories";
const PRODUCT_IMAGES_COLLECTION = "product_images";

// Helper to convert Firestore doc to Product
const docToProduct = (docData: DocumentData, docId: string): Product => ({
  id: parseInt(docId) || 0,
  categoryId: docData.categoryId,
  name: docData.name,
  slug: docData.slug,
  description: docData.description,
  metadata: docData.metadata,
  price: docData.price,
  isActive: docData.isActive ?? true,
  ratingAverage: docData.ratingAverage ?? 0,
  createdAt:
    docData.createdAt?.toDate?.()?.toISOString?.() ??
    docData.createdAt ??
    new Date().toISOString(),
  updatedAt:
    docData.updatedAt?.toDate?.()?.toISOString?.() ?? docData.updatedAt,
});

// ==================== PRODUCTS ====================

export interface ProductFilters {
  categoryId?: number;
  isActive?: boolean;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
}

export const getProducts = async (
  filters?: ProductFilters,
): Promise<Product[]> => {
  const constraints: QueryConstraint[] = [];

  if (filters?.categoryId) {
    constraints.push(where("categoryId", "==", filters.categoryId));
  }
  if (filters?.isActive !== undefined) {
    constraints.push(where("isActive", "==", filters.isActive));
  }
  if (filters?.limit) {
    constraints.push(limit(filters.limit));
  }

  const q = query(collection(db, PRODUCTS_COLLECTION), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => docToProduct(d.data(), d.id));
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return docToProduct(snapshot.data(), snapshot.id);
};

export const getProductBySlug = async (
  slug: string,
): Promise<Product | null> => {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    where("slug", "==", slug),
    limit(1),
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const d = snapshot.docs[0];
  return docToProduct(d.data(), d.id);
};

export const createProduct = async (
  product: Omit<Product, "id">,
): Promise<Product> => {
  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
    ...product,
    createdAt: new Date().toISOString(),
    isActive: product.isActive ?? true,
    ratingAverage: product.ratingAverage ?? 0,
  });
  return { ...product, id: parseInt(docRef.id) || 0 } as Product;
};

export const updateProduct = async (
  id: string,
  updates: Partial<Product>,
): Promise<void> => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(docRef, { ...updates, updatedAt: new Date().toISOString() });
};

export const deleteProduct = async (id: string): Promise<void> => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await deleteDoc(docRef);
};

// ==================== CATEGORIES ====================

export const getCategories = async (): Promise<Category[]> => {
  const snapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
  return snapshot.docs.map((d) => ({
    id: parseInt(d.id) || 0,
    name: d.data().name,
    slug: d.data().slug,
    order: d.data().order,
  }));
};

export const getCategoryById = async (id: string): Promise<Category | null> => {
  const docRef = doc(db, CATEGORIES_COLLECTION, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return {
    id: parseInt(snapshot.id) || 0,
    name: snapshot.data().name,
    slug: snapshot.data().slug,
    order: snapshot.data().order,
  };
};

// ==================== PRODUCT IMAGES ====================

export const getProductImages = async (
  productId: string,
): Promise<ProductImage[]> => {
  const q = query(
    collection(db, PRODUCT_IMAGES_COLLECTION),
    where("productId", "==", productId),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs
    .filter((d) => !d.data().isDeleted)
    .map((d) => ({
      id: parseInt(d.id) || 0,
      productId: d.data().productId,
      url: d.data().url,
      isThumbnail: d.data().isThumbnail ?? false,
      isDeleted: d.data().isDeleted,
      updatedAt:
        d.data().updatedAt?.toDate?.()?.toISOString?.() ?? d.data().updatedAt,
    }));
};

export const addProductImage = async (
  image: Omit<ProductImage, "id">,
): Promise<ProductImage> => {
  const docRef = await addDoc(collection(db, PRODUCT_IMAGES_COLLECTION), {
    ...image,
    isDeleted: false,
    updatedAt: new Date().toISOString(),
  });
  return { ...image, id: parseInt(docRef.id) || 0 } as ProductImage;
};

export const deleteProductImage = async (id: string): Promise<void> => {
  const docRef = doc(db, PRODUCT_IMAGES_COLLECTION, id);
  await updateDoc(docRef, {
    isDeleted: true,
    updatedAt: new Date().toISOString(),
  });
};

// ==================== MOCK DATA SEEDING ====================

const MOCK_CATEGORIES: Omit<Category, "id">[] = [
  { name: "Hộp quà Tết", slug: "hop-qua-tet", order: 1 },
  { name: "Bánh kẹo", slug: "banh-keo", order: 2 },
  { name: "Trái cây sấy", slug: "trai-cay-say", order: 3 },
  { name: "Hạt dinh dưỡng", slug: "hat-dinh-duong", order: 4 },
];

const MOCK_PRODUCTS: Omit<Product, "id">[] = [
  {
    categoryId: 1,
    name: "Hộp quà Tết Phú Quý",
    slug: "hop-qua-tet-phu-quy",
    description: "Hộp quà Tết sang trọng với đầy đủ bánh kẹo truyền thống",
    price: 599000,
    isActive: true,
    ratingAverage: 4.8,
    createdAt: new Date().toISOString(),
  },
  {
    categoryId: 1,
    name: "Hộp quà Tết An Khang",
    slug: "hop-qua-tet-an-khang",
    description: "Hộp quà cao cấp với các loại hạt dinh dưỡng",
    price: 899000,
    isActive: true,
    ratingAverage: 4.9,
    createdAt: new Date().toISOString(),
  },
  {
    categoryId: 2,
    name: "Bánh pía Sóc Trăng",
    slug: "banh-pia-soc-trang",
    description: "Bánh pía truyền thống Sóc Trăng, nhân đậu xanh sầu riêng",
    price: 150000,
    isActive: true,
    ratingAverage: 4.7,
    createdAt: new Date().toISOString(),
  },
  {
    categoryId: 2,
    name: "Kẹo dừa Bến Tre",
    slug: "keo-dua-ben-tre",
    description: "Kẹo dừa thơm ngon đặc sản Bến Tre",
    price: 85000,
    isActive: true,
    ratingAverage: 4.5,
    createdAt: new Date().toISOString(),
  },
  {
    categoryId: 3,
    name: "Xoài sấy dẻo",
    slug: "xoai-say-deo",
    description: "Xoài sấy dẻo tự nhiên, không chất bảo quản",
    price: 120000,
    isActive: true,
    ratingAverage: 4.6,
    createdAt: new Date().toISOString(),
  },
  {
    categoryId: 4,
    name: "Hạt điều rang muối",
    slug: "hat-dieu-rang-muoi",
    description: "Hạt điều Bình Phước rang muối giòn tan",
    price: 250000,
    isActive: true,
    ratingAverage: 4.8,
    createdAt: new Date().toISOString(),
  },
];

export const seedMockData = async (): Promise<{
  categories: number;
  products: number;
}> => {
  const batch = writeBatch(db);
  let categoryCount = 0;
  let productCount = 0;

  // Seed categories
  for (const category of MOCK_CATEGORIES) {
    const docRef = doc(collection(db, CATEGORIES_COLLECTION));
    batch.set(docRef, category);
    categoryCount++;
  }

  // Seed products
  for (const product of MOCK_PRODUCTS) {
    const docRef = doc(collection(db, PRODUCTS_COLLECTION));
    batch.set(docRef, product);
    productCount++;
  }

  await batch.commit();
  return { categories: categoryCount, products: productCount };
};

export const clearAllData = async (): Promise<void> => {
  const collections = [
    PRODUCTS_COLLECTION,
    CATEGORIES_COLLECTION,
    PRODUCT_IMAGES_COLLECTION,
  ];

  for (const collectionName of collections) {
    const snapshot = await getDocs(collection(db, collectionName));
    const batch = writeBatch(db);
    snapshot.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();
  }
};
