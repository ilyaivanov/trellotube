import React from "react";
import Column from "./Board/Column";
import {
  Board,
  Button,
  SearchInput,
  TransparentColumnContainer
} from "./Board/components";
import { DragDropContext } from "react-beautiful-dnd";
import { useBoard } from "./state";

const App: React.FC = () => {
  const [board] = useBoard();

  return (
    <DragDropContext onDragEnd={result => console.log(result)}>
      <Board>
        {board.columns.map(column => {
          if (column.type === "SEARCH")
            return (
              <Column
                key={column.id}
                Header={<SearchInput placeholder="Enter search here..." />}
                items={column.items}
              />
            );
          else
            return (
              <Column
                key={column.id}
                Header={column.name}
                items={column.items}
              />
            );
        })}
        <TransparentColumnContainer>
          <Button label="+ Playlist" />
          <Button label="+ Search" />
        </TransparentColumnContainer>
      </Board>
    </DragDropContext>
  );
};

export default App;
