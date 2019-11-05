import React, { useState } from "react";
import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Column } from "../types";
import Card from "./Card";
import {play} from "../player/actions";
import {connect} from "react-redux";

interface Props {
  column: Column;
  index: number;
  onDelete: (columnId: string) => void;
  play: (youtubeId: string) => void;
  renameColumn: (columnId: string, newText: string) => void;
}

const ColumnView = ({
  column,
  index,
  onDelete,
  renameColumn,
                      play
}: Props) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newText, setNewText] = useState(column.name);
  const onEditButtonPress = () => {
    if (isRenaming) {
      renameColumn(column.id, newText);
    }
    setIsRenaming(!isRenaming);
  };
  return (
    <Draggable draggableId={column.id} index={index}>
      {columnProvided => (
        <ColumnContainer
          data-testid={"column-" + column.id}
          ref={columnProvided.innerRef}
          {...columnProvided.draggableProps}
        >
          <Title {...columnProvided.dragHandleProps}>
            {isRenaming ? (
              <input
                autoFocus
                type="text"
                value={newText}
                data-testid={"column-label-input-" + column.id}
                onChange={e => setNewText(e.target.value)}
              />
            ) : (
              column.name
            )}{" "}
            <Options>
              <button data-testid={"column-rename-" + column.id} onClick={onEditButtonPress}>E</button>
              <button
                data-testid={"column-remove-" + column.id}
                onClick={() => onDelete(column.id)}
              >
                X
              </button>
            </Options>
          </Title>
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
const Options = styled.div`
  display: none;
`;

const ColumnContainer = styled.div`
  background-color: lightgrey;
  margin-left: 8px;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
  padding-left: 8px;
  padding-right: 8px;
  &:hover ${Options} {
    display: inherit;
  }
`;

const Title = styled.h4`
  margin-bottom: 0;
  padding: 8px;

  display: flex;
  justify-content: space-between;
`;

const TaskList = styled.div<any>`
  background-color: ${(props: any) =>
    props.isDraggingOver ? "skyblue" : "lightgrey"};
  flex-grow: 1;
  min-height: 50px;
`;

export default connect(null, {play})(ColumnView);
