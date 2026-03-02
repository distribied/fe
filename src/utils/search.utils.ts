export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/g, "")
    .replaceAll(/[^\w\s]/gi, "")
    .trim();
}

export function generateSearchKeywords(name: string): string[] {
  const original = name.toLowerCase();
  const normalized = normalizeText(name);

  const wordsOriginal = original.split(/\s+/);
  const wordsNormalized = normalized.split(/\s+/);

  const keywords: string[] = [];

  function buildPrefixes(words: string[]) {
    for (const word of words) {
      let current = "";
      for (const char of word) {
        current += char;
        keywords.push(current);
      }
    }
  }

  buildPrefixes(wordsOriginal);
  buildPrefixes(wordsNormalized);

  return Array.from(new Set(keywords));
}
