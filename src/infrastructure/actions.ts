import { Item } from "./types";
import { ACTIONS, PlayAction } from "./actions.types";

export const play = (item: Item): PlayAction => ({
  type: ACTIONS.PLAY,
  item
});
