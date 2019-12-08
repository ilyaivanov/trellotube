import { createStore, applyMiddleware, compose, Store } from "redux";
import { boardReducer } from "./boardState";
import { playerReducer } from "./playerState";
import { menuReducer } from "./menuState";
import { initialState } from "./initialState";
import reduceReducers from "reduce-reducers";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ApplicationState } from "./types"; // defaults to localStorage for web
import thunk from "redux-thunk";

const STORE_VERSION = "0.1";

export const createReducer = (initialState: ApplicationState) =>
  //even if I provide default state, TS still argues that I need to handle undefined as input within reducer
  // @ts-ignore
  reduceReducers(initialState, boardReducer, playerReducer, menuReducer);

export const getMiddlewares = () => [thunk];

export const createTrelloTubeStore = (): Store<ApplicationState> => {
  const rootReducer = createReducer(initialState());

  const composeEnhancers: typeof compose =
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const blacklist: (keyof ApplicationState)[] = ["itemBeingPlayed"];

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
