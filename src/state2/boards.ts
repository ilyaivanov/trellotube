import {Action, AppState, Container} from "./index";
const SELECT_BOARD = "SELECT_BOARD";

export const selectBoard = (boardId: string) =>
  ({
    type: SELECT_BOARD,
    boardId
  } as const);

interface BoardsState {
  order: string[];
  selectedBoard: string;
  items: Container<Board>;
}

export const getBoards = (state: AppState): BoardViewModel[] =>
  state.boardsState.order.map(bId => ({
    ...state.boardsState.items[bId],
    isSelected: bId === state.boardsState.selectedBoard
  }));


interface Board {
  name: string;
}

export interface BoardViewModel extends Board {
  isSelected: boolean;
}

const initialState: BoardsState = {
  order: ["1", "2"],
  selectedBoard: "1",
  items: {
    "1": {
      name: "First Board"
    },
    "2": {
      name: "Second Board"
    }
  }
};

export const boardsReducer = (
  boards = initialState,
  action: Action
): BoardsState => {
  if (action.type === SELECT_BOARD) {
    return {
      ...boards,
      selectedBoard: action.boardId
    };
  }
  return boards;
};
