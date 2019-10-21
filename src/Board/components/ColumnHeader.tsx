import React from "react";
import styled from "styled-components";

const Header = ({ content }: { content: string | JSX.Element }) =>
  typeof content === "string" ? <MusicLabel>{content}</MusicLabel> : content;

const MusicLabel = styled.span`
  color: #121f3c;
  font-weight: bold;
  padding-left: 8px;
  line-height: 35px;
`;

export default Header;
