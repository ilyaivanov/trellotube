import { ItemViewModel, VideoItem } from "../state2/boards";
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
import { AppDispatch, play, setItemsFor, setRightbarState } from "../state2";
import { searchSimilar } from "../infrastructure/networking/youtube";
import { ExtraColumn } from "../state2/menu";

interface Props {
  item: ItemViewModel;
  index: number;
  dispatch: AppDispatch;
}

const decode = (text: string): string => {
  const dom = new DOMParser().parseFromString(
    "<!doctype html><body>" + text,
    "text/html"
  );
  return dom.body.textContent || "";
};

const Card = ({ item, index, dispatch }: Props) => {
  const onFindSimilar = (e: any, video: VideoItem) => {
    e.stopPropagation();
    dispatch(setRightbarState("SIMILAR"));
    searchSimilar(video.videoId).then(response =>
      dispatch(setItemsFor(ExtraColumn.SIMILAR, response.items))
    );
  };
  const onLoadPlaylist = (e: any, playlist: any) => {
    e.stopPropagation();
    // loadPlaylist(playlist);
  };

  return (
    <Draggable draggableId={item.id} index={index} type="item">
      {provided => (
        <TaskContainer
          title={item.name}
          isPlaying={item.isPlaying || false}
          data-testid={"video-" + item.id}
          onClick={() => dispatch(play(item.id))}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Img src={item.itemDetails.imageUrl} />
          <Subtext>
            <Truncate width={220 - 74 - 10} lines={2}>
              {decode(item.name)}
            </Truncate>
          </Subtext>
          <CardType>{item.itemDetails.type === "video" ? "V" : "P"}</CardType>
          {item.itemDetails.type === "video" && (
            <CardButton
              data-testid={"video-find-similar-" + item.id}
              onClick={e => onFindSimilar(e, item.itemDetails as VideoItem)}
            >
              similar
            </CardButton>
          )}
          {/*// ) : (*/}
          {/*//   <CardButton*/}
          {/*//     data-testid={"video-load-playlist-" + item.id}*/}
          {/*//     title="This will place playlist at the start of the board"*/}
          {/*//     onClick={e => onLoadPlaylist(e, item)}*/}
          {/*//   >*/}
          {/*//     load*/}
          {/*//   </CardButton>*/}
          {/*// )}*/}
        </TaskContainer>
      )}
    </Draggable>
  );
};

export default connect()(Card);
