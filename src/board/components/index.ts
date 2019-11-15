import styled from "styled-components";
import c from './constants';

const Options = styled.div`
  display: none;
`;

const ColumnContainer = styled.div`
  background-color: lightgrey;
  margin-left: 8px;
  border-radius: ${c.BORDER_RADIUS}px;
  width: ${c.STACK_WIDTH}px;
  display: flex;
  flex-direction: column;
  padding-left: ${c.STACK_PADDING}px;
  padding-right: ${c.STACK_PADDING}px;
  &:hover ${Options} {
    display: inherit;
  }
`;

const TaskList = styled.div<any>`
  background-color: ${(props: any) =>
    props.isDraggingOver ? "lightgrey" : "lightgrey"};
  flex-grow: 1;
  min-height: 50px;
`;

const BoardContainer = styled.div`
  display: inline-flex;
  align-items: flex-start;
  //to balance for margin-left of the rightmost item
  margin: 8px 8px 8px ${c.SIDEBAR_WIDTH}px;
`;
const Title = styled.h4`
  margin-bottom: 0;
  padding-left: ${c.STACK_PADDING}px;
  padding-bottom: ${c.STACK_PADDING}px;

  display: flex;
  justify-content: space-between;
`;

const TaskContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  border-radius: ${c.BORDER_RADIUS}px;
  background-color: white;
  margin-bottom: ${c.STACK_PADDING}px;
  box-shadow: 0 2px 1px -1px gray;
`;

const Img = styled.img`
  width: ${c.CARD_IMAGE_WIDTH}px;
  height: ${c.CARD_IMAGE_HEIGHT}px;
  border-top-left-radius: ${c.BORDER_RADIUS}px;
  border-bottom-left-radius: ${c.BORDER_RADIUS}px;
`;

const Subtext = styled.div`
  color: #1e1e1e;
  font-size: 14px;
  
  display: flex;
  align-items: center;
  padding-left: ${c.STACK_PADDING}px;
  width: ${c.CARD_TEXT_WIDTH}px;
  height: ${c.CARD_HEIGHT}px;
`;

export {
  BoardContainer,
  Title,
  TaskList,
  ColumnContainer,
  Options,
  Subtext,
  Img,
  TaskContainer
};
