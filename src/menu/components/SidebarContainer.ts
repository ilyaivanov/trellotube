import styled from "styled-components";
import c from "../../board/components/constants";
export default styled.div`
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
