import React from "react";
import "./App.css";
import Column from "./BoardUI/Column";

const id = () => Math.random() + "";

const App: React.FC = () => {
  const firstColumn = [
    { text: "Album 1", id: id() },
    { text: "Album 2", id: id() },
    { text: "Album 3", id: id() },
  ];
  const secondColumn = [
    { text: "Title 1", id: id() },
    { text: "Title 2", id: id() },
    { text: "Title 3", id: id() },
    { text: "Title 4", id: id() },
    { text: "Title 5", id: id() },
    { text: "Title 6", id: id() },
  ];

  return (
    <div className="board">
      <Column title="Music" items={firstColumn} />
      <Column title="Tracks" items={secondColumn} />
    </div>
  );
};

export default App;
