export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/g, "")
    .replaceAll(/[^\w\s]/gi, "")
    .trim();
}

/**
 * Generate all possible search prefixes from a search term
 * For "hat dinh" -> ["h", "ha", "hat", "hat d", "hat di", "hat din", "hat dinh", "d", "di", "din", "dinh"]
 */
export function generateSearchPrefixes(text: string): string[] {
  const normalized = normalizeText(text);
  const words = normalized.split(/\s+/).filter(Boolean);
  const prefixes: string[] = [];

  // Single word prefixes
  for (const word of words) {
    let current = "";
    for (const char of word) {
      current += char;
      prefixes.push(current);
    }
  }

  // Multi-word prefixes (combinations)
  for (let i = 0; i < words.length; i++) {
    for (let j = i + 1; j <= Math.min(i + 3, words.length); j++) {
      const combination = words.slice(i, j).join("");
      let current = "";
      for (const char of combination) {
        current += char;
        prefixes.push(current);
      }
    }
  }

  return Array.from(new Set(prefixes));
}

export function generateSearchKeywords(name: string): string[] {
  const original = name.toLowerCase();
  const normalized = normalizeText(name);

  const wordsOriginal = original.split(/\s+/).filter(Boolean);
  const wordsNormalized = normalized.split(/\s+/).filter(Boolean);

  const keywords: string[] = [];

  // Generate prefixes for single words
  function buildPrefixes(words: string[]) {
    for (const word of words) {
      let current = "";
      for (const char of word) {
        current += char;
        keywords.push(current);
      }
    }
  }

  // Build prefixes for single words
  buildPrefixes(wordsOriginal);
  buildPrefixes(wordsNormalized);

  // Generate prefixes for word combinations (2+ words)
  function buildCombinationPrefixes(words: string[], separator: string = "") {
    const n = words.length;
    // Generate all possible combinations of 2 or more words
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j <= Math.min(i + 3, n); j++) {
        // Take words from i to j (max 4 words combined)
        const combination = words.slice(i, j).join(separator);
        let current = "";
        for (const char of combination) {
          current += char;
          keywords.push(current);
        }
      }
    }
  }

  // Add combinations with space (original)
  buildCombinationPrefixes(wordsOriginal, " ");
  // Add combinations without space (normalized)
  buildCombinationPrefixes(wordsNormalized, "");

  return Array.from(new Set(keywords));
}
