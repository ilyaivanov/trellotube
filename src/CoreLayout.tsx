import React, { useState } from "react";
import styled from "styled-components";
import AppSidebar, { SidebarState } from "./menu/Sidebar";
import Player from "./player/Player";
import Board from "./board";
import { createParagraphs } from "./api/dummyText";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { endDrag } from "./board/actions";
import c from "./board/components/constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  align-items: stretch;
`;

const TopBar = styled.div`
  min-height: 40px;
  background-color: lightcoral;
`;
const MainContainer = styled.div`
  display: flex;
  overflow: scroll;
`;

interface VisibilityProps {
  isVisible: boolean;
}

const Sidebar = styled.div<VisibilityProps>`
  min-height: calc(100vh - 40px);
  width: ${props => (props.isVisible ? c.SIDEBAR_WIDTH : 0)}px;
  transition: width 200ms;
  overflow: scroll;
`;

const LeftSidebar = styled(Sidebar)`
  position: relative;
  background-color: lightblue;
`;

const RightSidebar = styled(Sidebar)`
  background-color: lightseagreen;
`;

const MainContent = styled.div`
  min-height: calc(100vh - 40px);
  background-color: lightgrey;

  overflow: scroll;
  flex: 1;
`;

interface Props {
  endDrag: (result: DropResult) => void;
}

const App = ({ endDrag }: Props) => {
  const [leftVisible, setIsLeftVisible] = useState(false);
  const [rightVisible, setIsRightVisible] = useState(false);
  const [state, setState] = useState<SidebarState>("search");

  const createHandlerForButton = (newState: SidebarState) => () => {
    if (leftVisible && state === newState) {
      setIsLeftVisible(false);
    } else if (!leftVisible) {
      setIsLeftVisible(true);
      setState(newState);
    } else {
      setState(newState);
    }
  };

  return (
    <DragDropContext onDragEnd={endDrag}>
      <Container>
        <TopBar>
          TopBar
          <button
            data-testid="boards-button"
            onClick={createHandlerForButton("board")}
          >
            boards
          </button>
          <button
            data-testid="search-button"
            onClick={createHandlerForButton("search")}
          >
            search
          </button>
          <button onClick={() => setIsRightVisible(!rightVisible)}>
            toggle right
          </button>
        </TopBar>
        <MainContainer>
          <LeftSidebar isVisible={leftVisible}>
            <AppSidebar state={state} />
          </LeftSidebar>
          <MainContent>
            <Board />
          </MainContent>
          <RightSidebar isVisible={rightVisible}>
            {createParagraphs(10)}
          </RightSidebar>
        </MainContainer>
        <Player
          onEnd={() => console.log("on video end, TODO: play next track")}
        />
      </Container>
    </DragDropContext>
  );
};

export default connect(
  undefined,
  { endDrag }
)(App);
