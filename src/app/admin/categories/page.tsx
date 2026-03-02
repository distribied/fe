"use client";

import { useState, useEffect } from "react";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/hooks/useCategory";
import { type Category, type CreateCategory } from "@/schemas";
import { SearchFilter } from "@/components/features/admin/SearchFilter";
import { PaginationControls } from "@/components/features/admin/PaginationControls";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  PlusCircle,
  Pencil,
  Trash2,
  Loader2,
  FolderTree,
  Hash,
} from "lucide-react";
import { toast } from "sonner";
import { handleError } from "@/errors/handleError";
import { ITEMS_PER_PAGE } from "@/const/constants";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";

export default function AdminCategoryPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<CreateCategory>({
    name: "",
    slug: "",
    order: 1,
  });

  // Fetch data
  const { data: categories, isLoading } = useCategories();

  // Mutations
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  // Filter categories
  const filteredCategories = (categories || []).filter((category: Category) => {
    return (
      searchQuery === "" ||
      category.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.slug?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayCategories = filteredCategories.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const resetForm = () => {
    setFormData({ name: "", slug: "", order: 1 });
    setEditingCategory(null);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replaceAll(/[\u0300-\u036f]/g, "")
      .replaceAll("đ", "d")
      .replaceAll(/[^a-z0-9]+/g, "-")
      .replaceAll(/(^-|-$)/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await updateMutation.mutateAsync({
          id: editingCategory.id.toString(),
          updates: formData,
        });
        toast.success("Category updated successfully!");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("Category created successfully!");
      }
      resetForm();
      setIsCreateDialogOpen(false);
    } catch (error) {
      toast.error("Failed to save category.");
      console.error("Error saving category:", error);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug || "",
      order: category.order || 1,
    });
    setIsCreateDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Category deleted successfully!");
    } catch (error) {
      if (error) handleError(error);
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto py-6 px-3 md:px-4 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Danh mục</h1>
          <p className="text-sm text-muted-foreground">Quản lý danh mục sản phẩm</p>
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
              Thêm danh mục
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
              </DialogTitle>
              <DialogDescription>
                {editingCategory
                  ? "Cập nhật thông tin danh mục"
                  : "Thêm danh mục sản phẩm mới"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên danh mục</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setFormData({
                      ...formData,
                      name,
                      slug: generateSlug(name),
                    });
                  }}
                  placeholder="Nhập tên danh mục"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  placeholder="danh-muc-slug"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Thứ tự hiển thị</Label>
                <Input
                  id="order"
                  type="number"
                  min={1}
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: Number.parseInt(e.target.value) || 1,
                    })
                  }
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsCreateDialogOpen(false);
                    resetForm();
                  }}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                >
                  {createMutation.isPending || updateMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  {editingCategory ? "Cập nhật" : "Tạo mới"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <SearchFilter
        searchPlaceholder="Tìm kiếm danh mục..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filterValue="all"
        onFilterChange={() => {}}
        filterOptions={[]}
        allOptionLabel="Tất cả"
      />

      {/* Stats summary */}
      <div className="flex gap-4 text-sm text-muted-foreground">
        <span>
          Hiển thị <strong>{displayCategories.length}</strong> / <strong>{filteredCategories.length}</strong> danh mục
        </span>
      </div>

      {/* Categories List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayCategories.map((category: Category) => (
            <Card
              key={category.id}
              className="group overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FolderTree className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle className="text-base line-clamp-1">
                      {category.name}
                    </CardTitle>
                  </div>
                  <Badge variant="outline" className="text-xs flex-shrink-0">
                    <Hash className="h-3 w-3 mr-1" />
                    {category.order || 1}
                  </Badge>
                </div>
                {category.slug && (
                  <CardDescription className="text-xs ml-8">
                    /{category.slug}
                  </CardDescription>
                )}
              </CardHeader>

              <CardContent className="pt-2">
                <div className="text-xs text-muted-foreground mb-3">
                  Ngày tạo: {formatDate(category.createdAt)}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(category)}
                    className="flex-1"
                  >
                    <Pencil className="h-3.5 w-3.5 mr-1" />
                    Sửa
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmDeleteId(category.id.toString());
                    }}
                    disabled={deleteMutation.isPending}
                    className="flex-1"
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                    Xóa
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {displayCategories.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <FolderTree className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Không tìm thấy danh mục</h3>
              <p className="text-sm">Nhấn "Thêm danh mục" để tạo danh mục đầu tiên.</p>
            </div>
          )}
        </div>
      )}

      {/* Confirm dialog */}
      <ConfirmDialog
        open={!!confirmDeleteId}
        title="Xác nhận xóa danh mục"
        description="Bạn có chắc chắn muốn xóa danh mục này?"
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
      {!isLoading && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredCategories.length}
          itemsPerPage={ITEMS_PER_PAGE}
          itemName="danh mục"
        />
      )}
    </div>
  );
}
