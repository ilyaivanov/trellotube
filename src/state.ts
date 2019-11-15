import { ApplicationState } from "./types";
import { useState } from "react";

let _id = 100;
const id = () => _id++ + "";

export const initialState = (): ApplicationState => ({
  boards: {
    BOARD_1: {
      boardId: "BOARD_1",
      boardName: "My Board",
      columns: {
        "1": {
          id: "1",
          items: [
            {
              text: "Short name",
              id: id(),
              videoId: "1",
              imageUrl: "https://i.ytimg.com/vi/6Zo_FTUNDBI/mqdefault.jpg"
            },
            {
              text: "Two lines of text but not that long",
              id: id(),
              videoId: "1",
              imageUrl: "https://i.ytimg.com/vi/-xj2BmxEkcI/mqdefault.jpg"
            },
            {
              text: "A very-very long text with lots of redundant infomation",
              id: id(),
              videoId: "1",
              imageUrl: "https://i.ytimg.com/vi/ZchNI8bEnoY/mqdefault.jpg"
            }
          ],
          name: "First",
          type: "PLAYLIST"
        },
        "2": {
          id: "2",
          items: [
            { text: "Title 2", id: 'MY_VIDEO_ID', videoId: "YOUTUBE_ID", imageUrl: "" },
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
          items: [{ text: "Title 2", id: 'MY_VIDEO_ID_AT_SEARCH', videoId: "YOUTUBE_ID_AT_SEARCH", imageUrl: "" },],
          name: "SEARCH",
          type: "SEARCH"
        }
      },
      columnOrders: ["1", "2", "3"]
    },
    BOARD_2: {
      boardName: "ANOTHER BOARd",
      boardId: "BOARD_2",
      columns: {
        SEARCH: {
          id: "SEARCH",
          items: [],
          name: "SEARCH",
          type: "SEARCH"
        }
      },
      columnOrders: []
    }
  },
  boardsOrder: ["BOARD_1", "BOARD_2"],
  selectedBoard: "BOARD_1"
});

type Hook = [ApplicationState, (appState: ApplicationState) => void];
let isFirstRender = false;
export const useBoard = (): Hook => {
  let initial = initialState();
  if (!isFirstRender) {
    isFirstRender = true;
    const storage = localStorage.getItem("MY_STORAGE");
    if (storage) {
      initial = JSON.parse(storage) as ApplicationState;
    }
  }
  const [app, setApp] = useState(initial);
  const onAppStateUpdate = (app: ApplicationState) => {
    localStorage.setItem("MY_STORAGE", JSON.stringify(app));
    setApp(app);
  };
  return [app, onAppStateUpdate];
};
