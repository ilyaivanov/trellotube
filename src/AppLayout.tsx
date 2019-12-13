import React from "react";
import AppSidebar from "./menu/Sidebar";
import Player from "./player/Player";
import Board from "./board";
import { DragDropContext } from "react-beautiful-dnd";
import { connect } from "react-redux";
import {
  AppDispatch,
  setRightbarState,
  endDrag,
  AppState,
  setRightbarVisibility
} from "./state2";
import {
  Container,
  TopBar,
  MainContainer,
  MainContent,
  LeftSidebar,
  RightSidebar
} from "./AppLayout.components";
import { RightSidebarState } from "./state2/menu";

interface Props {
  dispatch: AppDispatch;
  isRightSidebarVisible: boolean;
  rightSidebarState: RightSidebarState;
  onClearPress: () => void;
}

const App = ({
  onClearPress,
  isRightSidebarVisible,
  rightSidebarState,
  dispatch
}: Props) => (
  <DragDropContext onDragEnd={e => dispatch(endDrag(e))}>
    <Container>
      <TopBar>
        <button
          data-testid="boards-button"
          onClick={() => dispatch(setRightbarState("BOARDS"))}
        >
          boards
        </button>
        <button
          data-testid="search-button"
          onClick={() => dispatch(setRightbarState("SEARCH"))}
        >
          search
        </button>
        <button
          data-testid="similar-button"
          onClick={() => dispatch(setRightbarState("SIMILAR"))}
        >
          similar
        </button>
        <button style={{ float: "right" }} onClick={onClearPress}>
          clear-store
        </button>
      </TopBar>
      <MainContainer>
        <LeftSidebar isVisible={isRightSidebarVisible}>
          <button
            style={{ position: "absolute", top: 5, right: 5 }}
            onClick={() => dispatch(setRightbarVisibility(false))}
          >
            hide
          </button>
          <AppSidebar state={rightSidebarState} />
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

const mapState = (state: AppState) => ({
  isRightSidebarVisible: state.menu.isRightSidebarVisible,
  rightSidebarState: state.menu.rightSidebarState
});

export default connect(mapState)(App);
