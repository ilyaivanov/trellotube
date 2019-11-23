export interface Item {
  text: string;
  videoId: string;
  imageUrl: string;
  id: string;
}

export interface Column {
  id: string;
  name: string;
  type: "PLAYLIST" | "SEARCH" | "SIMILAR";
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
}
