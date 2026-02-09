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
  ProductImageSchema,
  CreateProductImageSchema,
  type Product,
  type CreateProduct,
  type ProductImage,
} from "@/schemas";
import { PRODUCT_IMAGES_COLLECTION, PRODUCTS_COLLECTION } from "@/const/constants";


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
  search?: string;
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

  let q = query(collection(db, PRODUCTS_COLLECTION), ...constraints);
  let snapshot = await getDocs(q);

  // Apply search filter on the client side if search is provided
  let productDocs = snapshot.docs;
  if (filters?.search) {
    const searchTerm = filters.search.toLowerCase();
    productDocs = snapshot.docs.filter((doc) => {
      const data = doc.data();
      return (
        data.name?.toLowerCase().includes(searchTerm) ||
        data.description?.toLowerCase().includes(searchTerm) ||
        data.slug?.toLowerCase().includes(searchTerm)
      );
    });
  }

  // Fetch products with their images
  const products = await Promise.all(
    productDocs.map(async (d) => {
      const product = docToProduct(d.data(), d.id);
      // Fetch images for this product
      const images = await getProductImages(d.id);
      return { ...product, images };
    }),
  );

  return products;
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

export const updateProductWithImages = async (
  productId: string,
  updates: Partial<Product>,
  imageUrls: string[],
  thumbnailIndex: number = 0,
): Promise<void> => {
  // Update product data
  await updateProduct(productId, updates);

  // Get existing images
  const existingImages = await getProductImages(productId);
  const existingUrls = new Set(existingImages.map((img) => img.url));

  // Find images to delete (in existing but not in new list)
  const imagesToDelete = existingImages.filter(
    (img) => !imageUrls.includes(img.url),
  );

  // Find images to add (in new list but not existing)
  const urlsToAdd = imageUrls.filter((url) => !existingUrls.has(url));

  const batch = writeBatch(db);

  // Soft-delete removed images
  for (const img of imagesToDelete) {
    const imgRef = doc(db, PRODUCT_IMAGES_COLLECTION, img.id.toString());
    batch.update(imgRef, { isDeleted: true, updatedAt: new Date() });
  }

  // Update thumbnail flags on existing images
  for (const img of existingImages) {
    if (!imagesToDelete.includes(img)) {
      const imgIndex = imageUrls.indexOf(img.url);
      const shouldBeThumbnail = imgIndex === thumbnailIndex;
      if (img.isThumbnail !== shouldBeThumbnail) {
        const imgRef = doc(db, PRODUCT_IMAGES_COLLECTION, img.id.toString());
        batch.update(imgRef, {
          isThumbnail: shouldBeThumbnail,
          updatedAt: new Date(),
        });
      }
    }
  }

  // Add new images
  urlsToAdd.forEach((url) => {
    const urlIndex = imageUrls.indexOf(url);
    const imageRef = doc(collection(db, PRODUCT_IMAGES_COLLECTION));
    batch.set(imageRef, {
      productId: productId,
      url,
      isThumbnail: urlIndex === thumbnailIndex,
      isDeleted: false,
      updatedAt: new Date(),
    });
  });

  await batch.commit();
};

export const deleteProduct = async (id: string): Promise<void> => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await deleteDoc(docRef);
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

// ==================== HELPERS ====================
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
