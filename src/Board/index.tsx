import React, { useState } from "react";
import { useBoard } from "../state";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { handleDnd } from "../operations";
import ColumnView from "./Column";
import { Board, Column, Item } from "../types";
import Sidebar from "../Menus/Sidebar";
import Player from "../player/Player";

const App = () => {
  const [appState, setAppState] = useBoard();
  const [videoId, setVideoId] = useState<string>();
  const updateBoard = (board: Board) => {
    setAppState({
      ...appState,
      boards: {
        ...appState.boards,
        [board.boardId]: board
      }
    });
  };
  const selectedBoard = appState.boards[appState.selectedBoard];

  const onDragEnd = (dropResult: DropResult) => {
    updateBoard(handleDnd(selectedBoard, dropResult));
  };
  const onSearchDone = (items: Item[]) => {
    updateBoard({
      ...selectedBoard,
      columns: {
        ...selectedBoard.columns,
        SEARCH: {
          ...selectedBoard.columns["SEARCH"],
          items
        }
      }
    });
  };

  const onDelete = (columnId: string) => {
    const columns = {
      ...selectedBoard.columns
    };
    delete columns[columnId];
    updateBoard({
      ...selectedBoard,
      columnOrders: selectedBoard.columnOrders.filter(cc => cc !== columnId),
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
    updateBoard({
      ...selectedBoard,
      columnOrders: selectedBoard.columnOrders.concat([newColumn.id]),
      columns: {
        ...selectedBoard.columns,
        [newColumn.id]: newColumn
      }
    });
  };
  const onSelectBoard = (boardId: string) => {
    setAppState({
      ...appState,
      selectedBoard: boardId
    });
  };

  const onRenameColumn = (columnId: string, newName: string) => {
    updateBoard({
      ...selectedBoard,
      columns: {
        ...selectedBoard.columns,
        [columnId]: {
          ...appState.boards[appState.selectedBoard].columns[columnId],
          name: newName
        }
      }
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Sidebar
        onPlay={setVideoId}
        app={appState}
        onSearchDone={onSearchDone}
        onSelectBoard={onSelectBoard}
      />
      <Droppable droppableId="board" direction={"horizontal"} type="column">
        {provided => (
          <BoardContainer ref={provided.innerRef} {...provided.droppableProps}>
            {selectedBoard.columnOrders.map((cId, index) => (
              <ColumnView
                onPlay={setVideoId}
                key={cId}
                onDelete={onDelete}
                column={selectedBoard.columns[cId]}
                index={index}
                renameColumn={onRenameColumn}
              />
            ))}
            {provided.placeholder}
            <button onClick={createColumn}>+ Playlist</button>
          </BoardContainer>
        )}
      </Droppable>
      <Player
        videoId={videoId}
        onEnd={() => console.log("on video end, TODO: play next track")}
      />
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
