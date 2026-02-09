import { useState, useCallback } from "react";
import {
  uploadProductImage,
  deleteProductImage,
  validateImageFile,
} from "@/service/upload.service";
import { toast } from "sonner";

export interface UploadedImage {
  file: File;
  url: string;
  preview: string;
  progress: number;
  error?: string;
}

export const useImageUpload = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  /**
   * Add files to upload queue and generate previews
   */
  const addFiles = useCallback((files: File[]) => {
    const validFiles: UploadedImage[] = [];

    files.forEach((file) => {
      const error = validateImageFile(file);

      if (error) {
        toast.error(`${file.name}: ${error}`);
        return;
      }

      // Generate preview URL
      const preview = URL.createObjectURL(file);

      validFiles.push({
        file,
        url: "",
        preview,
        progress: 0,
        error: undefined,
      });
    });

    setImages((prev) => [...prev, ...validFiles]);
  }, []);

  /**
   * Update image progress
   */
  const updateImageProgress = useCallback((index: number, progress: number) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], progress };
      return updated;
    });
  }, []);

  /**
   * Update image success
   */
  const updateImageSuccess = useCallback((index: number, url: string) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], url, progress: 100 };
      return updated;
    });
  }, []);

  /**
   * Update image error
   */
  const updateImageError = useCallback((index: number, error: string) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        error,
        progress: 0,
      };
      return updated;
    });
  }, []);

  /**
   * Upload a single image
   */
  const uploadImage = useCallback(
    async (index: number, productId?: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const image = images[index];

        uploadProductImage(image.file, productId, (progress) =>
          updateImageProgress(index, progress),
        )
          .then((url) => {
            updateImageSuccess(index, url);
            resolve(url);
          })
          .catch((error) => {
            updateImageError(index, error.message);
            reject(error);
          });
      });
    },
    [images, updateImageProgress, updateImageSuccess, updateImageError],
  );

  /**
   * Upload all images
   */
  const uploadAll = useCallback(
    async (productId?: string): Promise<string[]> => {
      setIsUploading(true);
      const urls: string[] = [];

      try {
        for (let i = 0; i < images.length; i++) {
          if (images[i].url) {
            urls.push(images[i].url);
          } else {
            const url = await uploadImage(i, productId);
            urls.push(url);
          }
        }

        toast.success(`Successfully uploaded ${urls.length} image(s)`);
        return urls;
      } catch (error) {
        toast.error("Failed to upload some images");
        throw error;
      } finally {
        setIsUploading(false);
      }
    },
    [images, uploadImage],
  );

  /**
   * Remove image from list
   */
  const removeImage = useCallback(
    async (index: number) => {
      const image = images[index];

      // Delete from storage if already uploaded
      if (image.url) {
        try {
          await deleteProductImage(image.url);
        } catch (error) {
          console.error("Failed to delete image:", error);
        }
      }

      // Revoke preview URL to free memory
      if (image.preview) {
        URL.revokeObjectURL(image.preview);
      }

      setImages((prev) => prev.filter((_, i) => i !== index));
    },
    [images],
  );

  /**
   * Clear all images
   */
  const clearAll = useCallback(() => {
    images.forEach((image) => {
      if (image.preview) {
        URL.revokeObjectURL(image.preview);
      }
    });
    setImages([]);
  }, [images]);

  /**
   * Reset hook state
   */
  const reset = useCallback(() => {
    clearAll();
    setIsUploading(false);
  }, [clearAll]);

  return {
    images,
    isUploading,
    addFiles,
    uploadImage,
    uploadAll,
    removeImage,
    clearAll,
    reset,
  };
};
