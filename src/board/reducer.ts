import { ApplicationState, Board, BoardsContainer, Column } from "../types";
import { Action, ACTIONS } from "./actions";
import { handleDnd } from "../operations";
import { initialState } from "../state";
import { createId } from "../shared/utils";

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
      name: "New Column",
      id: createId(),
      type: "PLAYLIST"
    };
    const newBoard: Board = {
      ...selectedBoard,
      columnOrders: selectedBoard.columnOrders.concat([newColumn.id])
    };
    return updateBoard(state, updateColumnInBoard(newBoard, newColumn));
  }
  if (action.type === ACTIONS.SEARCH_DONE) {
    const selectedBoard = getSelectedBoard(state);
    const newSearch: Column = {
      ...selectedBoard.columns["SEARCH"],
      items: action.items
    };
    return updateBoard(state, updateColumnInBoard(selectedBoard, newSearch));
  }
  if (action.type === ACTIONS.SELECT_BOARD) {
    return {
      ...state,
      selectedBoard: action.boardId
    };
  }
  if (action.type === ACTIONS.RENAME_COLUMN) {
    const selectedBoard = getSelectedBoard(state);
    const newColumn = {
      ...selectedBoard.columns[action.columnId],
      name: action.newName
    };
    return updateBoard(state, updateColumnInBoard(selectedBoard, newColumn));
  }
  if (action.type === ACTIONS.DRAG_END) {
    //TODO: try to cover full cycle with specs
    //probably trigger action in unit tests and check DOM state.
    //there is no way right now to trigger dnd from DOM
    const selectedBoard = getSelectedBoard(state);
    return updateBoard(state, handleDnd(selectedBoard, action.dropResult));
  }
  if (action.type === ACTIONS.CREATE_BOARD) {
    return {
      ...state,
      boardsOrder: state.boardsOrder.concat([action.boardId]),
      boards: createDefaultBoard(state.boards, action.boardId),
      selectedBoard: action.boardId
    };
  }
  if (action.type === ACTIONS.RENAME_BOARD) {
    return updateBoard(state, {
      ...state.boards[action.boardId],
      boardName: action.newText
    });
  }
  if (action.type === ACTIONS.REMOVE_BOARD) {
    const boards = state.boards;
    //TODO: warning mutation
    delete boards[action.boardId];

    return {
      ...state,
      boardsOrder: state.boardsOrder.filter(b => b !== action.boardId),
      selectedBoard: selectOtherBoard(
        state.boardsOrder,
        state.selectedBoard,
        action.boardId
      ),
      boards
    };
  }
  return state;
};

const selectOtherBoard = (
  boards: string[],
  selectedBoard: string,
  boardBeingRemoved: string
) => {
  if (selectedBoard !== boardBeingRemoved) return selectedBoard;
  return boards.filter(b => b !== selectedBoard)[0];
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

const createDefaultBoard = (boards: BoardsContainer, boardId: string) => {
  const newBoard: Board = JSON.parse(
    //TODO: Extract into separate function without ugly BOARD_2
    JSON.stringify(initialState().boards["BOARD_2"])
  );
  newBoard.boardName = "New Board";
  newBoard.boardId = boardId;
  return {
    ...boards,
    [boardId]: newBoard
  };
};

//SELECTOR CANDIDATES
export const getSelectedBoard = (state: ApplicationState) =>
  state.boards[state.selectedBoard];

export const getColumnsForSelectedBoard = (
  state: ApplicationState
): Column[] => {
  const board = getSelectedBoard(state);
  if (!board) {
    return [];
  }
  return board.columnOrders.map(id => board.columns[id]);
};
