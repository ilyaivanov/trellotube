import { Board } from "./Board/types";
import { handleDnd } from "./operations";
import { DropResult } from "react-beautiful-dnd";

it("dragging within the column", () => {
  const event: DropResult = {
    draggableId: "CARD_1",
    type: "Card",
    source: { index: 0, droppableId: "BOARD_1" },
    reason: "DROP",
    mode: "FLUID",
    destination: { droppableId: "BOARD_1", index: 1 }
  };

  const sampleBoard: Board = {
    columns: {
      BOARD_1: {
        items: [
          {
            id: "CARD_1",
            text: "1"
          },
          {
            id: "CARD_2",
            text: "2"
          }
        ],
        type: "PLAYLIST",
        id: "BOARD_1",
        name: "MyBoard"
      }
    },
    columnOrders: ["BOARD_1"]
  };

  const result = handleDnd(sampleBoard, event);

  expect(result.columns["BOARD_1"].items.map(i => i.id)).toEqual([
    "CARD_2",
    "CARD_1"
  ]);
});

it("dragging between two columns", () => {
  const event: DropResult = {
    draggableId: "CARD_1_1",
    type: "Card",
    source: { index: 0, droppableId: "COLUMN_1" },
    reason: "DROP",
    mode: "FLUID",
    destination: { droppableId: "COLUMN_2", index: 1 }
  };

  const sampleBoard: Board = {
    columns: {
      COLUMN_1: {
        items: [
          {
            id: "CARD_1_1",
            text: "1"
          },
          {
            id: "CARD_1_2",
            text: "2"
          }
        ],
        type: "PLAYLIST",
        id: "COLUMN_1",
        name: "MyBoard"
      },
      COLUMN_2: {
        items: [
          {
            id: "CARD_2_1",
            text: "1"
          },
          {
            id: "CARD_2_2",
            text: "2"
          }
        ],
        type: "PLAYLIST",
        id: "COLUMN_2",
        name: "MyBoard"
      }
    },
    columnOrders: ["COLUMN_1"]
  };

  const result = handleDnd(sampleBoard, event);

  // expect(result.columns["COLUMN_1"].items.map(i => i.id)).toEqual(["CARD_1_2"]);
  console.log(result.columns["COLUMN_2"].items.map(i => i.id))
  expect(result.columns["COLUMN_2"].items.map(i => i.id)).toEqual([
    "CARD_2_1",
    "CARD_1_1",
    "CARD_2_2"
  ]);
});
