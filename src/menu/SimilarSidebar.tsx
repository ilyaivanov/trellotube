import React from "react";
import { connect } from "react-redux";
import { ApplicationState, Item } from "../types";
import { getSelectedBoard } from "./reducer";
import Card from "../board/Card";
import { Droppable } from "react-beautiful-dnd";
import { SidebarVideosContainer } from "./components";

interface Props {
  isLoading?: boolean;
  items: Item[];
}
const SimilarSidebar = ({ items, isLoading }: Props) => {
  return (
    <>
      <h2>Similar</h2>

      {isLoading && <h5>Loading...</h5>}

      <SidebarVideosContainer>
        {!isLoading && items && (
          <Droppable droppableId="SIMILAR" type="item">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {items.map((i, index) => (
                  <Card key={i.id} index={index} item={i} />
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

const mapState = (state: ApplicationState) => {
  const board = getSelectedBoard(state);
  const similar = board.columns["SIMILAR"];
  return {
    items: similar && similar.items,
    isLoading: board.boardOptions && board.boardOptions.isLoadingSimilar
  };
};

export default connect(mapState)(SimilarSidebar);
