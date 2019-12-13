import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { ColumnContainer, Options, Title } from "./components";
import EditableTitle from "../infrastructure/components/EditableTitle";
import { AppDispatch, removeColumn, renameColumn } from "../state2";
import { StackViewModel } from "../state2/boards";
import TasksList from "../infrastructure/components/TasksList";

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
          <TasksList droppableId={column.id} tasks={column.items} />
        </ColumnContainer>
      )}
    </Draggable>
  );
};

export default connect()(ColumnView);
