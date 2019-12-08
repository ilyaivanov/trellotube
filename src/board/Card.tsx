import { ApplicationState, Item, PlaylistItem } from "../state/types";
import { Draggable } from "react-beautiful-dnd";
import React from "react";
import {
  TaskContainer,
  Img,
  Subtext,
  CardButton,
  CardType
} from "./components";
import Truncate from "react-truncate";
import { connect } from "react-redux";
import { findSimilar, play, loadPlaylist } from "../state";

interface Props {
  item: Item;
  index: number;
  play: (item: Item) => void;
  findSimilar: (videoId: string) => void;
  loadPlaylist: (item: PlaylistItem) => void;
  currentItemId?: string;
}

const decode = (text: string): string => {
  const dom = new DOMParser().parseFromString(
    "<!doctype html><body>" + text,
    "text/html"
  );
  return dom.body.textContent || "";
};

const Card = ({
  item,
  index,
  play,
  findSimilar,
  loadPlaylist,
  currentItemId
}: Props) => {
  const onFindSimilar = (e: any) => {
    e.stopPropagation();
    findSimilar(item.videoId);
  };
  const onLoadPlaylist = (e: any, playlist: PlaylistItem) => {
    e.stopPropagation();
    loadPlaylist(playlist);
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
          <Img src={item.imageUrl} />
          <Subtext>
            <Truncate width={220 - 74 - 10} lines={2}>
              {decode(item.text)}
            </Truncate>
          </Subtext>
          <CardType>{item.type === "video" ? "V" : "P"}</CardType>
          {item.type === "video" ? (
            <CardButton
              data-testid={"video-find-similar-" + item.id}
              onClick={onFindSimilar}
            >
              similar
            </CardButton>
          ) : (
            <CardButton
              data-testid={"video-load-playlist-" + item.id}
              title="This will place playlist at the start of the board"
              onClick={e => onLoadPlaylist(e, item)}
            >
              load
            </CardButton>
          )}
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
  { findSimilar, play, loadPlaylist }
)(Card);
