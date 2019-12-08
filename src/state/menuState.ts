import {
  ApplicationState,
  Board,
  UserOptions,
  Item,
  SidebarState,
  BoardState
} from "./types";
import { createId } from "../infrastructure/utils";
import { updateBoard } from "./board.utils";

const TOP_BAR_BUTTON_PRESSED = "TOP_BAR_BUTTON_PRESSED",
  FIND_SIMILAR_DONE = "FIND_SIMILAR_DONE",
  SELECT_BOARD = "SELECT_BOARD",
  REMOVE_BOARD = "REMOVE_BOARD",
  RENAME_BOARD = "RENAME_BOARD",
  CREATE_BOARD = "CREATE_BOARD",
  SEARCH_DONE = "SEARCH_DONE";

export const searchDone = (items: Item[]) =>
  ({
    type: SEARCH_DONE,
    items
  } as const);

export const removeBoard = (boardId: string) =>
  ({
    type: REMOVE_BOARD,
    boardId
  } as const);

export const findSimilarArtistsDone = (items: Item[]) =>
  ({
    type: FIND_SIMILAR_DONE,
    items
  } as const);

export const topBarButtonPressed = (buttonPressedType: SidebarState) =>
  ({
    type: TOP_BAR_BUTTON_PRESSED,
    buttonPressedType
  } as const);

export const createAndSelectNewBoard = () =>
  ({
    type: CREATE_BOARD,
    boardId: createId()
  } as const);

export const renameBoard = (boardId: string, boardName: string) =>
  ({
    type: RENAME_BOARD,
    boardId,
    newText: boardName
  } as const);

export const selectBoard = (boardId: string) =>
  ({
    type: SELECT_BOARD,
    boardId
  } as const);

export type Action =
  | ReturnType<typeof searchDone>
  | ReturnType<typeof removeBoard>
  | ReturnType<typeof findSimilarArtistsDone>
  | ReturnType<typeof topBarButtonPressed>
  | ReturnType<typeof createAndSelectNewBoard>
  | ReturnType<typeof renameBoard>
  | ReturnType<typeof selectBoard>;

export const menuReducer = (
  state: ApplicationState,
  action: Action
): ApplicationState => {
  if (action.type === TOP_BAR_BUTTON_PRESSED) {
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
  if (action.type === SEARCH_DONE) {
    return {
      ...state,
      searchResults: action.items
    };
  }
  if (action.type === SELECT_BOARD) {
    return {
      ...state,
      selectedBoard: action.boardId
    };
  }
  if (action.type === FIND_SIMILAR_DONE) {
    return {
      ...state,
      similarState: {
        ...state.similarState,
        isLoading: false,
        items: action.items
      }
    };
  }
  if (action.type === REMOVE_BOARD) {
    const boards = state.boards;
    //TODO: warning mutation
    delete boards.items[action.boardId];

    return {
      ...state,
      selectedBoard: selectOtherBoard(
        state.boards.order,
        state.selectedBoard,
        action.boardId
      ),
      boards: {
        ...boards,
        order: state.boards.order.filter(b => b !== action.boardId)
      }
    };
  }
  if (action.type === CREATE_BOARD) {
    return {
      ...state,
      boards: createDefaultBoard(state.boards, action.boardId),
      selectedBoard: action.boardId
    };
  }
  if (action.type === RENAME_BOARD) {
    return updateBoard(state, {
      ...state.boards.items[action.boardId],
      boardName: action.newText
    });
  }
  return state;
};

const createDefaultBoard = (
  boards: BoardState,
  boardId: string
): BoardState => {
  const newBoard: Board = {
    columnOrders: [],
    columns: {},
    boardId,
    boardName: "New Board",
    boardOptions: {}
  };
  return {
    ...boards,
    items: {
      ...boards.items,
      [boardId]: newBoard
    },
    order: boards.order.concat([boardId])
  };
};

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
