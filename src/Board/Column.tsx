import React from "react";
import { Item } from "./types";
import { ColumnHeader, ColumnContainer, Card } from "./components";
import { Droppable, Draggable } from "react-beautiful-dnd";

interface Props {
  items: Item[];
  Header: string | JSX.Element;
}

const Column = ({ items, Header }: Props) => {
  return (
    <Droppable droppableId={Math.random() + ""} type="Card">
      {(provided, snapshot) => (
        <ColumnContainer ref={provided.innerRef} {...provided.droppableProps}>
          <ColumnHeader content={Header} />
          {items.map((item, index) => (
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

export default Column;
