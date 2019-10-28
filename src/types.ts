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
  searchItems: Item[];
  columns: ColumnContainer;
  columnOrders: string[];
}
