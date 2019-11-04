import { createStore } from "redux";
import boardReducer from "./board/reducer";
import playerReducer from "./player/reducer";
import { initialState } from "./state";
import reduceReducers from "reduce-reducers";

//even if I provide default state, TS still argues that I need to handle undefined as input within reducer
// @ts-ignore
const reducers = reduceReducers(initialState(), boardReducer, playerReducer);

export const store = createStore(reducers, initialState());
