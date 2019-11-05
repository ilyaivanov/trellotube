import { ApplicationState, Board, Column } from "../types";
import { Action, ACTIONS } from "./actions";
import { handleDnd } from "../operations";

export default (state: ApplicationState, action: Action) => {
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
      name: "New Column",
      //TODO: extract into separate file and use a getter id generator
      id: Math.random() + "",
      type: "PLAYLIST"
    };
    return updateBoard(state, {
      ...selectedBoard,
      columnOrders: selectedBoard.columnOrders.concat([newColumn.id]),
      columns: {
        ...selectedBoard.columns,
        [newColumn.id]: newColumn
      }
    });
  }
  if (action.type === ACTIONS.SEARCH_DONE) {
    const selectedBoard = getSelectedBoard(state);
    return updateBoard(state, {
      ...selectedBoard,
      columns: {
        ...selectedBoard.columns,
        SEARCH: {
          ...selectedBoard.columns["SEARCH"],
          items: action.items
        }
      }
    });
  }
  if (action.type === ACTIONS.SELECT_BOARD) {
    return {
      ...state,
      selectedBoard: action.boardId
    };
  }
  if (action.type === ACTIONS.RENAME_COLUMN) {
    const selectedBoard = getSelectedBoard(state);
    return updateBoard(state, {
      ...selectedBoard,
      columns: {
        ...selectedBoard.columns,
        [action.columnId]: {
          ...selectedBoard.columns[action.columnId],
          name: action.newName
        }
      }
    });
  }
  if (action.type === ACTIONS.DRAG_END) {
    //TODO: try to cover full cycle with specs
    //probably trigger action in unit tests and check DOM state.
    //there is no way right now to trigger dnd from DOM
    const selectedBoard = getSelectedBoard(state);
    return updateBoard(state, handleDnd(selectedBoard, action.dropResult));
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

//SELECTOR CANDIDATES
export const getSelectedBoard = (state: ApplicationState) =>
  state.boards[state.selectedBoard];

export const getColumnsForSelectedBoard = (
  state: ApplicationState
): Column[] => {
  const board = getSelectedBoard(state);
  return board.columnOrders.map(id => board.columns[id]);
};
