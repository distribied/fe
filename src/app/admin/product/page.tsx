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
import {
  PlusCircle,
  Pencil,
  Trash2,
  Loader2,
  Star,
  Package,
} from "lucide-react";
import { SearchFilter } from "@/components/features/admin/SearchFilter";
import { PaginationControls } from "@/components/features/admin/PaginationControls";
import { toast } from "sonner";
import { useCategories } from "@/hooks/useCategory";

const ITEMS_PER_PAGE = 8;

export default function AdminProductPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

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
      if (editingProduct) {
        // Update existing product with images using the hook
        await updateWithImagesMutation.mutateAsync({
          id: editingProduct.id.toString(),
          updates: formData,
          imageUrls,
          thumbnailIndex,
        });
        toast.success("Product updated successfully!");
      } else {
        // Create new product with images
        if (imageUrls.length > 0) {
          await createProductWithImages(formData, imageUrls, thumbnailIndex);
        } else {
          await createMutation.mutateAsync(formData);
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
      price: product.price,
      isActive: product.isActive ?? true,
      ratingAverage: product.ratingAverage ?? 0,
    });
    setIsCreateDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteMutation.mutateAsync(id);
      removeProductFromStore(id);
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete product.");
      console.error("Error deleting product:", error);
    }
  };

  // Get thumbnail image for a product
  const getThumbnail = (product: Product) => {
    if (!product.images || product.images.length === 0) return null;
    const thumbnail = product.images.find((img) => img.isThumbnail);
    return thumbnail?.url || product.images[0]?.url || null;
  };

  const formatCurrency = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="container mx-auto py-4 md:py-8 px-2 md:px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Product Management
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage your products and inventory
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
            <Button size="sm" className="md:size-default">
              <PlusCircle className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Add Product</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Edit Product" : "Create New Product"}
              </DialogTitle>
              <DialogDescription>
                {editingProduct
                  ? "Update product information"
                  : "Add a new product to your inventory"}
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
        searchPlaceholder="Search products..."
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
        allOptionLabel="All Categories"
      />

      {/* Products List */}
      {productsLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
          {displayProducts.map((product) => {
            const thumbnailUrl = getThumbnail(product);
            return (
              <Card
                key={product.id}
                className="group overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Product Image / Thumbnail */}
                <div className="aspect-square relative overflow-hidden bg-muted">
                  {thumbnailUrl ? (
                    <Image
                      src={thumbnailUrl}
                      alt={product.name || "Product"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <Package className="h-16 w-16" />
                    </div>
                  )}

                  {/* Status badge */}
                  <Badge
                    className="absolute top-2 left-2"
                    variant={product.isActive ? "default" : "secondary"}
                  >
                    {product.isActive ? "Active" : "Inactive"}
                  </Badge>

                  {/* Image count badge */}
                  {product.images && product.images.length > 1 && (
                    <Badge className="absolute top-2 right-2 bg-black/50 text-white">
                      {product.images.length} images
                    </Badge>
                  )}

                  {/* Action buttons overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => handleEdit(product)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete(product.id.toString())}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardHeader className="p-2 md:p-4 pb-1 md:pb-2">
                  <CardTitle className="line-clamp-1 text-xs sm:text-sm md:text-base">
                    {product.name || "Untitled Product"}
                  </CardTitle>
                  {product.slug && (
                    <CardDescription className="text-[10px] sm:text-xs truncate">
                      /{product.slug}
                    </CardDescription>
                  )}
                </CardHeader>

                <CardContent className="p-2 md:p-4 pt-0">
                  <div className="space-y-0.5 sm:space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground hidden sm:inline">
                        Price:
                      </span>
                      <span className="font-bold text-xs sm:text-sm md:text-lg text-green-600">
                        {formatCurrency(product.price || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground hidden sm:inline">
                        Rating:
                      </span>
                      <div className="flex items-center gap-0.5 sm:gap-1">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current text-yellow-500" />
                        <span className="text-[10px] sm:text-xs md:text-sm font-medium">
                          {product.ratingAverage?.toFixed(1) || "0.0"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {displayProducts.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <Package className="mx-auto h-12 w-12 mb-4" />
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p>Click "Add Product" to create your first product.</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!productsLoading && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredProducts.length}
          itemsPerPage={ITEMS_PER_PAGE}
          itemName="products"
        />
      )}
    </div>
  );
}
