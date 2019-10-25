import React from "react";
import { Column } from "./types";
import { ColumnContainer, Card } from "./components";
import { Droppable, Draggable } from "react-beautiful-dnd";

interface Props {
  Header: string | JSX.Element;
  column: Column;
  columnIndex: number;
}

const ColumnView = ({ Header, column, columnIndex }: Props) => {
  return (
    <Draggable draggableId={column.id} index={columnIndex} type="Column">
      {draggableProvided => (
        <Droppable droppableId={column.id} type="Card">
          {provided => (
            <ColumnContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div
                style={{ cursor: "pointer" }}
                ref={draggableProvided.innerRef}
                {...draggableProvided.draggableProps}
                {...draggableProvided.dragHandleProps}
              >
                {Header}
                {column.items.map((item, index) => (
                  <Draggable draggableId={item.id} index={index} key={item.id} type="Card">
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
              </div>
            </ColumnContainer>
          )}
        </Droppable>
      )}
    </Draggable>
  );
};

export default ColumnView;
