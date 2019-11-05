import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ColumnView from "./Column";
import { ApplicationState, Column } from "../types";
import Sidebar from "../Menus/Sidebar";
import Player from "../player/Player";
import { connect } from "react-redux";
import { createColumn, endDrag, selectBoard } from "./actions";
import { getColumnsForSelectedBoard } from "./reducer";
import { BoardContainer } from "./components";

interface Props {
  createColumn: any;
  endDrag: any;
  columns: Column[];
}

const App = ({ createColumn, endDrag, columns }: Props) => {
  return (
    <DragDropContext onDragEnd={endDrag}>
      <Sidebar />
      <Droppable droppableId="board" direction={"horizontal"} type="column">
        {provided => (
          <BoardContainer ref={provided.innerRef} {...provided.droppableProps}>
            {columns.map((column, index) => (
              <ColumnView key={column.id} column={column} index={index} />
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
  columns: getColumnsForSelectedBoard(state)
});
export default connect(
  mapState,
  {
    createColumn,
    selectBoard,
    endDrag
  }
)(App);
