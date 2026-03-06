import characters from "../../config/dnd/characters.json";

export interface Character {
  id: string;
  name: string;
  race: string;
  level: number;
  // classes: list
  portraitSrc: string;
  tokenSrc: string;
  fullImageSrc: string;
  sheetUrl: string;
  summary: string;
  backstory: string;
}

/**
 * Return all characters
 */
export function getCharacters(): Character[] {
  return characters as Character[];
}

/**
 * Find a character by ID
 */
export function getCharacterById(id: string): Character | undefined {
  return getCharacters().find((c) => c.id === id);
}

/**
 * Return characters sorted alphabetically
 */
export function getCharactersSorted(): Character[] {
  return [...getCharacters()].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

/**
 * Example future helper:
 * get characters with token frames
 */
export function getCharactersWithTokens(): Character[] {
  return getCharacters().filter((c) => c.tokenSrc);
}