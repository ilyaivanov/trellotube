import { Action } from "./index";

const PLAY = "PLAY";

export const play = (itemId: string) =>
  ({
    type: PLAY,
    itemId
  } as const);

interface PlayerState {
  itemBeingPlayed: string;
}

const initial: PlayerState = {
  itemBeingPlayed: ""
};

export const playerReducer = (state = initial, action: Action): PlayerState => {
  //skip all other items, like playlists for now
  if (action.type === PLAY)
    return {
      ...state,
      itemBeingPlayed: action.itemId
    };
  return state;
};
