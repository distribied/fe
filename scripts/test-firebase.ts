// Simple script to test Firebase connection and fetch products
// Run with: npx ts-node --esm scripts/test-firebase.ts

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  writeBatch,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSdMgDteUtrnKi1Bn_7QxysMiV7Iunvdk",
  authDomain: "kieusam-4a866.firebaseapp.com",
  projectId: "kieusam-4a866",
  storageBucket: "kieusam-4a866.firebasestorage.app",
  messagingSenderId: "482057152515",
  appId: "1:482057152515:web:e720190f7840701ae44636",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchProducts() {
  console.log("Fetching products...");
  const snapshot = await getDocs(collection(db, "products"));
  console.log(`Found ${snapshot.docs.length} products:`);
  snapshot.docs.forEach((doc) => {
    console.log(`  - ${doc.id}: ${doc.data().name || "unnamed"}`);
  });
  return snapshot.docs.length;
}

async function fetchCategories() {
  console.log("\nFetching categories...");
  const snapshot = await getDocs(collection(db, "categories"));
  console.log(`Found ${snapshot.docs.length} categories:`);
  snapshot.docs.forEach((doc) => {
    console.log(`  - ${doc.id}: ${doc.data().name || "unnamed"}`);
  });
  return snapshot.docs.length;
}

async function fetchOrders() {
  console.log("\nFetching orders...");
  const snapshot = await getDocs(collection(db, "orders"));
  console.log(`Found ${snapshot.docs.length} orders:`);
  snapshot.docs.forEach((doc) => {
    console.log(
      `  - ${doc.id}: ${doc.data().name || "unnamed"} - ${doc.data().totalAmount || 0} VND`,
    );
  });
  return snapshot.docs.length;
}

async function seedMockData() {
  console.log("\nSeeding mock data...");
  const batch = writeBatch(db);

  // Seed categories
  const categories = [
    { name: "Hộp quà Tết", slug: "hop-qua-tet", order: 1 },
    { name: "Bánh kẹo", slug: "banh-keo", order: 2 },
    { name: "Trái cây sấy", slug: "trai-cay-say", order: 3 },
  ];

  for (const cat of categories) {
    const docRef = doc(collection(db, "categories"));
    batch.set(docRef, cat);
  }

  // Seed products
  const products = [
    {
      categoryId: 1,
      name: "Hộp quà Tết Phú Quý",
      slug: "hop-qua-tet-phu-quy",
      price: 599000,
      isActive: true,
      ratingAverage: 4.8,
      createdAt: new Date().toISOString(),
    },
    {
      categoryId: 2,
      name: "Bánh pía Sóc Trăng",
      slug: "banh-pia-soc-trang",
      price: 150000,
      isActive: true,
      ratingAverage: 4.7,
      createdAt: new Date().toISOString(),
    },
    {
      categoryId: 3,
      name: "Xoài sấy dẻo",
      slug: "xoai-say-deo",
      price: 120000,
      isActive: true,
      ratingAverage: 4.6,
      createdAt: new Date().toISOString(),
    },
  ];

  for (const prod of products) {
    const docRef = doc(collection(db, "products"));
    batch.set(docRef, prod);
  }

  await batch.commit();
  console.log(
    `Seeded ${categories.length} categories and ${products.length} products`,
  );
}

async function main() {
  console.log("=== Firebase Test Script ===\n");

  try {
    // Test connection with a simple read
    console.log("Testing connection...");
    const testRef = await addDoc(collection(db, "test_connection"), {
      timestamp: new Date().toISOString(),
      test: true,
    });
    console.log(`Connection successful! Test doc ID: ${testRef.id}\n`);

    // Fetch existing data
    const productCount = await fetchProducts();
    const categoryCount = await fetchCategories();
    const orderCount = await fetchOrders();

    // If no data, seed mock data
    if (productCount === 0 && categoryCount === 0) {
      await seedMockData();
      console.log("\nRe-fetching after seeding...");
      await fetchProducts();
      await fetchCategories();
    }

    console.log("\n=== Test Complete ===");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
