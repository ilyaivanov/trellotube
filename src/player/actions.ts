import { Item } from "../types";

export enum ACTIONS {
  PLAY = "PLAY"
}

export type Action = PlayAction;

interface PlayAction {
  type: ACTIONS.PLAY;
  item: Item;
}

export const play = (item: Item): PlayAction => ({
  type: ACTIONS.PLAY,
  item
});
