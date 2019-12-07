import { ApplicationState, UserOptions } from "../infrastructure/types";
import { Action } from "./actions";
import { ACTIONS } from "../board/actions";

export default (state: ApplicationState, action: Action): ApplicationState => {
  if (action.type === "TOP_BAR_BUTTON_PRESSED") {
    const leftVisible = state.userOptions.isLeftSidebarVisible;
    const sidebarState = state.userOptions.leftSidebarContentType;
    const newSidebarState = action.buttonPressedType;
    if (leftVisible && sidebarState === newSidebarState) {
      return updateUserOptions(state, { isLeftSidebarVisible: false });
    } else if (!leftVisible) {
      return updateUserOptions(state, {
        isLeftSidebarVisible: true,
        leftSidebarContentType: newSidebarState
      });
    } else {
      return updateUserOptions(state, {
        leftSidebarContentType: newSidebarState
      });
    }
  }

  if (action.type === ACTIONS.FIND_SIMILAR_DONE) {
    return {
      ...state,
      similarState: {
        ...state.similarState,
        isLoading: false,
        items: action.items
      }
    };
  }
  return state;
};

const updateUserOptions = (
  state: ApplicationState,
  options: Partial<UserOptions>
): ApplicationState => ({
  ...state,
  userOptions: {
    ...state.userOptions,
    ...options
  }
});
