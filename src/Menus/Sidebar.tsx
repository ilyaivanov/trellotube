import React, { useState } from "react";
import styled from "styled-components";
import SearchArea, { SearchProps } from "./SearchSidebar";

type SidebarState = "search" | "board";
interface Props extends SearchProps {}
const Sidebar = ({ items, onSearchDone }: Props) => {
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
        <SearchArea items={items} onSearchDone={onSearchDone} />
      ) : (
        <div>
          <h3 data-testid="board-view">Boards</h3>
        </div>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  position: fixed;
  width: 200px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 200px;
  background-color: white;
  border-right: solid 1px #70797e;
`;
