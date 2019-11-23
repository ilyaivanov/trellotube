import { ApplicationState, Board, Column } from "../types";
import { Action } from "./actions";

export default (state: ApplicationState, action: Action): ApplicationState => {
  const selectedBoard = getSelectedBoard(state);

  console.log(action.type);
  if (action.type === "FIND_SIMILAR_DONE") {
    return updateBoard(
      state,
      updateColumnInBoard(selectedBoard, {
        id: "SIMILAR",
        items: action.items,
        type: "SIMILAR",
        name: "Similar"
      })
    );
  }
  return state;
};

//REDUCER HELPERS (candidates for nested reducers)
//TODO: remove duplication
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

export const getSelectedBoard = (state: ApplicationState) =>
  state.boards[state.selectedBoard];
