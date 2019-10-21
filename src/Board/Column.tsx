import React from "react";
import { Item } from "./types";
import { ColumnHeader, ColumnContainer, Card } from "./components";

interface Props {
  items: Item[];
  Header: string | JSX.Element;
}

const Column = ({ items, Header }: Props) => {
  return (
    <ColumnContainer>
      <ColumnHeader content={Header} />
      {items.map(item => (
        <Card
          key={item.id}
          text={item.text}
          imageUrl="https://i.ytimg.com/vi/Dlxu28sQfkE/default.jpg"
        />
      ))}
    </ColumnContainer>
  );
};

export default Column;
