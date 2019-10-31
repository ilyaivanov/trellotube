import React, { ChangeEvent, useEffect, useState } from "react";
import { useBoard } from "../state";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { handleDnd } from "../operations";
import ColumnView from "./Column";
import Card from "./Card";
import { useDebounce } from "../hooks";
import { Column, Item } from "../types";
import { searchVideos } from "../api/youtube";
import Sidebar from "../Menus/Sidebar";

const App = () => {
  const [board, setBoard] = useBoard();
  const onDragEnd = (dropResult: DropResult) => {
    setBoard(handleDnd(board, dropResult));
  };
  const onSearchDone = (items: Item[]) => {
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

  const onDelete = (columnId: string) => {
    const columns = {
      ...board.columns
    };
    delete columns[columnId];
    setBoard({
      ...board,
      columnOrders: board.columnOrders.filter(cc => cc !== columnId),
      columns: columns
    });
  };
  const createColumn = () => {
    const newColumn: Column = {
      items: [],
      name: "New Column",
      id: Math.random() + "",
      type: "PLAYLIST"
    };
    setBoard({
      ...board,
      columnOrders: board.columnOrders.concat([newColumn.id]),
      columns: {
        ...board.columns,
        [newColumn.id]: newColumn
      }
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Sidebar
        items={board.columns["SEARCH"].items}
        onSearchDone={onSearchDone}
      />
      <Droppable droppableId="board" direction={"horizontal"} type="column">
        {provided => (
          <BoardContainer ref={provided.innerRef} {...provided.droppableProps}>
            {board.columnOrders.map((cId, index) => (
              <ColumnView
                key={cId}
                onDelete={onDelete}
                column={board.columns[cId]}
                index={index}
              />
            ))}
            {provided.placeholder}
            <button onClick={createColumn}>+ Playlist</button>
          </BoardContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const BoardContainer = styled.div`
  min-height: calc(100vh - 16px);
  min-width: calc(100vh - 8px);
  display: inline-flex;
  align-items: flex-start;
  //to balance for margin-left of the rightmost item
  margin: 8px 8px 8px 200px;
`;
export default App;
