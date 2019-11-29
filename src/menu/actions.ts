import { Item, SidebarState } from "../types";
export type Action =
  | FindSimilarArtistsDone
  | FindSimilarArtistsStart
  | TopBarButtonPressed;

export interface FindSimilarArtistsDone {
  type: "FIND_SIMILAR_DONE";
  items: Item[];
}

export interface TopBarButtonPressed {
  type: "TOP_BAR_BUTTON_PRESSED";
  buttonPressedType: SidebarState;
}

export interface FindSimilarArtistsStart {
  type: "FIND_SIMILAR_START";
  items: Item[];
}

export const findSimilarArtistsDone = (
  items: Item[]
): FindSimilarArtistsDone => ({
  type: "FIND_SIMILAR_DONE",
  items
});

export const topBarButtonPressed = (
  buttonPressedType: SidebarState
): TopBarButtonPressed => ({
  type: "TOP_BAR_BUTTON_PRESSED",
  buttonPressedType
});
