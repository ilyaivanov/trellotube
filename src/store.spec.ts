import { createTrelloTubeStore } from "./store";
import { createColumn, doneLoadingPlaylist } from "./board/actions";
import { getSelectedBoard } from "./menu/reducer";
import { Store } from "redux";
import { ApplicationState, Item } from "./types";

jest.mock("./shared/utils", () => ({
  createId: () => "someNewId"
}));

describe("Having a default state", () => {
  let store: Store<ApplicationState>;
  beforeEach(() => (store = createTrelloTubeStore()));

  it("by default there should be three columns", () => {
    const selectedBoard = getSelectedBoard(store.getState());
    expect(selectedBoard.columnOrders).toEqual(["1", "2", "3"]);
  });

  it("creating a column should add a new column to the end", () => {
    store.dispatch(createColumn());

    const selectedBoard = getSelectedBoard(store.getState());
    expect(selectedBoard.columnOrders).toEqual(["1", "2", "3", "someNewId"]);
  });

  it("creating a column from the start should add new column from the beginning", () => {
    store.dispatch(createColumn({ fromStart: true }));

    const selectedBoard = getSelectedBoard(store.getState());
    expect(selectedBoard.columnOrders).toEqual(["someNewId", "1", "2", "3"]);
  });

  it("setting a custom name should create a column with a custom name", () => {
    store.dispatch(createColumn({ columnName: "My Custom Name", columnId: 'myId' }));

    const selectedBoard = getSelectedBoard(store.getState());
    expect(selectedBoard.columns["myId"].name).toEqual("My Custom Name");
  });

  it("when loading is done for a specific playlist it should update videos in that playlist", () => {
    store.dispatch(createColumn({ columnName: "My Custom Name" }));

    const items: Item[] = [
      {
        type: "video",
        id: "newItem1",
        imageUrl: "imageUrl",
        text: "some text",
        videoId: "videoID"
      }
    ];
    store.dispatch(doneLoadingPlaylist("someNewId", items));

    const selectedBoard = getSelectedBoard(store.getState());

    expect(selectedBoard.columns["someNewId"].items).toHaveLength(1);
    expect(selectedBoard.columns["someNewId"].items[0].id).toEqual("newItem1");
  });
});
