import { ApplicationState } from "./types";

let _id = 100;
const id = () => _id++ + "";

export const initialState = (): ApplicationState => ({
  boards: {
    BOARD_1: {
      boardId: "BOARD_1",
      boardName: "My Board",
      boardOptions: {},
      columns: {
        "1": {
          id: "1",
          items: [
            {
              text: "Short name",
              id: id(),
              videoId: "1",
              imageUrl: "https://i.ytimg.com/vi/6Zo_FTUNDBI/mqdefault.jpg",
              type: "video"
            }
          ],
          name: "First",
          type: "PLAYLIST"
        },
        "2": {
          id: "2",
          items: [
            {
              text: "Title 2",
              id: "MY_VIDEO_ID",
              videoId: "YOUTUBE_ID",
              imageUrl: "",
              type: "video"
            }
          ],
          name: "Second",
          type: "PLAYLIST"
        },
        "3": {
          id: "3",
          items: [
            {
              text: "Album 1.1",
              id: id(),
              videoId: "1",
              imageUrl: "",
              type: "video"
            },
            {
              text: "Album 2.2",
              id: id(),
              videoId: "1",
              imageUrl: "",
              type: "video"
            },
            {
              text: "Album 3.3",
              id: id(),
              videoId: "1",
              imageUrl: "",
              type: "video"
            }
          ],
          name: "Third",
          type: "SEARCH"
        },
        SEARCH: {
          id: "SEARCH",
          items: [
            {
              text: "Title 2",
              id: "MY_VIDEO_ID_AT_SEARCH",
              videoId: "YOUTUBE_ID_AT_SEARCH",
              imageUrl: "",
              type: "video"
            }
          ],
          name: "SEARCH",
          type: "SEARCH"
        }
      },
      columnOrders: ["1", "2", "3"]
    },
    BOARD_2: {
      boardName: "ANOTHER BOARd",
      boardId: "BOARD_2",
      boardOptions: {},
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
  selectedBoard: "BOARD_1",
  userOptions: {
    isLeftSidebarVisible: false,
    leftSidebarContentType: "search"
  }
});
