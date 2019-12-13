import React from "react";
import SearchArea from "./SearchSidebar";
import BoardsSidebar from "./BoardsSidebar";
import SimilarSidebar from "./SimilarSidebar";
import { RightSidebarState } from "../state2/menu";

const Sidebar = ({ state }: { state: RightSidebarState }): JSX.Element => {
  if (state === "SEARCH") {
    return <SearchArea />;
  } else if (state === "BOARDS") {
    return <BoardsSidebar />;
  } else return <SimilarSidebar />;
};

export default Sidebar;
