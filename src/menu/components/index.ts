import styled from "styled-components";
import c from "../../board/components/constants";

interface Props {
  isSelected?: boolean;
}

export const BoardOptions = styled.div`
  position: absolute;
  left: 0;
  right: 8px;
  justify-content: flex-end;
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
    display: flex;
  }
`;

export const SidebarVideosContainer = styled.div`
  padding-left: ${c.STACK_PADDING}px;
  padding-right: ${c.STACK_PADDING}px;
`;
