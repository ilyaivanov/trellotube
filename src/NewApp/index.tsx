import React from "react";
import { useBoard } from "../state";
import { Column, Item } from "../Board/types";
import styled from "styled-components";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable
} from "react-beautiful-dnd";
import { handleDnd } from "../operations";

const BoardContainer = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: inline-flex;
`;
const App = () => {
  const [board, setBoard] = useBoard();
  const onDragEnd = (dropResult: DropResult) => {
    setBoard(handleDnd(board, dropResult));
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="COLUMNS" direction={"horizontal"} type="column">
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

const ColumnContainer = styled.div`
  background-color: white;
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div<any>`
  padding: 8px;
  background-color: ${(props: any) =>
    props.isDraggingOver ? "skyblue" : "white"};
  flex-grow: 1;
`;

const ColumnView = ({ column, index }: { column: Column; index: number }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {columnProvided => (
        <ColumnContainer
          ref={columnProvided.innerRef}
          {...columnProvided.draggableProps}
        >
          <Title {...columnProvided.dragHandleProps}>{column.name}</Title>
          <Droppable droppableId={column.id} type="item">
            {(provided, snapshot) => (
              <TaskList
                isDraggingOver={snapshot.isDraggingOver}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {column.items.map((item, index) => (
                  <Task index={index} key={item.id} item={item} />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </ColumnContainer>
      )}
    </Draggable>
  );
};

const TaskContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

const Task = ({ item, index }: { item: Item; index: number }) => (
  <Draggable draggableId={item.id} index={index} type="item">
    {provided => (
      <div>
        <TaskContainer
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {item.text}
        </TaskContainer>
      </div>
    )}
  </Draggable>
);

export default App;
