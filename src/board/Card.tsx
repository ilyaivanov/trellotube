import styled from "styled-components";
import { Item } from "../types";
import { Draggable } from "react-beautiful-dnd";
import React from "react";
import { TaskContainer, Img, Subtext } from "./components";

interface Props {
  item: Item;
  index: number;
  onPress: () => void;
}

const decode = (text: string) => {
  const dom = new DOMParser().parseFromString(
    "<!doctype html><body>" + text,
    "text/html"
  );
  return dom.body.textContent;
};

const Task = ({ item, index, onPress }: Props) => (
  <Draggable draggableId={item.id} index={index} type="item">
    {provided => (
      <TaskContainer
        data-testid={"video-" + item.id}
        onClick={onPress}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        {...provided.draggableProps}
      >
        <Img src={item.imageUrl}></Img>
        <Subtext>{decode(item.text)}</Subtext>
      </TaskContainer>
    )}
  </Draggable>
);

export default Task;
