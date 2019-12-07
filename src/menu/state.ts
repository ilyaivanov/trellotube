import {
  ApplicationState,
  Board,
  BoardsContainer,
  UserOptions
} from "../infrastructure/types";
import { Item, SidebarState } from "../infrastructure/types";
import { createId } from "../infrastructure/utils";
import { initialState } from "../infrastructure/state/initialState";
enum ACTION {
  TOP_BAR_BUTTON_PRESSED = "TOP_BAR_BUTTON_PRESSED",
  FIND_SIMILAR_DONE = "FIND_SIMILAR_DONE",
  SELECT_BOARD = "SELECT_BOARD",
  REMOVE_BOARD = "REMOVE_BOARD",
  RENAME_BOARD = "RENAME_BOARD",
  CREATE_BOARD = "CREATE_BOARD",
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

export interface RenameBoard {
  type: ACTION.RENAME_BOARD;
  boardId: string;
  newText: string;
}

export interface CreateBoard {
  type: ACTION.CREATE_BOARD;
  boardId: string;
}

export interface RemoveBoard {
  type: ACTION.REMOVE_BOARD;
  boardId: string;
}

export const searchDone = (items: Item[]) => ({
  type: ACTION.SEARCH_DONE,
  items
});

export const selectBoard = (boardId: string) => ({
  type: ACTION.SELECT_BOARD,
  boardId
});
export const removeBoard = (boardId: string): RemoveBoard => ({
  type: ACTION.REMOVE_BOARD,
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

export const createAndSelectNewBoard = (): CreateBoard => {
  const newID = createId();
  return {
    type: ACTION.CREATE_BOARD,
    boardId: newID
  };
};

export const renameBoard = (
  boardId: string,
  boardName: string
): RenameBoard => ({
  type: ACTION.RENAME_BOARD,
  boardId,
  newText: boardName
});

export type Action =
  | FindSimilarArtistsDone
  | TopBarButtonPressed
  | SelectBoard
  | RemoveBoard
  | CreateBoard
  | RenameBoard
  | SearchDone;

export const menuReducer = (
  state: ApplicationState,
  action: Action
): ApplicationState => {
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
  if (action.type === ACTION.REMOVE_BOARD) {
    const boards = state.boards;
    //TODO: warning mutation
    delete boards[action.boardId];

    return {
      ...state,
      boardsOrder: state.boardsOrder.filter(b => b !== action.boardId),
      selectedBoard: selectOtherBoard(
        state.boardsOrder,
        state.selectedBoard,
        action.boardId
      ),
      boards
    };
  }
  if (action.type === ACTION.CREATE_BOARD) {
    return {
      ...state,
      boardsOrder: state.boardsOrder.concat([action.boardId]),
      boards: createDefaultBoard(state.boards, action.boardId),
      selectedBoard: action.boardId
    };
  }
  if (action.type === ACTION.RENAME_BOARD) {
    return updateBoard(state, {
      ...state.boards[action.boardId],
      boardName: action.newText
    });
  }
  return state;
};
const createDefaultBoard = (boards: BoardsContainer, boardId: string) => {
  const newBoard: Board = JSON.parse(
    //TODO: Extract into separate function without ugly BOARD_2
    JSON.stringify(initialState().boards["BOARD_2"])
  );
  newBoard.boardName = "New Board";
  newBoard.boardId = boardId;
  return {
    ...boards,
    [boardId]: newBoard
  };
};
const updateBoard = (state: ApplicationState, board: Board) => ({
  ...state,
  boards: {
    ...state.boards,
    [board.boardId]: board
  }
});
const selectOtherBoard = (
  boards: string[],
  selectedBoard: string,
  boardBeingRemoved: string
) => {
  if (selectedBoard !== boardBeingRemoved) return selectedBoard;
  return boards.filter(b => b !== selectedBoard)[0];
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
