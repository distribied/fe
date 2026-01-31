"use client";

import { useAutoTranslate } from "@/hooks/useAutoTranslate";

interface AutoTranslateProps {
  children: string;
  from?: string;
  to?: string;
}

/**
 * Component to auto-translate text content
 * Uses LibreTranslate (FREE, no API key required)
 *
 * @example
 * <AutoTranslate from="vi" to="en">
 *   Xin chào thế giới
 * </AutoTranslate>
 */
export function AutoTranslate({
  children,
  from = "auto",
  to = "en",
}: AutoTranslateProps) {
  const { translatedText, isLoading } = useAutoTranslate(children, {
    from,
    to,
  });

  if (isLoading) {
    return <span className="animate-pulse opacity-50">{children}</span>;
  }

  return <>{translatedText}</>;
}
