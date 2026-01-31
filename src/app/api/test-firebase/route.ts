import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Dynamic import to avoid issues
    const { db } = await import("@/lib/firebase");
    const { collection, getDocs, addDoc } = await import("firebase/firestore");

    // Simple test: add a document
    const testData = {
      test: true,
      timestamp: new Date().toISOString(),
      message: "Firebase connection test",
    };

    const docRef = await addDoc(collection(db, "test_connection"), testData);

    // Fetch it back
    const snapshot = await getDocs(collection(db, "test_connection"));
    const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

    return NextResponse.json({
      success: true,
      message: "Firebase is working correctly!",
      docId: docRef.id,
      totalTestDocs: docs.length,
    });
  } catch (error) {
    console.error("Firebase test error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Firebase test failed",
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    );
  }
}
