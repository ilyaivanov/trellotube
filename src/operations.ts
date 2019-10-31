import {Board, Item} from "./types";
import {DraggableLocation, DropResult} from "react-beautiful-dnd";

export const handleDnd = (board: Board, result: DropResult): Board => {
  const {destination, source} = result;
  if (!destination) return board;

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  )
    return board;

  if (source.droppableId === "board") {
    const columnOrders = [...board.columnOrders];
    columnOrders.splice(source.index, 1);
    columnOrders.splice(destination.index, 0, result.draggableId);
    return {
      ...board,
      columnOrders
    };
  }

  const oldItem = getItemBeingDragged(board, source);

  const without = removeItemFromBoard(board, source.droppableId, source.index);

  return insertIntoColumn(
    without,
    destination.droppableId,
    destination.index,
    oldItem
  );
};

const getColumn = (board: Board, columnId: string) => board.columns[columnId];

const getItemBeingDragged = (board: Board, source: DraggableLocation) =>
  board.columns[source.droppableId].items[source.index];

const removeItemFromBoard = (
  board: Board,
  columnId: string,
  itemIndex: number
): Board => {
  const column = getColumn(board, columnId);
  const items = [...column.items];
  items.splice(itemIndex, 1);
  return updateItemInColumn(board, columnId, items);
};

const insertIntoColumn = (
  board: Board,
  columnId: string,
  itemIndex: number,
  item: any
) => {
  const column = getColumn(board, columnId);
  const items = [...column.items];
  items.splice(itemIndex, 0, item);
  return updateItemInColumn(board, columnId, items);
};

const updateItemInColumn = (
  board: Board,
  columnId: string,
  items: Item[]
): Board => {
  return {
    ...board,
    columns: {
      ...board.columns,
      [columnId]: {
        ...getColumn(board, columnId),
        items
      }
    }
  };
};
