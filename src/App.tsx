import React from "react";
import Column from "./Board/Column";
import {
  Board,
  Button,
  SearchInput,
  TransparentColumnContainer,
  MusicLabel,
  ColumnContainer
} from "./Board/components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useBoard } from "./state";
import { handleDnd } from "./operations";
import { Column as ColumnType } from "./Board/types";

const App: React.FC = () => {
  const [board, setBoard] = useBoard();

  const onDragEnd = (dropAction: DropResult) =>
    setBoard(handleDnd(board, dropAction));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={"COLUMNS"} type="Column" direction="horizontal">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <Board>
              {board.columnOrders.map((columnId, index) => {
                const column = board.columns[columnId];
                return (
                  <Column
                    columnIndex={index}
                    key={column.id}
                    Header={getHeader(column)}
                    column={column}
                  />
                );
              })}
              {provided.placeholder}
              <TransparentColumnContainer>
                <Button label="+ Playlist" />
                <Button label="+ Search" />
              </TransparentColumnContainer>
            </Board>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const getHeader = (column: ColumnType) =>
  column.type === "SEARCH" ? (
    <div>
      <MusicLabel>{column.name}</MusicLabel>
      <SearchInput placeholder="Enter search here..." />
    </div>
  ) : (
    <MusicLabel>{column.name}</MusicLabel>
  );

export default App;
