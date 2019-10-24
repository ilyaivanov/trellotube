import { Board } from "./Board/types";
import { useState } from "react";
let _id = 1;
const id = () => _id++ + "";

const initialState = (): Board => ({
  columns: {
    "1": {
      id: "1",
      items: [
        { text: "Album 1", id: id() },
        { text: "Album 2", id: id() },
        { text: "Album 3", id: id() }
      ],
      name: "First",
      type: "PLAYLIST"
    },
    "2": {
      id: "2",
      items: [
        { text: "Title 2", id: id() },
        { text: "Title 3", id: id() },
        { text: "Title 4", id: id() },
        { text: "Title 5", id: id() },
        { text: "Title 6", id: id() }
      ],
      name: "Second",
      type: "PLAYLIST"
    },
    "3": {
      id: "3",
      items: [
        { text: "Album 1.1", id: id() },
        { text: "Album 2.2", id: id() },
        { text: "Album 3.3", id: id() }
      ],
      name: "Third",
      type: "SEARCH"
    }
  },
  columnOrders: ["1", "2", "3"]
});

type Hook = [Board, (board: Board) => void];
export const useBoard = (): Hook => {
  return useState(initialState);
};
