import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store
} from "redux";
import { optionsReducer, setSidebarVisibility } from "./userOptions";
import { boardsReducer, endDrag, selectBoard } from "./boards";
import {
  menuReducer,
  setItemsFor,
  setRightbarState,
  setRightbarVisibility
} from "./menu";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
export { setItemsFor, setRightbarState, setRightbarVisibility } from "./menu";
export { selectBoard, getBoards, getSelectedBoard, endDrag } from "./boards";
export { setSidebarVisibility } from "./userOptions";

export type Action =
  | ReturnType<typeof setSidebarVisibility>
  | ReturnType<typeof endDrag>
  | ReturnType<typeof setRightbarState>
  | ReturnType<typeof setRightbarVisibility>
  | ReturnType<typeof setItemsFor>
  | ReturnType<typeof selectBoard>;

export type AppDispatch = (action: Action) => void;

export const rootReducer = combineReducers({
  userOptions: optionsReducer,
  boardsState: boardsReducer,
  menu: menuReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export interface Container<T> {
  [key: string]: T;
}

export const isLeftSidebarVisible = (state: AppState) =>
  state.userOptions.isLestSidebarVisible;

export const createMyStore = (): Store<AppState, Action> => {
  return createStore(rootReducer);
};

const STORE_VERSION = "0.2";

export const createAppStore = (): Store<AppState, Action> => {
  const getMiddlewares = () => [thunk];

  // @ts-ignore
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const blacklist: (keyof AppState)[] = [];
  // const blacklist: (keyof AppState)[] = ["itemBeingPlayed"];

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
