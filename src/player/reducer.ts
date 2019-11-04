import { ApplicationState } from "../types";
import { Action, ACTIONS } from "./actions";

export default (state: ApplicationState, action: Action): ApplicationState => {
  if (action.type === ACTIONS.PLAY)
    return {
      ...state,
      videoBeingPlayed: action.videoId
    };
  return state;
};
