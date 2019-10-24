import React from "react";
import { Board } from "./Board/types";
import { handleDnd } from "./operations";
import { DropResult } from "react-beautiful-dnd";

it("renders without crashing", () => {
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
      "BOARD_1": {
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
    columnOrders: ["1"]
  };

  const result = handleDnd(sampleBoard, event);

  expect(result.columns['BOARD_1'].items.map(i => i.id)).toEqual(["CARD_2", "CARD_1"]);
});
