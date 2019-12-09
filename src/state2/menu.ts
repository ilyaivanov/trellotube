import { Action } from "./index";
import { Item } from "./boards";

export const SET_EXTRA_ITEMS = "SET_EXTRA_ITEMS";

export type ExtraColumn = "SEARCH" | "SIMILAR";

export const setItemsFor = (columnType: ExtraColumn, items: Item[]) =>
  ({
    type: SET_EXTRA_ITEMS,
    columnType,
    items
  } as const);

const initialState: MenuOptions = {
  extraColumns: {}
};

interface MenuOptions {
  extraColumns: {
    [key: string]: string[];
  };
}

export const menuReducer = (
  options = initialState,
  action: Action
): MenuOptions => {
  if (action.type === SET_EXTRA_ITEMS) {
    return {
      ...options,
      extraColumns: {
        ...options.extraColumns,
        [action.columnType]: action.items.map(i => i.id)
      }
    };
  }
  return options;
};
