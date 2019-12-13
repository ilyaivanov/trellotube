import React from "react";
import { connect } from "react-redux";
import Card from "../board/Card";
import { Droppable } from "react-beautiful-dnd";
import { SidebarVideosContainer } from "./components";
import { AppState } from "../state2";
import { getExtraItems, ItemViewModel } from "../state2/boards";
import { ExtraColumn } from "../state2/menu";

interface Props {
  isLoading?: boolean;
  items: ItemViewModel[];
}
const SimilarSidebar = ({ items, isLoading }: Props) => {
  return (
    <>
      <h2>Similar</h2>

      {isLoading && <h5>Loading...</h5>}
      <SidebarVideosContainer>
        {!isLoading && items && (
          <Droppable droppableId="SIMILAR" type="item">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {items.map((i, index) => (
                  <Card key={i.id} index={index} item={i as any} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}
      </SidebarVideosContainer>
    </>
  );
};

const mapState = (state: AppState) => {
  return {
    items: getExtraItems(ExtraColumn.SIMILAR, state),
    isLoading: false
  };
};

export default connect(mapState)(SimilarSidebar);
