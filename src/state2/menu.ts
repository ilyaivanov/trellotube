import { Action } from "./index";
import { END_DROP, Item } from "./boards";
import { contains, remove, insert } from "./array";
import { mapYoutubeSimilarSearchResponse } from "../infrastructure/networking/youtube";

export const SET_EXTRA_ITEMS = "SET_EXTRA_ITEMS",
  SET_RIGHTBAR_STATE = "SET_RIGHTBAR_STATE",
  SET_RIGHTBAR_VISIBILITY = "SET_RIGHTBAR_VISIBILITY";

export enum ExtraColumn {
  SEARCH = "SEARCH",
  SIMILAR = "SIMILAR"
}

export const setItemsFor = (columnType: ExtraColumn, items: Item[]) =>
  ({
    type: SET_EXTRA_ITEMS,
    payload: { columnType, items }
  } as const);

export const setRightbarState = (state: RightSidebarState) =>
  ({
    type: SET_RIGHTBAR_STATE,
    payload: state
  } as const);

export const setRightbarVisibility = (isVisible: boolean) =>
  ({
    type: SET_RIGHTBAR_VISIBILITY,
    payload: isVisible
  } as const);

const initialState: MenuOptions = {
  extraColumns: {},
  isRightSidebarVisible: true,
  rightSidebarState: "SEARCH",
  isSimilarLoading: false,
  isSearchLoading: false
};

interface MenuOptions {
  extraColumns: {
    [key: string]: string[];
  };
  isRightSidebarVisible: boolean;
  rightSidebarState: RightSidebarState;
  isSimilarLoading: boolean;
  isSearchLoading: boolean;
}

export type RightSidebarState = "SEARCH" | "SIMILAR" | "BOARDS";

export const menuReducer = (
  options = initialState,
  action: Action
): MenuOptions => {
  if (action.type === SET_EXTRA_ITEMS) {
    return {
      ...options,
      extraColumns: {
        ...options.extraColumns,
        [action.payload.columnType]: action.payload.items.map(i => i.id)
      }
    };
  }
  if (action.type === SET_RIGHTBAR_STATE) {
    return {
      ...options,
      rightSidebarState: action.payload,
      isRightSidebarVisible: true
    };
  }
  if (action.type === SET_RIGHTBAR_VISIBILITY) {
    return {
      ...options,
      isRightSidebarVisible: action.payload
    };
  }

  if (action.type === "SEARCH_SIMILAR_START") {
    return {
      ...options,
      isSimilarLoading: true
    };
  }

  if (action.type === "SEARCH_SIMILAR_SUCCESS") {
    return {
      ...options,
      isSimilarLoading: false,
      extraColumns: {
        ...options.extraColumns,
        [ExtraColumn.SIMILAR]: mapYoutubeSimilarSearchResponse(
          action.body,
          action.idPool
        ).map(i => i.id)
      }
    };
  }

  if (action.type === "SEARCH_START") {
    return {
      ...options,
      isSearchLoading: true
    };
  }

  if (action.type === "SEARCH_SUCCESS") {
    return {
      ...options,
      isSearchLoading: false,
      extraColumns: {
        ...options.extraColumns,
        [ExtraColumn.SEARCH]: mapYoutubeSimilarSearchResponse(
          action.body,
          action.idPool
        ).map(i => i.id)
      }
    };
  }

  if (action.type === "SEARCH_ERROR") {
    return {
      ...options,
      isSearchLoading: false
    };
  }

  if (action.type === END_DROP) {
    const { source, destination, draggableId } = action.payload;
    let newOptions = options;
    if (contains(Object.values(ExtraColumn), source.droppableId)) {
      newOptions = {
        ...options,
        extraColumns: {
          ...options.extraColumns,
          [source.droppableId]: remove(
            options.extraColumns[source.droppableId],
            source.index
          )
        }
      };
    }
    if (
      destination &&
      contains(Object.values(ExtraColumn), destination.droppableId)
    ) {
      newOptions = {
        ...newOptions,
        extraColumns: {
          ...newOptions.extraColumns,
          [destination.droppableId]: insert(
            newOptions.extraColumns[destination.droppableId],
            destination.index,
            draggableId
          )
        }
      };
    }
    return newOptions;
  }
  return options;
};
