import { combineReducers, createStore, Store } from "redux";
import { optionsReducer, setSidebarVisibility } from "./userOptions";
import {boardsReducer, selectBoard} from "./boards";
export { selectBoard, getBoards, getSelectedBoard } from "./boards";
export { setSidebarVisibility } from "./userOptions";

export type Action =
  | ReturnType<typeof setSidebarVisibility>
  | ReturnType<typeof selectBoard>;

const rootReducer = combineReducers({
  userOptions: optionsReducer,
  boardsState: boardsReducer
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
