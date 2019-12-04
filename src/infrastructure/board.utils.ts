import { ApplicationState } from "./types";

export const getItemsFor = (state: ApplicationState, columnId: string) => {
  if (columnId === "SEARCH") return state.searchResults;
  if (columnId === "SIMILAR") return state.similarState.items;
  const boardId = getBoardWithColumn(state, columnId);
  return state.boards[boardId].columns[columnId].items;
};

export const getSelectedBoard = (state: ApplicationState) =>
  state.boards[state.selectedBoard];

export const getBoardWithColumn = (
  state: ApplicationState,
  columnId: string
): string =>
  state.boardsOrder.find(
    boardId => state.boards[boardId].columnOrders.indexOf(columnId) >= 0
  ) as string;
