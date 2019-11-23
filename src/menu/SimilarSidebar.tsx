import React from "react";
import { connect } from "react-redux";
import { ApplicationState, Item } from "../types";
import { getSelectedBoard } from "./reducer";
import Card from "../board/Card";
import { Droppable } from "react-beautiful-dnd";
import { SidebarVideosContainer } from "./components";

const SimilarSidebar = ({ items }: { items: Item[] }) => {
  return (
    <>
      <h2>Similar</h2>

      <SidebarVideosContainer>
        {items && (
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
  const similar = getSelectedBoard(state).columns["SIMILAR"];
  return {
    items: similar && similar.items
  };
};

export default connect(mapState)(SimilarSidebar);
