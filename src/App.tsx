import React from "react";
import Column from "./Board/Column";
import {
  Board,
  Button,
  SearchInput,
  TransparentColumnContainer
} from "./Board/components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useBoard } from "./state";
import { handleDnd } from "./operations";
import {Column as ColumnType} from "./Board/types";

const App: React.FC = () => {
  const [board, setBoard] = useBoard();

  const onDragEnd = (dropAction: DropResult) =>
    setBoard(handleDnd(board, dropAction));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Board>
        {board.columnOrders.map(columnId => {
          const column = board.columns[columnId];
          return (
            <Column
              key={column.id}
              Header={getHeader(column)}
              column={column}
            />
          );
        })}
        <TransparentColumnContainer>
          <Button label="+ Playlist" />
          <Button label="+ Search" />
        </TransparentColumnContainer>
      </Board>
    </DragDropContext>
  );
};

const getHeader = (column: ColumnType) =>
  column.type === "SEARCH" ? (
    <SearchInput placeholder="Enter search here..." />
  ) : (
    column.name
  );

export default App;
