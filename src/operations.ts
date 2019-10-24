import { Board } from "./Board/types";
import { DropResult } from "react-beautiful-dnd";

export const handleDnd = (board: Board, result: DropResult): Board => {
  const { destination, source } = result;
  if (!destination) return board;

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  )
    return board;

  if (result.source.droppableId === destination.droppableId) {
    const column = board.columns[destination.droppableId];
    const newItems = [...column.items];
    const oldItem = column.items[result.source.index];
    newItems.splice(result.source.index, 1);
    newItems.splice(destination.index, 0, oldItem);
    return {
      ...board,
      columns: {
        ...board.columns,
        [destination.droppableId]: {
          ...column,
          items: newItems
        }
      }
    };
  } else {
    console.log("different");
    return board;
  }

  return board;
};
