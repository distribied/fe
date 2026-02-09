"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Star } from "lucide-react";
import { type Product } from "@/schemas";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export function ProductCard({
  product,
  onEdit,
  onDelete,
  isDeleting,
}: Readonly<ProductCardProps>) {
  const thumbnailImage =
    product.images?.find((img) => img.isThumbnail) || product.images?.[0];

  const formatCurrency = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square relative overflow-hidden bg-muted">
        {thumbnailImage?.url ? (
          <Image
            src={thumbnailImage.url}
            alt={product.name || "Product"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Star className="h-12 w-12" />
          </div>
        )}

        {/* Image count badge */}
        {product.images && product.images.length > 1 && (
          <Badge className="absolute top-2 right-2 bg-black/50 text-white">
            {product.images.length} images
          </Badge>
        )}

        {/* Status badge */}
        <div className="absolute top-2 left-2">
          <Badge variant={product.isActive ? "default" : "secondary"}>
            {product.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        {/* Quick action buttons overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all">
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <Button
              size="icon"
              variant="secondary"
              onClick={() => onEdit(product)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              onClick={() => onDelete(product.id.toString())}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-2 text-base">
          {product.name || "Untitled Product"}
        </CardTitle>
        {product.slug && (
          <CardDescription className="text-xs text-muted-foreground">
            /{product.slug}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Price:</span>
            <span className="font-bold text-lg">
              {formatCurrency(product.price || 0)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Rating:</span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-current text-yellow-500" />
              <span className="text-sm font-medium">
                {product.ratingAverage?.toFixed(1) || "0.0"}
              </span>
            </div>
          </div>

          {/* Category will be added when category data is loaded */}
          {/* {product.category?.name && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Category:</span>
              <Badge variant="outline" className="text-xs">
                {product.category.name}
              </Badge>
            </div>
          )} */}
        </div>
      </CardContent>
    </Card>
  );
}
