import { ApplicationState } from "./types";
import { DropResult } from "react-beautiful-dnd";

import {
  getItemsFor,
  updateColumnInSelectedBoard,
  getSelectedBoard
} from "./board.utils";

export const handleDnd = (
  state: ApplicationState,
  result: DropResult
): ApplicationState => {
  const { destination, source } = result;
  if (!destination) return state;

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  )
    return state;

  if (source.droppableId === "board") {
    const board = getSelectedBoard(state);
    const columnOrders = [...board.columnOrders];
    columnOrders.splice(source.index, 1);
    columnOrders.splice(destination.index, 0, result.draggableId);
    return {
      ...state,
      boards: {
        ...state.boards,
        items: {
          ...state.boards.items,
          [board.boardId]: {
            ...board,
            columnOrders
          }
        }
      }
    };
  }

  const oldItem = getItemsFor(state, source.droppableId)[source.index];
  const without = removeItemFromBoard(state, source.droppableId, source.index);

  return insertIntoColumn(
    without,
    destination.droppableId,
    destination.index,
    oldItem
  );
};

const removeItemFromBoard = (
  state: ApplicationState,
  columnId: string,
  itemIndex: number
): ApplicationState => {
  if (columnId === "SEARCH")
    return {
      ...state,
      searchResults: remove(state.searchResults, itemIndex)
    };
  if (columnId === "SIMILAR")
    return {
      ...state,
      similarState: {
        ...state.similarState,
        items: remove(state.similarState.items, itemIndex)
      }
    };
  return updateColumnInSelectedBoard(state, {
    id: columnId,
    items: remove(getSelectedBoard(state).columns[columnId].items, itemIndex)
  });
};

const insertIntoColumn = (
  state: ApplicationState,
  columnId: string,
  itemIndex: number,
  item: any
): ApplicationState => {
  if (columnId === "SEARCH") {
    return {
      ...state,
      searchResults: insert(state.searchResults, itemIndex, item)
    };
  }
  if (columnId === "SIMILAR") {
    return {
      ...state,
      similarState: {
        ...state.similarState,
        items: insert(state.similarState.items, itemIndex, item)
      }
    };
  }
  const newItems = insert(
    getSelectedBoard(state).columns[columnId].items,
    itemIndex,
    item
  );
  return updateColumnInSelectedBoard(state, {
    id: columnId,
    items: newItems
  });
};

const insert = <T>(items: T[], index: number, item: T) => {
  const copy = [...items];
  copy.splice(index, 0, item);
  return copy;
};

const remove = <T>(items: T[], index: number) => {
  const copy = [...items];
  copy.splice(index, 1);
  return copy;
};
