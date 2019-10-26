import React from "react";
import styled from "styled-components";
import {Draggable, DraggableProvided, DraggableStateSnapshot} from "react-beautiful-dnd";
import QuoteList from "./QuoteList";
import Title from "./title";
import {Item} from "../../Board/types";

const grid = 2;
const borderRadius = 4;

const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${({isDragging}: any) => (isDragging ? "black" : "blue")};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: green;
  }
`;

type Props = {
  title: string;
  columnId: string;
  items: Item[];
  index: number;
};

export default ({title, index, columnId, items}: Props) => (
  <Draggable draggableId={title} index={index}>
    {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
      <Container ref={provided.innerRef} {...provided.draggableProps}>
        <Header isDragging={snapshot.isDragging}>
          <Title isDragging={snapshot.isDragging} {...provided.dragHandleProps}>
            {title}
          </Title>
        </Header>
        <QuoteList
          listId={columnId}
          listType="QUOTE"
          style={{
            backgroundColor: snapshot.isDragging ? "green" : null
          }}
          items={items}
        />
      </Container>
    )}
  </Draggable>
);
