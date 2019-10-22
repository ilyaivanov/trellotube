import React from "react";
import styled from "styled-components";

interface Props {
  text: string;
  imageUrl: string;
  draggableProps: any;
  dragHandleProps: any;
}

const Card = React.forwardRef(({ text, draggableProps, dragHandleProps }: Props, ref) => (
  <CardContainer {...draggableProps} {...dragHandleProps} ref={ref}>
    <span>{text}</span>
    <CrossContainer>
      <Cross>x</Cross>
    </CrossContainer>
  </CardContainer>
));

const CardContainer = styled.div`
  padding: 8px;
  background-color: white;
  color: #121f3c;
  border-radius: 3px;
  box-shadow: rgba(9, 30, 66, 0.25) 0 1px 0 0;
  margin-bottom: 8px;
  position: relative;
`;

const CrossContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
`;

const Cross = styled.span`
  font-size: 14px;
  line-height: 14px;
  cursor: pointer;
  display: none;

  ${CrossContainer}:hover & {
    display: inherit;
  }
`;

export default Card;
