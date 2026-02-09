"use client";

import { useState, useEffect } from "react";
import { useOrders, useUpdateOrder, useDeleteOrder } from "@/hooks/useOrders";
import { type Order, type OrderStatus } from "@/schemas";
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
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  ShoppingCart,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Eye,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { ITEMS_PER_PAGE } from "@/const/constants";

const ORDER_STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "PENDING", label: "Pending" },
  { value: "SHIPPING", label: "Shipping" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLED", label: "Cancelled" },
];

export default function AdminOrderPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  // Fetch data
  const { data: orders, isLoading } = useOrders();

  // Mutations
  const updateMutation = useUpdateOrder();
  const deleteMutation = useDeleteOrder();

  // Filter orders
  const filteredOrders = (orders || []).filter((order) => {
    const matchesSearch =
      searchQuery === "" ||
      order.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone?.includes(searchQuery) ||
      order.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayOrders = filteredOrders.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStatus]);

  const handleStatusChange = async (
    orderId: string,
    newStatus: OrderStatus,
  ) => {
    try {
      await updateMutation.mutateAsync({
        id: orderId,
        updates: { status: newStatus },
      });
      toast.success("Order status updated!");
    } catch (error) {
      toast.error("Failed to update order status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Order deleted successfully!");
      setViewingOrder(null);
    } catch (error) {
      toast.error("Failed to delete order.");
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getStatusBadgeVariant = (
    status: OrderStatus | undefined,
  ): "default" | "destructive" | "outline" | "secondary" => {
    switch (status) {
      case "PENDING":
        return "outline";
      case "SHIPPING":
        return "secondary";
      case "DELIVERED":
        return "default";
      case "CANCELLED":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusLabel = (status: OrderStatus | undefined) => {
    return (
      ORDER_STATUS_OPTIONS.find((opt) => opt.value === status)?.label || status
    );
  };

  return (
    <div className="container mx-auto py-4 md:py-8 px-2 md:px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Order Management
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage customer orders and shipments
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <SearchFilter
        searchPlaceholder="Search by name, phone, email..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filterValue={selectedStatus}
        onFilterChange={setSelectedStatus}
        filterOptions={ORDER_STATUS_OPTIONS.map((opt) => ({
          value: opt.value,
          label: opt.label,
        }))}
        allOptionLabel="All Status"
      />

      {/* Orders List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayOrders.map((order) => (
            <Card
              key={order.id}
              className="group overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm sm:text-base line-clamp-1">
                    {order.name}
                  </CardTitle>
                  <Badge variant={getStatusBadgeVariant(order.status)}>
                    {getStatusLabel(order.status)}
                  </Badge>
                </div>
                <CardDescription className="text-xs flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(order.createdAt)}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0 space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  <span className="truncate">{order.phone}</span>
                </div>

                {order.email && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{order.email}</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-xs text-muted-foreground">Total:</span>
                  <span className="font-bold text-sm text-green-600">
                    {formatCurrency(order.totalAmount)}
                  </span>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setViewingOrder(order)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(order.id.toString())}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {displayOrders.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <ShoppingCart className="mx-auto h-12 w-12 mb-4" />
              <h3 className="text-lg font-medium mb-2">No orders found</h3>
              <p>Orders will appear here when customers place them.</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredOrders.length}
          itemsPerPage={ITEMS_PER_PAGE}
          itemName="orders"
        />
      )}

      {/* Order Details Dialog */}
      <Dialog open={!!viewingOrder} onOpenChange={() => setViewingOrder(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>Order #{viewingOrder?.id}</DialogDescription>
          </DialogHeader>

          {viewingOrder && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Customer Name</Label>
                <p className="text-sm font-medium">{viewingOrder.name}</p>
              </div>

              <div className="space-y-2">
                <Label>Phone</Label>
                <p className="text-sm">{viewingOrder.phone}</p>
              </div>

              {viewingOrder.email && (
                <div className="space-y-2">
                  <Label>Email</Label>
                  <p className="text-sm">{viewingOrder.email}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label>Address</Label>
                <p className="text-sm flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  {viewingOrder.address}
                </p>
              </div>

              {viewingOrder.note && (
                <div className="space-y-2">
                  <Label>Note</Label>
                  <p className="text-sm text-muted-foreground">
                    {viewingOrder.note}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label>Total Amount</Label>
                <p className="text-lg font-bold text-green-600">
                  {formatCurrency(viewingOrder.totalAmount)}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={viewingOrder.status}
                  onValueChange={(value: OrderStatus) =>
                    handleStatusChange(viewingOrder.id.toString(), value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ORDER_STATUS_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setViewingOrder(null)}
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(viewingOrder.id.toString())}
                  disabled={deleteMutation.isPending}
                  className="flex-1"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
