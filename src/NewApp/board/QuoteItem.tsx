// @flow
import React from "react";
import styled from "styled-components";
import { AuthorColors, Quote } from "./types";
import { DraggableProvided } from "react-beautiful-dnd";
const borderRadius = 2,
  grid = 2;

type Props = {
  quote: Quote;
  isDragging: boolean;
  provided: DraggableProvided;
  isGroupedOver?: boolean;
};

const getBackgroundColor = (
  isDragging: boolean,
  isGroupedOver: boolean,
  authorColors: AuthorColors
) => {
  if (isDragging) {
    return 'white';
  }

  if (isGroupedOver) {
    return "grey";
  }

  return "lightgrey";
};

const getBorderColor = (isDragging: boolean, authorColors: AuthorColors) =>
  isDragging ? authorColors.hard : "transparent";

const Container = styled.div<any>`
  border-radius: ${borderRadius}px;
  border: 2px solid transparent;
  border-color: ${props => getBorderColor(props.isDragging, props.colors)};
  background-color: ${props =>
    getBackgroundColor(props.isDragging, props.isGroupedOver, props.colors)};
  box-shadow: ${({ isDragging }) =>
    isDragging ? `2px 2px 1px green` : "none"};
  padding: ${grid}px;
  min-height: 40px;
  margin-bottom: ${grid}px;
  user-select: none;

  /* anchor overrides */
  color: black;

  &:hover,
  &:active {
    color: green;
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: ${props => props.colors.hard};
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`;

const Content = styled.div`
  /* flex child */
  flex-grow: 1;

  /*
    Needed to wrap text in ie11
    https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox
  */
  flex-basis: 100%;

  /* flex parent */
  display: flex;
  flex-direction: column;
`;

function QuoteItem(props: Props) {
  const { quote, isDragging, isGroupedOver, provided } = props;

  return (
    <Container
      href={quote.author.url}
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      colors={quote.author.colors}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Content>
        {quote.content}
      </Content>
    </Container>
  );
}

export default React.memo<Props>(QuoteItem);
