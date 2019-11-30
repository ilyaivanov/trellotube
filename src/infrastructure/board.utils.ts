import { ApplicationState } from "./types";

export const getItemsFor = (state: ApplicationState, columnId: string) => {
  if (columnId === "SEARCH") return state.searchResults;
  if (columnId === "SIMILAR") return state.similarState.items;
  return getSelectedBoard(state).columns[columnId].items;
};

export const getSelectedBoard = (state: ApplicationState) =>
  state.boards[state.selectedBoard];
