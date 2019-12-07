import { ApplicationState } from "../infrastructure/types";
import React from "react";
import { connect } from "react-redux";
import { BoardItemView, BoardOptions } from "./components";
import EditableTitle from "../infrastructure/components/EditableTitle";
import {
  selectBoard,
  removeBoard,
  createAndSelectNewBoard,
  renameBoard
} from "./state";

interface Props {
  app: ApplicationState;
  selectBoard: (boardId: string) => void;
  createAndSelectNewBoard: () => void;
  renameBoard: (boardId: string, boardName: string) => void;
  removeBoard: (boardId: string) => void;
}

const BoardsSidebar = ({
  app,
  selectBoard,
  createAndSelectNewBoard,
  renameBoard,
  removeBoard
}: Props) => (
  <div data-testid="board-view">
    {app.boards.order.map(boardId => (
      <EditableTitle
        //TODO fix performance problem here
        dragHandleProps={{
          isSelected: boardId === app.selectedBoard,
          onClick: () => selectBoard(boardId)
        }}
        id={boardId}
        key={boardId}
        testIdGroupName="board-button"
        label={app.boards.items[boardId].boardName}
        onRename={renameBoard}
        onRemove={removeBoard}
        Title={BoardItemView}
        Options={BoardOptions}
      />
    ))}
    <button data-testid="create-board-button" onClick={createAndSelectNewBoard}>
      create
    </button>
  </div>
);

const mapState = (state: ApplicationState) => ({
  app: state
});

export default connect(
  mapState,
  { selectBoard, createAndSelectNewBoard, renameBoard, removeBoard }
)(BoardsSidebar);
