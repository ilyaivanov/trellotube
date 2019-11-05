import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Column } from "../types";
import Card from "./Card";
import { play } from "../player/actions";
import { connect } from "react-redux";
import { ColumnContainer, TaskList } from "./components";
import ColumnTitle from "./ColumnTitle";

interface Props {
  column: Column;
  index: number;
  play: (youtubeId: string) => void;
}

const ColumnView = ({ column, index, play }: Props) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {columnProvided => (
        <ColumnContainer
          data-testid={"column-" + column.id}
          ref={columnProvided.innerRef}
          {...columnProvided.draggableProps}
        >
          <ColumnTitle
            dragHandleProps={columnProvided.dragHandleProps}
            label={column.name}
            columnId={column.id}
          />
          <Droppable droppableId={column.id} type="item">
            {(provided, snapshot) => (
              <TaskList
                isDraggingOver={snapshot.isDraggingOver}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {column.items.map((item, index) => (
                  <Card
                    onPress={() => play(item.videoId)}
                    index={index}
                    key={item.id}
                    item={item}
                  />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </ColumnContainer>
      )}
    </Draggable>
  );
};

export default connect(
  null,
  { play }
)(ColumnView);
