import React, { Component } from "react";
import styled from "styled-components";
import { Quote } from "./types";
import {
  DraggableProvided,
  DraggableStateSnapshot,
  Draggable,
  Droppable, DroppableProvided, DroppableStateSnapshot
} from "react-beautiful-dnd";
import QuoteList from "./QuoteList";
import Title from "./title";

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
  background-color: ${({ isDragging }: any) => (isDragging ? "black" : "blue")};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: green;
  }
`;

type Props = {
  title: string;
  quotes: Quote[];
  index: number;
  isScrollable?: boolean;
  isCombineEnabled?: boolean;
};

export default class Column extends Component<Props> {
  render() {
    const title: string = this.props.title;
    const quotes: Quote[] = this.props.quotes;
    const index: number = this.props.index;
    return (
      <Draggable draggableId={title} index={index}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <Container ref={provided.innerRef} {...provided.draggableProps}>
            <Header isDragging={snapshot.isDragging}>
              <Title
                isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}
              >
                {title}
              </Title>
            </Header>
            <QuoteList
              listId={title}
              listType="QUOTE"
              style={{
                backgroundColor: snapshot.isDragging ? 'green' : null
              }}
              quotes={quotes}
              internalScroll={this.props.isScrollable}
              isCombineEnabled={Boolean(this.props.isCombineEnabled)}
            />
          </Container>
        )}
      </Draggable>
    );
  }
}
