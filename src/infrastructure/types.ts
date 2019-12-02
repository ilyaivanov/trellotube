export type ItemType = "video" | "playlist" | "channel";
interface BaseItem {
  text: string;
  videoId: string;
  imageUrl: string;
  id: string;
  type: ItemType;
}

export interface VideoItem extends BaseItem {
  type: "video";
  videoId: string;
}

export interface PlaylistItem extends BaseItem {
  type: "playlist";
  playlistId: string;
}

export type Item = VideoItem | PlaylistItem;

export interface Column {
  id: string;
  name: string;
  type: "PLAYLIST";
  items: Item[];
}

export interface ColumnContainer {
  [key: string]: Column;
}

export interface Board {
  boardId: string;
  boardName: string;
  columns: ColumnContainer;
  columnOrders: string[];
  boardOptions: BoardOptions;
}

export interface BoardOptions {
  isLoadingSimilar?: boolean;
}

export interface BoardsContainer {
  [key: string]: Board;
}

export type SidebarState = "search" | "board" | "similar";

export interface UserOptions {
  isLeftSidebarVisible: boolean;
  leftSidebarContentType: SidebarState;
}

export interface ApplicationState {
  userOptions: UserOptions;
  boards: BoardsContainer;
  boardsOrder: string[];
  selectedBoard: string;
  itemBeingPlayed?: Item;
  searchResults: Item[];
  similarState: SimilarState;
}
export interface SimilarState {
  items: Item[];
  isLoading: boolean;
}
