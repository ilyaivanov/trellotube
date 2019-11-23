import { Item } from "../types";
export type Action = FindSimilarArtistsDone;

export interface FindSimilarArtistsDone {
  type: "FIND_SIMILAR_DONE";
  items: Item[];
}

export const findSimilarArtistsDone = (items: Item[]): FindSimilarArtistsDone => ({
  type: "FIND_SIMILAR_DONE",
  items
});
