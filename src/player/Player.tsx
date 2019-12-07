import React, { useState } from "react";
import Youtube from "react-youtube";
import { ApplicationState, Item } from "../infrastructure/types";
import { connect } from "react-redux";
import styled from "styled-components";
import c from "../infrastructure/constants";
import { getNextItem, getPreviousItem } from "../infrastructure/array";
import { getItemsFor } from "../infrastructure/board.utils";
import { play } from "./state";

interface Props {
  videoId?: string;
  nextItem?: Item;
  prevItem?: Item;
  play: (item: Item) => void;
}
const BottomBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${c.PLAYER_HEIGHT}px;
  background-color: ${c.MENU_COLOR};
`;

const Player = ({ videoId, nextItem, prevItem, play }: Props) => {
  const [, setPlayer] = useState();

  return (
    <BottomBar>
      <button
        disabled={!prevItem}
        data-testid="player-play-prev"
        onClick={() => prevItem && play(prevItem)}
      >
        previous
      </button>
      <button
        disabled={!nextItem}
        data-testid="player-play-next"
        onClick={() => nextItem && play(nextItem)}
      >
        next
      </button>
      {videoId && (
        <YoutubePlayerWrapper
          onEnd={() => nextItem && play(nextItem)}
          onReady={setPlayer}
          videoId={videoId}
        />
      )}
    </BottomBar>
  );
};

const YoutubePlayerWrapper = (props: any) => (
  <div style={style}>
    <Youtube
      {...props}
      onReady={e => props.onReady(e.target)}
      opts={{
        height: "150",
        width: "400",
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1
        }
      }}
    />
  </div>
);

const style = {
  position: "fixed",
  right: 15,
  bottom: 15 + 60
} as {};

const mapState = (state: ApplicationState) => {
  const videoId = state.itemBeingPlayed && state.itemBeingPlayed.videoId;

  return {
    videoId: videoId,
    nextItem: getNextPlayItem(state),
    prevItem: getPrevPlayItem(state)
  };
};

const getNextPlayItem = (state: ApplicationState): Item | undefined => {
  const itemId = state.itemBeingPlayed && state.itemBeingPlayed.id;
  if (itemId) {
    return getNextItem(
      getItemsFor(state, getColumnIdForVideo(state, itemId)),
      item => item.id === itemId
    );
  }
};

const getPrevPlayItem = (state: ApplicationState): Item | undefined => {
  const itemId = state.itemBeingPlayed && state.itemBeingPlayed.id;
  if (itemId) {
    return getPreviousItem(
      getItemsFor(state, getColumnIdForVideo(state, itemId)),
      item => item.id === itemId
    );
  }
};

//WARNING: this might get triggered on each state update while
//having a big complexity. Consider using reselect here for memo
const getColumnIdForVideo = (
  state: ApplicationState,
  itemId: string
): string => {
  if (state.searchResults.find(c => c.id === itemId)) return "SEARCH";
  if (state.similarState && state.similarState.items.find(c => c.id === itemId))
    return "SIMILAR";

  const boardId = state.boards.order.find(id =>
    state.boards.items[id].columnOrders.find(colId =>
      state.boards.items[id].columns[colId].items.find(item => item.id === itemId)
    )
  );
  const board = state.boards.items[boardId as string];
  const column =
    board &&
    board.columnOrders.find(column =>
      board.columns[column].items.find(item => item.id === itemId)
    );
  if (!column) return "";
  return column;
};

export default connect(
  mapState,
  { play }
)(Player);
