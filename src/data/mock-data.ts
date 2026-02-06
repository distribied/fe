// Mock data for ProductCard interface
export interface MockProductCard {
  id: string;
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
  showContact?: boolean;
}

// Mock data for Category with products
export interface MockCategory {
  id: string;
  title: string;
  slug: string;
  products: MockProductCard[];
  totalCount: number;
  href: string;
}

export interface MockCategoryTranslation {
  vi: string;
  en: string;
}

export interface MockCategoryInfo {
  id: string;
  name: MockCategoryTranslation;
  slug: MockCategoryTranslation;
  order: number;
  isActive: boolean;
}

// Categories for header menu (multi-language) - Simplified to 5 main categories
export const mockCategoriesInfo: MockCategoryInfo[] = [
  {
    id: "1",
    name: {
      vi: "Hộp Và Giỏ Quà Tết",
      en: "Gift Boxes & Tet Baskets",
    },
    slug: {
      vi: "hop-va-gio-qua-tet",
      en: "gift-boxes-tet-baskets",
    },
    order: 1,
    isActive: true,
  },
  {
    id: "2",
    name: {
      vi: "Túi Cỏ Bàng Vẽ",
      en: "Painted Grass Bags",
    },
    slug: {
      vi: "tui-co-bang-ve",
      en: "painted-grass-bags",
    },
    order: 2,
    isActive: true,
  },
  {
    id: "3",
    name: {
      vi: "Túi Lục Bình Thủ Công",
      en: "Handcraft Water Hyacinth Bags",
    },
    slug: {
      vi: "tui-luc-binh-thu-cong",
      en: "handcraft-water-hyacinth-bags",
    },
    order: 3,
    isActive: true,
  },
  {
    id: "4",
    name: {
      vi: "Sản Phẩm Tre Bamboo",
      en: "Bamboo Products",
    },
    slug: {
      vi: "san-pham-tre-bamboo",
      en: "bamboo-products",
    },
    order: 4,
    isActive: true,
  },
  {
    id: "5",
    name: {
      vi: "Thảm Và Giỏ Đan",
      en: "Woven Mats & Baskets",
    },
    slug: {
      vi: "tham-va-gio-dan",
      en: "woven-mats-baskets",
    },
    order: 5,
    isActive: true,
  },
];

// Mock data for Side Banners (Best Sellers)
export const mockSideProducts = [
  {
    id: "m5",
    image: "/mock/product-5.jpg",
    title: "Thảm Cói Chữ Nhật",
    price: 280000,
  },
  {
    id: "m2",
    image: "/mock/product-2.jpg",
    title: "Giỏ Cói Đựng Đồ Lớn",
    price: 180000,
  },
  {
    id: "h1",
    image: "/mock/product-3.jpg",
    title: "Túi Lục Bình Vẽ Hoa Mai",
    price: 520000,
    oldPrice: 580000,
  },
];

