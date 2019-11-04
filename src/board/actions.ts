import {Item} from "../types";
import {DropResult} from "react-beautiful-dnd";

export enum ACTIONS {
  REMOVE_COLUMN = "REMOVE_COLUMN",
  CREATE_COLUMN = "CREATE_COLUMN",
  SEARCH_DONE = "SEARCH_DONE",
  SELECT_BOARD = "SELECT_BOARD",
  RENAME_COLUMN = "RENAME_COLUMN",
  DRAG_END = "DRAG_END"
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

export type Action =
  | RemoveAction
  | CreateColumnAction
  | SelectBoard
  | RenameColumn
  | EndDrag
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

export const endDrag = (dropResult: DropResult): EndDrag => ({
  type: ACTIONS.DRAG_END,
  dropResult
});
