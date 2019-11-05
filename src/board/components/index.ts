import styled from "styled-components";

const Options = styled.div`
  display: none;
`;

const ColumnContainer = styled.div`
  background-color: lightgrey;
  margin-left: 8px;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
  padding-left: 8px;
  padding-right: 8px;
  &:hover ${Options} {
    display: inherit;
  }
`;

const TaskList = styled.div<any>`
  background-color: ${(props: any) =>
    props.isDraggingOver ? "skyblue" : "lightgrey"};
  flex-grow: 1;
  min-height: 50px;
`;

const BoardContainer = styled.div`
  min-height: calc(100vh - 16px);
  min-width: calc(100vh - 8px);
  display: inline-flex;
  align-items: flex-start;
  //to balance for margin-left of the rightmost item
  margin: 8px 8px 8px 200px;
`;
const Title = styled.h4`
  margin-bottom: 0;
  padding: 8px;

  display: flex;
  justify-content: space-between;
`;

const TaskContainer = styled.div`
  border-radius: 4px;
  background-color: white;
  margin-bottom: 8px;
`;

const Img = styled.img`
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const Subtext = styled.div`
  color: #1e1e1e;
  padding: 4px;
`;

export {
  BoardContainer,
  Title,
  TaskList,
  ColumnContainer,
  Options,
  Subtext,
  Img,
  TaskContainer
};
