import styled from "styled-components";
import c from "../../infrastructure/constants";

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

  padding-left: 20px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${props => (props.isSelected ? c.ACCENT_COLOR : "black")};
  &:hover {
    background-color: ${c.ACCENT_COLOR};
    color: black;
  }
  &:hover ${BoardOptions} {
    display: flex;
  }
`;

export const SidebarVideosContainer = styled.div`
  padding-left: ${c.STACK_PADDING}px;
  padding-right: ${c.STACK_PADDING}px;
`;
