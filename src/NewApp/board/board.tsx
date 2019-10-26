import React from "react";
import styled from "styled-components";
import Column from "./column";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult
} from "react-beautiful-dnd";
import { useBoard } from "../../state";
import { handleDnd } from "../../operations";

const Container = styled.div`
  padding: 8px;
  min-height: calc(100vh - 16px);
  min-width: calc(100vh - 16px);
  display: inline-flex;
`;

export default () => {
  const [board, setBoard] = useBoard();
  const onDragEnd = (result: DropResult) => setBoard(handleDnd(board, result));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="COLUMNS" direction="horizontal">
        {(provided: DroppableProvided) => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {board.columnOrders.map((columnId: string, index: number) => (
              <Column
                key={columnId}
                index={index}
                title={board.columns[columnId].name}
                items={board.columns[columnId].items}
                columnId={columnId}
              />
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};
