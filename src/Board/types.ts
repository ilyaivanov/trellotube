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

export interface Board {
  columns: {
    [key: string]: Column;
  };
  columnOrders: string[];
}
