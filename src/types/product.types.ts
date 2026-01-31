export interface Category {
  id: number;
  name: string;
  slug?: string;
  order?: number;
}

export interface Product {
  id: number;
  categoryId?: number;
  category?: Category; // Optional relation join
  name?: string;
  slug?: string;
  description?: string;
  metadata?: JSON; // JSON type in DB, mapped to any or a more specific interface if known
  price?: number;
  isActive: boolean;
  ratingAverage: number;
  createdAt: string;
  updatedAt?: string;
  images?: ProductImage[]; // Optional relation join
}

export interface ProductImage {
  id: number;
  productId?: number;
  url?: string;
  isThumbnail: boolean;
  isDeleted?: boolean; // Often internal, but included based on schema
  updatedAt?: string;
}
