import { createStore, applyMiddleware } from "redux";
import boardReducer from "./board/reducer";
import playerReducer from "./player/reducer";
import menuReducer from "./menu/reducer";
import { initialState } from "./state";
import reduceReducers from "reduce-reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ApplicationState } from "./types"; // defaults to localStorage for web
import thunk from "redux-thunk";

//even if I provide default state, TS still argues that I need to handle undefined as input within reducer
// @ts-ignore
const rootReducer = reduceReducers(
  initialState(),
  boardReducer,
  playerReducer,
  menuReducer
);

const blacklist: (keyof ApplicationState)[] = ["itemBeingPlayed"];

export const persistedReducer = persistReducer(
  {
    key: "MY_CONFIG",
    blacklist,
    storage
  },
  rootReducer
);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);
export default { store, persistor };
