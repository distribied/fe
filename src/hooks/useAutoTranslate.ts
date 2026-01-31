"use client";

import { useState, useEffect, useCallback } from "react";

interface TranslateOptions {
  from?: string; // Source language code (e.g., "vi", "id")
  to: string; // Target language code (e.g., "en")
  cacheKey?: string; // Optional cache key for localStorage
}

interface UseAutoTranslateReturn {
  translatedText: string;
  isLoading: boolean;
  error: string | null;
  translate: (text: string) => Promise<string>;
}

/**
 * Hook for auto-translating text using MyMemory API (FREE, no API key)
 * Free limit: 5000 chars/day, 500 chars/request
 *
 * @example
 * const { translatedText, isLoading } = useAutoTranslate(
 *   productDescription,
 *   { from: "vi", to: "en" }
 * );
 */
export function useAutoTranslate(
  text: string,
  options: TranslateOptions,
): UseAutoTranslateReturn {
  const { from = "vi", to, cacheKey } = options;
  const [translatedText, setTranslatedText] = useState(text);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCacheKey = useCallback(
    (inputText: string) => {
      return `translate_${from}_${to}_${cacheKey || inputText.slice(0, 50)}`;
    },
    [from, to, cacheKey],
  );

  const getFromCache = useCallback(
    (inputText: string): string | null => {
      if (typeof window === "undefined") return null;
      try {
        return localStorage.getItem(getCacheKey(inputText));
      } catch {
        return null;
      }
    },
    [getCacheKey],
  );

  const setToCache = useCallback(
    (inputText: string, translated: string) => {
      if (typeof window === "undefined") return;
      try {
        localStorage.setItem(getCacheKey(inputText), translated);
      } catch {
        // localStorage full or unavailable
      }
    },
    [getCacheKey],
  );

  const translate = useCallback(
    async (inputText: string): Promise<string> => {
      if (!inputText || inputText.trim() === "") {
        return inputText;
      }

      // Skip if source and target are the same
      if (from === to) {
        return inputText;
      }

      // Check cache first
      const cached = getFromCache(inputText);
      if (cached) {
        return cached;
      }

      try {
        // Use MyMemory API (FREE, no API key required)
        const encodedText = encodeURIComponent(inputText);
        const langPair = `${from}|${to}`;
        const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${langPair}`;

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          if (
            data.responseStatus === 200 &&
            data.responseData?.translatedText
          ) {
            const translated = data.responseData.translatedText;
            // Don't cache if it returned an error message
            if (!translated.includes("MYMEMORY WARNING")) {
              setToCache(inputText, translated);
              return translated;
            }
          }
        }
      } catch {
        // Fall through to return original text
      }

      return inputText;
    },
    [from, to, getFromCache, setToCache],
  );

  useEffect(() => {
    if (!text || text.trim() === "" || from === to) {
      setTranslatedText(text);
      return;
    }

    const cached = getFromCache(text);
    if (cached) {
      setTranslatedText(cached);
      return;
    }

    setIsLoading(true);
    setError(null);

    translate(text)
      .then((result) => {
        setTranslatedText(result);
      })
      .catch((err) => {
        setError(err.message);
        setTranslatedText(text); // Fallback to original
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [text, from, to, translate, getFromCache]);

  return {
    translatedText,
    isLoading,
    error,
    translate,
  };
}

/**
 * Standalone function to translate text (for use outside React components)
 */
export async function translateText(
  text: string,
  from: string = "vi",
  to: string = "en",
): Promise<string> {
  if (!text || text.trim() === "" || from === to) {
    return text;
  }

  try {
    const encodedText = encodeURIComponent(text);
    const langPair = `${from}|${to}`;
    const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${langPair}`;

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        return data.responseData.translatedText;
      }
    }
  } catch {
    // Return original on error
  }

  return text;
}
