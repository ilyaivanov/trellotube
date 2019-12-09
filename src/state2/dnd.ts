import { DropResult } from "react-beautiful-dnd";
import { BoardsState, Column } from "./boards";

export const handleDrop = (
  state: BoardsState,
  dropResult: DropResult
): BoardsState => {
  const { destination, source } = dropResult;
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

  const item = state.columns[source.droppableId].items[source.index];
  const without = updateColun(state, source.droppableId, col => ({
    items: remove(col.items, source.index)
  }));
  const witho = updateColun(without, destination.droppableId, col => ({
    items: insert(col.items, destination.index, item)
  }));
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
