import { DropResult } from "react-beautiful-dnd";
import { BoardsState, Column } from "./boards";
import {insert, remove} from "./array";

export const handleDrop = (
  state: BoardsState,
  dropResult: DropResult
): BoardsState => {
  const { destination, source, draggableId } = dropResult;
  if (!destination) return state;

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  )
    return state;

  if (destination.droppableId === "board") {
    const board = state.boards[state.selectedBoard].stacks;
    const stacks = insert(
      remove(board, source.index),
      destination.index,
      dropResult.draggableId
    );
    return {
      ...state,
      boards: {
        ...state.boards,
        [state.selectedBoard]: {
          ...state.boards[state.selectedBoard],
          stacks
        }
      }
    };
  }

  const isSourcedFromHere = !!state.columns[source.droppableId];
  const without = isSourcedFromHere
    ? updateColun(state, source.droppableId, col => ({
        items: remove(col.items, source.index)
      }))
    : state;
  const isDestinatedHere = !!state.columns[destination.droppableId];
  const witho = isDestinatedHere
    ? updateColun(without, destination.droppableId, col => ({
        items: insert(col.items, destination.index, draggableId)
      }))
    : without;
  return witho;
};

const updateColun = (
  state: BoardsState,
  columnId: string,
  updater: (col: Column) => Partial<Column>
): BoardsState => ({
  ...state,
  columns: {
    ...state.columns,
    [columnId]: {
      ...state.columns[columnId],
      ...updater(state.columns[columnId])
    }
  }
});
