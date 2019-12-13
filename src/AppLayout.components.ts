import styled from "styled-components";
import c from "./infrastructure/constants";

export const Container = styled.div`
  background-color: ${c.MAIN_COLOR};
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  align-items: stretch;
`;

export const TopBar = styled.div`
  min-height: ${c.TOP_BAR_HEIGHT}px;
  background-color: ${c.MENU_COLOR};
`;

export const MainContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: scroll;
`;


interface VisibilityProps {
  isVisible: boolean;
}

export const Sidebar = styled.div<VisibilityProps>`
  width: ${props => (props.isVisible ? c.SIDEBAR_WIDTH : 0)}px;
  transition: width 200ms;
  overflow: scroll;
`;

export const LeftSidebar = styled(Sidebar)`
  position: relative;
  background-color: ${c.MENU_COLOR};
`;

export const RightSidebar = styled(Sidebar)`
  background-color: ${c.MENU_COLOR};
`;

export const MainContent = styled.div`
  overflow: scroll;
  flex: 1;
`;
