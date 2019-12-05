import { ApplicationState, Item } from "./types";

export const getItemsFor = (
  state: ApplicationState,
  columnId: string
): Item[] => {
  if (columnId === "SEARCH") return state.searchResults;
  if (columnId === "SIMILAR") return state.similarState.items;
  const boardId = getBoardWithColumn(state, columnId);
  if (boardId) return state.boards[boardId].columns[columnId].items;
  else return [];
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
