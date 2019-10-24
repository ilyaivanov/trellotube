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

const App: React.FC = () => {
  const [board, setBoard] = useBoard();

  const onDragEnd = (dropAction: DropResult) =>
    setBoard(handleDnd(board, dropAction));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Board>
        {board.columnOrders.map(columnId => {
          const column = board.columns[columnId];
          if (column.type === "SEARCH")
            return (
              <Column
                key={column.id}
                Header={<SearchInput placeholder="Enter search here..." />}
                column={column}

              />
            );
          else
            return (
              <Column
                key={column.id}
                Header={column.name}
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

export default App;
