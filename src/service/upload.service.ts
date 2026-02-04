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
 * Upload product image via backend API proxy
 * This keeps the ImgBB API key secure on the server
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

    onProgress?.(50);

    // Upload via backend API (keeps API key secure)
    const response = await fetch("/api/image/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: base64Image,
        name: imageName,
      }),
    });

    onProgress?.(80);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to upload image");
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Upload failed");
    }

    onProgress?.(100);

    // Return the image URL
    return data.url;
  } catch (error) {
    console.error("Error uploading image:", error);
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
