import { Action, AppState, Container } from "./index";
import { DropResult } from "react-beautiful-dnd";
import { handleDrop } from "./dnd";
import { ExtraColumn, SET_EXTRA_ITEMS } from "./menu";
import { removeItem } from "./array";
import { createId } from "../infrastructure/utils";
export const SELECT_BOARD = "SELECT_BOARD",
  REMOVE_COLUMN = "REMOVE_COLUMN",
  RENAME_COLUMN = "RENAME_COLUMN",
  RENAME_BOARD = "RENAME_BOARD",
  REMOVE_BOARD = "REMOVE_BOARD",
  CREATE_BOARD = "CREATE_BOARD",
  CREATE_COLUMN = "CREATE_COLUMN",
  END_DROP = "END_DROP";

export const selectBoard = (boardId: string) =>
  ({
    type: SELECT_BOARD,
    payload: boardId
  } as const);

export const endDrag = (dropResult: DropResult) =>
  ({
    type: END_DROP,
    payload: dropResult
  } as const);

export const createColumn = (options: { name: string }) =>
  ({
    type: CREATE_COLUMN,
    payload: {
      ...options,
      id: createId()
    }
  } as const);

export const removeColumn = (columnId: string) =>
  ({
    type: REMOVE_COLUMN,
    payload: columnId
  } as const);

export const renameColumn = (columnId: string, newName: string) =>
  ({
    type: RENAME_COLUMN,
    payload: { columnId, newName }
  } as const);

export const renameBoard = (boardId: string, newName: string) =>
  ({
    type: RENAME_BOARD,
    payload: { boardId, newName }
  } as const);

export const removeBoard = (boardId: string) =>
  ({
    type: REMOVE_BOARD,
    payload: boardId
  } as const);

export const createBoard = (newName: string) =>
  ({
    type: CREATE_BOARD,
    payload: { id: createId(), newName }
  } as const);

export interface BoardsState {
  boardsOrder: string[];
  selectedBoard: string;
  boards: Container<Board>;
  columns: Container<Column>;
  items: Container<Item>;
}

export const getBoards = (state: AppState): BoardViewModel[] =>
  state.boardsState.boardsOrder.map(bId => ({
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
export interface VideoItem {
  id: string;
  name: string;
  videoId: string;
  type: "video";
  imageUrl: string;
}
export interface PlaylistItem {
  id: string;
  name: string;
  playlistId: string;
  type: "playlist";
  imageUrl: string;
}
export type Item = VideoItem | PlaylistItem;

const initialState: BoardsState = {
  boardsOrder: ["1", "2"],
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
      type: "video",
      videoId: "b5SSHK-mIF8"
    },
    "11": {
      id: "11",
      name: "Stack2 - First Item",
      imageUrl: "https://i.ytimg.com/vi/b5SSHK-mIF8/mqdefault.jpg",
      type: "video",
      videoId: "b5SSHK-mIF8"
    },
    "12": {
      id: "12",
      name: "Stack2 - Second Item",
      imageUrl: "https://i.ytimg.com/vi/b5SSHK-mIF8/mqdefault.jpg",
      type: "video",
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

export interface StackViewModel extends BaseViewModel {
  items: ItemViewModel[];
}
export interface ItemViewModel extends BaseViewModel {
  itemDetails: Item;
  isPlaying?: boolean;
}

export interface BoardDetailsViewModel extends BaseViewModel {
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
          itemDetails: state.boardsState.items[id],
          name: state.boardsState.items[id].name,
          isPlaying: state.player.itemBeingPlayed === id,
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
        itemDetails: state.boardsState.items[id],
        name: state.boardsState.items[id].name,
        isPlaying: state.player.itemBeingPlayed === id,
        id
      }))
    : [];

export const boardsReducer = (
  state = initialState,
  action: Action
): BoardsState => {
  if (action.type === SELECT_BOARD) {
    return {
      ...state,
      selectedBoard: action.payload
    };
  }
  if (action.type === END_DROP) {
    return handleDrop(state, action.payload);
  }

  if (action.type === REMOVE_COLUMN) {
    return {
      ...state,
      boards: {
        ...state.boards,
        [state.selectedBoard]: {
          ...state.boards[state.selectedBoard],
          stacks: removeItem(
            state.boards[state.selectedBoard].stacks,
            action.payload
          )
        }
      }
    };
  }
  if (action.type === CREATE_COLUMN) {
    return {
      ...state,
      boards: {
        ...state.boards,
        [state.selectedBoard]: {
          ...state.boards[state.selectedBoard],
          stacks: state.boards[state.selectedBoard].stacks.concat([
            action.payload.id
          ])
        }
      },
      columns: {
        ...state.columns,
        [action.payload.id]: {
          ...action.payload,
          items: []
        }
      }
    };
  }
  if (action.type === RENAME_COLUMN) {
    return {
      ...state,
      columns: {
        ...state.columns,
        [action.payload.columnId]: {
          ...state.columns[action.payload.columnId],
          name: action.payload.newName
        }
      }
    };
  }

  if (action.type === RENAME_BOARD) {
    return {
      ...state,
      boards: {
        ...state.boards,
        [action.payload.boardId]: {
          ...state.boards[action.payload.boardId],
          name: action.payload.newName
        }
      }
    };
  }

  //TODO: handle create board
  //TODO: write specs and imp for removing board. Import "select next board" logic
  //TODO: considering using some mutation helping library
  if (action.type === SET_EXTRA_ITEMS) {
    return {
      ...state,
      items: {
        ...state.items,
        ...action.payload.items.reduce((o, i) => ({ ...o, [i.id]: i }), {})
      }
    };
  }

  if (action.type === CREATE_BOARD) {
    console.log("foo");
    return {
      ...state,
      boards: {
        [action.payload.id]: {
          name: action.payload.newName,
          stacks: []
        }
      },
      selectedBoard: action.payload.id
    };
  }

  if (action.type === REMOVE_BOARD) {
    const cope = {
      ...state,
      boards: {
        ...state.boards
      }
    };
    delete cope.boards[action.payload];
    cope.boardsOrder = removeItem(cope.boardsOrder, action.payload);
    cope.selectedBoard = cope.boardsOrder[0];
    return cope;
  }

  return state;
};
