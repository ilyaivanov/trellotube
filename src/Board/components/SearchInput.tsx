import styled from "styled-components";
import c from "./contants";

const SearchInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: ${c.ITEM_HEIGHT}px;
  font-size: 23px;
  margin-bottom: 8px;
  border-radius: ${c.BORDER_RADIUS}px;
`;

export default SearchInput;
