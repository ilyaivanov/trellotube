import React from "react";
import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Column } from "../types";
import Card from "./Card";

interface Props {
  column: Column;
  index: number;
  onDelete: (columnId: string) => void;
}

const ColumnView = ({ column, index, onDelete }: Props) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {columnProvided => (
        <ColumnContainer
          ref={columnProvided.innerRef}
          {...columnProvided.draggableProps}
        >
          <Title {...columnProvided.dragHandleProps}>
            {column.name}{" "}
            <Options onClick={() => onDelete(column.id)}>X</Options>
          </Title>
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
const Options = styled.button`
  display: none;
`;

const ColumnContainer = styled.div`
  background-color: lightgrey;
  margin-left: 8px;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
  padding-left: 8px;
  padding-right: 8px;
  &:hover ${Options} {
    display: inherit;
  }
`;

const Title = styled.h4`
  margin-bottom: 0;
  padding: 8px;

  display: flex;
  justify-content: space-between;
`;

const TaskList = styled.div<any>`
  background-color: ${(props: any) =>
    props.isDraggingOver ? "skyblue" : "lightgrey"};
  flex-grow: 1;
  min-height: 50px;
`;

export default ColumnView;
