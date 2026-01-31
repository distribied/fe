import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ message: "Product created successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create product" }, { status: 500 });
  }
}