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
import {
  OrderSchema,
  CreateOrderSchema,
  UpdateOrderSchema,
  OrderDetailSchema,
  CreateOrderDetailSchema,
  type Order,
  type CreateOrder,
  type OrderDetail,
  type OrderStatus,
} from "@/schemas";

const ORDERS_COLLECTION = "orders";
const ORDER_DETAILS_COLLECTION = "order_details";

// Helper to convert Firestore doc to Order with validation
const docToOrder = (docData: DocumentData, docId: string): Order => {
  const rawData = {
    id: docId,
    name: docData.name,
    phone: docData.phone,
    email: docData.email,
    address: docData.address,
    note: docData.note,
    totalAmount: docData.totalAmount || docData.total_amount,
    status: docData.status,
    createdAt:
      docData.createdAt?.toDate?.() ??
      docData.created_at?.toDate?.() ??
      (docData.createdAt || docData.created_at
        ? new Date(docData.createdAt || docData.created_at)
        : new Date()),
  };

  // Validate with Zod schema
  return OrderSchema.parse(rawData);
};

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
): Promise<(Order & { details?: OrderDetail[] }) | null> => {
  const order = await getOrderById(id);
  if (!order) return null;

  const details = await getOrderDetails(id);
  return { ...order, details };
};

// Extended CreateOrder type with details
export type CreateOrderWithDetails = Omit<CreateOrder, "createdAt"> & {
  details?: Omit<OrderDetail, "id" | "orderId">[];
};

export const createOrder = async (
  orderInput: CreateOrderWithDetails,
): Promise<Order> => {
  const { details, ...orderData } = orderInput;

  // Validate order data
  const validatedOrder = CreateOrderSchema.parse(orderData);

  // Prepare data for Firebase
  const firebaseData = {
    name: validatedOrder.name,
    phone: validatedOrder.phone,
    email: validatedOrder.email,
    address: validatedOrder.address,
    note: validatedOrder.note,
    totalAmount: validatedOrder.totalAmount,
    status: validatedOrder.status ?? "PENDING",
    createdAt: new Date(),
  };

  // Create order
  const orderRef = await addDoc(
    collection(db, ORDERS_COLLECTION),
    firebaseData,
  );

  // Create order details if provided
  if (details && details.length > 0) {
    const detailPromises = details.map((detail) => {
      const validatedDetail = CreateOrderDetailSchema.parse({
        ...detail,
        orderId: orderRef.id,
      });

      return addDoc(collection(db, ORDER_DETAILS_COLLECTION), {
        orderId: validatedDetail.orderId,
        productId: validatedDetail.productId,
        unitPrice: validatedDetail.unitPrice,
        quantity: validatedDetail.quantity,
      });
    });
    await Promise.all(detailPromises);
  }

  // Return validated order
  return OrderSchema.parse({
    id: orderRef.id,
    ...validatedOrder,
    createdAt: firebaseData.createdAt,
  });
};

export const updateOrderStatus = async (
  id: string,
  status: OrderStatus,
): Promise<void> => {
  const docRef = doc(db, ORDERS_COLLECTION, id);
  await updateDoc(docRef, { status, updatedAt: new Date() });
};

export const updateOrder = async (
  id: string,
  updates: Partial<Order>,
): Promise<void> => {
  // Validate updates with schema
  const validatedUpdates = UpdateOrderSchema.parse(updates);

  const docRef = doc(db, ORDERS_COLLECTION, id);
  await updateDoc(docRef, {
    ...validatedUpdates,
    updatedAt: new Date(),
  });
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

  return snapshot.docs.map((d) => {
    const data = d.data();
    return OrderDetailSchema.parse({
      id: d.id,
      orderId: data.orderId || data.order_id,
      productId: data.productId || data.product_id,
      unitPrice: data.unitPrice || data.unit_price,
      quantity: data.quantity,
    });
  });
};

export const addOrderDetail = async (
  detail: Omit<OrderDetail, "id">,
): Promise<OrderDetail> => {
  // Validate input
  const validatedDetail = CreateOrderDetailSchema.parse(detail);

  const docRef = await addDoc(collection(db, ORDER_DETAILS_COLLECTION), {
    orderId: validatedDetail.orderId,
    productId: validatedDetail.productId,
    unitPrice: validatedDetail.unitPrice,
    quantity: validatedDetail.quantity,
  });

  return OrderDetailSchema.parse({
    id: docRef.id,
    ...validatedDetail,
  });
};

// ==================== MOCK DATA SEEDING ====================

const MOCK_ORDERS: CreateOrderWithDetails[] = [
  {
    name: "Nguyễn Văn A",
    phone: "0901234567",
    email: "nguyenvana@gmail.com",
    address: "123 Nguyễn Huệ, Q1, TP.HCM",
    note: "Giao hàng buổi sáng",
    totalAmount: 1498000,
    status: "PENDING",
    details: [
      { productId: "1", unitPrice: 599000, quantity: 2 },
      { productId: "2", unitPrice: 150000, quantity: 2 },
    ],
  },
  {
    name: "Trần Thị B",
    phone: "0912345678",
    email: "tranthib@gmail.com",
    address: "456 Lê Lợi, Q3, TP.HCM",
    note: "",
    totalAmount: 899000,
    status: "SHIPPING",
    details: [{ productId: "3", unitPrice: 899000, quantity: 1 }],
  },
  {
    name: "Lê Văn C",
    phone: "0923456789",
    email: "levanc@gmail.com",
    address: "789 Hai Bà Trưng, Q1, TP.HCM",
    note: "Gọi trước khi giao",
    totalAmount: 455000,
    status: "DELIVERED",
    details: [
      { productId: "4", unitPrice: 85000, quantity: 1 },
      { productId: "5", unitPrice: 120000, quantity: 1 },
      { productId: "6", unitPrice: 250000, quantity: 1 },
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
