import styled from "styled-components";
import c from "../../board/components/constants";

interface Props {
  isSelected?: boolean;
}

export const BoardOptions = styled.div`
  display: none;
`;

export const BoardItemView = styled.div<Props>`
  cursor: pointer;
  &:hover {
    background-color: lightpink;
  }
  padding-left: 20px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${props => (props.isSelected ? "purple" : "black")};
  &:hover ${BoardOptions} {
    display: inherit;
  }
`;

export const SidebarContainer = styled.div`
  overflow: scroll;
  position: fixed;
  width: ${c.SIDEBAR_WIDTH}px;
  box-sizing: border-box;
  padding-left: ${c.STACK_PADDING}px;
  padding-right: ${c.STACK_PADDING}px;
  background-color: lightgrey;
  top: 0;
  left: 0;
  bottom: 0;
`;
