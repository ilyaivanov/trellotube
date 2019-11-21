import { createStore } from "redux";
import boardReducer from "./board/reducer";
import playerReducer from "./player/reducer";
import { initialState } from "./state";
import reduceReducers from "reduce-reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

//even if I provide default state, TS still argues that I need to handle undefined as input within reducer
// @ts-ignore
const rootReducer = reduceReducers(initialState(), boardReducer, playerReducer);

const persistedReducer = persistReducer(
  {
    key: "MY_CONFIG",
    blacklist: ["videoBeingPlayed"],
    storage
  },
  rootReducer
);

export const store = createStore(persistedReducer);
const persistor = persistStore(store);
export default { store, persistor };
