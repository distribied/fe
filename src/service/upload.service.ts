const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "";
const IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload";

const MAX_FILE_SIZE = 32 * 1024 * 1024; // 32MB (ImgBB limit)
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/bmp",
];

/**
 * Validate image file
 */
export const validateImageFile = (file: File): string | null => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return "Only JPG, JPEG, PNG, GIF, WEBP, and BMP images are allowed";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "File size must be less than 32MB";
  }

  return null;
};

/**
 * Convert file to base64
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data:image/xxx;base64, prefix
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Upload product image to ImgBB
 * @param file - Image file to upload
 * @param productId - Optional product ID (for naming/organization)
 * @param onProgress - Optional callback for upload progress
 * @returns Promise<string> - URL of uploaded image
 */
export const uploadProductImage = async (
  file: File,
  productId?: string,
  onProgress?: (progress: number) => void,
): Promise<string> => {
  // Validate file
  const validationError = validateImageFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  if (!IMGBB_API_KEY) {
    throw new Error(
      "ImgBB API key is not configured. Please add NEXT_PUBLIC_IMGBB_API_KEY to your .env file",
    );
  }

  try {
    // Simulate initial progress
    onProgress?.(10);

    // Convert file to base64
    const base64Image = await fileToBase64(file);
    onProgress?.(30);

    // Generate a name for the image
    const imageName = productId
      ? `product-${productId}-${Date.now()}`
      : `upload-${Date.now()}`;

    // Create form data
    const formData = new FormData();
    formData.append("key", IMGBB_API_KEY);
    formData.append("image", base64Image);
    formData.append("name", imageName);

    onProgress?.(50);

    // Upload to ImgBB
    const response = await fetch(IMGBB_UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    onProgress?.(80);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || "Failed to upload image to ImgBB",
      );
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(
        "Upload failed: " + (data.error?.message || "Unknown error"),
      );
    }

    onProgress?.(100);

    // Return the image URL
    return data.data.url;
  } catch (error) {
    console.error("Error uploading to ImgBB:", error);
    throw error;
  }
};

/**
 * Delete image from ImgBB using its URL
 * Note: ImgBB free tier doesn't support deletion via API
 * Images will remain on ImgBB but won't be referenced in your app
 * @param url - Full URL of the image
 */
export const deleteProductImage = async (url: string): Promise<void> => {
  // ImgBB free API doesn't support deletion
  // We just remove the reference from Firestore
  // The image will remain on ImgBB but won't be used
  console.log(
    "Note: ImgBB free tier doesn't support deletion. Image URL removed from database:",
    url,
  );

  // In production, you might want to keep a log of "deleted" URLs
  // to manually clean up later if needed
};

/**
 * Upload multiple images with progress tracking
 */
export const uploadMultipleImages = async (
  files: File[],
  productId?: string,
  onProgress?: (fileIndex: number, progress: number) => void,
): Promise<string[]> => {
  const uploadPromises = files.map((file, index) =>
    uploadProductImage(file, productId, (progress) => {
      onProgress?.(index, progress);
    }),
  );

  return Promise.all(uploadPromises);
};
