export type MarkerIconType = "city" | "fort" | "landmark" | "party" | "quest";

export type MarkerType =
  | "city"
  | "district"
  | "landmark"
  | "capital"
  | "region"
  | "village";

export interface RelatedContentItem {
  id: string;
  type: "campaign" | "epic-moment" | "session" | "lore";
  title: string;
  summary: string;
  route: string;
}

export interface WorldMapMarker {
  id: string;
  name: string;
  type: MarkerType;
  xPercent: number;
  yPercent: number;
  route: string;
  description: string;
  iconType: MarkerIconType;
  relatedContentIds?: string[];
}

export interface WorldMapData {
  id: string;
  name: string;
  imageSrc: string;
  alt: string;
  markers: WorldMapMarker[];
}

export interface PartyToken {
  label: string;
  xPercent: number;
  yPercent: number;
  imageSrc: string;
}

export interface CharacterLocationToken {
  id: string;
  name: string;
  xPercent: number;
  yPercent: number;
  imageSrc: string;
}

export interface PartyState {
  mode: "party" | "characters";
  party: PartyToken;
  characters: CharacterLocationToken[];
}

export type RelatedContentMap = Record<string, RelatedContentItem>;