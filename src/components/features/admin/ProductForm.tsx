"use client";

import { useCallback, useState, useEffect } from "react";
import { type CreateProduct, type ProductImage } from "@/schemas";
import { useImageUpload } from "@/hooks/useImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X, Star, Loader2 } from "lucide-react";

interface ProductFormProps {
  formData: CreateProduct;
  onFormDataChange: (data: CreateProduct) => void;
  onSubmit: (imageUrls: string[], thumbnailIndex: number) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
  editingProduct?: any;
  categories?: Array<{ id: string | number; name: string }>;
}

export function ProductForm({
  formData,
  onFormDataChange,
  onSubmit,
  onCancel,
  isSubmitting,
  editingProduct,
  categories = [],
}: ProductFormProps) {
  const imageUpload = useImageUpload();
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);

  // Load existing images when editing
  useEffect(() => {
    if (editingProduct?.images) {
      setExistingImages(editingProduct.images);
      // Find thumbnail index
      const thumbIndex = editingProduct.images.findIndex(
        (img: ProductImage) => img.isThumbnail,
      );
      if (thumbIndex !== -1) {
        setThumbnailIndex(thumbIndex);
      }
    } else {
      setExistingImages([]);
      setThumbnailIndex(0);
    }
  }, [editingProduct]);

  // Auto-generate slug from name
  const handleNameChange = (name: string) => {
    onFormDataChange({
      ...formData,
      name,
      slug: name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    });
  };

  // Handle file drop
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      imageUpload.addFiles(files);
    },
    [imageUpload],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const files = Array.from(e.target.files);
        imageUpload.addFiles(files);
      }
    },
    [imageUpload],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Collect all image URLs (existing + new uploads)
    let allImageUrls: string[] = [...existingImages.map((img) => img.url)];

    // Upload new images if any
    if (imageUpload.images.length > 0) {
      const newUrls = await imageUpload.uploadAll(editingProduct?.id);
      allImageUrls = [...allImageUrls, ...newUrls];
    }

    await onSubmit(allImageUrls, thumbnailIndex);
    imageUpload.reset();
    setThumbnailIndex(0);
    setExistingImages([]);
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
    // Adjust thumbnail index if needed
    if (thumbnailIndex === index) {
      setThumbnailIndex(0);
    } else if (thumbnailIndex > index) {
      setThumbnailIndex((prev) => prev - 1);
    }
  };

  const totalImages = existingImages.length + imageUpload.images.length;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Product Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="e.g., Bamboo Basket"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) =>
              onFormDataChange({ ...formData, slug: e.target.value })
            }
            placeholder="auto-generated"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="categoryId">Category</Label>
          <Select
            value={formData.categoryId?.toString() || ""}
            onValueChange={(value) =>
              onFormDataChange({ ...formData, categoryId: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (VND) *</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) =>
              onFormDataChange({ ...formData, price: Number(e.target.value) })
            }
            placeholder="0"
            min="0"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description || ""}
          onChange={(e) =>
            onFormDataChange({ ...formData, description: e.target.value })
          }
          placeholder="Product description..."
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ratingAverage">Rating (0-5)</Label>
          <Input
            id="ratingAverage"
            type="number"
            value={formData.ratingAverage}
            onChange={(e) =>
              onFormDataChange({
                ...formData,
                ratingAverage: Number(e.target.value),
              })
            }
            min="0"
            max="5"
            step="0.1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="isActive">Status</Label>
          <Select
            value={formData.isActive ? "true" : "false"}
            onValueChange={(value) =>
              onFormDataChange({ ...formData, isActive: value === "true" })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Active</SelectItem>
              <SelectItem value="false">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Image Upload Section - At Bottom */}
      <div className="space-y-4 pt-4 border-t">
        <Label>Product Images</Label>

        {/* Upload Area */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground mb-2">
            Drag and drop images here, or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            Supports: JPG, PNG, WEBP (max 32MB each)
          </p>
          <input
            id="file-input"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>

        {/* Image Previews */}
        {totalImages > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Existing Images */}
            {existingImages.map((image, index) => (
              <div key={`existing-${image.id}`} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border bg-muted">
                  <img
                    src={image.url}
                    alt={`Existing ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Thumbnail Badge */}
                <Button
                  type="button"
                  size="icon"
                  variant={thumbnailIndex === index ? "default" : "outline"}
                  className="absolute top-2 left-2 h-8 w-8"
                  onClick={() => setThumbnailIndex(index)}
                >
                  <Star
                    className={`h-4 w-4 ${thumbnailIndex === index ? "fill-current" : ""}`}
                  />
                </Button>

                {/* Delete Button */}
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveExistingImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {/* New Images */}
            {imageUpload.images.map((image, index) => {
              const actualIndex = existingImages.length + index;
              return (
                <div key={`new-${index}`} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden border bg-muted">
                    <img
                      src={image.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {/* Progress Overlay */}
                    {image.progress > 0 && image.progress < 100 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-white text-sm">
                          {Math.round(image.progress)}%
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Badge */}
                  <Button
                    type="button"
                    size="icon"
                    variant={
                      thumbnailIndex === actualIndex ? "default" : "outline"
                    }
                    className="absolute top-2 left-2 h-8 w-8"
                    onClick={() => setThumbnailIndex(actualIndex)}
                  >
                    <Star
                      className={`h-4 w-4 ${thumbnailIndex === actualIndex ? "fill-current" : ""}`}
                    />
                  </Button>

                  {/* Delete Button */}
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => imageUpload.removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  {/* Error Message */}
                  {image.error && (
                    <p className="text-xs text-destructive mt-1">
                      {image.error}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || imageUpload.isUploading}
        >
          {(isSubmitting || imageUpload.isUploading) && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {editingProduct ? "Update" : "Create"} Product
        </Button>
      </div>
    </form>
  );
}
