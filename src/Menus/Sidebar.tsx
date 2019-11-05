import React, {useState} from "react";
import styled from "styled-components";
import SearchArea from "./SearchSidebar";
import BoardsSidebar from "./BoardsSidebar";

type SidebarState = "search" | "board";

const Sidebar = () => {
  const [state, setState] = useState<SidebarState>("search");
  return (
    <SidebarContainer>
      <button data-testid="boards-button" onClick={() => setState("board")}>
        boards
      </button>
      <button data-testid="search-button" onClick={() => setState("search")}>
        search
      </button>
      {state === "search" ? <SearchArea/> : <BoardsSidebar/>}
    </SidebarContainer>
  );
};

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
