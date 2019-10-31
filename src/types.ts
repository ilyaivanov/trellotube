export interface Item {
  text: string;
  videoId: string;
  imageUrl: string;
  id: string;
}

export interface Column {
  id: string;
  name: string;
  type: "PLAYLIST" | "SEARCH";
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
}

export interface BoardsContainer {
  [key: string]: Board;
}

export interface ApplicationState {
  boards: BoardsContainer;
  boardsOrder: string[];
  selectedBoard: string;
}
