import { ApplicationState, Board, Column } from "../infrastructure/types";
import { Action, ACTIONS } from "./actions";
import { handleDnd } from "../infrastructure/operations";
import { initialState } from "../infrastructure/state/initialState";
import { createId } from "../infrastructure/utils";
import { append, prepend } from "../infrastructure/array";
import { getSelectedBoard } from "../infrastructure/board.utils";

export default (state: ApplicationState, action: Action): ApplicationState => {
  if (action.type === ACTIONS.RESET) {
    return initialState();
  }
  if (action.type === ACTIONS.REMOVE_COLUMN) {
    const selectedBoard = getSelectedBoard(state);
    const columns = {
      ...selectedBoard.columns
    };
    delete columns[action.columnId];
    const newBoard: Board = {
      ...selectedBoard,
      columnOrders: selectedBoard.columnOrders.filter(
        cc => cc !== action.columnId
      ),
      columns: columns
    };
    return updateBoard(state, newBoard);
  }
  if (action.type === ACTIONS.CREATE_COLUMN) {
    const selectedBoard = getSelectedBoard(state);
    const newColumn: Column = {
      items: [],
      name: action.columnConfiguration.columnName || "New Column",
      id: action.columnConfiguration.columnId || createId(),
      type: "PLAYLIST"
    };
    const orderModifier = action.columnConfiguration.fromStart
      ? prepend
      : append;
    const newBoard: Board = {
      ...selectedBoard,
      columnOrders: orderModifier(selectedBoard.columnOrders, newColumn.id)
    };
    return updateBoard(state, updateColumnInBoard(newBoard, newColumn));
  }
  if (action.type === ACTIONS.DONE_LOADING_PLAYLIST) {
    //TODO: this will trigger an error if I will select another board while playlist is being loaded
    return updateColumnInSelectedBoard(state, {
      id: action.playlistId,
      items: action.items
    });
  }

  if (action.type === ACTIONS.RENAME_COLUMN) {
    return updateColumnInSelectedBoard(state, {
      id: action.columnId,
      name: action.newName
    });
  }
  if (action.type === ACTIONS.DRAG_END) {
    return handleDnd(state, action.dropResult);
  }
  return state;
};

//REDUCER HELPERS (candidates for nested reducers)

const updateBoard = (state: ApplicationState, board: Board) => ({
  ...state,
  boards: {
    ...state.boards,
    [board.boardId]: board
  }
});

const updateColumnInBoard = (board: Board, column: Column): Board => ({
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
