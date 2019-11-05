import { ApplicationState, Board } from "../types";
import React from "react";
import { connect } from "react-redux";
import { selectBoard } from "../board/actions";
import { SelectedBoard, UnselectedBoard } from "./components";

interface Props {
  app: ApplicationState;
  selectBoard: (boardId: string) => void;
}

const BoardsSidebar = ({ app, selectBoard }: Props) => (
  <div data-testid="board-view">
    {app.boardsOrder.map(boardId => (
      <BoardItem
        key={boardId}
        onSelectBoard={selectBoard}
        isSelected={boardId === app.selectedBoard}
        board={app.boards[boardId]}
      />
    ))}
  </div>
);

interface BoardItemProps {
  onSelectBoard: (boardId: string) => void;
  board: Board;
  isSelected: boolean;
}

const BoardItem = ({ onSelectBoard, board, isSelected }: BoardItemProps) => {
  const Item = isSelected ? SelectedBoard : UnselectedBoard;
  return (
    <div>
      <Item
        data-testid={"board-" + board.boardId}
        onClick={() => onSelectBoard(board.boardId)}
      >
        {board.boardName}
      </Item>
    </div>
  );
};

const mapState = (state: ApplicationState) => ({
  app: state
});

export default connect(
  mapState,
  { selectBoard }
)(BoardsSidebar);
