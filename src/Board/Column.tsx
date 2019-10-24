import React from "react";
import { Item, Column } from "./types";
import { ColumnHeader, ColumnContainer, Card } from "./components";
import { Droppable, Draggable } from "react-beautiful-dnd";

interface Props {
  Header: string | JSX.Element;
  column: Column;
}

const ColumnView = ({ Header, column }: Props) => {
  return (
    <Droppable droppableId={column.id} type="Card">
      {(provided, snapshot) => (
        <ColumnContainer ref={provided.innerRef} {...provided.droppableProps}>
          <ColumnHeader content={Header} />
          {column.items.map((item, index) => (
            <Draggable draggableId={item.id} index={index} key={item.id}>
              {(provided, snapshot) => (
                <Card
                  ref={provided.innerRef}
                  draggableProps={provided.draggableProps}
                  dragHandleProps={provided.dragHandleProps}
                  text={item.text}
                  imageUrl="https://i.ytimg.com/vi/Dlxu28sQfkE/default.jpg"
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ColumnContainer>
      )}
    </Droppable>
  );
};

export default ColumnView;
