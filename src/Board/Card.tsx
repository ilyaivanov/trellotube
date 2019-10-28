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
      <TaskContainer
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        {...provided.draggableProps}
      >
        <Img src={item.imageUrl}></Img>
        <Subtext>
        {item.text}
        </Subtext>
      </TaskContainer>
    )}
  </Draggable>
);

const TaskContainer = styled.div`
  border-radius: 4px;
  background-color: white;
  margin-bottom: 8px;
`;

const Img = styled.img`
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;


const Subtext = styled.div`
  color: #1e1e1e;
  padding: 4px;
`;
export default Task;
