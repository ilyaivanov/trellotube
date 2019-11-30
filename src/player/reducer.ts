import { ApplicationState } from "../infrastructure/types";
import { Action, ACTIONS } from "../infrastructure/actions.types";

export default (state: ApplicationState, action: Action): ApplicationState => {
  if (action.type === ACTIONS.PLAY)
    return {
      ...state,
      itemBeingPlayed: action.item
    };
  return state;
};
