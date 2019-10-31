import React, {useState} from "react";
import styled from "styled-components";
import SearchArea from "./SearchSidebar";
import {ApplicationState, Board, Item} from "../types";

type SidebarState = "search" | "board";

interface Props {
  app: ApplicationState;
  onSearchDone: (items: Item[]) => void;
  onSelectBoard: (boardId: string) => void;
  onPlay: (youtubeId: string) => void;
}

const Sidebar = ({app, onSearchDone, onSelectBoard, onPlay}: Props) => {
  const [state, setState] = useState<SidebarState>("search");
  return (
    <SidebarContainer>
      <button data-testid="boards-button" onClick={() => setState("board")}>
        boards
      </button>
      <button data-testid="search-button" onClick={() => setState("search")}>
        search
      </button>
      {state === "search" ? (
        <SearchArea
          onPlay={onPlay}
          items={app.boards[app.selectedBoard].columns['SEARCH'].items}
          onSearchDone={onSearchDone}
        />
      ) : (
        <div data-testid="board-view">
          {app.boardsOrder.map(boardId => (
            <BoardItem
              key={boardId}
              onSelectBoard={onSelectBoard}
              isSelected={boardId === app.selectedBoard}
              board={app.boards[boardId]}
            />
          ))}
        </div>
      )}
    </SidebarContainer>
  );
};

interface BoardItemProps {
  onSelectBoard: (boardId: string) => void;
  board: Board;
  isSelected: boolean;
}

const BoardItem = ({onSelectBoard, board, isSelected}: BoardItemProps) => {
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

const SelectedBoard = styled.h2``;
const UnselectedBoard = styled.h4``;
export default Sidebar;

const SidebarContainer = styled.div`
  overflow: scroll;
  position: fixed;
  width: 200px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 200px;
  background-color: white;
  border-right: solid 1px #70797e;
`;
