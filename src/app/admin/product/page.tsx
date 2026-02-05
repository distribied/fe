"use client";

import { useState } from "react";
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  useCategories,
  useProductImages,
} from "@/hooks/useProducts";
import { type CreateProduct } from "@/schemas";
import { createProductWithImages } from "@/service/product.service";
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
import { PlusCircle, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminProductPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Fetch data
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: categories } = useCategories();

  // Mutations
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
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
        // Update existing product
        await updateMutation.mutateAsync({
          id: editingProduct.id,
          updates: formData,
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
      }

      resetForm();
      setIsCreateDialogOpen(false);
    } catch (error) {
      toast.error("Failed to save product. Please try again.");
      console.error("Error saving product:", error);
      throw error;
    }
  };

  const handleEdit = async (product: any) => {
    // Fetch product images
    const images = await import("@/service/product.service").then((m) =>
      m.getProductImages(product.id.toString()),
    );

    setEditingProduct({
      ...product,
      images, // Attach images to product
    });

    setFormData({
      categoryId: product.categoryId || "",
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
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete product.");
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Product Management</h1>
          <p className="text-muted-foreground">
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
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Product
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
                createMutation.isPending || updateMutation.isPending
              }
              editingProduct={editingProduct}
              categories={categories}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Products List */}
      {productsLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products?.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span className="line-clamp-1">{product.name}</span>
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit(product)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(product.id.toString())}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {product.description || "No description"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-bold">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.price)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating:</span>
                    <span>⭐ {product.ratingAverage?.toFixed(1) || "0.0"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span
                      className={`font-medium ${
                        product.isActive ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  {product.slug && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Slug:</span>
                      <span className="text-xs truncate max-w-[150px]">
                        {product.slug}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {products?.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No products found. Click "Add Product" to create your first
              product.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
