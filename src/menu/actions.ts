import { Item, SidebarState } from "../infrastructure/types";
export type Action = FindSimilarArtistsDone | TopBarButtonPressed;

export interface FindSimilarArtistsDone {
  type: "FIND_SIMILAR_DONE";
  items: Item[];
}

export interface TopBarButtonPressed {
  type: "TOP_BAR_BUTTON_PRESSED";
  buttonPressedType: SidebarState;
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
