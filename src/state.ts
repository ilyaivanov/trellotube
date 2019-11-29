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
            },
            {
              text: "Some Playlist",
              id: "MY_PLAYLIST_ID",
              videoId: "YOUTUBE_PLAYLIST_ID",
              imageUrl: "",
              type: "playlist"
            }
          ],
          name: "Second",
          type: "PLAYLIST"
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
      columnOrders: ["1", "2"]
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
