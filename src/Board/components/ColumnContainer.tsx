import styled from "styled-components";

const TransparentColumnContainer = styled.div`
  min-width: 256px;
  width: 256px;
  margin-right: 8px;

  padding: 8px;
  border-radius: 3px;
`;

const ColumnContainer = styled(TransparentColumnContainer)`
  background-color: #e6e7ec;
`;

export default ColumnContainer;

export { TransparentColumnContainer };
