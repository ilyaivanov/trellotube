import React from "react";
import { connect } from "react-redux";
import { SidebarVideosContainer } from "./components";
import { AppState } from "../state2";
import { getExtraItems, ItemViewModel } from "../state2/boards";
import { ExtraColumn } from "../state2/menu";
import { TasksList } from "../infrastructure";

interface Props {
  isLoading?: boolean;
  items: ItemViewModel[];
}

const SimilarSidebar = ({ items, isLoading }: Props) => {
  return (
    <SidebarVideosContainer>
      <h2>Similar</h2>
      {isLoading && <h5>Loading...</h5>}
      {!isLoading && items && <TasksList droppableId="SIMILAR" tasks={items} />}
    </SidebarVideosContainer>
  );
};

const mapState = (state: AppState) => {
  return {
    items: getExtraItems(ExtraColumn.SIMILAR, state),
    isLoading: state.menu.isSimilarLoading
  };
};

export default connect(mapState)(SimilarSidebar);
