import styled from "styled-components";
import { Item } from "../types";
import { Draggable } from "react-beautiful-dnd";
import React from "react";

interface Props {
  item: Item;
  index: number;
}

const Task = ({ item, index }: Props) => (
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

const TaskContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

export default Task;
