import { Action, AppState, Container } from "./index";
import { DropResult } from "react-beautiful-dnd";
import { handleDrop } from "./dnd";
import { ExtraColumn, SET_EXTRA_ITEMS } from "./menu";
export const SELECT_BOARD = "SELECT_BOARD",
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
  id: string;
  name: string;
  videoId: string;
  imageUrl: string;
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
      id: "10",
      name: "Stack1 - First Item",
      imageUrl: "https://i.ytimg.com/vi/b5SSHK-mIF8/mqdefault.jpg",
      videoId: "b5SSHK-mIF8"
    },
    "11": {
      id: "11",
      name: "Stack2 - First Item",
      imageUrl: "https://i.ytimg.com/vi/b5SSHK-mIF8/mqdefault.jpg",
      videoId: "b5SSHK-mIF8"
    },
    "12": {
      id: "12",
      name: "Stack2 - Second Item",
      imageUrl: "https://i.ytimg.com/vi/b5SSHK-mIF8/mqdefault.jpg",
      videoId: "b5SSHK-mIF8"
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
export interface ItemViewModel extends BaseViewModel {
  videoId: string;
  imageUrl: string;
  isPlaying?:boolean;
}

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
          ...state.boardsState.items[id],
          id
        }))
      };
    })
  };
};

export const getExtraItems = (
  type: ExtraColumn,
  state: AppState
): ItemViewModel[] =>
  state.menu.extraColumns[type]
    ? state.menu.extraColumns[type].map(id => ({
        ...state.boardsState.items[id],
        id
      }))
    : [];

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

  if (action.type === SET_EXTRA_ITEMS) {
    return {
      ...boards,
      items: {
        ...boards.items,
        ...action.items.reduce((o, i) => ({ ...o, [i.id]: i }), {})
      }
    };
  }

  return boards;
};
