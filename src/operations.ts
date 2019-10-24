import { Board, Column } from "./Board/types";
import { DraggableLocation, DropResult } from "react-beautiful-dnd";

export const handleDnd = (board: Board, result: DropResult): Board => {
  const { destination, source } = result;
  if (!destination) return board;

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  )
    return board;

  if (source.droppableId === destination.droppableId) {
    const column = getColumn(board, destination.droppableId);
    const oldItem = getItemBeingDragged(board, source);
    const newColumn = insertItemIntoColumn(
      removeItemFromColumn(column, source.index),
      oldItem,
      destination.index
    );
    return {
      ...board,
      columns: {
        ...board.columns,
        [destination.droppableId]: newColumn
      }
    };
  } else {
    return {
      ...board,
      columns: {
        ...board.columns,
        [destination.droppableId]: insertItemIntoColumn(
          getColumn(board, destination.droppableId),
          getItemBeingDragged(board, source),
          destination.index
        ),
        [source.droppableId]: removeItemFromColumn(
          getColumn(board, destination.droppableId),
          source.index
        )
      }
    };
  }
};

const getColumn = (board: Board, columnId: string) => board.columns[columnId];

//TODO: handle board in remove and insert methods
//this will allow to remove if statement at the top
const removeItemFromColumn = (column: Column, itemIndex: number) => {
  const items = [...column.items];
  items.splice(itemIndex, 1);
  return {
    ...column,
    items
  };
};

const getItemBeingDragged = (board: Board, source: DraggableLocation) =>
  board.columns[source.droppableId].items[source.index];

const insertItemIntoColumn = (column: Column, item: any, index: number) => {
  const items = [...column.items];
  items.splice(index, 0, item);
  return {
    ...column,
    items
  };
};
