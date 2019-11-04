import React from "react";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ColumnView from "./Column";
import { ApplicationState, Board } from "../types";
import Sidebar from "../Menus/Sidebar";
import Player from "../player/Player";
import { connect } from "react-redux";
import {
  createColumn,
  endDrag,
  removeColumn,
  renameColumn,
  searchDone,
  selectBoard
} from "./actions";
import { play } from "../player/actions";
import { getSelectedBoard } from "./reducer";

interface Props {
  appState: ApplicationState;
  removeColumn: any;
  createColumn: any;
  searchDone: any;
  renameColumn: any;
  endDrag: any;
  selectBoard: any;
  selectedBoard: Board;
  videoBeingPlayed?: string;
  play: any;
}

const App = ({
  appState,
  removeColumn,
  createColumn,
  searchDone,
  renameColumn,
  endDrag,
  selectBoard,
  selectedBoard,
  videoBeingPlayed,
  play
}: Props) => {
  return (
    <DragDropContext onDragEnd={endDrag}>
      <Sidebar
        onPlay={play}
        app={appState}
        onSearchDone={searchDone}
        onSelectBoard={selectBoard}
      />
      <Droppable droppableId="board" direction={"horizontal"} type="column">
        {provided => (
          <BoardContainer ref={provided.innerRef} {...provided.droppableProps}>
            {selectedBoard.columnOrders.map((cId, index) => (
              <ColumnView
                onPlay={play}
                key={cId}
                onDelete={removeColumn}
                column={selectedBoard.columns[cId]}
                index={index}
                renameColumn={renameColumn}
              />
            ))}
            {provided.placeholder}
            <button data-testid="column-create" onClick={createColumn}>
              + Playlist
            </button>
          </BoardContainer>
        )}
      </Droppable>
      <Player
        videoId={videoBeingPlayed}
        onEnd={() => console.log("on video end, TODO: play next track")}
      />
    </DragDropContext>
  );
};

const BoardContainer = styled.div`
  min-height: calc(100vh - 16px);
  min-width: calc(100vh - 8px);
  display: inline-flex;
  align-items: flex-start;
  //to balance for margin-left of the rightmost item
  margin: 8px 8px 8px 200px;
`;
const mapState = (state: ApplicationState) => ({
  appState: state,
  selectedBoard: getSelectedBoard(state),
  videoBeingPlayed: state.videoBeingPlayed
});
export default connect(
  mapState,
  {
    removeColumn,
    createColumn,
    searchDone,
    selectBoard,
    renameColumn,
    endDrag,
    play
  }
)(App);