// Mock data for Categories with Products - 5 main categories with more products
export const mockCategoriesData: MockCategory[] = [
  {
    id: "1",
    title: "HỘP VÀ GIỎ QUÀ TẾT",
    slug: "hop-va-gio-qua-tet",
    totalCount: 24, // Nhiều hơn 8 sản phẩm -> hiển thị nút "Xem tất cả"
    href: "/category/hop-va-gio-qua-tet",
    products: [
      {
        id: "g1",
        image: "/mock/product-1.jpg",
        title: "Giỏ Tre Chùm Gói Quà Tết",
        price: 150000,
      },
      {
        id: "g2",
        image: "/mock/product-2.jpg",
        title: "Giỏ Chữ Nhật Quai Trúc",
        price: 175000,
      },
      {
        id: "g3",
        image: "/mock/product-3.jpg",
        title: "Hộp Tre Gói Quà Màu",
        price: 140000,
        oldPrice: 180000,
      },
      {
        id: "g4",
        image: "/mock/product-4.jpg",
        title: "Hộp Tre Úp Gói Quà",
        price: 125000,
      },
      {
        id: "g5",
        image: "/mock/product-5.jpg",
        title: "Giỏ Tre Oval Quai Gỗ",
        price: 195000,
      },
      {
        id: "g6",
        image: "/mock/product-6.jpg",
        title: "Hộp Tre Vuông Nắp Đậy",
        price: 280000,
        oldPrice: 320000,
      },
      {
        id: "g7",
        image: "/mock/product-7.jpg",
        title: "Giỏ Tre Tròn Mini",
        price: 85000,
      },
      {
        id: "g8",
        image: "/mock/product-8.jpg",
        title: "Hộp Tre Chữ Nhật Lớn",
        price: 420000,
      },
    ],
  },
  {
    id: "2",
    title: "TÚI CỎ BÀNG VẼ",
    slug: "tui-co-bang-ve",
    totalCount: 18,
    href: "/category/tui-co-bang-ve",
    products: [
      {
        id: "b1",
        image: "/mock/product-1.jpg",
        title: "Túi Sờ Bàng Thêu Hoa Đào",
        price: 450000,
        oldPrice: 520000,
      },
      {
        id: "b2",
        image: "/mock/product-2.jpg",
        title: "Túi Cỏ Bàng Vẽ Hoa Sen",
        price: 380000,
      },
      {
        id: "b3",
        image: "/mock/product-3.jpg",
        title: "Túi Cỏ Bàng Vẽ Phong Cảnh",
        price: 420000,
        oldPrice: 480000,
      },
      {
        id: "b4",
        image: "/mock/product-4.jpg",
        title: "Túi Bàng Quai Gỗ Thêu",
        price: 350000,
      },
      {
        id: "b5",
        image: "/mock/product-5.jpg",
        title: "Túi Cỏ Bàng Thêu Lá",
        price: 320000,
      },
      {
        id: "b6",
        image: "/mock/product-6.jpg",
        title: "Túi Bàng Oval Đeo Chéo",
        price: 290000,
        oldPrice: 340000,
      },
      {
        id: "b7",
        image: "/mock/product-7.jpg",
        title: "Túi Cỏ Bàng Tròn Nhỏ",
        price: 220000,
      },
      {
        id: "b8",
        image: "/mock/product-8.jpg",
        title: "Túi Bàng Quai Dài Vintage",
        price: 480000,
      },
    ],
  },
  {
    id: "3",
    title: "TÚI LỤC BÌNH THỦ CÔNG",
    slug: "tui-luc-binh-thu-cong",
    totalCount: 16,
    href: "/category/tui-luc-binh-thu-cong",
    products: [
      {
        id: "h1",
        image: "/mock/product-1.jpg",
        title: "Túi Lục Bình Vẽ Hoa Mai",
        price: 520000,
        oldPrice: 580000,
      },
      {
        id: "h2",
        image: "/mock/product-2.jpg",
        title: "Túi Lục Bình Thêu Chim",
        price: 490000,
      },
      {
        id: "h3",
        image: "/mock/product-3.jpg",
        title: "Túi Lục Bình Oval Quai Tre",
        price: 450000,
      },
      {
        id: "h4",
        image: "/mock/product-4.jpg",
        title: "Túi Lục Bình Mini Đeo Vai",
        price: 320000,
        oldPrice: 380000,
      },
      {
        id: "h5",
        image: "/mock/product-5.jpg",
        title: "Túi Lục Bình Chữ Nhật",
        price: 420000,
      },
      {
        id: "h6",
        image: "/mock/product-6.jpg",
        title: "Túi Lục Bình Vẽ Phong Cảnh",
        price: 550000,
      },
      {
        id: "h7",
        image: "/mock/product-7.jpg",
        title: "Túi Lục Bình Tròn Quai Gỗ",
        price: 380000,
        oldPrice: 420000,
      },
      {
        id: "h8",
        image: "/mock/product-8.jpg",
        title: "Túi Lục Bình Cao Cấp",
        price: 650000,
      },
    ],
  },
  {
    id: "4",
    title: "SẢN PHẨM TRE BAMBOO",
    slug: "san-pham-tre-bamboo",
    totalCount: 20,
    href: "/category/san-pham-tre-bamboo",
    products: [
      {
        id: "t1",
        image: "/mock/product-1.jpg",
        title: "Khay Tre Phục Vụ Trà",
        price: 180000,
      },
      {
        id: "t2",
        image: "/mock/product-2.jpg",
        title: "Hộp Tre Đựng Bánh Kẹo",
        price: 220000,
        oldPrice: 260000,
      },
      {
        id: "t3",
        image: "/mock/product-3.jpg",
        title: "Sọt Tre Đựng Đồ",
        price: 150000,
      },
      {
        id: "t4",
        image: "/mock/product-4.jpg",
        title: "Kệ Tre Mini Trang Trí",
        price: 120000,
      },
      {
        id: "t5",
        image: "/mock/product-5.jpg",
        title: "Đĩa Tre Oval",
        price: 85000,
        oldPrice: 110000,
      },
      {
        id: "t6",
        image: "/mock/product-6.jpg",
        title: "Hộp Tre Nắp Kính",
        price: 320000,
      },
      {
        id: "t7",
        image: "/mock/product-7.jpg",
        title: "Giỏ Tre Tròn Có Nắp",
        price: 190000,
      },
      {
        id: "t8",
        image: "/mock/product-8.jpg",
        title: "Túi Tre Đan Thủ Công",
        price: 280000,
        oldPrice: 320000,
      },
    ],
  },
  {
    id: "5",
    title: "THẢM VÀ GIỎ ĐAN",
    slug: "tham-va-gio-dan",
    totalCount: 14,
    href: "/category/tham-va-gio-dan",
    products: [
      {
        id: "m1",
        image: "/mock/product-1.jpg",
        title: "Thảm Cói Tự Nhiên",
        price: 320000,
        oldPrice: 380000,
      },
      {
        id: "m2",
        image: "/mock/product-2.jpg",
        title: "Giỏ Cói Đựng Đồ Lớn",
        price: 180000,
      },
      {
        id: "m3",
        image: "/mock/product-3.jpg",
        title: "Thảm Lục Bình Oval",
        price: 420000,
      },
      {
        id: "m4",
        image: "/mock/product-4.jpg",
        title: "Giỏ Đan Quai Tre",
        price: 150000,
        oldPrice: 190000,
      },
      {
        id: "m5",
        image: "/mock/product-5.jpg",
        title: "Thảm Cói Chữ Nhật",
        price: 280000,
      },
      {
        id: "m6",
        image: "/mock/product-6.jpg",
        title: "Giỏ Cói Mini Set 3",
        price: 220000,
      },
      {
        id: "m7",
        image: "/mock/product-7.jpg",
        title: "Thảm Đan Hoa Văn",
        price: 480000,
        oldPrice: 520000,
      },
      {
        id: "m8",
        image: "/mock/product-8.jpg",
        title: "Giỏ Đan Tròn Có Nắp",
        price: 190000,
      },
    ],
  },
];

