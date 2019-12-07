import { ApplicationState } from "../types";

// @ts-ignore
export const initialState = (): ApplicationState => ({
  boards: {
    items: {
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
                id: "Column1 Video1",
                videoId: "Column1 Video1 YoutubeLink",
                imageUrl: "https://i.ytimg.com/vi/6Zo_FTUNDBI/mqdefault.jpg",
                type: "video"
              },
              {
                text: "Short name",
                id: "Column1 Video2",
                videoId: "Column1 Video2 YoutubeLink",
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
              //@ts-ignore
              {
                text: "Some Playlist",
                id: "MY_PLAYLIST_ID",
                playlistId: "YOUTUBE_PLAYLIST_ID",
                imageUrl: "",
                type: "playlist"
              }
            ],
            name: "Second",
            type: "PLAYLIST"
          }
        },
        columnOrders: ["1", "2"]
      },
      BOARD_2: {
        boardName: "ANOTHER BOARd",
        boardId: "BOARD_2",
        boardOptions: {},
        columns: {},
        columnOrders: []
      }
    },
    order: ["BOARD_1", "BOARD_2"]
  },
  selectedBoard: "BOARD_1",
  userOptions: {
    isLeftSidebarVisible: false,
    leftSidebarContentType: "search"
  },
  searchResults: [
    {
      text: "Title 2",
      id: "MY_VIDEO_ID_AT_SEARCH",
      videoId: "YOUTUBE_ID_AT_SEARCH",
      imageUrl: "",
      type: "video"
    }
  ],
  similarState: {
    items: [
      {
        text: "Title 2",
        id: "MY_VIDEO_ID_AT_SIMILAR",
        videoId: "YOUTUBE_ID_AT_SIMILAR",
        imageUrl: "",
        type: "video"
      }
    ],
    isLoading: false
  }
});
