import styled from "styled-components";
import c from "./constants";

const Options = styled.div`
  display: none;
`;

const ColumnContainer = styled.div`
  background-color: lightblue;
  margin-left: 8px;
  border-radius: ${c.BORDER_RADIUS}px;
  width: ${c.STACK_WIDTH}px;
  max-height: calc(
    100vh - ${c.STACK_PADDING * 2}px - ${c.TOP_BAR_HEIGHT}px -
      ${c.PLAYER_HEIGHT}px
  );
  overflow: scroll;
  display: flex;
  flex-direction: column;
  padding-left: ${c.STACK_PADDING}px;
  padding-right: ${c.STACK_PADDING}px;
  &:hover ${Options} {
    display: inherit;
  }
`;

const TaskList = styled.div`
  flex-grow: 1;
  min-height: 50px;
`;

const BoardContainer = styled.div`
  display: inline-flex;
  align-items: flex-start;
  margin: 8px 8px 8px 8px;

  &:first-of-type {
    margin-left: 0;
  }
`;
const Title = styled.h4`
  margin-bottom: 0;
  padding-left: ${c.STACK_PADDING}px;
  padding-bottom: ${c.STACK_PADDING}px;

  display: flex;
  justify-content: space-between;
`;
const FindSimilarButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  display: none;
`;
const TaskContainer = styled.div<{ isPlaying: boolean }>`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: row;
  border-radius: ${c.BORDER_RADIUS}px;
  background-color: ${props => (props.isPlaying ? "lightpink" : "white")};
  transition: background-color 400ms;
  margin-bottom: ${c.STACK_PADDING}px;
  box-shadow: 0 2px 1px -1px gray;
  &:hover ${FindSimilarButton} {
    display: inherit;
  }
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
  TaskContainer,
  FindSimilarButton
};
