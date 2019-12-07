import { ApplicationState, UserOptions } from "../infrastructure/types";
import { Item, SidebarState } from "../infrastructure/types";
enum ACTION {
  TOP_BAR_BUTTON_PRESSED = "TOP_BAR_BUTTON_PRESSED",
  FIND_SIMILAR_DONE = "FIND_SIMILAR_DONE",
  SELECT_BOARD = "SELECT_BOARD",
  SEARCH_DONE = "SEARCH_DONE"
}

export interface FindSimilarArtistsDone {
  type: ACTION.FIND_SIMILAR_DONE;
  items: Item[];
}

export interface TopBarButtonPressed {
  type: ACTION.TOP_BAR_BUTTON_PRESSED;
  buttonPressedType: SidebarState;
}

export interface SelectBoard {
  type: ACTION.SELECT_BOARD;
  boardId: string;
}

export interface SearchDone {
  type: ACTION.SEARCH_DONE;
  items: Item[];
}

export const searchDone = (items: Item[]) => ({
  type: ACTION.SEARCH_DONE,
  items
});

export const selectBoard = (boardId: string) => ({
  type: ACTION.SELECT_BOARD,
  boardId
});

export const findSimilarArtistsDone = (
  items: Item[]
): FindSimilarArtistsDone => ({
  type: ACTION.FIND_SIMILAR_DONE,
  items
});

export const topBarButtonPressed = (
  buttonPressedType: SidebarState
): TopBarButtonPressed => ({
  type: ACTION.TOP_BAR_BUTTON_PRESSED,
  buttonPressedType
});

export type Action = FindSimilarArtistsDone | TopBarButtonPressed | SelectBoard | SearchDone;

export const menuReducer = (state: ApplicationState, action: Action): ApplicationState => {
  if (action.type === ACTION.TOP_BAR_BUTTON_PRESSED) {
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
  if (action.type === ACTION.SEARCH_DONE) {
    return {
      ...state,
      searchResults: action.items
    };
  }
  if (action.type === ACTION.SELECT_BOARD) {
    return {
      ...state,
      selectedBoard: action.boardId
    };
  }
  if (action.type === ACTION.FIND_SIMILAR_DONE) {
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
