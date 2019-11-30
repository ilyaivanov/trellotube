import { Board, Column, ColumnContainer } from "./types";
import { handleDnd } from "./operations";
import { DraggableLocation, DropResult } from "react-beautiful-dnd";

it("dragging within the column", () => {
  const event: DropResult = createDropResult(
    { index: 0, droppableId: "BOARD_1" },
    { index: 1, droppableId: "BOARD_1" }
  );

  const board = createBoard(createColumn("BOARD_1", ["CARD_1", "CARD_2"]));
  const result = handleDnd(board, event);

  expect(getItems(result, "BOARD_1")).toEqual(["CARD_2", "CARD_1"]);
});

it("dragging between two columns", () => {
  const event: DropResult = createDropResult(
    { index: 0, droppableId: "COLUMN_1" },
    { index: 1, droppableId: "COLUMN_2" }
  );

  const board = createBoard(
    createColumn("COLUMN_1", ["CARD_1_1", "CARD_1_2"]),
    createColumn("COLUMN_2", ["CARD_2_1", "CARD_2_2"])
  );

  const result = handleDnd(board, event);

  expect(getItems(result, "COLUMN_1")).toEqual(["CARD_1_2"]);
  expect(getItems(result, "COLUMN_2")).toEqual([
    "CARD_2_1",
    "CARD_1_1",
    "CARD_2_2"
  ]);
});

const getItems = (board: Board, columnId: string) =>
  board.columns[columnId].items.map(i => i.id);

const createBoard = (...column: Column[]): Board => ({
  columns: column.reduce((res: ColumnContainer, c) => {
    res[c.id] = c;
    return res;
  }, {}),
  columnOrders: [],
  boardOptions: {},
  boardId: "dummy",
  boardName: "dummy"
});

const createColumn = (columnId: string, itemsNames: string[]): Column => ({
  type: "PLAYLIST",
  name: "TESTING COLUMN " + columnId,
  id: columnId,
  items: itemsNames.map(i => ({
    id: i,
    text: i,
    videoId: "",
    imageUrl: "",
    type: "video"
  }))
});

const createDropResult = (
  source: DraggableLocation,
  destination: DraggableLocation
): DropResult => ({
  draggableId: "I DO NOT USE DRAGGABLE ID FOR NOW",
  type: "SOME IGNORED TYPE",
  source,
  reason: "DROP",
  mode: "FLUID",
  destination
});
