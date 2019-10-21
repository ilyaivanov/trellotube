import React from "react";
import { Item } from "./types";
import Card from "./card/Card";

interface Props {
  items: Item[];
  Header: string | JSX.Element;
}
const Column = ({ items, Header }: Props) => {
  return (
    <div className="column container-radius container">
      {typeof Header === "string" ? (
        <span className="music-label">{Header}</span>
      ) : (
        Header
      )}

      {items.map(item => (
        <Card
          key={item.id}
          text={item.text}
          imageUrl="https://i.ytimg.com/vi/Dlxu28sQfkE/default.jpg"
        />
      ))}
    </div>
  );
};

export default Column;
