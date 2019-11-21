import { ApplicationState, Item } from "../types";
import { Draggable } from "react-beautiful-dnd";
import React from "react";
import { TaskContainer, Img, Subtext } from "./components";
import Truncate from "react-truncate";
import { connect } from "react-redux";

interface Props {
  item: Item;
  index: number;
  onPress: () => void;
  currentItemId?: string;
}

const decode = (text: string): string => {
  const dom = new DOMParser().parseFromString(
    "<!doctype html><body>" + text,
    "text/html"
  );
  return dom.body.textContent || "";
};

const Card = ({ item, index, onPress, currentItemId }: Props) => (
  <Draggable draggableId={item.id} index={index} type="item">
    {provided => (
      <TaskContainer
        isPlaying={currentItemId === item.id}
        data-testid={"video-" + item.id}
        onClick={onPress}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        {...provided.draggableProps}
      >
        <Img src={item.imageUrl}></Img>
        <Subtext>
          <Truncate width={220 - 74 - 10} lines={2}>
            {decode(item.text)}
          </Truncate>
        </Subtext>
      </TaskContainer>
    )}
  </Draggable>
);

const mapState = (state: ApplicationState) => ({
  currentItemId: state.itemBeingPlayed && state.itemBeingPlayed.id
});

export default connect(mapState)(Card);
