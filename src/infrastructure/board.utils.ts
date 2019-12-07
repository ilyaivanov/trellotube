import { ApplicationState, Board, Column, Item } from "./types";

export const getItemsFor = (
  state: ApplicationState,
  columnId: string
): Item[] => {
  if (columnId === "SEARCH") return state.searchResults;
  if (columnId === "SIMILAR") return state.similarState.items;
  const boardId = getBoardWithColumn(state, columnId);
  if (boardId) return state.boards.items[boardId].columns[columnId].items;
  else return [];
};

export const getSelectedBoard = (state: ApplicationState) => {
  console.log(state.boards);
  return state.boards.items[state.selectedBoard];
};

export const getBoardWithColumn = (
  state: ApplicationState,
  columnId: string
): string =>
  state.boards.order.find(
    boardId => state.boards.items[boardId].columnOrders.indexOf(columnId) >= 0
  ) as string;

export const updateBoard = (
  state: ApplicationState,
  board: Board
): ApplicationState => ({
  ...state,
  boards: {
    ...state.boards,
    items: {
      ...state.boards.items,
      [board.boardId]: board
    }
  }
});

export const updateColumnInBoard = (board: Board, column: Column): Board => ({
  ...board,
  columns: {
    ...board.columns,
    [column.id]: column
  }
});

type PartialColumnWithId = Partial<Column> & { id: string };
export const updateColumnInSelectedBoard = (
  state: ApplicationState,
  column: PartialColumnWithId
) => {
  const selectedBoard = getSelectedBoard(state);
  return updateBoard(
    state,
    updateColumnInBoard(selectedBoard, {
      ...selectedBoard.columns[column.id],
      ...column
    })
  );
};

//SELECTOR CANDIDATES
export const getColumnsForSelectedBoard = (
  state: ApplicationState
): Column[] => {
  const board = getSelectedBoard(state);
  if (!board) {
    return [];
  }
  return board.columnOrders.map(id => board.columns[id]);
};
