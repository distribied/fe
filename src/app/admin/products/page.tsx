"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  useProducts,
  useCreateProduct,
  useUpdateProductWithImages,
  useDeleteProduct,
} from "@/hooks/useProducts";
import { type CreateProduct, type Product } from "@/schemas";
import { createProductWithImages } from "@/service/product.service";
import { useProductStore } from "@/store/use-product.store";
import { ProductForm } from "@/components/features/admin/ProductForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Trash2, Loader2, Star, Package } from "lucide-react";
import { SearchFilter } from "@/components/features/admin/SearchFilter";
import { PaginationControls } from "@/components/features/admin/PaginationControls";
import { toast } from "sonner";
import { useCategories } from "@/hooks/useCategory";
import { ITEMS_PER_PAGE } from "@/const/constants";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { handleError } from "@/errors/handleError";

export default function AdminProductPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Zustand store
  const {
    setProducts,
    removeProduct: removeProductFromStore,
    products: storedProducts,
  } = useProductStore();

  // Fetch data
  const { data: products, isLoading: productsLoading, refetch } = useProducts();
  const { data: categories } = useCategories();

  // Sync products to Zustand store when fetched
  useEffect(() => {
    if (products && products.length > 0) {
      setProducts(products);
    }
  }, [products, setProducts]);

  // Use stored products if available, otherwise use fetched products
  const allProducts =
    storedProducts.length > 0 ? storedProducts : products || [];

  // Filter products based on search and category
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.slug?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      product.categoryId?.toString() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Mutations
  const createMutation = useCreateProduct();
  const updateWithImagesMutation = useUpdateProductWithImages();
  const deleteMutation = useDeleteProduct();

  // Form state
  const [formData, setFormData] = useState<CreateProduct>({
    categoryId: "",
    name: "",
    slug: "",
    description: "",
    price: 0,
    isActive: true,
    ratingAverage: 0,
  });

  const resetForm = () => {
    setFormData({
      categoryId: "",
      name: "",
      slug: "",
      description: "",
      price: 0,
      isActive: true,
      ratingAverage: 0,
    });
    setEditingProduct(null);
  };

  const handleSubmit = async (imageUrls: string[], thumbnailIndex: number) => {
    try {
      const productPayload = {
        ...formData,
        price: 0,
      };

      if (editingProduct) {
        // Update existing product with images using the hook
        await updateWithImagesMutation.mutateAsync({
          id: editingProduct.id.toString(),
          updates: productPayload,
          imageUrls,
          thumbnailIndex,
        });
        toast.success("Product updated successfully!");
      } else {
        // Create new product with images
        if (imageUrls.length > 0) {
          await createProductWithImages(
            productPayload,
            imageUrls,
            thumbnailIndex,
          );
        } else {
          await createMutation.mutateAsync(productPayload);
        }
        toast.success("Product created successfully!");
        // Refetch to get new product with images
        await refetch();
      }

      resetForm();
      setIsCreateDialogOpen(false);
    } catch (error) {
      toast.error("Failed to save product. Please try again.");
      console.error("Error saving product:", error);
      throw error;
    }
  };

  const handleEdit = async (product: Product) => {
    // Product already has images from the store/query
    setEditingProduct(product);

    setFormData({
      categoryId: product.categoryId?.toString() || "",
      name: product.name,
      slug: product.slug || "",
      description: product.description || "",
      price: 0,
      isActive: product.isActive ?? true,
      ratingAverage: product.ratingAverage ?? 0,
    });
    setIsCreateDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      removeProductFromStore(id);
      toast.success("Product deleted successfully!");
    } catch (error) {
      if (error) handleError(error);
    }
  };

  // Get thumbnail image for a product
  const getThumbnail = (product: Product) => {
    if (!product.images || product.images.length === 0) return null;
    const thumbnail = product.images.find((img) => img.isThumbnail);
    return thumbnail?.url || product.images[0]?.url || null;
  };

  return (
    <div className="container mx-auto py-6 px-3 md:px-4 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sản phẩm</h1>
          <p className="text-sm text-muted-foreground">
            Quản lý sản phẩm trong cửa hàng
          </p>
        </div>

        <Dialog
          open={isCreateDialogOpen}
          onOpenChange={(open) => {
            setIsCreateDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button className="gap-1.5">
              <PlusCircle className="h-4 w-4" />
              Thêm sản phẩm
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
              </DialogTitle>
              <DialogDescription>
                {editingProduct
                  ? "Cập nhật thông tin sản phẩm"
                  : "Thêm sản phẩm mới vào cửa hàng"}
              </DialogDescription>
            </DialogHeader>

            <ProductForm
              formData={formData}
              onFormDataChange={setFormData}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsCreateDialogOpen(false);
                resetForm();
              }}
              isSubmitting={
                createMutation.isPending || updateWithImagesMutation.isPending
              }
              editingProduct={editingProduct}
              categories={categories}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <SearchFilter
        searchPlaceholder="Tìm kiếm sản phẩm..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filterValue={selectedCategory}
        onFilterChange={setSelectedCategory}
        filterOptions={
          categories?.map((category) => ({
            value: category.id.toString(),
            label: category.name,
          })) || []
        }
        allOptionLabel="Tất cả danh mục"
      />

      {/* Stats summary */}
      <div className="flex gap-4 text-sm text-muted-foreground">
        <span>
          Hiển thị <strong>{displayProducts.length}</strong> /{" "}
          <strong>{filteredProducts.length}</strong> sản phẩm
        </span>
      </div>

      {/* Products List */}
      {productsLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {displayProducts.map((product) => {
            const thumbnailUrl = getThumbnail(product);

            return (
              <Card
                key={product.id}
                role="button"
                tabIndex={0}
                onClick={() => handleEdit(product)}
                className="group relative overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
              >
                {/* Image */}
                <div className="aspect-square relative overflow-hidden bg-muted">
                  {thumbnailUrl ? (
                    <Image
                      src={thumbnailUrl}
                      alt={product.name || "Product"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <Package className="h-12 w-12" />
                    </div>
                  )}

                  {/* Status badge */}
                  <Badge
                    className="absolute top-2 left-2 z-10 text-[10px] px-1.5 py-0.5"
                    variant={product.isActive ? "default" : "secondary"}
                  >
                    {product.isActive ? "Hoạt động" : "Ẩn"}
                  </Badge>

                  {/* Image count */}
                  {product.images && product.images.length > 1 && (
                    <Badge className="absolute top-2 right-10 z-10 bg-black/50 text-white text-[10px] px-1.5 py-0.5">
                      {product.images.length}
                    </Badge>
                  )}

                  {/* DELETE BUTTON */}
                  <Button
                    size="icon"
                    variant="destructive"
                    className="
                      absolute top-2 right-2 z-20
                      h-7 w-7
                      opacity-100 md:opacity-0
                      md:group-hover:opacity-100
                      transition-opacity
                    "
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmDeleteId(product.id.toString());
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>

                {/* Info */}
                <CardHeader className="p-2.5 pb-1">
                  <CardTitle className="line-clamp-1 text-sm font-semibold">
                    {product.name || "Chưa có tên"}
                  </CardTitle>
                  {product.slug && (
                    <CardDescription className="text-[10px] truncate">
                      /{product.slug}
                    </CardDescription>
                  )}
                </CardHeader>

                <CardContent className="p-2.5 pt-0">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-primary uppercase">
                      Liên Hệ
                    </span>
                    <div className="flex items-center gap-0.5">
                      <Star className="h-3.5 w-3.5 fill-current text-yellow-500" />
                      <span className="text-xs font-medium">
                        {product.ratingAverage?.toFixed(1) || "0.0"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {displayProducts.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <Package className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">
                Không tìm thấy sản phẩm
              </h3>
              <p className="text-sm">
                Nhấn "Thêm sản phẩm" để tạo sản phẩm đầu tiên.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Confirm dialog */}
      <ConfirmDialog
        open={!!confirmDeleteId}
        title="Xác nhận xóa sản phẩm"
        description="Bạn có chắc chắn muốn xóa sản phẩm này?"
        confirmText="Xóa"
        cancelText="Hủy"
        loading={deleteMutation.isPending}
        onCancel={() => setConfirmDeleteId(null)}
        onConfirm={async () => {
          if (!confirmDeleteId) return;
          await handleDelete(confirmDeleteId);
          setConfirmDeleteId(null);
        }}
      />

      {/* Pagination */}
      {!productsLoading && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredProducts.length}
          itemsPerPage={ITEMS_PER_PAGE}
          itemName="sản phẩm"
        />
      )}
    </div>
  );
}
