"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Package,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
} from "lucide-react";
import { type Order, type OrderStatus } from "@/schemas";

interface OrderCardProps {
  order: Order;
  onViewDetails: () => void;
  getStatusBadgeVariant: (
    status: OrderStatus,
  ) => "default" | "secondary" | "destructive" | "outline";
  formatCurrency: (amount: number) => string;
}

export function OrderCard({
  order,
  onViewDetails,
  getStatusBadgeVariant,
  formatCurrency,
}: OrderCardProps) {
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "No date";
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPhone = (phone: string) => {
    if (!phone) return "";
    // Format phone number if it's just digits
    const digits = phone.replace(/\D/g, "");
    if (digits.length >= 10) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
    return phone;
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">
              Order #{order.id}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {formatDate(order.createdAt)}
            </CardDescription>
          </div>
          <Badge variant={getStatusBadgeVariant(order.status)}>
            {order.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        {/* Customer Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{order.name}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{formatPhone(order.phone)}</span>
          </div>

          {order.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-blue-600">{order.email}</span>
            </div>
          )}

          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <span className="text-muted-foreground">{order.address}</span>
          </div>
        </div>

        {/* Order Details */}
        <div className="border-t pt-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Amount:</span>
            <span className="font-bold text-lg text-green-600">
              {formatCurrency(order.totalAmount || 0)}
            </span>
          </div>

          {order.note && (
            <div className="text-sm text-muted-foreground italic">
              Note: {order.note}
            </div>
          )}
        </div>

        {/* Action Button */}
        <Button
          onClick={onViewDetails}
          variant="outline"
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
