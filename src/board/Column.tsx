import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Column } from "../infrastructure/types";
import Card from "./Card";
import { connect } from "react-redux";
import { ColumnContainer, TaskList, Title, Options } from "./components";
import EditableTitle from "../infrastructure/components/EditableTitle";
import { removeColumn, renameColumn } from "./state";

interface Props {
  column: Column;
  index: number;
  renameColumn: (columnId: string, newLabel: string) => void;
  removeColumn: (columnId: string) => void;
}

const ColumnView = ({ column, index, removeColumn, renameColumn }: Props) => {
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
            {(provided) => (
              <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                {column.items.map((item, index) => (
                  <Card index={index} key={item.id} item={item} />
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
  { renameColumn, removeColumn }
)(ColumnView);
