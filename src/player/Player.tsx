import React, { useState } from "react";
import Youtube from "react-youtube";
import { connect } from "react-redux";
import styled from "styled-components";
import c from "../infrastructure/constants";
import { AppState } from "../state2";

interface Props {
  videoId?: string;
}
const BottomBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${c.PLAYER_HEIGHT}px;
  background-color: ${c.MENU_COLOR};
`;

const Player = ({ videoId }: Props) => {
  const [, setPlayer] = useState();

  return (
    <BottomBar>
      {videoId && (
        <YoutubePlayerWrapper
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

const mapState = (state: AppState) => {
  const itemId = state.player.itemBeingPlayed;
  const item = itemId && state.boardsState.items[itemId];
  const videoId = item && item.type === "video" ? item.videoId : "";
  return {
    videoId
    // nextItem: getNextPlayItem(state),
    // prevItem: getPrevPlayItem(state)
  };
};

export default connect(mapState)(Player);
