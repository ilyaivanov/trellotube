import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Column } from "../types";
import Card from "./Card";
import { play } from "../player/actions";
import { connect } from "react-redux";
import {ColumnContainer, TaskList, Title, Options} from "./components";
import EditableTitle from "../shared/EditableTitle";
import { removeColumn, renameColumn } from "./actions";

interface Props {
  column: Column;
  index: number;
  play: (youtubeId: string) => void;
  renameColumn: (columnId: string, newLabel: string) => void;
  removeColumn: (columnId: string) => void;
}

const ColumnView = ({
  column,
  index,
  play,
  removeColumn,
  renameColumn
}: Props) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {columnProvided => (
        <ColumnContainer
          data-testid={"column-" + column.id}
          ref={columnProvided.innerRef}
          {...columnProvided.draggableProps}
        >
          <EditableTitle
            dragHandleProps={columnProvided.dragHandleProps}
            label={column.name}
            id={column.id}
            onRename={renameColumn}
            onRemove={removeColumn}
            testIdGroupName={"column-label"}
            Title={Title}
            Options={Options}
          />
          <Droppable droppableId={column.id} type="item">
            {(provided, snapshot) => (
              <TaskList
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
  { play, renameColumn, removeColumn }
)(ColumnView);
