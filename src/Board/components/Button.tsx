import React from "react";
import styled from "styled-components";

interface Props {
  label: string;
}

const Button = ({ label }: Props) => <ButtonContainer>{label}</ButtonContainer>;

const ButtonContainer = styled.div`
  background-color: #90989b;
  color: white;
  line-height: 20px;
  padding: 10px;
  margin-bottom: 8px;

  border-radius: 3px;

  &:hover {
    background-color: #9aa2a5;
    cursor: pointer;
  }
`;

export default Button;
