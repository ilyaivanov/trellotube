import { Board, Column } from "./Board/types";
import { DropResult } from "react-beautiful-dnd";

export const handleDnd = (board: Board, result: DropResult) => {
  const handleColumn = (column: Column) => {
    if (result.source.droppableId === column.id) {
      column.items.splice(result.source.index, 1);
    }
    if(result.destination && result.destination.droppableId === column.id){
      column.items.splice(result.destination.index, 0, )
    }


  };

  const columns = board.columns.map(c => handleColumn(c));
  return {
    ...board,
    columns
  };
};
