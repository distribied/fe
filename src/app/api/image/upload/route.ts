import { NextRequest, NextResponse } from "next/server";

const IMGBB_API_KEY = process.env.IMGBB_API_KEY; // Server-side only, NO NEXT_PUBLIC_
const IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload";

export async function POST(request: NextRequest) {
  try {
    // Check API key is configured
    if (!IMGBB_API_KEY) {
      return NextResponse.json(
        { error: "Image upload service not configured" },
        { status: 500 },
      );
    }

    // Parse request body
    const body = await request.json();
    const { image, name } = body;

    if (!image) {
      return NextResponse.json(
        { error: "Image data is required" },
        { status: 400 },
      );
    }

    // Create form data for ImgBB
    const formData = new FormData();
    formData.append("key", IMGBB_API_KEY);
    formData.append("image", image); // base64 string
    if (name) {
      formData.append("name", name);
    }

    // Upload to ImgBB
    const response = await fetch(IMGBB_UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error?.message || "Failed to upload image" },
        { status: response.status },
      );
    }

    const data = await response.json();

    if (!data.success) {
      return NextResponse.json(
        { error: data.error?.message || "Upload failed" },
        { status: 400 },
      );
    }

    // Return the image URL
    return NextResponse.json({
      success: true,
      url: data.data.url,
      data: data.data,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
