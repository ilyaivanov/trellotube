import React from "react";
import { Item } from "./types";

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
        <div key={item.id} className="row-item">
          <span>{item.text}</span>
          <div className="absolute-fill row-item-cross-container">
            <span className="row-item-cross">x</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Column;
