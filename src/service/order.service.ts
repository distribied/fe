import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  query,
  where,
  limit,
  DocumentData,
  QueryConstraint,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Order, OrderDetail, OrderStatus } from "@/types/order.types";

const ORDERS_COLLECTION = "orders";
const ORDER_DETAILS_COLLECTION = "order_details";

// Helper to convert Firestore doc to Order
const docToOrder = (docData: DocumentData, docId: string): Order => ({
  id: parseInt(docId) || 0,
  name: docData.name,
  phone: docData.phone,
  email: docData.email,
  address: docData.address,
  note: docData.note,
  totalAmount: docData.totalAmount,
  createdAt:
    docData.createdAt?.toDate?.()?.toISOString?.() ??
    docData.createdAt ??
    new Date().toISOString(),
});

// ==================== ORDERS ====================

export interface OrderFilters {
  status?: OrderStatus;
  email?: string;
  limit?: number;
}

export const getOrders = async (filters?: OrderFilters): Promise<Order[]> => {
  const constraints: QueryConstraint[] = [];

  if (filters?.status) {
    constraints.push(where("status", "==", filters.status));
  }
  if (filters?.email) {
    constraints.push(where("email", "==", filters.email));
  }
  if (filters?.limit) {
    constraints.push(limit(filters.limit));
  }

  const q = query(collection(db, ORDERS_COLLECTION), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => docToOrder(d.data(), d.id));
};

export const getOrderById = async (id: string): Promise<Order | null> => {
  const docRef = doc(db, ORDERS_COLLECTION, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return docToOrder(snapshot.data(), snapshot.id);
};

export const getOrderWithDetails = async (
  id: string,
): Promise<Order | null> => {
  const order = await getOrderById(id);
  if (!order) return null;

  const details = await getOrderDetails(id);
  return { ...order, details };
};

export interface CreateOrderInput {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  note?: string;
  totalAmount?: number;
  status?: OrderStatus;
  details?: Omit<OrderDetail, "id" | "orderId">[];
}

export const createOrder = async (
  orderInput: CreateOrderInput,
): Promise<Order> => {
  const { details, ...orderData } = orderInput;

  // Create order
  const orderRef = await addDoc(collection(db, ORDERS_COLLECTION), {
    ...orderData,
    status: orderData.status ?? OrderStatus.PENDING,
    createdAt: new Date().toISOString(),
  });

  // Create order details if provided
  if (details && details.length > 0) {
    const detailPromises = details.map((detail) =>
      addDoc(collection(db, ORDER_DETAILS_COLLECTION), {
        ...detail,
        orderId: orderRef.id,
      }),
    );
    await Promise.all(detailPromises);
  }

  return {
    ...orderData,
    id: parseInt(orderRef.id) || 0,
    createdAt: new Date().toISOString(),
  } as Order;
};

export const updateOrderStatus = async (
  id: string,
  status: OrderStatus,
): Promise<void> => {
  const docRef = doc(db, ORDERS_COLLECTION, id);
  await updateDoc(docRef, { status, updatedAt: new Date().toISOString() });
};

export const updateOrder = async (
  id: string,
  updates: Partial<Order>,
): Promise<void> => {
  const docRef = doc(db, ORDERS_COLLECTION, id);
  await updateDoc(docRef, { ...updates, updatedAt: new Date().toISOString() });
};

// ==================== ORDER DETAILS ====================

export const getOrderDetails = async (
  orderId: string,
): Promise<OrderDetail[]> => {
  const q = query(
    collection(db, ORDER_DETAILS_COLLECTION),
    where("orderId", "==", orderId),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({
    id: parseInt(d.id) || 0,
    orderId: d.data().orderId,
    unitPrice: d.data().unitPrice,
    quantity: d.data().quantity,
  }));
};

export const addOrderDetail = async (
  detail: Omit<OrderDetail, "id">,
): Promise<OrderDetail> => {
  const docRef = await addDoc(collection(db, ORDER_DETAILS_COLLECTION), detail);
  return { ...detail, id: parseInt(docRef.id) || 0 } as OrderDetail;
};

// ==================== MOCK DATA SEEDING ====================

const MOCK_ORDERS: CreateOrderInput[] = [
  {
    name: "Nguyễn Văn A",
    phone: "0901234567",
    email: "nguyenvana@gmail.com",
    address: "123 Nguyễn Huệ, Q1, TP.HCM",
    note: "Giao hàng buổi sáng",
    totalAmount: 1498000,
    status: OrderStatus.PENDING,
    details: [
      { unitPrice: 599000, quantity: 2 },
      { unitPrice: 150000, quantity: 2 },
    ],
  },
  {
    name: "Trần Thị B",
    phone: "0912345678",
    email: "tranthib@gmail.com",
    address: "456 Lê Lợi, Q3, TP.HCM",
    note: "",
    totalAmount: 899000,
    status: OrderStatus.SHIPPING,
    details: [{ unitPrice: 899000, quantity: 1 }],
  },
  {
    name: "Lê Văn C",
    phone: "0923456789",
    email: "levanc@gmail.com",
    address: "789 Hai Bà Trưng, Q1, TP.HCM",
    note: "Gọi trước khi giao",
    totalAmount: 455000,
    status: OrderStatus.DELIVERED,
    details: [
      { unitPrice: 85000, quantity: 1 },
      { unitPrice: 120000, quantity: 1 },
      { unitPrice: 250000, quantity: 1 },
    ],
  },
];

export const seedMockOrders = async (): Promise<number> => {
  let orderCount = 0;

  for (const orderInput of MOCK_ORDERS) {
    await createOrder(orderInput);
    orderCount++;
  }

  return orderCount;
};

export const clearOrderData = async (): Promise<void> => {
  const collections = [ORDERS_COLLECTION, ORDER_DETAILS_COLLECTION];

  for (const collectionName of collections) {
    const snapshot = await getDocs(collection(db, collectionName));
    const batch = writeBatch(db);
    snapshot.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();
  }
};
