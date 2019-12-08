import {ApplicationState} from "./types";

export const getColumnsForSelectedBorder = (state: ApplicationState) => {
  return state.boards.items[state.selectedBoard].columnOrders;
};
