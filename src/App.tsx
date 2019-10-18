import React from "react";
import "./App.css";
import Column from "./BoardUI/Column";
import Button from "./BoardUI/Button";
import SearchHeader from "./BoardUI/SearchHeader";

const id = () => Math.random() + "";

const App: React.FC = () => {
  const firstColumn = [
    {text: "Album 1", id: id()},
    {text: "Album 2", id: id()},
    {text: "Album 3", id: id()}
  ];
  const secondColumn = [
    {
      text: "Carbon Based Lifeforms - Interloper [Full Album - 2015 Remaster]",
      id: id()
    },
    {text: "Title 2", id: id()},
    {text: "Title 3", id: id()},
    {text: "Title 4", id: id()},
    {text: "Title 5", id: id()},
    {text: "Title 6", id: id()}
  ];

  const searchHeader = <SearchHeader/>;

  return (
    <div className="board">
      <Column Header={searchHeader} items={firstColumn}/>
      <Column Header="Music" items={firstColumn}/>
      <Column Header="Tracks" items={secondColumn}/>
      <div className="column">
        <Button label="+ Playlist"/>
        <Button label="+ Search"/>
      </div>
    </div>
  );
};

export default App;
