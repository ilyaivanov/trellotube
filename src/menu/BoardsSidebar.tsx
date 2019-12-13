import React from "react";
import { connect } from "react-redux";
import { BoardItemView, BoardOptions } from "./components";
import { EditableTitle } from "../infrastructure";
import {
  selectBoard,
  removeBoard,
  createBoard,
  renameBoard,
  AppDispatch,
  AppState
} from "../state2";

interface Props {
  app: AppState;
  dispatch: AppDispatch;
}

const BoardsSidebar = ({ app, dispatch }: Props) => (
  <div data-testid="board-view">
    {app.boardsState.boardsOrder.map(boardId => (
      <EditableTitle
        //TODO fix performance problem here
        dragHandleProps={{
          isSelected: boardId === app.boardsState.selectedBoard,
          onClick: () => dispatch(selectBoard(boardId))
        }}
        id={boardId}
        key={boardId}
        testIdGroupName="board-button"
        label={app.boardsState.boards[boardId].name}
        onRename={(id, newName) => dispatch(renameBoard(id, newName))}
        onRemove={id => dispatch(removeBoard(id))}
        Title={BoardItemView}
        Options={BoardOptions}
      />
    ))}
    <button
      data-testid="create-board-button"
      onClick={() => dispatch(createBoard("New Board"))}
    >
      create
    </button>
  </div>
);

const mapState = (state: AppState) => ({
  app: state
});

export default connect(mapState)(BoardsSidebar);
