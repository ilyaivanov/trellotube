import { createTrelloTubeStore } from "./store";
import { createColumn } from "./board/actions";
import { getSelectedBoard } from "./menu/reducer";

jest.mock("./shared/utils", () => ({
  createId: () => "someNewId"
}));

it("by default there should be three columns", () => {
  const store = createTrelloTubeStore();
  const selectedBoard = getSelectedBoard(store.getState());
  expect(selectedBoard.columnOrders).toEqual(["1", "2", "3"]);
});

it("creating a column should add a new column to the end", () => {
  const store = createTrelloTubeStore();

  store.dispatch(createColumn());

  const selectedBoard = getSelectedBoard(store.getState());
  expect(selectedBoard.columnOrders).toEqual(["1", "2", "3", "someNewId"]);
});

it("creating a column from the start should add new column from the beginning", () => {
  const store = createTrelloTubeStore();

  store.dispatch(createColumn({ fromStart: true }));

  const selectedBoard = getSelectedBoard(store.getState());
  expect(selectedBoard.columnOrders).toEqual(["someNewId", "1", "2", "3"]);
});

it("setting a custom name should create a column with a custom name", () => {
  const store = createTrelloTubeStore();

  store.dispatch(createColumn({ columnName: "My Custom Name" }));

  const selectedBoard = getSelectedBoard(store.getState());
  expect(selectedBoard.columns['someNewId'].name).toEqual('My Custom Name');
});
