import React from "react";
import { Droppable } from "react-beautiful-dnd";
import ColumnView from "./Column";
import { AppState, createColumn, getSelectedBoard } from "../state2";
import { connect } from "react-redux";
import { BoardContainer } from "./components";
import { BoardDetailsViewModel } from "../state2/boards";
import { AppDispatch } from "../state2";

interface Props {
  dispatch: AppDispatch;
  selectedBoard: BoardDetailsViewModel;
}

const App = ({ dispatch, selectedBoard }: Props) => {
  return (
    <Droppable droppableId="board" direction={"horizontal"} type="column">
      {provided => (
        <BoardContainer ref={provided.innerRef} {...provided.droppableProps}>
          {selectedBoard.stacks.map((column, index) => (
            <ColumnView key={column.id} column={column} index={index} />
          ))}
          {provided.placeholder}
          <button
            data-testid="column-create"
            onClick={() => dispatch(createColumn({ name: "New Column" }))}
          >
            + Playlist
          </button>
        </BoardContainer>
      )}
    </Droppable>
  );
};

const mapState = (state: AppState) => ({
  selectedBoard: getSelectedBoard(state)
});
export default connect(mapState)(App);
