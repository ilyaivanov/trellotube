import { Action, AppState } from "./index";
import { Store } from "redux";
import {createId} from "../infrastructure/utils";

const API_CALL = "API_CALL";

interface ApiCallConfig {
  url: string;
  props: {};
  onSuccess: string;
  onStart: string;
  onError: string;
}

export const makeApiCall = (config: ApiCallConfig) =>
  ({
    type: API_CALL,
    payload: config
  } as const);


export const apiMiddleware = (store: Store<AppState, Action>) => (
  next: (action: any) => void
) => (action: Action) => {
  next(action);
  if (action && action.type === API_CALL) {
    const { url, props, onSuccess, onError, onStart } = action.payload;
    next({ type: onStart });
    fetch(formatUrl(url, props))
      .then(res => res.json())
      .then(json =>
        next({
          type: onSuccess,
          body:  json,
          idPool: createIdPool(20)
        })
      )
      .catch(res => next({ type: onError, error: res }));
  }
};

const parseProps = (props: any): string => {
  return Object.keys(props)
    .filter(key => typeof props[key] !== "undefined")
    .map(key => `${key}=${props[key]}`)
    .join("&");
};

const formatUrl = (base: string, props: {}) => `${base}?${parseProps(props)}`;

const createIdPool = (count: number) =>
  Array.from(Array(count)).map(() => createId());
