import React from "react";
import styled from "styled-components";
import AppSidebar from "./menu/Sidebar";
import Player from "./player/Player";
import Board from "./board";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { endDrag } from "./board/actions";
import c from "./infrastructure/constants";
import {
  ApplicationState,
  SidebarState,
  UserOptions
} from "./infrastructure/types";
import { topBarButtonPressed } from "./menu/actions";
const Container = styled.div`
  background-color: ${c.MAIN_COLOR};
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  align-items: stretch;
`;

const TopBar = styled.div`
  min-height: ${c.TOP_BAR_HEIGHT}px;
  background-color: ${c.MENU_COLOR};
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;
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
  background-color: ${c.MENU_COLOR};
`;

const RightSidebar = styled(Sidebar)`
  background-color: ${c.MENU_COLOR};
`;

const MainContent = styled.div`
  overflow: scroll;
  flex: 1;
`;

interface Props {
  endDrag: (result: DropResult) => void;
  topBarButtonPressed: (state: SidebarState) => void;
  options: UserOptions;
  onClearPress: () => void;
}

const App = ({
  endDrag,
  topBarButtonPressed,
  options,
  onClearPress
}: Props) => (
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
        <button style={{ float: "right" }} onClick={onClearPress}>
          clear-store
        </button>
      </TopBar>
      <MainContainer>
        <LeftSidebar isVisible={options.isLeftSidebarVisible}>
          <AppSidebar state={options.leftSidebarContentType} />
        </LeftSidebar>
        <MainContent>
          <Board />
        </MainContent>
        <RightSidebar isVisible={false}>Right Sidebar</RightSidebar>
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
