import React, {useState} from "react";
import SearchArea from "./SearchSidebar";
import BoardsSidebar from "./BoardsSidebar";
import {SidebarContainer} from "./components";

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
      {state === "search" ? <SearchArea /> : <BoardsSidebar />}
    </SidebarContainer>
  );
};

export default Sidebar;

