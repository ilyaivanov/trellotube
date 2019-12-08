import { combineReducers, createStore, Store } from "redux";

const SET_VISIBILITY = "SET_VISIBILITY";
const SELECT_BOARD = "SELECT_BOARD";

export const setSidebarVisibility = (isVisible: boolean) =>
  ({
    type: SET_VISIBILITY,
    isVisible
  } as const);

export const selectBoard = (boardId: string) =>
  ({
    type: SELECT_BOARD,
    boardId
  } as const);

type Action =
  | ReturnType<typeof setSidebarVisibility>
  | ReturnType<typeof selectBoard>;

const b: BoardsState = {
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

const boardsReducer = (boards = b, action: Action): BoardsState => {
  if (action.type === SELECT_BOARD) {
    return {
      ...boards,
      selectedBoard: action.boardId
    };
  }
  return boards;
};
const i: UserOptions = {
  isLestSidebarVisible: true
};
const optionsReducer = (options = i, action: Action): UserOptions => {
  if (action.type === SET_VISIBILITY) {
    return {
      ...options,
      isLestSidebarVisible: action.isVisible
    };
  }
  return options;
};

//no need for separate interface, use return type for combineReducers
interface AppState {
  userOptions: UserOptions;
  boardsState: BoardsState;
}

interface UserOptions {
  isLestSidebarVisible: boolean;
}

interface BoardsState {
  order: string[];
  selectedBoard: string;
  items: Container<Board>;
}

interface Board {
  name: string;
}

interface BoardViewModel extends Board {
  isSelected: boolean;
}
export interface Container<T> {
  [key: string]: T;
}

export const isLeftSidebarVisible = (state: AppState) =>
  state.userOptions.isLestSidebarVisible;

export const getBoards = (state: AppState): BoardViewModel[] =>
  state.boardsState.order.map(bId => ({
    ...state.boardsState.items[bId],
    isSelected: bId === state.boardsState.selectedBoard
  }));

export const createMyStore = (): Store<AppState, Action> => {
  const rootReducer = combineReducers({
    userOptions: optionsReducer,
    boardsState: boardsReducer
  });
  return createStore(rootReducer);
};
