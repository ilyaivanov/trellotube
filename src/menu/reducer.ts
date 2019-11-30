import {
  ApplicationState,
  Board,
  BoardOptions,
  UserOptions
} from "../infrastructure/types";
import { Action } from "./actions";
import {ACTIONS} from "../board/actions";

export default (state: ApplicationState, action: Action): ApplicationState => {
  const selectedBoard = getSelectedBoard(state);

  if (action.type === "FIND_SIMILAR_START") {
    return updateBoardOptions(state, selectedBoard, { isLoadingSimilar: true });
  }

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
      similarState:{
        ...state.similarState,
        isLoading: false,
        items: action.items
      }
    }
  }
  return state;
};

//REDUCER HELPERS (candidates for nested reducers)
//TODO: remove duplication

const updateBoardOptions = (
  state: ApplicationState,
  board: Board,
  options: Partial<BoardOptions>
) => updateBoard(state, updateOptions(board, options));

const updateOptions = (
  board: Board,
  options: Partial<BoardOptions>
): Board => ({
  ...board,
  boardOptions: {
    ...board.boardOptions,
    ...options
  }
});

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

const updateBoard = (state: ApplicationState, board: Board) => ({
  ...state,
  boards: {
    ...state.boards,
    [board.boardId]: board
  }
});

export const getSelectedBoard = (state: ApplicationState) =>
  state.boards[state.selectedBoard];
