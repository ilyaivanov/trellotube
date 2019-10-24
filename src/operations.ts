import { Board, Column } from "./Board/types";
import { DropResult } from "react-beautiful-dnd";

export const handleDnd = (board: Board, result: DropResult): Board => {
  if (!result.destination) return board;

  if (result.source.droppableId === result.destination.droppableId) {
    const column = board.columns[result.destination.droppableId];
    const newItems = [...column.items];
    const oldItem = column.items[result.source.index];
    newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, oldItem);
    return {
      ...board,
      columns: {
        ...board.columns,
        [result.destination.droppableId]: {
          ...column,
          items: newItems
        }
      }
    };
  }

  return board;
};
