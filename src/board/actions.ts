import { ApplicationState, Item } from "../types";
import { DropResult } from "react-beautiful-dnd";
import { createId } from "../shared/utils";
import { findSimilarArtistsDone, topBarButtonPressed } from "../menu/actions";
import { searchSimilar } from "../api/youtube";

export enum ACTIONS {
  REMOVE_COLUMN = "REMOVE_COLUMN",
  CREATE_COLUMN = "CREATE_COLUMN",
  SEARCH_DONE = "SEARCH_DONE",
  FIND_SIMILAR_START = "FIND_SIMILAR_START",
  FIND_SIMILAR_DONE = "FIND_SIMILAR_DONE",
  SELECT_BOARD = "SELECT_BOARD",
  RENAME_COLUMN = "RENAME_COLUMN",
  DRAG_END = "DRAG_END",
  CREATE_BOARD = "CREATE_BOARD",
  REMOVE_BOARD = "REMOVE_BOARD",
  RENAME_BOARD = "RENAME_BOARD",
  RESET = "RESET"
}

export interface RemoveAction {
  type: ACTIONS.REMOVE_COLUMN;
  columnId: string;
}

export interface RenameColumn {
  type: ACTIONS.RENAME_COLUMN;
  columnId: string;
  newName: string;
}

export interface SelectBoard {
  type: ACTIONS.SELECT_BOARD;
  boardId: string;
}

export interface CreateColumnAction {
  type: ACTIONS.CREATE_COLUMN;
}

export interface SearchDone {
  type: ACTIONS.SEARCH_DONE;
  items: Item[];
}

export interface EndDrag {
  type: ACTIONS.DRAG_END;
  dropResult: DropResult;
}

export interface CreateBoard {
  type: ACTIONS.CREATE_BOARD;
  boardId: string;
}
export interface RenameBoard {
  type: ACTIONS.RENAME_BOARD;
  boardId: string;
  newText: string;
}
export interface RemoveBoard {
  type: ACTIONS.REMOVE_BOARD;
  boardId: string;
}
export interface Reset {
  type: ACTIONS.RESET;
}

export type Action =
  | RemoveAction
  | CreateColumnAction
  | SelectBoard
  | RenameColumn
  | EndDrag
  | CreateBoard
  | RenameBoard
  | RemoveBoard
  | Reset
  | SearchDone;

export const removeColumn = (columnId: string) => ({
  type: ACTIONS.REMOVE_COLUMN,
  columnId
});

export const searchDone = (items: Item[]) => ({
  type: ACTIONS.SEARCH_DONE,
  items
});

export const createColumn = () => ({
  type: ACTIONS.CREATE_COLUMN
});

export const selectBoard = (boardId: string) => ({
  type: ACTIONS.SELECT_BOARD,
  boardId
});

export const renameColumn = (columnId: string, newName: string) => ({
  type: ACTIONS.RENAME_COLUMN,
  columnId,
  newName
});

export const createAndSelectNewBoard = (): CreateBoard => {
  const newID = createId();
  return {
    type: ACTIONS.CREATE_BOARD,
    boardId: newID
  };
};

export const endDrag = (dropResult: DropResult): EndDrag => ({
  type: ACTIONS.DRAG_END,
  dropResult
});

export const renameBoard = (
  boardId: string,
  boardName: string
): RenameBoard => ({
  type: ACTIONS.RENAME_BOARD,
  boardId,
  newText: boardName
});

export const removeBoard = (boardId: string): RemoveBoard => ({
  type: ACTIONS.REMOVE_BOARD,
  boardId
});

export const findSimilar = (videoId: string) => (
  dispatch: any,
  getState: () => ApplicationState
) => {
  dispatch({
    type: "FIND_SIMILAR_START"
  });

  const { userOptions } = getState();
  if (
    !userOptions.isLeftSidebarVisible ||
    userOptions.leftSidebarContentType !== "similar"
  )
    dispatch(topBarButtonPressed("similar"));

  setTimeout(() => {
    searchSimilar(videoId).then(({ items }) => {
      dispatch(findSimilarArtistsDone(items));
    });
  }, 1000);
};

export const reset = (): Reset => ({
  type: ACTIONS.RESET
});
