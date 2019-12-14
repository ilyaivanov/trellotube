import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store
} from "redux";
import {
  boardsReducer,
  endDrag,
  createColumn,
  removeColumn,
  renameColumn,
  removeBoard,
  renameBoard,
  createBoard,
  selectBoard
} from "./boards";
import {
  menuReducer,
  setItemsFor,
  setRightbarState,
  setRightbarVisibility
} from "./menu";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { play, playerReducer } from "./player";
import { apiMiddleware, makeApiCall } from "./apiMiddleware";
import { YoutubeSearchResponse } from "../infrastructure/networking/types";
export { play } from "./player";
export { setItemsFor, setRightbarState, setRightbarVisibility } from "./menu";

export {
  selectBoard,
  getBoards,
  getSelectedBoard,
  endDrag,
  removeColumn,
  renameBoard,
  removeBoard,
  createBoard,
  createColumn,
  renameColumn
} from "./boards";

export type Action =
  | ReturnType<typeof endDrag>
  | ReturnType<typeof setRightbarState>
  | ReturnType<typeof setRightbarVisibility>
  | ReturnType<typeof setItemsFor>
  | ReturnType<typeof createColumn>
  | ReturnType<typeof renameColumn>
  | ReturnType<typeof removeBoard>
  | ReturnType<typeof removeColumn>
  | ReturnType<typeof renameBoard>
  | ReturnType<typeof createBoard>
  | ReturnType<typeof play>
  | ReturnType<typeof makeApiCall>
  | ReturnType<typeof selectBoard>
  | SearchSimilarNetworkAction
  | SearchNetworkAction;

export type AppDispatch = (action: Action) => void;

interface SimilarSearchStartAction {
  type: "SEARCH_SIMILAR_START";
}
interface SimilarSearchErrorAction {
  type: "SEARCH_SIMILAR_ERROR";
}
interface SimilarSearchSuccessAction {
  type: "SEARCH_SIMILAR_SUCCESS";
  idPool: string[];
  body: YoutubeSearchResponse;
}

type SearchSimilarNetworkAction =
  | SimilarSearchStartAction
  | SimilarSearchErrorAction
  | SimilarSearchSuccessAction;

interface SearchStartAction {
  type: "SEARCH_START";
}
interface SearchErrorAction {
  type: "SEARCH_ERROR";
}
interface SearchSuccessAction {
  type: "SEARCH_SUCCESS";
  idPool: string[];
  body: YoutubeSearchResponse;
}

type SearchNetworkAction =
  | SearchStartAction
  | SearchErrorAction
  | SearchSuccessAction;

export const rootReducer = combineReducers({
  boardsState: boardsReducer,
  menu: menuReducer,
  player: playerReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export interface Container<T> {
  [key: string]: T;
}

export const isLeftSidebarVisible = (state: AppState) =>
  state.menu.isRightSidebarVisible;

export const createMyStore = (): Store<AppState, Action> => {
  return createStore(rootReducer);
};

const STORE_VERSION = "0.2";

export const createAppStore = (): Store<AppState, Action> => {
  const getMiddlewares = (): [] => [thunk, apiMiddleware] as any;

  const composeEnhancers =
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const blacklist: (keyof AppState)[] = ["player"];

  const persistedReducer = persistReducer(
    {
      key: `MY_CONFIGv${STORE_VERSION}`,
      blacklist,
      storage
    },
    rootReducer
  );

  return createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...getMiddlewares()))
  ) as any;
};
