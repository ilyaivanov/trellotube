import React from "react";
import SearchArea from "./SearchSidebar";
import BoardsSidebar from "./BoardsSidebar";
import SimilarSidebar from "./SimilarSidebar";
import { SidebarState } from "../types";

const Sidebar = ({ state }: { state: SidebarState }): JSX.Element => {
  if (state === "search") {
    return <SearchArea />;
  } else if (state === "board") {
    return <BoardsSidebar />;
  } else return <SimilarSidebar />;
};

export default Sidebar;
