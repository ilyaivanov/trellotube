import React, { useState } from "react";
import Youtube from "react-youtube";
import { ApplicationState } from "../types";
import { connect } from "react-redux";
import styled from "styled-components";
import c from "../board/components/constants";

interface Props {
  videoId?: string;
}
const BottomBar = styled.div`
  min-height: ${c.PLAYER_HEIGHT}px;
  background-color: lightcoral;
`;

const Player = ({ videoId }: Props) => {
  const [player, setPlayer] = useState();

  return (
    <BottomBar>
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
  bottom: 15
} as {};

const mapState = (state: ApplicationState) => ({
  videoId: state.videoBeingPlayed
});

export default connect(mapState)(Player);
