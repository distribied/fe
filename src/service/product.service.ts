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
import {
  ProductSchema,
  CreateProductSchema,
  UpdateProductSchema,
  CategorySchema,
  CreateCategorySchema,
  ProductImageSchema,
  CreateProductImageSchema,
  type Product,
  type CreateProduct,
  type Category,
  type ProductImage,
} from "@/schemas";

const PRODUCTS_COLLECTION = "products";
const CATEGORIES_COLLECTION = "categories";
const PRODUCT_IMAGES_COLLECTION = "product_images";

// Helper to convert Firestore doc to Product with validation
const docToProduct = (docData: DocumentData, docId: string): Product => {
  const rawData = {
    id: docId,
    categoryId: docData.categoryId || docData.category_id,
    name: docData.name,
    slug: docData.slug,
    description: docData.description,
    metadata: docData.metadata,
    price: docData.price,
    isActive: docData.isActive ?? docData.is_active ?? true,
    ratingAverage: docData.ratingAverage ?? docData.rating_average ?? 0,
    createdAt:
      docData.createdAt?.toDate?.() ??
      docData.created_at?.toDate?.() ??
      (docData.createdAt || docData.created_at
        ? new Date(docData.createdAt || docData.created_at)
        : new Date()),
    updatedAt:
      docData.updatedAt?.toDate?.() ??
      docData.updated_at?.toDate?.() ??
      (docData.updatedAt || docData.updated_at
        ? new Date(docData.updatedAt || docData.updated_at)
        : undefined),
  };

  return ProductSchema.parse(rawData);
};

// ==================== PRODUCTS ====================

export interface ProductFilters {
  categoryId?: number | string;
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

// Helper to remove undefined values from object (Firestore doesn't accept undefined)
const removeUndefined = <T extends Record<string, any>>(obj: T): Partial<T> => {
  const cleaned: any = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined) {
      cleaned[key] = obj[key];
    }
  });
  return cleaned;
};

export const createProduct = async (
  product: CreateProduct,
): Promise<Product> => {
  // Validate input
  const validatedProduct = CreateProductSchema.parse(product);

  const firebaseData = removeUndefined({
    categoryId: validatedProduct.categoryId,
    name: validatedProduct.name,
    slug: validatedProduct.slug,
    description: validatedProduct.description,
    metadata: validatedProduct.metadata,
    price: validatedProduct.price,
    isActive: validatedProduct.isActive ?? true,
    ratingAverage: validatedProduct.ratingAverage ?? 0,
    createdAt: new Date(),
  });

  const docRef = await addDoc(
    collection(db, PRODUCTS_COLLECTION),
    firebaseData,
  );

  return ProductSchema.parse({
    id: docRef.id,
    ...validatedProduct,
    createdAt: firebaseData.createdAt,
  });
};

export const createProductWithImages = async (
  product: CreateProduct,
  imageUrls: string[],
  thumbnailIndex: number = 0,
): Promise<Product> => {
  // Create the product first
  const createdProduct = await createProduct(product);

  // Create product images if provided
  if (imageUrls.length > 0) {
    const batch = writeBatch(db);

    imageUrls.forEach((url, index) => {
      const imageRef = doc(collection(db, PRODUCT_IMAGES_COLLECTION));
      batch.set(imageRef, {
        productId: createdProduct.id,
        url,
        isThumbnail: index === thumbnailIndex,
        isDeleted: false,
        updatedAt: new Date(),
      });
    });

    await batch.commit();
  }

  return createdProduct;
};

export const updateProduct = async (
  id: string,
  updates: Partial<Product>,
): Promise<void> => {
  // Validate updates
  const validatedUpdates = UpdateProductSchema.parse(updates);

  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(
    docRef,
    removeUndefined({
      ...validatedUpdates,
      updatedAt: new Date(),
    }),
  );
};

export const deleteProduct = async (id: string): Promise<void> => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await deleteDoc(docRef);
};

