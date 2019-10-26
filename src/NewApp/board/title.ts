import styled from "styled-components";

const Title = styled.h4<any>`
  padding: ${2}px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;

  &:focus {
    outline: 2px solid blue;
    outline-offset: 2px;
  }
`;
export default Title;
