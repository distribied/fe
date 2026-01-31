# Kiều Sâm - Sản Phẩm Thủ Công Mỹ Nghệ Việt Nam

A modern e-commerce web application built with Next.js, Firebase, and TanStack Query.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Database**: Firebase Firestore
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod

---

## 📦 Installation

### Prerequisites

- Node.js 18+
- Yarn package manager
- Firebase project with Firestore enabled

### 1. Clone the repository

```bash
git clone <YOUR_GIT_URL>
cd pixel-perfect-clone
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Environment Setup

Copy the example environment file and fill in your Firebase credentials:

```bash
cp .env.example .env
```

Edit `.env` with your Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or use existing one
3. Enable **Firestore Database**
4. Set Firestore rules to test mode (for development):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

### 5. Run Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### 6. Build for Production

```bash
yarn build
yarn start
```

---

## 🧪 Testing Firebase API

### Test Page

Visit **[http://localhost:3000/test-firebase](http://localhost:3000/test-firebase)** to test Firebase connectivity.

Available actions:

- 🌱 **Seed Mock Data** - Populates database with sample products, categories, orders
- ➕ **Create Product** - Tests product creation mutation
- 🛒 **Create Order** - Tests order creation mutation
- 🔄 **Refresh Data** - Refetches all data from Firestore
- 🗑️ **Clear All Data** - Removes all test data

### CLI Test Script

```bash
npx tsx scripts/test-firebase.ts
```

---

## 🪝 Using Hooks

### Product Hooks (`src/hooks/useProducts.ts`)

```typescript
import {
  useProducts,
  useProduct,
  useCategories,
  useCreateProduct,
} from "@/hooks/useProducts";

// Fetch all products
const { data: products, isLoading } = useProducts();

// Fetch with filters
const { data } = useProducts({ categoryId: 1, isActive: true, limit: 10 });

// Fetch single product by ID
const { data: product } = useProduct("product-id");

// Fetch categories
const { data: categories } = useCategories();

// Create a new product
const createProduct = useCreateProduct();
await createProduct.mutateAsync({
  name: "New Product",
  slug: "new-product",
  price: 100000,
  isActive: true,
  ratingAverage: 0,
  createdAt: new Date().toISOString(),
});
```

### Order Hooks (`src/hooks/useOrders.ts`)

```typescript
import {
  useOrders,
  useOrder,
  useCreateOrder,
  useUpdateOrderStatus,
} from "@/hooks/useOrders";

// Fetch all orders
const { data: orders, isLoading } = useOrders();

// Fetch with filters
const { data } = useOrders({ status: "PENDING", limit: 20 });

// Fetch single order with details
const { data: order } = useOrderWithDetails("order-id");

// Create a new order
const createOrder = useCreateOrder();
await createOrder.mutateAsync({
  name: "Customer Name",
  phone: "0901234567",
  email: "customer@email.com",
  address: "123 Street",
  totalAmount: 500000,
  status: OrderStatus.PENDING,
  details: [{ unitPrice: 250000, quantity: 2 }],
});

// Update order status
const updateStatus = useUpdateOrderStatus();
await updateStatus.mutateAsync({
  id: "order-id",
  status: OrderStatus.SHIPPING,
});
```

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── test-firebase/     # Firebase test page
│   └── layout.tsx
├── components/            # React components
├── hooks/                 # TanStack Query hooks
│   ├── useProducts.ts     # Product data hooks
│   ├── useOrders.ts       # Order data hooks
│   └── useAccount.ts      # Account data hooks
├── lib/                   # Utilities
│   └── firebase.ts        # Firebase config
├── service/               # Firebase service layer
│   ├── product.service.ts # Product CRUD operations
│   └── order.service.ts   # Order CRUD operations
└── types/                 # TypeScript types
    ├── product.types.ts
    ├── order.types.ts
    └── account.types.ts
```

---

## 📜 Available Scripts

| Command      | Description              |
| ------------ | ------------------------ |
| `yarn dev`   | Start development server |
| `yarn build` | Build for production     |
| `yarn start` | Start production server  |
| `yarn lint`  | Run ESLint               |

---

## 🔐 Security Notes

> ⚠️ **Important**: The Firestore rules shown above are for **development only**.
> For production, implement proper security rules based on authentication.

Example production rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    match /orders/{orderId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 📄 License

MIT
