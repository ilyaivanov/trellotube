import React from "react";
import { Item } from "./types";

interface Props {
  items: Item[];
  title: string;
}
const Column = ({ items, title }: Props) => {
  return (
    <div className="container">
      <span className="music-label">{title}</span>

      {items.map(item => (
        <div key={item.id} className="row-item">
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default Column;
