import {
  ApplicationState,
  Board,
  Column,
  Item,
  PlaylistItem
} from "./types";
import { initialState } from "./initialState";
import { createId } from "../infrastructure/utils";
import { append, prepend } from "../infrastructure/array";
import {
  getSelectedBoard,
  updateBoard,
  updateColumnInBoard,
  updateColumnInSelectedBoard
} from "./board.utils";
import { DropResult } from "react-beautiful-dnd";
import {
  loadPlaylistVideos,
  searchSimilar
} from "../infrastructure/networking/youtube";
import { findSimilarArtistsDone, topBarButtonPressed } from "../state";
import { handleDnd } from "./dnd";

const REMOVE_COLUMN = "REMOVE_COLUMN",
  CREATE_COLUMN = "CREATE_COLUMN",
  RENAME_COLUMN = "RENAME_COLUMN",
  DRAG_END = "DRAG_END",
  DONE_LOADING_PLAYLIST = "DONE_LOADING_PLAYLIST",
  RESET = "RESET";

export const removeColumn = (columnId: string) =>
  ({
    type: REMOVE_COLUMN,
    columnId
  } as const);

export interface CreateColumnConfig {
  fromStart: boolean;
  columnId: string;
  columnName: string;
  isLoading: boolean;
}

export const createColumn = (
  columnConfiguration: Partial<CreateColumnConfig> = {}
) =>
  ({
    type: CREATE_COLUMN,
    columnConfiguration
  } as const);

export const renameColumn = (columnId: string, newName: string) =>
  ({
    type: RENAME_COLUMN,
    columnId,
    newName
  } as const);

export const endDrag = (dropResult: DropResult) =>
  ({
    type: DRAG_END,
    dropResult
  } as const);

export const findSimilar = (videoId: string) => (
  dispatch: any,
  getState: () => ApplicationState
) => {
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

export const loadPlaylist = (item: PlaylistItem) => (dispatch: any) => {
  const id = createId();
  dispatch(
    createColumn({ columnName: item.text, columnId: id, fromStart: true })
  );

  loadPlaylistVideos(item.playlistId).then(({ items }) => {
    dispatch(doneLoadingPlaylist(id, items));
  });
};

export const reset = () =>
  ({
    type: RESET
  } as const);

export const doneLoadingPlaylist = (playlistId: string, items: Item[]) =>
  ({
    type: DONE_LOADING_PLAYLIST,
    items,
    playlistId
  } as const);

export type Action =
  | ReturnType<typeof renameColumn>
  | ReturnType<typeof createColumn>
  | ReturnType<typeof removeColumn>
  | ReturnType<typeof endDrag>
  | ReturnType<typeof reset>
  | ReturnType<typeof doneLoadingPlaylist>;

export const boardReducer = (
  state: ApplicationState,
  action: Action
): ApplicationState => {
  if (action.type === RESET) {
    return initialState();
  }
  if (action.type === REMOVE_COLUMN) {
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
  if (action.type === CREATE_COLUMN) {
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
  if (action.type === DONE_LOADING_PLAYLIST) {
    //TODO: this will trigger an error if I will select another board while playlist is being loaded
    return updateColumnInSelectedBoard(state, {
      id: action.playlistId,
      items: action.items
    });
  }

  if (action.type === RENAME_COLUMN) {
    return updateColumnInSelectedBoard(state, {
      id: action.columnId,
      name: action.newName
    });
  }
  if (action.type === DRAG_END) {
    return handleDnd(state, action.dropResult);
  }
  return state;
};

