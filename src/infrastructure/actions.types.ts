import { Item } from "./types";

export enum ACTIONS {
  PLAY = "PLAY"
}

export type Action = PlayAction;

export interface PlayAction {
  type: ACTIONS.PLAY;
  item: Item;
}