// ==================== CATEGORIES ====================

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
    .filter((d) => !d.data().isDeleted && !d.data().is_deleted)
    .map((d) => {
      const data = d.data();
      return ProductImageSchema.parse({
        id: d.id,
        productId: data.productId || data.product_id,
        url: data.url,
        isThumbnail: data.isThumbnail ?? data.is_thumbnail ?? false,
        isDeleted: data.isDeleted ?? data.is_deleted,
        updatedAt:
          data.updatedAt?.toDate?.() ??
          data.updated_at?.toDate?.() ??
          (data.updatedAt || data.updated_at
            ? new Date(data.updatedAt || data.updated_at)
            : undefined),
      });
    });
};

export const addProductImage = async (
  image: Omit<ProductImage, "id">,
): Promise<ProductImage> => {
  // Validate input
  const validatedImage = CreateProductImageSchema.parse(image);

  const docRef = await addDoc(collection(db, PRODUCT_IMAGES_COLLECTION), {
    productId: validatedImage.productId,
    url: validatedImage.url,
    isThumbnail: validatedImage.isThumbnail ?? false,
    isDeleted: false,
    updatedAt: new Date(),
  });

  return ProductImageSchema.parse({
    id: docRef.id,
    ...validatedImage,
    isDeleted: false,
    updatedAt: new Date(),
  });
};

export const deleteProductImage = async (id: string): Promise<void> => {
  const docRef = doc(db, PRODUCT_IMAGES_COLLECTION, id);
  await updateDoc(docRef, {
    isDeleted: true,
    updatedAt: new Date(),
  });
};

// ==================== MOCK DATA SEEDING ====================

const MOCK_CATEGORIES: Omit<Category, "id">[] = [
  { name: "Hộp quà Tết", slug: "hop-qua-tet", order: 1 },
  { name: "Bánh kẹo", slug: "banh-keo", order: 2 },
  { name: "Trái cây sấy", slug: "trai-cay-say", order: 3 },
  { name: "Hạt dinh dưỡng", slug: "hat-dinh-duong", order: 4 },
];

const MOCK_PRODUCTS: CreateProduct[] = [
  {
    categoryId: "1",
    name: "Hộp quà Tết Phú Quý",
    slug: "hop-qua-tet-phu-quy",
    description: "Hộp quà Tết sang trọng với đầy đủ bánh kẹo truyền thống",
    price: 599000,
    isActive: true,
    ratingAverage: 4.8,
  },
  {
    categoryId: "1",
    name: "Hộp quà Tết An Khang",
    slug: "hop-qua-tet-an-khang",
    description: "Hộp quà cao cấp với các loại hạt dinh dưỡng",
    price: 899000,
    isActive: true,
    ratingAverage: 4.9,
  },
  {
    categoryId: "2",
    name: "Bánh pía Sóc Trăng",
    slug: "banh-pia-soc-trang",
    description: "Bánh pía truyền thống Sóc Trăng, nhân đậu xanh sầu riêng",
    price: 150000,
    isActive: true,
    ratingAverage: 4.7,
  },
  {
    categoryId: "2",
    name: "Kẹo dừa Bến Tre",
    slug: "keo-dua-ben-tre",
    description: "Kẹo dừa thơm ngon đặc sản Bến Tre",
    price: 85000,
    isActive: true,
    ratingAverage: 4.5,
  },
  {
    categoryId: "3",
    name: "Xoài sấy dẻo",
    slug: "xoai-say-deo",
    description: "Xoài sấy dẻo tự nhiên, không chất bảo quản",
    price: 120000,
    isActive: true,
    ratingAverage: 4.6,
  },
  {
    categoryId: "4",
    name: "Hạt điều rang muối",
    slug: "hat-dieu-rang-muoi",
    description: "Hạt điều Bình Phước rang muối giòn tan",
    price: 250000,
    isActive: true,
    ratingAverage: 4.8,
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
    const validatedCategory = CreateCategorySchema.parse(category);
    const docRef = doc(collection(db, CATEGORIES_COLLECTION));
    batch.set(docRef, validatedCategory);
    categoryCount++;
  }

  // Seed products
  for (const product of MOCK_PRODUCTS) {
    const validatedProduct = CreateProductSchema.parse(product);
    const docRef = doc(collection(db, PRODUCTS_COLLECTION));
    batch.set(docRef, {
      ...validatedProduct,
      createdAt: new Date(),
    });
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
