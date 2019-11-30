import React, { useState } from "react";
import Youtube from "react-youtube";
import { ApplicationState, Item } from "../infrastructure/types";
import { connect } from "react-redux";
import styled from "styled-components";
import c from "../board/components/constants";
import { getNextItem } from "../infrastructure/array";
import { getItemsFor, getSelectedBoard } from "../infrastructure/board.utils";
import { play } from "../infrastructure/actions";

interface Props {
  videoId?: string;
  nextItem?: Item;
  play: (item: Item) => void;
}
const BottomBar = styled.div`
  min-height: ${c.PLAYER_HEIGHT}px;
  background-color: lightcoral;
`;

const Player = ({ videoId, nextItem, play }: Props) => {
  const [, setPlayer] = useState();

  console.log(nextItem);
  return (
    <BottomBar>
      {nextItem && (
        <button data-testid="player-play-next" onClick={() => play(nextItem)}>
          next
        </button>
      )}
      {videoId && (
        <YoutubePlayerWrapper onReady={setPlayer} videoId={videoId} />
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
    nextItem: getNextPlayItem(state)
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

//WARNING: this might get triggered on each state update while
//having a big complexity. Consider using reselect here for memo
const getColumnIdForVideo = (
  state: ApplicationState,
  itemId: string
): string => {
  if (state.searchResults.find(c => c.id === itemId)) return "SEARCH";
  if (state.similarState && state.similarState.items.find(c => c.id === itemId)) return "SIMILAR";

  const board = getSelectedBoard(state);
  const column = board.columnOrders.find(column =>
    board.columns[column].items.find(item => item.id === itemId)
  );
  if (!column) return "";
  return column[0];
};

export default connect(
  mapState,
  { play }
)(Player);
