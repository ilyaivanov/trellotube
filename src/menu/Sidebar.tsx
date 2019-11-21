import React, { useState } from "react";
import SearchArea from "./SearchSidebar";
import BoardsSidebar from "./BoardsSidebar";
import { SidebarContainer } from "./components";

export type SidebarState = "search" | "board";

const Sidebar = ({ state }: { state: SidebarState }) => {
  return (
    <>

      {state === "search" ? <SearchArea /> : <BoardsSidebar />}
    </>
  );
};

export default Sidebar;
