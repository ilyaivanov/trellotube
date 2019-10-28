import React, { ChangeEvent, useEffect, useState } from "react";
import { useBoard } from "../state";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { handleDnd } from "../operations";
import ColumnView from "./Column";
import Card from "./Card";
import { useDebounce } from "../hooks";
import { Item } from "../types";
import { searchVideos } from "../api/youtube";

const App = () => {
  const [board, setBoard] = useBoard();
  const onDragEnd = (dropResult: DropResult) => {
    setBoard(handleDnd(board, dropResult));
  };
  const onSearchDone = (items: Item[]) => {
    console.log(items);
    setBoard({
      ...board,
      columns: {
        ...board.columns,
        SEARCH: {
          ...board.columns["SEARCH"],
          items
        }
      }
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <SearchArea
        items={board.columns["SEARCH"].items}
        onSearchDone={onSearchDone}
      />
      <Droppable droppableId="board" direction={"horizontal"} type="column">
        {provided => (
          <BoardContainer ref={provided.innerRef} {...provided.droppableProps}>
            {board.columnOrders.map((cId, index) => (
              <ColumnView key={cId} column={board.columns[cId]} index={index} />
            ))}
            {provided.placeholder}
            <button>+ Playlist</button>
          </BoardContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

interface SearchProps {
  items: Item[];
  onSearchDone: (items: Item[]) => void;
}
const SearchArea = ({ items, onSearchDone }: SearchProps) => {
  const [term, setTerm] = useState("");
  const debounced = useDebounce(term, 600);
  const onSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setTerm(e.target.value);

  useEffect(() => {
    if (debounced) {
      searchVideos(debounced).then(response => onSearchDone(response.items));
    }
  }, [debounced]);

  return (
    <SearchBar>
      <input type="text" value={term} onChange={onSearch} />
      <Droppable droppableId="SEARCH" type="item">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((i, index) => (
              <Card key={i.id} index={index} item={i} />
            ))}
          </div>
        )}
      </Droppable>
    </SearchBar>
  );
};
const SearchBar = styled.div`
  position: fixed;
  width: 200px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 200px;
  background-color: white;
  border-right: solid 1px #70797e;
`;

const BoardContainer = styled.div`
  min-height: calc(100vh - 16px);
  min-width: calc(100vh - 8px);
  display: inline-flex;
  align-items: flex-start;
  //to balance for margin-left of the rightmost item
  margin: 8px 8px 8px 200px;
`;
export default App;
