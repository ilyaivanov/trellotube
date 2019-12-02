import { ApplicationState } from "../infrastructure/types";
import { Action, ACTIONS } from "../infrastructure/actions.types";

export default (state: ApplicationState, action: Action): ApplicationState => {
  //skip all other items, like playlists for now
  if (action.type === ACTIONS.PLAY && action.item.type === 'video')
    return {
      ...state,
      itemBeingPlayed: action.item
    };
  return state;
};
