import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import { connect } from "react-redux";
import { ColumnContainer, TaskList, Title, Options } from "./components";
import EditableTitle from "../infrastructure/components/EditableTitle";
import { removeColumn, renameColumn } from "../state2";
import { StackViewModel } from "../state2/boards";
import { AppDispatch } from "../state2";

interface Props {
  column: StackViewModel;
  index: number;
  dispatch: AppDispatch;
}

const ColumnView = ({ column, index, dispatch }: Props) => {
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
            onRename={(id, newText) => dispatch(renameColumn(id, newText))}
            onRemove={id => dispatch(removeColumn(id))}
            testIdGroupName={"column-label"}
            Title={Title}
            Options={Options}
          />
          <Droppable droppableId={column.id} type="item">
            {provided => (
              <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                {column.items.map((item, index) => (
                  <Card index={index} key={item.id} item={item as any} />
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

export default connect()(ColumnView);
