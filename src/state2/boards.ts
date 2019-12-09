import { Action, AppState, Container } from "./index";
import { DropResult } from "react-beautiful-dnd";
import { handleDrop } from "./dnd";
const SELECT_BOARD = "SELECT_BOARD",
  END_DROP = "END_DROP";

export const selectBoard = (boardId: string) =>
  ({
    type: SELECT_BOARD,
    boardId
  } as const);

export const endDrag = (dropResult: DropResult) =>
  ({
    type: END_DROP,
    dropResult
  } as const);

export interface BoardsState {
  order: string[];
  selectedBoard: string;
  boards: Container<Board>;
  columns: Container<Column>;
  items: Container<Item>;
}

export const getBoards = (state: AppState): BoardViewModel[] =>
  state.boardsState.order.map(bId => ({
    ...state.boardsState.boards[bId],
    id: bId,
    isSelected: bId === state.boardsState.selectedBoard
  }));

export interface Board {
  name: string;
  stacks: string[];
}
export interface Column {
  name: string;
  items: string[];
}
export interface Item {
  name: string;
}

const initialState: BoardsState = {
  order: ["1", "2"],
  selectedBoard: "1",
  boards: {
    "1": {
      name: "First Board",
      stacks: ["1", "2"]
    },
    "2": {
      name: "Second Board",
      stacks: ["3"]
    }
  },
  columns: {
    "1": {
      name: "Stack1 Board1",
      items: ["10"]
    },
    "2": {
      name: "Stack2 Board1",
      items: ["11", "12"]
    },
    "3": {
      name: "Stack1 Board2",
      items: []
    }
  },
  items: {
    "10": {
      name: "Stack1 - First Item"
    },
    "11": {
      name: "Stack2 - First Item"
    },
    "12": {
      name: "Stack2 - Second Item"
    }
  }
};

interface BaseViewModel {
  id: string;
  name: string;
}

export interface BoardViewModel extends BaseViewModel {
  isSelected: boolean;
}

interface StackViewModel extends BaseViewModel {
  items: ItemViewModel[];
}
interface ItemViewModel extends BaseViewModel {}

interface BoardDetailsViewModel extends BaseViewModel {
  stacks: StackViewModel[];
}

export const getSelectedBoard = (state: AppState): BoardDetailsViewModel => {
  const { selectedBoard } = state.boardsState;
  const board = state.boardsState.boards[selectedBoard];
  return {
    id: selectedBoard,
    name: board.name,
    stacks: board.stacks.map(s => {
      const column = state.boardsState.columns[s];
      return {
        name: column.name,
        id: s,
        items: column.items.map(id => ({
          id,
          name: state.boardsState.items[id].name
        }))
      };
    })
  };
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
  if (action.type === END_DROP) {
    return handleDrop(boards, action.dropResult);
  }
  return boards;
};
