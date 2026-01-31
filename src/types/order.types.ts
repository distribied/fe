export enum OrderStatus {
  PENDING = "PENDING",
  SHIPPING = "SHIPPING",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export interface Order {
  id: number;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  note?: string;
  totalAmount?: number;
  createdAt?: string;
  details?: OrderDetail[]; // Optional relation join
}

export interface OrderDetail {
  id: number;
  orderId?: number;
  unitPrice?: number;
  quantity?: number;
}
