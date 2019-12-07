import { ApplicationState } from "../infrastructure/types";
import { Item } from "../infrastructure/types";

const PLAY = "PLAY";

export const play = (item: Item) =>
  ({
    type: PLAY,
    item
  } as const);

export type Action = ReturnType<typeof play>;

export const playerReducer = (
  state: ApplicationState,
  action: Action
): ApplicationState => {
  //skip all other items, like playlists for now
  if (action.type === PLAY && action.item.type === "video")
    return {
      ...state,
      itemBeingPlayed: action.item
    };
  return state;
};
