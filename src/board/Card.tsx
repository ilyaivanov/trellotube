import { ApplicationState, Item } from "../types";
import { Draggable } from "react-beautiful-dnd";
import React from "react";
import { TaskContainer, Img, Subtext, FindSimilarButton, CardType } from "./components";
import Truncate from "react-truncate";
import { connect } from "react-redux";
import { findSimilar } from "./actions";
import { play } from "../player/actions";

interface Props {
  item: Item;
  index: number;
  play: (item: Item) => void;
  findSimilar: (videoId: string) => void;
  currentItemId?: string;
}

const decode = (text: string): string => {
  const dom = new DOMParser().parseFromString(
    "<!doctype html><body>" + text,
    "text/html"
  );
  return dom.body.textContent || "";
};

const Card = ({ item, index, play, findSimilar, currentItemId }: Props) => {
  const onFindSimilar = (e: any) => {
    e.stopPropagation();
    findSimilar(item.videoId);
  };

  return (
    <Draggable draggableId={item.id} index={index} type="item">
      {provided => (
        <TaskContainer
          title={item.text}
          isPlaying={currentItemId === item.id}
          data-testid={"video-" + item.id}
          onClick={() => play(item)}
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
          <CardType>V</CardType>
          <FindSimilarButton onClick={onFindSimilar}>similar</FindSimilarButton>
        </TaskContainer>
      )}
    </Draggable>
  );
};

const mapState = (state: ApplicationState) => ({
  currentItemId: state.itemBeingPlayed && state.itemBeingPlayed.id
});

export default connect(
  mapState,
  { findSimilar, play }
)(Card);
