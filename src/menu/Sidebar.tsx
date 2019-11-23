import React from "react";
import SearchArea from "./SearchSidebar";
import BoardsSidebar from "./BoardsSidebar";
import SimilarSidebar from "./SimilarSidebar";

export type SidebarState = "search" | "board" | "similar";

const Sidebar = ({ state }: { state: SidebarState }): JSX.Element => {
  if (state === "search") {
    return <SearchArea />;
  } else if (state === "board") {
    return <BoardsSidebar />;
  } else return <SimilarSidebar />;
};

export default Sidebar;
