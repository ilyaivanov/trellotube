import { ApplicationState } from "../infrastructure/types";
import { Item } from "../infrastructure/types";

enum ACTIONS {
  PLAY = "PLAY"
}

export type Action = PlayAction;

export interface PlayAction {
  type: ACTIONS.PLAY;
  item: Item;
}

export const play = (item: Item): PlayAction => ({
  type: ACTIONS.PLAY,
  item
});

export const reducer = (
  state: ApplicationState,
  action: Action
): ApplicationState => {
  //skip all other items, like playlists for now
  if (action.type === ACTIONS.PLAY && action.item.type === "video")
    return {
      ...state,
      itemBeingPlayed: action.item
    };
  return state;
};