// Mock data for Featured Products
export const mockFeaturedProducts = [
  {
    id: "g1",
    image: "/mock/product-1.jpg",
    title: "Giỏ Tre Chùm Gói Quà Tết",
    price: 150000,
  },
  {
    id: "b1",
    image: "/mock/product-2.jpg",
    title: "Túi Sờ Bàng Thêu Hoa Đào",
    price: 450000,
    oldPrice: 520000,
  },
  {
    id: "h1",
    image: "/mock/product-3.jpg",
    title: "Túi Lục Bình Vẽ Hoa Mai",
    price: 520000,
    oldPrice: 580000,
  },
  {
    id: "t1",
    image: "/mock/product-4.jpg",
    title: "Khay Tre Phục Vụ Trà",
    price: 180000,
  },
  {
    id: "m1",
    image: "/mock/product-5.jpg",
    title: "Thảm Cói Tự Nhiên",
    price: 320000,
    oldPrice: 380000,
  },
  {
    id: "g6",
    image: "/mock/product-6.jpg",
    title: "Hộp Tre Vuông Nắp Đậy",
    price: 280000,
    oldPrice: 320000,
  },
  {
    id: "b3",
    image: "/mock/product-7.jpg",
    title: "Túi Cỏ Bàng Vẽ Phong Cảnh",
    price: 420000,
    oldPrice: 480000,
  },
  {
    id: "h8",
    image: "/mock/product-8.jpg",
    title: "Túi Lục Bình Cao Cấp",
    price: 650000,
  },
];

// Helper functions
export const getCategoryName = (
  category: MockCategoryInfo,
  language: string,
): string => {
  return (
    category.name[language as keyof MockCategoryTranslation] || category.name.vi
  );
};

export const getCategorySlug = (
  category: MockCategoryInfo,
  language: string,
): string => {
  return (
    category.slug[language as keyof MockCategoryTranslation] || category.slug.vi
  );
};

export const formatPrice = (value: number, locale: string = "vi-VN") => {
  if (locale === "en") {
    return new Intl.NumberFormat("en-US").format(value) + " VND";
  }
  return new Intl.NumberFormat("vi-VN").format(value) + "Đ";
};

// API simulation functions
export const mockFetchCategoriesInfo = async (): Promise<
  MockCategoryInfo[]
> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockCategoriesInfo
    .filter((cat) => cat.isActive)
    .sort((a, b) => a.order - b.order);
};

export const mockFetchCategories = async (): Promise<MockCategory[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockCategoriesData;
};

export const mockFetchFeaturedProducts = async (): Promise<
  MockProductCard[]
> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockFeaturedProducts;
};

export const mockFetchSideProducts = async (): Promise<MockProductCard[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockSideProducts;
};

export const getAllProducts = (): (MockProductCard & {
  category: string;
})[] => {
  const allProducts: (MockProductCard & { category: string })[] = [];

  mockCategoriesData.forEach((category) => {
    category.products.forEach((product) => {
      allProducts.push({
        ...product,
        category: category.title,
      });
    });
  });

  return allProducts;
};
