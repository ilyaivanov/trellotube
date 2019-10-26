export interface Item {
  text: string;
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
  columns: ColumnContainer;
  columnOrders: string[];
}
