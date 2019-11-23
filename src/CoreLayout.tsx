import React from "react";
import styled from "styled-components";
import AppSidebar from "./menu/Sidebar";
import Player from "./player/Player";
import Board from "./board";
import { createParagraphs } from "./api/dummyText";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { endDrag } from "./board/actions";
import c from "./board/components/constants";
import { ApplicationState, SidebarState, UserOptions } from "./types";
import { topBarButtonPressed } from "./menu/actions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  align-items: stretch;
`;

const TopBar = styled.div`
  min-height: ${c.TOP_BAR_HEIGHT}px;
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
  background-color: #f1f1f1;

  overflow: scroll;
  flex: 1;
`;

interface Props {
  endDrag: (result: DropResult) => void;
  topBarButtonPressed: (state: SidebarState) => void;
  options: UserOptions;
}

const App = ({ endDrag, topBarButtonPressed, options }: Props) => (
  <DragDropContext onDragEnd={endDrag}>
    <Container>
      <TopBar>
        TopBar
        <button
          data-testid="boards-button"
          onClick={() => topBarButtonPressed("board")}
        >
          boards
        </button>
        <button
          data-testid="search-button"
          onClick={() => topBarButtonPressed("search")}
        >
          search
        </button>
        <button
          data-testid="similar-button"
          onClick={() => topBarButtonPressed("similar")}
        >
          similar
        </button>
      </TopBar>
      <MainContainer>
        <LeftSidebar isVisible={options.isLeftSidebarVisible}>
          <AppSidebar state={options.leftSidebarContentType} />
        </LeftSidebar>
        <MainContent>
          <Board />
        </MainContent>
        <RightSidebar isVisible={false}>{createParagraphs(10)}</RightSidebar>
      </MainContainer>
      <Player />
    </Container>
  </DragDropContext>
);

const mapState = (state: ApplicationState) => ({
  options: state.userOptions
});

export default connect(
  mapState,
  { endDrag, topBarButtonPressed }
)(App);
