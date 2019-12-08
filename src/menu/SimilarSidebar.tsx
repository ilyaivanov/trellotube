import React from "react";
import { connect } from "react-redux";
import { ApplicationState, Item } from "../state/types";
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
            {provided => (
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
  return {
    items: state.similarState.items,
    isLoading: state.similarState.isLoading
  };
};

export default connect(mapState)(SimilarSidebar);
