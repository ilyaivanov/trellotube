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

export type SidebarState = "search" | "board" | "similar";

export interface UserOptions {
  isLeftSidebarVisible: boolean;
  leftSidebarContentType: SidebarState;
}

export interface ApplicationState {
  userOptions: UserOptions;
  selectedBoard: string;
  searchResults: Item[];
  similarState: SimilarState;

  boards: BoardState;

  //handled in player
  itemBeingPlayed?: Item;
}
export interface SimilarState {
  items: Item[];
  isLoading: boolean;
}


//BOARDS
export interface BoardState {
  order: string[];
  items: BoardsContainer;
}
export interface BoardsContainer {
  [key: string]: Board;
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
