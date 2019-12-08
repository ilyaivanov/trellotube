import React from "react";
import { Droppable } from "react-beautiful-dnd";
import ColumnView from "./Column";
import { ApplicationState, Column } from "../state/types";
import { connect } from "react-redux";
import { createColumn } from "../state";
import { BoardContainer } from "./components";
import { getColumnsForSelectedBoard } from "../state/board.utils";

interface Props {
  createColumn: any;
  columns: Column[];
}

const App = ({ createColumn, columns }: Props) => {
  return (
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
  );
};

const mapState = (state: ApplicationState) => ({
  columns: getColumnsForSelectedBoard(state)
});
export default connect(
  mapState,
  {
    createColumn
  }
)(App);
