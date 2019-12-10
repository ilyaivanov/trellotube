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
export { play } from "./player";
export { setItemsFor, setRightbarState, setRightbarVisibility } from "./menu";

export {
  selectBoard,
  getBoards,
  getSelectedBoard,
  endDrag,
  removeColumn,
  renameBoard,
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
  | ReturnType<typeof removeColumn>
  | ReturnType<typeof renameBoard>
  | ReturnType<typeof createBoard>
  | ReturnType<typeof play>
  | ReturnType<typeof selectBoard>;

export type AppDispatch = (action: Action) => void;

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
  const getMiddlewares = () => [thunk];

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
