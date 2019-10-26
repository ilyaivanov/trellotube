import React from "react";
import { useBoard } from "../state";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { handleDnd } from "../operations";
import ColumnView from "./Column";

const App = () => {
  const [board, setBoard] = useBoard();
  const onDragEnd = (dropResult: DropResult) => {
    setBoard(handleDnd(board, dropResult));
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction={"horizontal"} type="column">
        {provided => (
          <BoardContainer ref={provided.innerRef} {...provided.droppableProps}>
            {board.columnOrders.map((cId, index) => (
              <ColumnView key={cId} column={board.columns[cId]} index={index} />
            ))}
            {provided.placeholder}
          </BoardContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};
const BoardContainer = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: inline-flex;
  align-items: flex-start;
  //to balance for margin-left of the rightmost item
  margin-right: 8px;
`;
export default App;
