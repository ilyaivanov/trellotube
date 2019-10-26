import React from "react";
import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Column } from "../types";
import Card from "./Card";

interface Props {
  column: Column;
  index: number;
}

const ColumnView = ({ column, index }: Props) => {
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
                  <Card index={index} key={item.id} item={item} />
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

const ColumnContainer = styled.div`
  background-color: white;
  margin-left: 8px;
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

export default ColumnView;
