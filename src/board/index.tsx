import React from "react";
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
  selectBoard
} from "./actions";
import { getSelectedBoard } from "./reducer";
import { BoardContainer } from "./components";
interface Props {
  removeColumn: any;
  createColumn: any;
  renameColumn: any;
  endDrag: any;
  selectedBoard: Board;
}

const App = ({
  removeColumn,
  createColumn,
  renameColumn,
  endDrag,
  selectedBoard
}: Props) => {
  return (
    <DragDropContext onDragEnd={endDrag}>
      <Sidebar />
      <Droppable droppableId="board" direction={"horizontal"} type="column">
        {provided => (
          <BoardContainer ref={provided.innerRef} {...provided.droppableProps}>
            {selectedBoard.columnOrders.map((cId, index) => (
              <ColumnView
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
        onEnd={() => console.log("on video end, TODO: play next track")}
      />
    </DragDropContext>
  );
};

const mapState = (state: ApplicationState) => ({
  selectedBoard: getSelectedBoard(state)
});
export default connect(
  mapState,
  {
    removeColumn,
    createColumn,
    selectBoard,
    renameColumn,
    endDrag
  }
)(App);
