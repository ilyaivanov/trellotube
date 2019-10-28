import { Board } from "./types";
import { useState } from "react";
let _id = 100;
const id = () => _id++ + "";

const initialState = (): Board => ({
  columns: {
    "1": {
      id: "1",
      items: [
        { text: "Album 1", id: id(), videoId: "1", imageUrl: "https://i.ytimg.com/vi/6Zo_FTUNDBI/mqdefault.jpg" },
        { text: "Album 2", id: id(), videoId: "1", imageUrl: "https://i.ytimg.com/vi/-xj2BmxEkcI/mqdefault.jpg" },
        { text: "Album 3", id: id(), videoId: "1", imageUrl: "https://i.ytimg.com/vi/ZchNI8bEnoY/mqdefault.jpg" }
      ],
      name: "First",
      type: "PLAYLIST"
    },
    "2": {
      id: "2",
      items: [
        { text: "Title 2", id: id(), videoId: "1", imageUrl: "" },
        { text: "Title 3", id: id(), videoId: "1", imageUrl: "" },
        { text: "Title 4", id: id(), videoId: "1", imageUrl: "" },
        { text: "Title 5", id: id(), videoId: "1", imageUrl: "" },
        { text: "Title 6", id: id(), videoId: "1", imageUrl: "" }
      ],
      name: "Second",
      type: "PLAYLIST"
    },
    "3": {
      id: "3",
      items: [
        { text: "Album 1.1", id: id(), videoId: "1", imageUrl: "" },
        { text: "Album 2.2", id: id(), videoId: "1", imageUrl: "" },
        { text: "Album 3.3", id: id(), videoId: "1", imageUrl: "" }
      ],
      name: "Third",
      type: "SEARCH"
    },
    SEARCH: {
      id: "SEARCH",
      items: [],
      name: "SEARCH",
      type: "SEARCH"
    }
  },
  searchItems: [],
  columnOrders: ["1", "2", "3"]
});

type Hook = [Board, (board: Board) => void];
export const useBoard = (): Hook => {
  return useState(initialState);
};
