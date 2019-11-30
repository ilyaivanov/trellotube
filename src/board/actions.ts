import { ApplicationState, Item } from "../infrastructure/types";
import { DropResult } from "react-beautiful-dnd";
import { createId } from "../infrastructure/utils";
import { findSimilarArtistsDone, topBarButtonPressed } from "../menu/actions";
import { loadPlaylistVideos, searchSimilar } from "../infrastructure/networking/youtube";

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
  CREATE_YOUTUBE_PLAYLIST = "CREATE_YOUTUBE_PLAYLIST",
  DONE_LOADING_PLAYLIST = "DONE_LOADING_PLAYLIST",
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

export interface CreateColumnConfig {
  fromStart: boolean;
  columnId: string;
  columnName: string;
  isLoading: boolean;
}

export interface CreateColumnAction {
  type: ACTIONS.CREATE_COLUMN;
  columnConfiguration: Partial<CreateColumnConfig>;
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
export interface DoneLoadingPlaylist {
  type: ACTIONS.DONE_LOADING_PLAYLIST;
  items: Item[];
  playlistId: string;
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
  | DoneLoadingPlaylist
  | SearchDone;

export const removeColumn = (columnId: string) => ({
  type: ACTIONS.REMOVE_COLUMN,
  columnId
});

export const searchDone = (items: Item[]) => ({
  type: ACTIONS.SEARCH_DONE,
  items
});

export const createColumn = (
  columnConfiguration: Partial<CreateColumnConfig> = {}
): CreateColumnAction => ({
  type: ACTIONS.CREATE_COLUMN,
  columnConfiguration
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

  searchSimilar(videoId).then(({ items }) => {
    dispatch(findSimilarArtistsDone(items));
  });
};

export const loadPlaylist = (item: Item) => (dispatch: any) => {
  const id = createId();
  dispatch(
    createColumn({ columnName: item.text, columnId: id, fromStart: true })
  );

  loadPlaylistVideos(item.videoId).then(({ items }) => {
    dispatch(doneLoadingPlaylist(id, items));
  });
};

export const reset = (): Reset => ({
  type: ACTIONS.RESET
});

export const doneLoadingPlaylist = (
  playlistId: string,
  items: Item[]
): DoneLoadingPlaylist => ({
  type: ACTIONS.DONE_LOADING_PLAYLIST,
  items,
  playlistId
});
