import React from "react";
import Column from "./Board/Column";
import {
  SearchInput,
  Board,
  Button,
  TransparentColumnContainer
} from "./Board/components";
import { DragDropContext } from "react-beautiful-dnd";

//extract to reducer
const id = () => Math.random() + "";

const App: React.FC = () => {
  const firstColumn = [
    { text: "Album 1", id: id() },
    { text: "Album 2", id: id() },
    { text: "Album 3", id: id() }
  ];
  const secondColumn = [
    {
      text: "Carbon Based Lifeforms - Interloper [Full Album - 2015 Remaster]",
      id: id()
    },
    { text: "Title 2", id: id() },
    { text: "Title 3", id: id() },
    { text: "Title 4", id: id() },
    { text: "Title 5", id: id() },
    { text: "Title 6", id: id() }
  ];
  const thirdColumn = [
    {
      text: "Carbon Based Lifeforms - Interloper [Full Album - 2015 Remaster]",
      id: id()
    },
    { text: "Title 12", id: id() },
    { text: "Title 23", id: id() },
    { text: "Title 34", id: id() },
    { text: "Title 45", id: id() },
    { text: "Title 56", id: id() }
  ];

  const searchHeader = <SearchInput placeholder="Enter search here..." />;

  return (
    <DragDropContext onDragEnd={(result) => console.log(result)}>
      <Board>
        <Column Header={searchHeader} items={firstColumn} />
        <Column Header="Music" items={secondColumn} />
        <Column Header="Tracks" items={thirdColumn} />
        <TransparentColumnContainer>
          <Button label="+ Playlist" />
          <Button label="+ Search" />
        </TransparentColumnContainer>
      </Board>
    </DragDropContext>
  );
};

export default App;
